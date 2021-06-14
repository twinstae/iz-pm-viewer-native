import { writable, Writable, derived, Readable } from "svelte/store";
import { selected_tag_value } from "./now";
import { member_name_dict, test_pm_list } from "../constants";
// import { get_json } from '../fs';
//import { get_member_name, member_name_dict, test_pm_list } from "../constants";

function get_pm_list(){
  return test_pm_list;
/*
  const raw_pm_list = get_json("/pm_list.json");
  const mail_body_dict = get_json("/mail_body_dict.json");

  return raw_pm_list.map((pm: MailT)=> ({
    ...pm,
    member: get_member_name(pm.member),
    body: mail_body_dict[pm.id].body,
    images: mail_body_dict[pm.id].images
  }))
*/
}

export const pm_list: Writable<MailT[]> = writable(get_pm_list());

export let filtered_pm_list: Readable<MailT[]> = derived(
  [selected_tag_value, pm_list],
  ([$selected_tag_value, $pm_list]) => {
    if ($selected_tag_value == "전체"){
      return $pm_list;
    }

    const filter_by_member = (pm: MailT) => member_name_dict[pm.member] == member_name_dict[$selected_tag_value];
    return [ ...$pm_list.filter(filter_by_member)]
});
