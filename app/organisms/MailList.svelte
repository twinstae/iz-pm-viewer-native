<script lang="ts">
import { WrapLayout } from '@nativescript/core';

import { navigate } from 'svelte-native';
import { Template } from 'svelte-native/components';
import { pm_list, member_color_dict, member_name_dict } from '../constants.js'
let searchQuery = "";

let show = false;

let get_member_color = (m: string) => member_color_dict[member_name_dict[m]]
</script>


<page class="page">
    <listView items={pm_list} on:itemTap="{()=>{}}">
     <Template let:item>
        <wrapLayout>
        <label text="⭐" class="Favorite"/>
        <label text={item.member} class="Tag"
               style="background-color: {get_member_color(item.member)}"/>
        <label text={item.time.slice(2)} class="datetime-tag Tag"/>
        <label text={item.subject} class="subject"/>
        <label text={item.preview} class="preview"/>
        </wrapLayout>
			</Template>
    </listView>
</page>


<style>
	page {
		background-image: linear-gradient(to bottom right,
    #f1d2e7,#f1c3aa,#e382a9, #e18784,
    #f3aa51, #fcf695, #fff,#cee5d5,
    #a7e0e1, #b7d3e9, #bbb0dc, #7592d7);
  }
		
  listView {
    height: 90%;
    margin: 8;
		background-color: white;
		border-radius: 4;
		box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  }
	
  .Tag {
    margin-right: 8;
		font-size: 10px;
		border-radius: 16px;
	}
	
	.datetime-tag {
		background-color: pink;
	}
	
	.subject {
		font-size: 14px;
		border-radius: 16px;
	}
	
	.preview {
		font-size: 10px;
	}
</style>
