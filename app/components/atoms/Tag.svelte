<script lang="ts">
import { selected_tag_value } from "~/stores/now";

  export let text: string;
  export let bg_color: string;
</script>

<label class="Tag"
       class:rainbow={bg_color == "rainbow"}
       style="background-color: {bg_color == 'rainbow' ? 'white' : bg_color}"
       text={text}
       on:tap={(e=>selected_tag_value.set(text))}/>

<style>

  label.Tag {
    margin: 2;
		font-size: 10px;
    border-radius: 8px;
    padding: 4;
	}

  label.Tag.rainbow {
    background-image: linear-gradient(
      to right,
      #f1d2e7,#f1c3aa,#e382a9, #e18784,
      #f3aa51, #fcf695, #fff,#cee5d5,
      #a7e0e1, #b7d3e9, #bbb0dc, #7592d7);
  }
</style>
