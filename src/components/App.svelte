<script>

    import MainScroll from './MainScroll.svelte';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    let fao_dataset_path = 'https://raw.githubusercontent.com/memovasquez/data/main/FAO_DatasetAbridged.csv';
    let wfp_dataset_path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYmcthdA2QHcxz-7LyWtPwFCw6EcrxqdbKk7ABJNdcDGEb4u5AyoU1Gg3716krw3_HmqaH7tzGBd17/pub?output=csv";
    let wfp_data = [];
    let fao_data = [];

    onMount(async () => {
        //fetch the data here once and for all
        d3.csv(wfp_dataset_path).then((d) => {
                wfp_data = d;
        });

        d3.csv(fao_dataset_path).then((d) => {
            fao_data = d;
        });

	});

    $: {
        wfp_data = wfp_data;
        fao_data = fao_data;
    }



</script>

<main>
    <!-- <section class="todos">
        {#if pie_data.length !== 0 }
        <h2>Days of the Week Eating Kinds of Food </h2>
        <div class="actions" />
        <Pie bind:pie_data={pie_data}></Pie>
        {/if}
    </section> -->
    <!-- <section class="todos">
        {#if pie_data.length !== 0 }
        <h2>Loss of Nutrition</h2>
        <Histogram bind:hist_data={pie_data}></Histogram>
        {/if}
    </section> -->
    <!-- Pass data into main scroller component the svelte way -->
    {#if wfp_data.length > 0 && fao_data.length > 0}
    <MainScroll bind:wfp_data={wfp_data} bind:fao_data={fao_data}/>
    {/if}

</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap");

    :root {
        --color-bg: #ffffff;
        --color-outline: #c2c2c2;
        --color-shadow: hsl(0, 0%, 0%, 0.1);
        --color-text: #3f4252;
        --color-bg-1: hsla(0, 0%, 0%, 0.2);
        --color-shadow-1: hsl(0, 0%, 96%);
    }

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    main {
        text-align: center;
        font-family: "Nunito", sans-serif;
        font-weight: 300;
        line-height: 2;
        font-size: 24px;
        color: var(--color-text);
        margin-top: 100px;
    }

    .box {
        display: flex;
        justify-content: space-around;
    }

    label,
    input,
    button {
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        font-size: 24px;
        width: 100%;
    }

    input {
        padding-left: 40px;
        line-height: 72px;
        font-style: italic;
        border: none;
    }

    ::placeholder {
        color: #9e9e9e;
    }

    h1 {
        font-size: 72px;
        font-weight: 300;
        line-height: 2;
    }

    h2 {
        font-size: 30px;
        font-weight: 300;
        line-height: 1.5;
    }

    .todos {
        display: inline-block;
        vertical-align:top;
        width: 500px;
        background-color: var(--color-bg);
        border-radius: 5px;
        border: 1px solid var(--color-outline);
        box-shadow: 0 0 4px var(--color-shadow);
    }

    .graph {
        display: inline-block;
        margin-left: 50px;
    }

    .actions {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .actions:before {
        content: "";
        height: 40px;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        box-shadow: 0 1px 1px var(--color-shadow-1), 0 8px 0 -3px var(--color-shadow-1),
            0 9px 1px -3px var(--color-bg-1), 0 16px 0 -6px var(--color-shadow-1),
            0 17px 2px -6px var(--color-bg-1);
        z-index: -1;
    }
</style>
