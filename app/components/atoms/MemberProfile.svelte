<script lang="ts">
  import { SERVER_ROOT, get_member_name } from "~/constants";
  import fs from '~/infra/fs';
  export let member_name: string;

  const profile_theme = "latest";
  $: profile_img = ((member_name == "운영팀") ? "/img/izone-pm-profile.png" : `/img/profile/${profile_theme}/${get_member_name(member_name) || '강혜원'}.jpg`)

  $: fs_src = fs.output_path + profile_img;
  $: server_src = SERVER_ROOT + profile_img;

  $: src = fs_src; //fs.file_exists(fs_src) ? fs_src : server_src;
  // `${output_path}/img/profile/${profile_theme}/${member_name || '강혜원'}.jpg`;
</script>
<image src={fs_src} width="50" height="50" />
<style>
  image {
    float: left;
    border-radius: 64;
  }
</style>
