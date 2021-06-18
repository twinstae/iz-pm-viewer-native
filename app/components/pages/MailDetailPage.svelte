<script lang="ts">
  import MemberTag from '~/components/molecules/MemberTag.svelte';
  import Tag from '~/components/atoms/Tag.svelte';
  import MemberProfile from '~/components/atoms/MemberProfile.svelte';
  import { get_member_name } from '~/constants';
  import { get_image_source_or_download_from_server } from '~/infra';
  import { filtered_pm_list } from '~/stores/mail_list';
  import { Screen } from '@nativescript/core';
import PinkButton from '../atoms/PinkButton.svelte';
import { navigate } from 'svelte-native';
import MailListPage from './MailListPage.svelte';

  const heightDIPs = Screen.mainScreen.heightDIPs

  export let now_pm: MailT;
  export let go_to_detail;

  $: now_i = $filtered_pm_list.findIndex((pm)=>pm.id == now_pm.id);

  function get_src(img: string){
    if (img.startsWith("http")){
      return img;
    }

    return get_image_source_or_download_from_server("/" + img);
    // return output_path + "/" + img;
  }
  
  
   
let mail_detail_view;
let up_count = 0;
let down_count = 0;
let loading = false;

const onScroll = (e)=>{
    if(loading){
      return;
    }
    
    const height = mail_detail_view.nativeView.scrollableHeight;
    if (height <= e.scrollY){
      loading = true;
      down_count += 1
      setTimeout(()=>{ loading = false; }, 1000)
      
      if (down_count >= 2){
        goToMail(now_i + 1)
      }
    }

    if (e.scrollY <= 1){
      loading = true;
      up_count += 1
      setTimeout(()=>{ loading = false; }, 1000)
      
      if (up_count >= 2){
        goToMail(now_i - 1)
      }
    }
  }

function goToMail(target_i){
  if (target_i < 0 || target_i >= $filtered_pm_list.length){
    return ;
  }
  go_to_detail(target_i);
}

function goToRandom(){
  const random_i = Math.floor(Math.random() * $filtered_pm_list.length);
  goToMail(random_i);
}

function refresh(){
  goToMail(now_i);
}

$: html_list = now_pm.body.split("{이미지}")

function backToList(){
  navigate({ page: MailListPage }) 
}

</script>

<page>
  <scrollView bind:this={mail_detail_view} on:scroll={onScroll}>
    <stackLayout id="MailDetailCard" style="padding: 8; font-size: 16; min-height: {Math.floor(heightDIPs * 0.85)}">
      <stackLayout orientation="horizontal">
        <MemberProfile member_name={get_member_name(now_pm.member)} />
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label text="{now_pm.subject}" class="subject"/>
      </stackLayout>
      <wrapLayout>
        <MemberTag member = {now_pm.member} />
        <Tag text="{now_pm.time.slice(2)}" bg_color="pink"/>
      </wrapLayout>
      
      <stackLayout orientation="horizontal">
        <PinkButton text="🔀" onTap={()=>goToRandom()}/>
        <PinkButton text="돌아가기" onTap={()=>backToList()}/>
        <PinkButton text="새로고침" onTap={()=>refresh()}/>
      </stackLayout>

      {#each html_list as html, i}
        {#if html.replace(/<[^>]+>/g, '').trim()}
        <webView src={i + " " + html}/>
        {/if}
        {#if now_pm.images[i]}
          <image src={get_src(now_pm.images[i])} />
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
    border-radius: 8;
    background-color: white;
    height: 85%;
  }
	
  .subject {
    margin-left: 0.5rem;
		font-size: 20px;
  }
</style>
