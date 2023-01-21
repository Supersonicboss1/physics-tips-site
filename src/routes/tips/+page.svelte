<script lang="ts">
    import MathParser from "$lib/mathParser.svelte";
    import Tag from "$lib/tag.svelte";
    import tags from "$lib/tags.json";
    import { beforeUpdate } from "svelte";
    import { fly } from "svelte/transition";
    import data from "./data.json";
    let showFilter = false;
    let hasLoaded: boolean = false;
    let filteredTags: any = [];
    let iterableData: any = data;
    beforeUpdate(() => {
        if (hasLoaded) {
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
            return data;
        } else {
            return newData;
        }
    }
</script>

<div>
    <button class={`rounded-md bg-gray-800 m-5 p-2 mb-1 ${showFilter ? 'ring-cyan-500 ring-2 drop-shadow-xl' : ''}`} on:click={() => {showFilter = !showFilter}}>
        <b>Filter by Tag<b/>
    </button>
    {#if showFilter}
    <div class="bg-gray-800 max-w-max mx-4 rounded-md" transition:fly>
    {#each tags as tag}
        <div class="flex flex-wrap">
            <Tag tag={tag.name}>
                <input
                    type="checkbox"
                    class="mx-2"
                    bind:group={filteredTags}
                    value={tag.name}
                    on:change={() => (iterableData = changeIterableData())} />
            </Tag>
        </div>
    {/each}
</div>
    {/if}
</div>
{#if iterableData.length > 0}
    {#each iterableData as tip}
        <div class="p-5 m-7 bg-gray-800 inline-flex">
            <h2 class="text-3xl">
                <MathParser string={tip.tip} /></h2>
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
