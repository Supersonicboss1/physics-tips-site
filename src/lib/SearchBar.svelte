<script lang="ts">
    import { draw } from "svelte/transition";
    let searchQuery: string = ""; //search query
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    let searchBarFocused: boolean = false;
</script>

<form on:focusin={() => searchBarFocused = true} on:focusout={() => searchBarFocused = false}>
    <div class="relative mx-5 my-1 inline-flex">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-all">
            <svg
                aria-hidden="true"
                class={` transition-all w-5 h-5 ${searchBarFocused ? 'text-indigo-500' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    in:draw
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input
            bind:value={searchQuery}
            on:keyup={() =>
                dispatch("search", {
                    text: searchQuery,
                })}
            type="search"
            id="default-search"
            placeholder="Search"
            class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 transition-all text-white focus:outline-none  focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm"
            required />
    </div>
</form>

<style lang="postcss">
    input {
        @apply block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white
    }
</style>
