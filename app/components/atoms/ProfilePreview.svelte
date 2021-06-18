<script lang="ts">
    import { get_member_name } from "~/constants";
    import { get_image_source_or_download_from_server } from '~/infra';
  
    export let member_name: string;
    export let theme: string;
  
    $: profile_img = ((member_name == "운영팀") ? "/img/izone-pm-profile.png" : `/img/profile/${theme}/${get_member_name(member_name) || '강혜원'}.jpg`)
  
    $: src = get_image_source_or_download_from_server(profile_img);
 
</script>
<image src={src} width="32" height="32" />
<style>
  image {
    border-radius: 32;
  }
</style>
  