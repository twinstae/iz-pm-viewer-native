<script lang="ts">
import { navigate } from 'svelte-native';
import { Template } from 'svelte-native/components';
import MailDetailPage from "~/components/pages/MailDetailPage.svelte";
import MailItem from '~/components/molecules/MailItem.svelte';
import { filtered_pm_list } from '~/stores/search';
import { selected_tag_value } from '~/stores/now';
import { onMount } from 'svelte';
import { showModal } from 'svelte-native'
import DateSelectModal from './DateSelectModal.svelte';
import { download_all_image } from '~/infra';
import PinkButton from '../atoms/PinkButton.svelte';

const go_to_detail = (i) =>{
  const now_pm = $filtered_pm_list[i];
  navigate({ page: MailDetailPage, props: { now_pm, go_to_detail } }) 
}

function onItemTap(e){
  go_to_detail(e.index);
}

let mail_list_view;

const go_to_zero = () => {
  mail_list_view.nativeView.scrollToIndex(0);
};

selected_tag_value.subscribe((_)=>{
  if(mail_list_view != undefined){
    setTimeout(()=>{
      go_to_zero();
    }, 100);
  }
});

let ls = "test";
function get_first_visible_index(){
  for (let i = 0; i < $filtered_pm_list.length; i += 1) {
    if (mail_list_view.nativeView.isItemAtIndexVisible(i)){
      return i;
    }
  }
}

const go_to_date = (to_date_str) => {
  const to_datetime = to_date_str + " 23:39";
  const result = $filtered_pm_list.findIndex(pm=> pm.time < to_datetime);
  const the_i = result != -1 ? result : $filtered_pm_list.length - 1;
  
  mail_list_view.nativeView.scrollToIndex(the_i);
  ls = String(the_i);
}

function date_to_str(date: Date): string{
  const year = String(date.getFullYear())
  const raw_month = date.getMonth()
  const month = (raw_month < 10 ? "0" : "") + String(raw_month+1);
  const raw_day = date.getDate()
  const day = (raw_day < 10 ? "0" : "") + String(raw_day);
  return `${year}/${month}/${day}`
}

async function onButtonTap(){
  const date_str = ls.split(" ")[0];
  const [year, month_, day] = date_str.split("/").map(s=>Number(s));
  const now_date = new Date(year, month_ -1, day);
  console.log(now_date)
  const selected_date: Date = await showModal({
    page: DateSelectModal,
    props: { selected_date: now_date }
  });
  go_to_date(date_to_str(selected_date))
  ls = date_to_str(selected_date)
}

let updateDate;

onMount(()=>{
  updateDate = setInterval(()=>{
    if(mail_list_view && mail_list_view.nativeView){
      try {
        let i = get_first_visible_index();
        ls = $filtered_pm_list[i].time.substring(0, 10);
      } catch (e){
        console.log(e)
      }      
    }
  }, 3000)
  return ()=>{clearInterval(updateDate);}
})

/*
<PinkButton text="모든 이미지 다운로드" onTap={()=>{download_all_image();}} />
*/
</script>

<button text={ls} on:tap={onButtonTap}/>
<listView
  id="MailList"
  items={$filtered_pm_list}
  on:itemTap={onItemTap}
  bind:this={mail_list_view}>

  <Template let:item>
    <MailItem pm={item} />
  </Template>

</listView>


<style>

  listView {
    height: 90%;
  }

  button {
      border-radius: 8;
      height: 32;
      color: black;
      background-color: white;
  }
</style>
