<script lang="ts">
import Tag from "~/components/atoms/Tag.svelte";
import { all_tag_list } from '~/stores/all_tag_dict';
import { selected_tag } from '~/stores/now';

</script>

<wrapLayout id="AllTagList">
  <Tag text="{$selected_tag.value}" bg_color="{$selected_tag.color}" />
  {#each $all_tag_list as tag}
    <Tag text={tag.value} bg_color={tag.color} />
  {/each}
</wrapLayout>

<style>
  wrapLayout#AllTagList {
    padding: 8;
  }
</style>
