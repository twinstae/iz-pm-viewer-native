import {describe, expect, it} from '@jest/globals'

import { MEMBER_TAG_LIST } from "../../app/stores/all_tag_dict";
import { pm_list, filtered_pm_list } from "../../app/stores/mail_list";
import { selected_tag_value } from "../../app/stores/now";


let $pm_list = [];
pm_list.subscribe(v=>{
  $pm_list = v;
})


let $filtered_pm_list = [];

filtered_pm_list.subscribe(v=>{
  $filtered_pm_list = v;
})


describe("filtered_pm_list", ()=>{
  describe("전체 태그를 선택했을 때", ()=>{
    it('메일 리스트의 길이는 원래 길이와 같다', () => {
      selected_tag_value.set("전체");
      expect($filtered_pm_list.length).toBe($pm_list.length);
    })
  })

  describe("멤버 태그를 선택하면, 리스트에는 그 멤버만 있다.", ()=>{
    MEMBER_TAG_LIST.forEach((member_tag)=>{
      const member = member_tag.value;
      it(`${member}만 있다.`, ()=>{
        selected_tag_value.set(member);
        expect($filtered_pm_list.every(pm=> pm.member == member)).toBe(true)
      })
    })
  })
})

