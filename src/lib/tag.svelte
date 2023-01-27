<script lang="ts">
    import tags from "$lib/tags.json";
    import { beforeUpdate } from "svelte";
    let tagColor: string = "white";
    export let tag: string;
    // on first load, set the tag color by matching the tags in the json file
    beforeUpdate(() => {
        tags.forEach((t: any) => {
            if (t.name === tag) {
                tagColor = t.color;
            }
        });
    });
</script>

<div>
    <p
        class="border-2 rounded-xl px-1 m-2 max-w-max"
        style={`background-color: ${tagColor + "30"};
         color: ${tagColor};
         border-color: ${tagColor};`}>
        {tag}
        <slot />
    </p>
</div>
