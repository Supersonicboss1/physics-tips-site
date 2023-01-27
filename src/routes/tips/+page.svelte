<script lang="ts">
    import MathParser from "$lib/mathParser.svelte";
    import Tag from "$lib/tag.svelte";
    import tags from "$lib/tags.json";
    import { beforeUpdate } from "svelte";
    import { slide } from "svelte/transition";
    import data from "./data.json";
    let showFilter = false;
    let hasLoaded: boolean = false;
    let filteredTags: any = [];
    let iterableData: any = data;
    beforeUpdate(() => {
        if (hasLoaded) {
            iterableData = iterableData
            return;
        }
        iterableData = data;
        hasLoaded = true;
    });
    function changeIterableData() {
        //function to filter iterable data and remove tips that don't have the selected tags
        let newData: any = [];
        data.forEach((tip) => {
            let hasAllTags = true;
            filteredTags.forEach((tag: any) => {
                if (!tip.tags.some((x) => x === tag)) {
                    hasAllTags = false;
                }
            });
            if (hasAllTags) {
                newData.push(tip);
            }
        });
        if (filteredTags.length === 0) {
            if (iterableData == data) {
                return;
            }
            iterableData = data;
        } else {
            if (iterableData == newData) {
                return;
            }
            iterableData = newData;
        }
    }
</script>

<div>
    <button class={`rounded-md bg-gray-800 m-5 p-2 mb-1 ${showFilter ? 'ring-cyan-500 ring-2 drop-shadow-xl' : ''}`} on:click={() => {showFilter = !showFilter}}>
        <b> Filter by Tag<b/>
    </button>

</div>
{#if iterableData.length > 0}
    {#each iterableData as tip}
        <div class="p-5 m-7 bg-gray-800 block">
            <h2 class="text-3xl">
                {#key iterableData}
                <MathParser string={tip.tip} />
            {/key}
        </h2>
            {#each tip.tags as tag}
                <Tag {tag} />
            {/each}
        </div>
    {/each}
{:else}
    <div class="p-5 m-7 bg-gray-800 inline-flex">
        <h2 class="text-3xl">No results!</h2>
    </div>
{/if}
{#if showFilter}
<div class="bg-gray-800 max-w-max mx-4 rounded-md" transition:slide>
{#each tags as tag}
    <div class="block">
        <Tag tag={tag.name}>
            <input
                type="checkbox"
                class="mx-2 accent-lime-500"
                bind:group={filteredTags}
                value={tag.name}
                on:change={() => (changeIterableData())} />
        </Tag>
    </div>
{/each}
</div>
{/if}