
import { selected_tag_value } from "./now";
import { MEMBER_LIST, member_name_dict } from "../constants";
import { derived, Readable, writable } from "svelte/store";
import { pm_list } from "./mail_list";
import { Document } from "flexsearch";
import { ALL_TAG, all_tag_dict, BIRTHDAY_TAG } from "./all_tag_dict";
import { tag_to_mail_dict } from "./tag_to_mail_dict";

type MailFilter = (pm: MailT)=>boolean

const id_map = new Map()

let search_index = derived(
    [pm_list],
    ([$pm_list])=>{
        const index = Document({
            document: {
                id: "search_index",
                index: ["id", "subject", "body"]
            },
            encode: str => str.replace(/[\x00-\x7F]/g, "").split("")
        });

        return $pm_list.reduce((acc, pm, i)=>{
            id_map.set(i, pm.id);

            acc.add({
                ...pm,
                search_index: i,
                body: pm.body.replace(/<[^>]>/g, "")
            });
            return acc
        }, index);
    }
)

export let search_query = writable("");

let by_search: Readable<MailFilter> = derived(
    [search_index, search_query],
    ([$search_index, $search_query]) => {
        if ($search_query == ""){
            return (_: MailT) => true
        }

        const result_list = $search_index.search($search_query);

        const search_pm_id_set = new Set(
            result_list.map(({ result }) => result).flat()
            .map(search_index => id_map.get(search_index))
        );

        return (pm: MailT) => search_pm_id_set.has(pm.id);
    }
)

const by_birthday = pm=> pm.id.startsWith("b");

const by_member = (selected_member: string) => (pm: MailT) => pm.member == selected_member;

let by_tag: Readable<MailFilter> = derived(
  [selected_tag_value, all_tag_dict, tag_to_mail_dict],
  ([$selected_tag_value, $all_tag_dict, $tag_to_mail_dict]) => {
    if ($selected_tag_value == ALL_TAG.value){
      return (_: MailT) => true;
    }

    if (MEMBER_LIST.some(member => $selected_tag_value == member)){
      return by_member($selected_tag_value);
    }
    
    if ($selected_tag_value == BIRTHDAY_TAG.value){
      return by_birthday;
    }

    const selected_tag = $all_tag_dict.get($selected_tag_value);
    const mail_set = $tag_to_mail_dict.get(selected_tag) || new Set();

    return (pm: MailT) => mail_set.has(pm.id);
});

export let filtered_pm_list: Readable<MailT[]> = derived(
    [pm_list, by_search, by_tag],
    ([$pm_list, $_by_search, $_by_tag]) => {
        return $pm_list.filter(pm=> $_by_search(pm) && $_by_tag(pm))
    }
)