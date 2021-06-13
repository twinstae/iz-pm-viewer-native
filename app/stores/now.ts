import { writable, Writable, derived, Readable } from "svelte/store";
import {ALL_TAG, all_tag_dict} from "./all_tag_dict";

export const selected_tag_value: Writable<string> = writable("전체");

export let selected_tag: Readable<TagT> = derived(
  [all_tag_dict, selected_tag_value],
  ([$all_tag_dict, $selected_tag_value]) => $all_tag_dict.get($selected_tag_value) || ALL_TAG
)
