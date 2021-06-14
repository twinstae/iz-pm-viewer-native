<script lang="ts">
import { navigate } from 'svelte-native';
import { Template } from 'svelte-native/components';
import MailDetail from "./MailDetail.svelte";
import MailItem from '../molecules/MailItem.svelte';
import { filtered_pm_list } from '../stores/mail_list';
import { knownFolders, File } from "@nativescript/core/file-system";
import { SERVER_ROOT } from '~/constants';
// let downloads_path = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();

const output_path = knownFolders.documents().path + "/output"
const pm_list_path = output_path + "/pm_list.json";

let fetched_pm_list = [];

async function fetch_init(){
  const result = await fetch(SERVER_ROOT + "/pm_list.json")
    .then(res=>res.json())

  const mail_body_dict = await fetch(SERVER_ROOT + "/mail_body_dict.json")
    .then(res=>res.json())

  fetched_pm_list = result.map(pm=>({
    ...pm,
    body: mail_body_dict[pm.id].body,
    images: mail_body_dict[pm.id].images
  }));

  const pm_list_json_file = File.fromPath(pm_list_path);
  pm_list_json_file.writeText(JSON.stringify(fetched_pm_list), "UTF-8");
}

if (File.exists(pm_list_path)){
  const raw_pm_list = File.fromPath(pm_list_path).readTextSync((e)=>{
    alert(e.message)
  }, "UTF-8");

  fetched_pm_list = JSON.parse(raw_pm_list);
} else {
  fetch_init()
}

$: page = fetched_pm_list ? fetched_pm_list.slice(0,30) : $filtered_pm_list;

const go_to_detail = (e) =>{
  const pm = page[e.index];
  navigate({ page: MailDetail, props: { pm } })
}
</script>

<listView items={page} on:itemTap={go_to_detail}>
  <Template let:item>
    <MailItem item={item} />
  </Template>
</listView>


<style>

  listView {
    height: 90%;
  }

</style>
