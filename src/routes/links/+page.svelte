<script lang="ts">
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
            iterableData = iterableData;
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
    <button
        class={`rounded-md bg-gray-800 m-5 p-2 mb-1 ${
            showFilter ? "ring-cyan-500 ring-2 drop-shadow-xl" : ""
        }`}
        on:click={() => {
            showFilter = !showFilter;
        }}>
        <b> Filter by Tag<b /> </b></button>
    {#if showFilter}
        <div class="bg-gray-800 max-w-max mx-4 rounded-md" transition:slide>
            {#each tags as tag}
                <div class="flex flex-wrap">
                    <Tag tag={tag.name}>
                        <input
                            type="checkbox"
                            class="mx-2 accent-lime-500"
                            bind:group={filteredTags}
                            value={tag.name}
                            on:change={() => changeIterableData()} />
                    </Tag>
                </div>
            {/each}
        </div>
    {/if}
</div>
{#if iterableData.length > 0}
    {#each iterableData as link}
        <div class="p-5 m-7 bg-gray-800 block flex-wrap">
            <h2 class="text-3xl">
                {link.title}
            </h2>
            <h3 class="text-xl text-gray-400 ">
                {link.author}
            </h3>
            <button class="rounded-md bg-gray-900 p-2 mt-6 float-right">
                <a href={link.link} target="_blank" rel="noreferrer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        ><path
                            fill="currentColor"
                            d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794l-1.414-1.414L17.585 5H13V3h8z" /></svg>
                </a>
            </button>
            <div class="">
                {#each link.tags as tag}
                    <Tag {tag} />
                {/each}
            </div>
        </div>
    {/each}
{:else}
    <div class="p-5 m-7 bg-gray-800 inline-flex">
        <h2 class="text-3xl">No results!</h2>
    </div>
{/if}
