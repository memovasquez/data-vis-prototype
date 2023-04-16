<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    import Dots from '../../components/Dots.svelte';

    let data = [];
    let path = "https://docs.google.com/spreadsheets/d/1-y0RKyaYHCBK1mxT4mnhygGpy7wSFp3jYHk6lQNmKBg/gviz/tq?tqx=out:csv";
    let dotNum;
    let histData;
    let missedMeals;

    onMount( () => {
        d3.csv(path).then((d) => {
                data = d;
        })//.then(processData())
	});

    function processData () {
        console.log(data)
        missedMeals = data.map(obj => (Number(obj.rcsi_meal_nb) > 0))//.filter( number => number > 0);
        let income = data.map(obj => Number(obj.rsp_age))//.filter( number => number > 0);
        //console.log(Number(data[0].rsp_age)); // TODO change to income
        console.log(income);
        console.log(missedMeals);
        dotNum = {'all': Number(Math.round(data.length / 20)), 'missedMeals': Number(Math.round(missedMeals.filter(n => n > 0).length / 20))};
        histData = {
            'income': {'all': income, 'missedMeals': [income.filter((n, i) => missedMeals[i]), income.filter((n, i) => ! missedMeals[i])]}
        }
        console.log(income);
        console.log(dotNum);
    }

    $: {
        data = data;
        processData()
    }

    
</script>

<main>
    <section>
        <Dots bind:numDots={dotNum} bind:histData={histData}/>
    </section>
</main>

<style>
    main {
        text-align: center;
        font-family: "Nunito", sans-serif;
        font-weight: 300;
        line-height: 2;
        font-size: 24px;
        color: var(--color-text);
        margin-top: 100px;
    }
</style>
