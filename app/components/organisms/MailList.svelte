<script lang="ts">
import { navigate } from 'svelte-native';
import { Template } from 'svelte-native/components';
import MailDetailPage from "~/components/pages/MailDetailPage.svelte";
import MailItem from '~/components/molecules/MailItem.svelte';
import { filtered_pm_list } from '~/stores/mail_list';
import { selected_tag_value } from '~/stores/now';

const go_to_detail = (e) =>{
  const pm = $filtered_pm_list[e.index];
  navigate({ page: MailDetailPage, props: { pm } })
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
})

</script>

<listView id="MailList" items={$filtered_pm_list.reverse()} on:itemTap={go_to_detail} bind:this={mail_list_view}>
  <Template let:item>
    <MailItem pm={item} />
  </Template>
</listView>


<style>

  listView {
    height: 90%;
  }

</style>
