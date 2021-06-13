<script lang="ts">
  import Tag from "../atoms/Tag.svelte";
  import MemberProfile from "../atoms/MemberProfile.svelte";
  import MemberTag from "../molecules/MemberTag.svelte";

  export let item: MailT;

</script>

<stackLayout orientation="horizontal">
  <MemberProfile member_name={item.member} />
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

<style>
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
</style>
