<script lang="ts">
import AllTagList from '../molecules/AllTagList.svelte';
import MailList from '../organisms/MailList.svelte';

import fs from "~/infra/fs";
import server from "~/infra/server";
import { pm_list } from "~/stores/mail_list";

async function init(){
  if (fs.file_exists("/pm_list.json")){
    const v = await fs.get_pm_list();
    pm_list.set(v);
  } else {
    const v = await server.get_pm_list();

    pm_list.set(v);
    fs.write_json("/pm_list.json", v);
  }
}

init();

</script>

<page class="page">
  <stackLayout id="ListStack">
    <AllTagList />
    <MailList />
  </stackLayout>
</page>


<style>
  stackLayout#ListStack {
    margin: 8;
    border-radius: 16;
    background-color: white;
  }

  stackLayout {
    padding: 0;
  }

	page {
		background-image: linear-gradient(to bottom right,
    #f1d2e7,#f1c3aa,#e382a9, #e18784,
    #f3aa51, #fcf695, #fff,#cee5d5,
    #a7e0e1, #b7d3e9, #bbb0dc, #7592d7);
  }

</style>
