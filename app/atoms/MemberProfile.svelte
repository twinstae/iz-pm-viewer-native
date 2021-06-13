<script lang="ts">
  import { output_path } from "../constants";

  export let member_name: string;

  const profile_theme = "latest"
  
</script>
<image src="{output_path}/img/profile/{profile_theme}/{member_name || '강혜원'}.jpg"
       width="50" height="50" />

<style>
  image {
    float: left;
    border-radius: 64;
  }
</style>
