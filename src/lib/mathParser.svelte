<script>
    import katex from "katex";
    import snarkdown from "snarkdown";
    import { onMount } from "svelte";

    export let string = "";
    onMount(() => {
        //split string into normal text and math text with delimiter $$ and render math text with katex
        let splitString = string.split("$$");
        //remove empty strings
        splitString = splitString.filter((x) => x !== "");
        //render math text with katex then merge with normal text and replace string with the result
        let result = "";
        splitString.forEach((x, i) => {
            if (i % 2 === 0) {
                result += x;
            } else {
                result += katex.renderToString(x, { throwOnError: false });
            }
        });
        string = result;
    });
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
        integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ"
        crossorigin="anonymous" />
</svelte:head>

<div>
    {@html snarkdown(string)}
</div>
