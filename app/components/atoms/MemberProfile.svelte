<script lang="ts">
  import { get_member_name } from "~/constants";
  import { get_image_source_or_download_from_server } from '~/infra';
  import { showModal } from 'svelte-native'
  import { profile_theme } from "~/stores/preference";
  import ProfileChangeModal from "../organisms/ProfileChangeModal.svelte";

  export let member_name: string;

  $: profile_img = ((member_name == "운영팀") ? "/img/izone-pm-profile.png" : `/img/profile/${$profile_theme}/${get_member_name(member_name) || '강혜원'}.jpg`)

  $: src = get_image_source_or_download_from_server(profile_img);

  async function onLongPress(){
    const selected_theme: string = await showModal({
      page: ProfileChangeModal,
      props: { selected_theme: $profile_theme },
      fullscreen: true
    });
    profile_theme.set(selected_theme);
  }

  // `${output_path}/img/profile/${$profile_theme}/${member_name || '강혜원'}.jpg`;
</script>
<image src={src} width="50" height="50" on:longPress={onLongPress}/>
<style>
  image {
    float: left;
    border-radius: 64;
  }
</style>
