<script lang="ts">
    import Tag from "$lib/tag.svelte";
    import MathParser from "./mathParser.svelte";

    type Data = {
        title: string;
        author?: string;
        tags: string[];
        link?: string;
    };
    export let data: Data;
</script>

{#if data.link === undefined}
    <div class="p-5 m-7 bg-gray-800 block">
        <h2 class="text-3xl">
            {#key data}
                <MathParser string={data.title} />
            {/key}
        </h2>
        {#each data.tags as tag}
            <Tag {tag} />
        {/each}
    </div>
{:else}
    <div
        class="p-5 m-7 bg-gray-800 flex-wrap hover:border-gray-600 max-w-fit rounded-md card">
        <h2 class="text-3xl flex">
            <a
                href={data.link}
                target="_blank"
                rel="noreferrer"
                class="hover:bg-gray-900 rounded-3xl p-2 transition-all hover:translate-y-[-0.25rem] hover:shadow-2xl hover:shadow-blue-800">
                {data.title}

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 inline"
                    viewBox="0 0 24 24"
                    ><path
                        fill="currentColor"
                        d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794l-1.414-1.414L17.585 5H13V3h8z" /></svg>
            </a>
        </h2>

        <h3 class="text-xl text-gray-400 m-3 my-1">
            {data.author}
        </h3>
        <div class="">
            {#each data.tags as tag}
                <Tag {tag} />
            {/each}
        </div>
    </div>
{/if}
