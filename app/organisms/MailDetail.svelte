<script lang="ts">
  import { navigate } from 'svelte-native';
  import MailList from './MailList.svelte';
  import MemberTag from '~/molecules/MemberTag.svelte';
  import Tag from '~/atoms/Tag.svelte';

  export let pm;
  const html = `${pm.preview}`

  const onBackButtonTap = ()=> navigate({ page: MailList });
</script>

<page>
  <stackLayout>
    <wrapLayout>
      <MemberTag member = {pm.member} />
      <Tag text="{pm.time.slice(2)}" bg_color="pink"/>
    </wrapLayout>
    <label text="{pm.subject}" class="subject"/>
    <htmlView html={html} />
    <button text="돌아가기" on:tap={onBackButtonTap} />
  </stackLayout>
</page>


<style>
	page {
		background-image: linear-gradient(to bottom right,
    #f1d2e7,#f1c3aa,#e382a9, #e18784,
    #f3aa51, #fcf695, #fff,#cee5d5,
    #a7e0e1, #b7d3e9, #bbb0dc, #7592d7);
  }

  stackLayout {
    margin: 8;
    padding: 16;
    border-radius: 16;
    background-color: white;
  }
	
	.subject {
		font-size: 20px;
  }

  button {
    background-color: pink;
    border-radius: 16;
  }
</style>
