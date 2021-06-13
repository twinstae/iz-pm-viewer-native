import { describe, expect, it } from '@jest/globals';
import { all_tag_dict, init_all_tag_dict, MEMBER_TAG_LIST } from '../app/stores/all_tag_dict';
import { tag_to_mail_dict, init_tag_to_mail_dict } from "../app/stores/tag_to_mail_dict";
import { add_tag_to_mail, delete_tag, update_tag } from "../app/stores/tag_controller";
import { pm_list } from "../app/stores/mail_list";

let $all_tag_dict = new Map();
all_tag_dict.subscribe(v=>{
  $all_tag_dict = v;
})

let $tag_to_mail_dict = new Map();

tag_to_mail_dict.subscribe(v=>{
  $tag_to_mail_dict = v;
})


describe('tag_to_mail_dict', ()=>{
  describe('초기화했을 때', ()=>{
    MEMBER_TAG_LIST.forEach(member_tag=>{
      const member_name = member_tag.value;
      it(`${member_name} 태그의 mail_set에는 모든 ${member_name}의 메일이 있다.`, ()=>{
        const member_mail_set = $tag_to_mail_dict.get(member_tag);

        expect(pm_list
          .filter(pm=> pm.member == member_tag.value)
          .every(pm=>member_mail_set.has(pm.id))
        ).toBeTruthy();
      });
    })
  })

  const TEST_TAG = { value: "테스트", color: "blue" };
  const NEW_TAG = { value: "새로운", color: "yellow" };
  const first_mail_id = pm_list[0].id;

  describe('테스트 태그를 첫 메일에 추가했을 때', ()=>{
    it('테스트 태그의 mail_set에는 첫 메일의 id가 있다.', ()=>{
      expect($tag_to_mail_dict.has(TEST_TAG)).toBeFalsy();

      add_tag_to_mail(first_mail_id, TEST_TAG);

      const test_tag_mail_set: Set<string> = $tag_to_mail_dict.get(TEST_TAG);
      expect(test_tag_mail_set.has(first_mail_id))
    })
  })

  describe('테스트 태그를 새로운 태그로 수정했을 때', ()=>{
    it('새로운 태그 mail_set에는 원래 있던 메일이 모두 있다.', ()=>{
      add_tag_to_mail(first_mail_id, TEST_TAG);
      expect($tag_to_mail_dict.get(TEST_TAG).has(first_mail_id));

      update_tag(TEST_TAG.value, NEW_TAG);

      const new_test_tag = $all_tag_dict.get(NEW_TAG.value)
      expect(new_test_tag).toBe(TEST_TAG);
      expect($tag_to_mail_dict.get(new_test_tag).has(first_mail_id))
    })
  })

  describe('태그를 삭제했을 때', ()=>{
    it('태그 mail_set도 같이 사라진다.', ()=>{
      add_tag_to_mail(first_mail_id, TEST_TAG);
      expect($tag_to_mail_dict.get(TEST_TAG).has(first_mail_id));

      delete_tag(TEST_TAG.value);

      expect($tag_to_mail_dict.has(TEST_TAG)).toBeFalsy();
    })
  })

  afterEach(()=>{
    TEST_TAG.value = "테스트";
    TEST_TAG.color = "blue";
    all_tag_dict.set(init_all_tag_dict())
    tag_to_mail_dict.set(init_tag_to_mail_dict());
  })
})
