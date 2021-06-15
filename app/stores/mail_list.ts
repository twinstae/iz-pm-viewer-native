import { writable, Writable, derived, Readable } from "svelte/store";
import { selected_tag_value } from "./now";
import { MEMBER_LIST, member_name_dict, test_pm_list } from "../constants";

export let pm_list: Writable<MailT[]> = writable(test_pm_list);

export let filtered_pm_list: Readable<MailT[]> = derived(
  [selected_tag_value, pm_list],
  ([$selected_tag_value, $pm_list]) => {
    if ($selected_tag_value == "전체"){
      return $pm_list;
    }

    if (MEMBER_LIST.some(member => $selected_tag_value == member)){
      const filter_by_member = (pm: MailT) => member_name_dict[pm.member] == member_name_dict[$selected_tag_value];
      return $pm_list.filter(filter_by_member);
    }

    if ($selected_tag_value == "생일"){
      return $pm_list.filter(pm=> pm.id.startsWith("b"));
    }

    return $pm_list;
});
