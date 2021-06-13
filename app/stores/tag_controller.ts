import {all_tag_dict, base_tag_list} from "./all_tag_dict";
import {tag_to_mail_dict} from "./tag_to_mail_dict";


let $all_tag_dict = new Map();
all_tag_dict.subscribe(v=>{
  $all_tag_dict = v;
})


let $tag_to_mail_dict = new Map();
tag_to_mail_dict.subscribe(v=>{
  $tag_to_mail_dict = v;
})

const TagAlreadyExistError = (tag_value: string) => {
  const e = new Error(tag_value + " 태그가 이미 존재합니다.");
  e.name = "TagAlreadyExistError";
  return e;
}

export function add_tag(new_tag: TagT){
  if ($all_tag_dict.has(new_tag.value)) throw TagAlreadyExistError(new_tag.value);

  all_tag_dict.update(v=>{
    v.set(new_tag.value, new_tag);

    return v;
  })
}

const BaseTagError = (tag_value: string) => {
  const e = new Error(`${tag_value} 기본 태그는 바꾸거나 삭제할 수 없습니다..`);
  e.name = "BaseTagError";
  return e;
}

function is_base_tag_value(tag_value: string): boolean {
  return base_tag_list.some((base_tag)=> base_tag.value == tag_value)
}

function check_not_base_tag(tag_value: string){
  if (is_base_tag_value(tag_value)) throw BaseTagError(tag_value);
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
