<script lang="ts">
import { navigate } from 'svelte-native';
import { Template } from 'svelte-native/components';
import { member_name_dict, n_to_member, pm_list } from '../constants.js';
import Tag from "../atoms/Tag.svelte";
import MemberTag from "../molecules/MemberTag.svelte";
import MailDetail from "./MailDetail.svelte";
import { all_tag_dict, UNREAD_TAG } from '../stores/all_tag_dict';
import { tag_to_mail_dict } from "../stores/tag_to_mail_dict";
import { selected_tag_value } from "../stores/now";

const go_to_detail = (e) =>{
  const pm = pm_list[e.index];
  navigate({ page: MailDetail, props: { pm } })
}

const get_member_name = (nick: string) => n_to_member[member_name_dict[nick]];
$: all_tag_list = [...$all_tag_dict].map(e=>e[1])

$: filtered_pm_list = pm_list.filter(pm=> member_name_dict[pm.member] == member_name_dict[$selected_tag_value]);

$: selected_tag = $all_tag_dict.get($selected_tag_value) || UNREAD_TAG;
$: selected_tag_color = selected_tag.color;
</script>

<page class="page">
<stackLayout id="ListStack">
  <wrapLayout id="AllTagList">
    <Tag text="{selected_tag.value}" bg_color="{selected_tag_color}" />
    {#each all_tag_list as tag}
      <Tag text={tag.value} bg_color={tag.color} />
    {/each}
  </wrapLayout>
    <listView items={filtered_pm_list} on:itemTap={go_to_detail}>
      <Template let:item>
        <stackLayout orientation="horizontal">
        <image src="https://github.com/twinstae/izone-pm-viewer/raw/main/dist/img/profile/latest/{get_member_name(item.member)}.jpg"
                 width="50" height="50" />
          <stackLayout>
          <wrapLayout>
              <image src="https://github.com/twinstae/izone-pm-viewer/raw/main/dist/img/yellow-star.png"
                width="20" height="20" />
              <MemberTag member={item.member} />
              <Tag text={item.time.slice(2)} bg_color="pink"/>
            </wrapLayout>
            <label>
              <formattedString>
                <span text="{item.subject} " fontWeight="bold" style="font-size: 16;"/>
                <span text=" "/>
                <span text=" {item.preview}" style="color: darkgray; font-size: 12;"/>
              </formattedString>
            </label>
          </stackLayout>
        </stackLayout>
       </Template>
    </listView>
  </stackLayout>
</page>


<style>
  stackLayout#ListStack {
    margin: 8;
    border-radius: 16;
    background-color: white;
  }

  image {
    border-radius: 64;
  }

  stackLayout {
    padding: 0;
  }

  label {
    margin: 0;
  }

  wrapLayout {
    margin: 0;
    padding: 0;
  }

  wrapLayout#AllTagList {
    padding: 8;
  }

	page {
		background-image: linear-gradient(to bottom right,
    #f1d2e7,#f1c3aa,#e382a9, #e18784,
    #f3aa51, #fcf695, #fff,#cee5d5,
    #a7e0e1, #b7d3e9, #bbb0dc, #7592d7);
  }

		
  listView {
    height: 90%;
  }
</style>
