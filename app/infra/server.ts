import { get_member_name, SERVER_ROOT } from '../constants';

async function get_json(path: string){
  return await fetch(SERVER_ROOT + path)
    .then(res=>res.json())
}

async function get_pm_list(): Promise<MailT[]>{
  const result: MailT[] = await get_json("/pm_list.json");
  const mail_body_dict = await get_json("/mail_body_dict.json");

  return result.map(pm=>({
    ...pm,
    member: get_member_name(pm.member),
    body: mail_body_dict[pm.id].body,
    images: mail_body_dict[pm.id].images
  }));
}

export default {
  get_json,
  get_pm_list
}
