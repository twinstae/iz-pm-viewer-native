<script lang="ts">
  import { test_member_profile, SERVER_ROOT } from "../constants";

  export let member_name: string;

  const profile_theme = "latest";
  $: profile_img = `/img/profile/${profile_theme}/${member_name || '강혜원'}.jpg`

  $: src = SERVER_ROOT + profile_img;

  // test_member_profile[member_name];
  // `${output_path}/img/profile/${profile_theme}/${member_name || '강혜원'}.jpg`;
</script>
<image src={src}
       width="50" height="50" />

<style>
  image {
    float: left;
    border-radius: 64;
  }
</style>
