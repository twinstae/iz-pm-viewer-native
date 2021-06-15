<script lang="ts">
  import Tag from "~/components/atoms/Tag.svelte";
  import MemberProfile from "~/components/atoms/MemberProfile.svelte";
  import MemberTag from "~/components/molecules/MemberTag.svelte";

  export let pm: MailT;

</script>

<stackLayout orientation="horizontal">
  <MemberProfile member_name={pm.member} />
  <stackLayout>
  <wrapLayout>
      <image src="https://github.com/twinstae/izone-pm-viewer/raw/main/dist/img/yellow-star.png"
        width="20" height="20" />
      <MemberTag member={pm.member} />
      <Tag text={pm.time.slice(2)} bg_color="pink"/>
    </wrapLayout>
    <label>
      <formattedString>
        <span text="{pm.subject} " fontWeight="bold" style="font-size: 16;"/>
        <span text=" "/>
        <span text=" {pm.preview}" style="color: darkgray; font-size: 12;"/>
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
