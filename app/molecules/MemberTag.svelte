<script lang="ts">
  import Tag from "../atoms/Tag.svelte";
  import { member_color_dict, member_name_dict } from '../constants.js';
  let get_member_color = (m: string) => member_color_dict[member_name_dict[m]];

  export let member: string; // member type
</script>

<Tag text={member}
  bg_color={get_member_color(member)}/>

<style>

</style>
