<script lang="ts">
  import { test_member_profile } from "../constants";

  export let member_name: string;
  
</script>

<image src={test_member_profile[member_name]}
       width="50" height="50" />

<style>
  image {
    float: left;
    border-radius: 64;
  }
</style>
