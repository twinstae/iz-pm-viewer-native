<script lang="ts">
import AllTagList from '../molecules/AllTagList.svelte';
import MailList from '../organisms/MailList.svelte';
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
