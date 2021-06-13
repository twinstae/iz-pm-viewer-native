<script lang="ts">
  import MemberTag from '~/molecules/MemberTag.svelte';
  import Tag from '~/atoms/Tag.svelte';
  import MemberProfile from '~/atoms/MemberProfile.svelte';
  import { get_member_name } from '~/constants';

  export let pm: MailT;
  const html_list = pm.body.split("{이미지}");

</script>

<page>
  <scrollView>
    <stackLayout style="padding: 8; font-size: 16;">
      <stackLayout orientation="horizontal">
        <MemberProfile member_name={get_member_name(pm.member)} />
        <label text="{pm.subject}" class="subject"/>
      </stackLayout>
      <wrapLayout>
        <MemberTag member = {pm.member} />
        <Tag text="{pm.time.slice(2)}" bg_color="pink"/>
      </wrapLayout>
      {#each html_list as html, i}
        <htmlView html={html} />
        {#if i != html_list.length}
          <image src="{pm.images[i]}" style="width: 100%; border-radius: 8;"/>
        {/if}
      {/each}
    </stackLayout>    
  </scrollView>
</page>


<style>
	page {
		background-image: linear-gradient(to bottom right,
    #f1d2e7,#f1c3aa,#e382a9, #e18784,
    #f3aa51, #fcf695, #fff,#cee5d5,
    #a7e0e1, #b7d3e9, #bbb0dc, #7592d7);
  }

  scrollView {
    margin: 8;
    border-radius: 16;
    background-color: white;
    height: 85%;
  }
	
	.subject {
		font-size: 20px;
  }
</style>
