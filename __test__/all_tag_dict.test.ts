import {describe, expect, it} from '@jest/globals';
import {
  all_tag_dict, all_tag_list,
  init_all_tag_dict, add_tag, update_tag, delete_tag,
  ALL_TAG, BIRTHDAY_TAG, UNREAD_TAG,
  FAVORITE_TAG, MEMBER_TAG_LIST, base_tag_list
} from '../app/stores/all_tag_dict';

let $all_tag_dict = new Map();

all_tag_dict.subscribe((v)=>{
  $all_tag_dict = v;
});

let $all_tag_list = [];

all_tag_list.subscribe(v=>{
  $all_tag_list = v;
})

describe("all_tag_dict", ()=>{
  function IT_태그를_가지고_있다(tag_value: string){
    it(`${tag_value} 태그를 가지고 있다.`, ()=>{
      expect($all_tag_dict.has(tag_value)).toBeTruthy();
    })
  }

  function EXPECT_태그를_가지고_있다(tag_value){
     expect($all_tag_dict.has(tag_value)).toBeTruthy();
  }
  
  function EXPECT_태그가_없다(tag_value){
     expect($all_tag_dict.has(tag_value)).toBeFalsy();
  }

  describe("초기화했을 때", ()=>{
    MEMBER_TAG_LIST.forEach((member_tag)=>{
      IT_태그를_가지고_있다(member_tag.value)
    });

    IT_태그를_가지고_있다(UNREAD_TAG.value);
    IT_태그를_가지고_있다(BIRTHDAY_TAG.value);
    IT_태그를_가지고_있다(ALL_TAG.value);
    IT_태그를_가지고_있다(FAVORITE_TAG.value);
    //태그를_가지고_있다('이상한 태그');
  })

  const TEST_TAG = { value: "테스트", color: "white" };
  const NEW_TAG = { value: "새로운", color: "gold" };

  describe("테스트 태그를 추가하면", ()=>{
    it('테스트 태그를 가지고 있다.', ()=>{
      add_tag(TEST_TAG);
      EXPECT_태그를_가지고_있다(TEST_TAG.value);
    })
  })

  describe("테스트 태그를 새로운 태그로 수정하면", ()=>{
    it('새로운 태그를 가지고 있다.', ()=>{
      add_tag(TEST_TAG);
      const old_tag_value = TEST_TAG.value
      EXPECT_태그를_가지고_있다(old_tag_value);

      update_tag(old_tag_value, NEW_TAG);
      EXPECT_태그가_없다(old_tag_value);
      EXPECT_태그를_가지고_있다(NEW_TAG.value)

      expect(TEST_TAG.value).toBe(NEW_TAG.value);
      expect(TEST_TAG.color).toBe(NEW_TAG.color);
    })
  })

  describe("기본 태그를 수정하면", ()=>{
    base_tag_list.forEach((base_tag)=>{
      it(`${base_tag.value} 태그가 변하지 않고 그대로 있다.`, ()=>{
        EXPECT_태그를_가지고_있다(base_tag.value);

        update_tag(base_tag.value, NEW_TAG);

        EXPECT_태그를_가지고_있다(base_tag.value);
      })
    })
  })

  describe("테스트 태그를 삭제하면", ()=>{
    it('테스트 태그가 사라진다.', ()=>{
      add_tag(TEST_TAG);
      EXPECT_태그를_가지고_있다(TEST_TAG.value)

      delete_tag(TEST_TAG.value);

      EXPECT_태그가_없다(TEST_TAG.value)
    })
  })

  describe("기본 태그를 삭제하면", ()=>{
    base_tag_list.forEach((base_tag)=>{
      it(`${base_tag.value} 태그가 사라지지 않고 그대로 있다.`, ()=>{
        EXPECT_태그를_가지고_있다(base_tag.value);

        delete_tag(base_tag.value);

        EXPECT_태그를_가지고_있다(base_tag.value);
      })
    })
  })

  afterEach(() => {
    all_tag_dict.set(init_all_tag_dict());

    TEST_TAG.value = "테스트";
    TEST_TAG.color = "white" ;
  });
})

describe('all_tag_list', ()=>{
  function 태그를_가지고_있다(tag: { value: string, color: string }){
     it(`${tag.value} 태그를 가지고 있다.`, ()=>{
      expect($all_tag_list.includes(tag)).toBeTruthy();
    })   
  }

  describe("초기화했을 때", ()=>{
    base_tag_list.forEach(base_tag=>{
      태그를_가지고_있다(base_tag);
    });
  })
})
