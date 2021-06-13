import { writable, Writable } from "svelte/store";
import { pm_list } from "../constants";
import { all_tag_dict, base_tag_list } from "./all_tag_dict";

let $all_tag_dict = new Map();
all_tag_dict.subscribe(v=>{
  $all_tag_dict = v;
})


const create_empty_string_set: ()=>Set<string> = ()=>new Set();

export function init_tag_to_mail_dict(): Map<TagT, Set<string>> {
  const result = new Map(base_tag_list.map((tag: TagT)=>[tag, create_empty_string_set()]));

  pm_list.forEach(pm=>{
    const member_tag = $all_tag_dict.get(pm.member);
    if (!member_tag) throw pm.member + "태그가 없어요!";

    const member_mail_set = result.get(member_tag);
    member_mail_set.add(pm.id)
  })

  return result;
}

export let tag_to_mail_dict: Writable<Map<TagT, Set<string>>> = writable(init_tag_to_mail_dict());

