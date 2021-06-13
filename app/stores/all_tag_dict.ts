import { writable, Writable, derived, Readable } from "svelte/store";

export const MEMBER_TAG_LIST: TagT[] = [
    {"value":"권은비","color":"#bbb0dc"},
    {"value":"미야와키 사쿠라","color":"#f1d2e7"},
    {"value":"강혜원","color":"#db706c"},
    {"value":"최예나","color":"#fcf695"},
    {"value":"이채연","color":"#a7e0e1"},
    {"value":"김채원","color":"#cee5d5"},
    {"value":"야부키 나코","color":"#b7d3e9"},
    {"value":"혼다 히토미","color":"#f1c3aa"},
    {"value":"김민주","color":"#fff"},
    {"value":"조유리","color":"#f3aa51"},
    {"value":"안유진","color":"#567ace"},
    {"value":"장원영","color":"#d9598c"},
    {"value":"운영팀","color":"gray"}
];

export const ALL_TAG: TagT = { value: "전체", color: "rainbow"};
export const BIRTHDAY_TAG: TagT = { value: "생일", color: "rainbow"};
export const FAVORITE_TAG: TagT = { value: "💖", color: "yellow"};
export const UNREAD_TAG: TagT = { value: "읽지않음", color: "pink"};

export const base_tag_list: TagT[] = [ ALL_TAG,...MEMBER_TAG_LIST, FAVORITE_TAG, UNREAD_TAG, BIRTHDAY_TAG];

export function init_all_tag_dict(){
  return new Map(base_tag_list.map(v=>[v.value, v]))
}

export const all_tag_dict: Writable<Map<string, TagT>> = writable(init_all_tag_dict())

export let all_tag_list: Readable<TagT[]> = derived(
  [all_tag_dict],
  ([$all_tag_dict]) => [...$all_tag_dict.values()]
)
