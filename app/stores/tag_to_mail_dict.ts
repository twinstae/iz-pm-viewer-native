import { writable, Writable } from "svelte/store";
import { base_tag_list } from "./all_tag_dict";

const create_empty_string_set: ()=>Set<string> = ()=>new Set();

function init_tag_to_mail_dict(): Map<TagT, Set<string>> {
  return new Map(base_tag_list.map((tag: TagT)=>[tag, create_empty_string_set()]));
}

export let tag_to_mail_dict: Writable<Map<TagT, Set<string>>> = writable(init_tag_to_mail_dict());


