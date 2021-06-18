
<script lang="ts">
    import { MEMBER_LIST } from '~/constants';
    import ProfilePreview from '../atoms/ProfilePreview.svelte';

    export let item;
    export let selected = false;
    export let onItemTap;

    const IZONE_LIST = MEMBER_LIST.slice(0, MEMBER_LIST.length-1);

    $: style = selected ? "background-color: pink;" : "background-color: white;";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<stackLayout id="ProfilePreviewRow" style={style} on:tap={onItemTap}>
    <label text={item.name} />
    <stackLayout orientation="horizontal">
        {#each IZONE_LIST as member_name}
            <ProfilePreview member_name={member_name} theme={item.path}/>
        {/each}
    </stackLayout>
</stackLayout>

<style>
    stackLayout#ProfilePreviewRow {
        padding: 4;        
    }    
</style>