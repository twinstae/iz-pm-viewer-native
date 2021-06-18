<script lang="ts">
    export let text;
    export let onTap;

</script>

<button text={text} on:tap={onTap} />

<style>
    button {
        color: black;
        background-color: pink;
        margin: 2;
		font-size: 14;
        border-radius: 8;
        height: 28;
    }
</style>