<script lang="ts">
  import MemberTag from '~/components/molecules/MemberTag.svelte';
  import Tag from '~/components/atoms/Tag.svelte';
  import MemberProfile from '~/components/atoms/MemberProfile.svelte';
  import { get_member_name, SERVER_ROOT } from '~/constants';

  export let pm: MailT;

  function get_src(img: string){
    if (img.startsWith("http")){
      return img;
    }

    return SERVER_ROOT + "/" + img;
    // return output_path + "/" + img;
  }

  const html_with_image = pm.images
    .reduce((body, img)=>{
      const src = get_src(img);
      return body.replace("{이미지}", `<img style="width: 100%;" src="${src}">`)
    }, pm.body);


  const video_src = SERVER_ROOT + "/video/youtube/추운 겨울도 따뜻하게 만든 IZ_ONE(아이즈원)의 유기동물 봉사활동 스케치.mp4";
  const html = html_with_image.replace("{비디오}", `<div style="width: 100%;"> <video style="width: 100%;" controls> <source src="${video_src}" type="video/mp4"> </video> </div>`)
   
  // const html_style = ""; // `<style> p { font-size: 1rem; } </style>`
 
/*
      {#each html_list as html, i}
        <webView src={html_style + html} />
        {#if i != html_list.length && pm.images[i]}
          <image src="{get_src(pm.images[i])}" style="width: 100%; border-radius: 8;"/>
        {/if}
      {/each}
*/
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
      <webView src={html} />
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
