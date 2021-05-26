<script lang="ts">
import { selected_tag_value } from "~/stores/now";

  export let text: string;
  export let bg_color: string;

</script>

<label class="Tag"
       text={text}
       style="background-color: {bg_color};"
       on:tap={(e=>selected_tag_value.set(text))}/>

<style>

  label.Tag {
    margin: 2;
		font-size: 10px;
    border-radius: 16px;
    padding: 4;
	}
	
</style>
