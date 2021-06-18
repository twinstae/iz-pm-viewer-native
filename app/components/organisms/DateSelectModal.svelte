<script lang="ts">
    import { closeModal } from 'svelte-native'

    export let selected_date: Date;

    function onTap(){
        closeModal(selected_date);
    }

    function onDateChange(e){
        selected_date = e.value
    }
</script>
<stackLayout>
    <datePicker on:dateChange={onDateChange} date={selected_date}/>
    <button text="날짜로 이동" on:tap={onTap}/>
</stackLayout>
