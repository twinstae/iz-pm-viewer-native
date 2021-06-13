import { derived, Readable } from "svelte/store";
import { member_name_dict, pm_list } from "../constants";
import { selected_tag_value } from "./now";

export let filtered_pm_list: Readable<MailT[]> = derived(
  [selected_tag_value],
  ([$selected_tag_value]) => {
    if ($selected_tag_value == "전체"){
      return pm_list;
    }

    const filter_by_member = (pm: MailT) => member_name_dict[pm.member] == member_name_dict[$selected_tag_value];
    return [ ...pm_list.filter(filter_by_member)]
});



