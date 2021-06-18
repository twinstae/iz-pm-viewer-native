import {describe, it, expect, afterEach} from '@jest/globals';
import { pm_list } from '~/stores/mail_list';
import { selected_tag_value } from '~/stores/now';
import { filtered_pm_list, search_query } from "~/stores/search";
import { add_tag_to_mail, init_tags, remove_tag_from_mail } from '~/stores/tag_controller';

let $pm_id_set = new Set();
pm_list.subscribe(v=>{
    $pm_id_set = new Set(v.map(pm => pm.id));
})

let $filtered_pm_id_set = new Set();

filtered_pm_list.subscribe(v=>{
  $filtered_pm_id_set = new Set(v.map(pm => pm.id));
})

describe("검색하지 않으면", ()=>{
    it('모든 메일이 통과한다.', ()=>{        
        expect($pm_id_set.size).toBe($filtered_pm_id_set.size)
    })
})

function 결과는(expected_id_list: string[]){
    const expected_set = new Set(expected_id_list)
    expect($filtered_pm_id_set).toEqual(expected_set);
}

function 검색하면(query: string){
    return {
        결과는: (expected_id_list: string[]) => {
            describe(`"${query}" 를 검색하면`, ()=>{
                it(`${expected_id_list} 이 나온다.`, ()=>{
                    search_query.set(query);
                    결과는(expected_id_list);
                })
            })
        }
    };
}

검색하면("사실 이거 오늘 아니구").결과는(["t0011"])
검색하면("모해율").결과는(["t0010"])
검색하면("김치찌개").결과는(["t0006", "t0002"])
검색하면("귀엽다공").결과는(["t0001"])
검색하면("벌써 저녁임?").결과는(["t0003"])
검색하면("나타나주세용").결과는(["t0005"])
검색하면("今日は何するの").결과는(["t0008"])
검색하면("🍓").결과는(["t0009"])
검색하면("오늘도 힘내☺️").결과는(["t0012"])


const TEST_TAG = { value: "테스트", color: "blue" };

describe('테스트 태그를 t0012 메일 에 추가했을 때', ()=>{
    it('리스트에는 t0012 만 있다.', ()=>{
        expect($filtered_pm_id_set).toEqual($pm_id_set);

        add_tag_to_mail("t0012", TEST_TAG);
        selected_tag_value.set(TEST_TAG.value);
        결과는(["t0012"]);
    })
})

describe('테스트 태그를 t0011, t0012 메일 에 추가했을 때', ()=>{
    it('리스트에는 t0011, t0012 만 있다.', ()=>{
        add_tag_to_mail("t0012", TEST_TAG);
        add_tag_to_mail("t0011", TEST_TAG);
        결과는(["t0011", "t0012"]);
    })
})

describe('테스트 태그를 t0011, t0012 메일 에서 삭제했을 때', ()=>{
    it('리스트는 전체 로 돌아간다.', ()=>{
        add_tag_to_mail("t0012", TEST_TAG);
        add_tag_to_mail("t0011", TEST_TAG);
        결과는(["t0011", "t0012"]);
        
        remove_tag_from_mail("t0011", TEST_TAG);
        결과는(["t0012"]);

        remove_tag_from_mail("t0012", TEST_TAG);
        expect($filtered_pm_id_set).toEqual($pm_id_set);
    })
})

afterEach(()=>{
    search_query.set("")
    init_tags()
})
