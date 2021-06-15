<script lang="ts">
  import Tag from "~/components/atoms/Tag.svelte";
  import { all_tag_dict } from "~/stores/all_tag_dict";

  export let member: Member; // member type

  $: member_color = $all_tag_dict.get(member).color;
</script>

<Tag text={member}
  bg_color={member_color}/>

<style>

</style>
