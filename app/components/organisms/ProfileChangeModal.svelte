<script lang="ts">
    import { onMount } from 'svelte';
    import { closeModal } from 'svelte-native'
    import { profile_list } from '~/constants';
    import ProfilePreviewRow from '../molecules/ProfilePreviewRow.svelte';

    export let selected_theme;

    function onSelectButtonTap(){
        closeModal(selected_theme);
    }

    let selected_index = 0;

    function select_index(i){
        selected_index = i
        selected_theme = profile_list[i].path
    }
    
    onMount(()=>{
        selected_index = profile_list.findIndex(v => v.path == selected_theme);
    })

</script>

<stackLayout style="padding: 4;">
    <scrollView>
        <stackLayout>
            {#each profile_list as item, i}
                <ProfilePreviewRow item={item} selected={i == selected_index} onItemTap={()=>select_index(i)}/>
            {/each}
        </stackLayout>
    </scrollView>
    <button text="이걸로 선택!" on:tap={onSelectButtonTap}/>
</stackLayout>


<style>
  scrollView {
    height: 90%;
    width: 100%;
  }
</style>