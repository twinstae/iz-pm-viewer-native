import {all_tag_dict, base_tag_list, init_all_tag_dict} from "./all_tag_dict";
import { selected_tag, selected_tag_value } from "./now";
import {init_tag_to_mail_dict, tag_to_mail_dict} from "./tag_to_mail_dict";


let $all_tag_dict = new Map();
all_tag_dict.subscribe(v=>{
  $all_tag_dict = v;
})

let $selected_tag_value = "";
selected_tag_value.subscribe(v=>{
  $selected_tag_value = v;
})


export class TagAlreadyExistError extends Error {
  constructor(tag_value = '', ...params) {
    super(...params)
    this.name = 'TagAlreadyExistError'
    this.message = tag_value + " 태그가 이미 존재합니다."
  }
}

export function add_tag(new_tag: TagT){
  if ($all_tag_dict.has(new_tag.value)) throw new TagAlreadyExistError(new_tag.value);

  all_tag_dict.update(v=>{
    v.set(new_tag.value, new_tag);

    return v;
  })
}



export class BaseTagError extends Error {
  constructor(tag_value = '', ...params) {
    super(...params)
    this.name = 'TagAlreadyExistError'
    this.message = tag_value + " 기본 태그는 바꾸거나 삭제할 수 없습니다."
  }
}

function is_base_tag_value(tag_value: string): boolean {
  return base_tag_list.some((base_tag)=> base_tag.value == tag_value)
}

function check_not_base_tag(tag_value: string){
  if (is_base_tag_value(tag_value)){
    throw new BaseTagError(tag_value);
  }
}

export function update_tag(old_tag_value: string, new_tag: TagT){
  check_not_base_tag(old_tag_value);

  all_tag_dict.update(v=>{
    const old_tag = v.get(old_tag_value);

    old_tag.value = new_tag.value;
    old_tag.color = new_tag.color;

    v.delete(old_tag_value);
    v.set(new_tag.value, old_tag);
    return v;
  })
}


export function delete_tag(tag_value: string){
  check_not_base_tag(tag_value);

  if ($selected_tag_value == tag_value){
    selected_tag_value.set("전체");
  }

  const the_tag = $all_tag_dict.get(tag_value);
  tag_to_mail_dict.update(v=>{
    v.delete(the_tag);
    return v;
  })

  all_tag_dict.update(v=>{
    v.delete(tag_value);
    return v;
  })
}

export function add_tag_to_mail(pm_id: string, tag: TagT){
  if (!$all_tag_dict.has(tag.value)){
    add_tag(tag);
  }

  tag_to_mail_dict.update(v=>{
    if (!v.has(tag)){
      v.set(tag, new Set())
    }

    const mail_set = v.get(tag);
    mail_set.add(pm_id);

    return v
  })
}

export function remove_tag_from_mail(pm_id: string, tag: TagT){
  tag_to_mail_dict.update(v=>{
    if (!v.has(tag)){
      return v;
    }

    const mail_set = v.get(tag);
    mail_set.delete(pm_id);
    if (mail_set.size == 0){
      delete_tag(tag.value)
    }
    
    return v
  })
}

export function init_tags(){
  all_tag_dict.set(init_all_tag_dict())
  tag_to_mail_dict.set(init_tag_to_mail_dict());
}