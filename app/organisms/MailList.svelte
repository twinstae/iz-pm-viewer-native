<script lang="ts">
import { navigate } from 'svelte-native';
import { Template } from 'svelte-native/components';
import { pm_list } from '../constants';
import MailDetail from "./MailDetail.svelte";
import { filtered_pm_list } from '../stores/mail_list';

import MailItem from '../molecules/MailItem.svelte';
import AllTagList from '../molecules/AllTagList.svelte';

const go_to_detail = (e) =>{
  const pm = pm_list[e.index];
  navigate({ page: MailDetail, props: { pm } })
}

</script>

<page class="page">
<stackLayout id="ListStack">
    <AllTagList />
    <listView items={$filtered_pm_list} on:itemTap={go_to_detail}>
      <Template let:item>
        <MailItem item={item} />
      </Template>
    </listView>
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

		
  listView {
    height: 90%;
  }
</style>
