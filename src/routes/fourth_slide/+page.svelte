<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    import Dots from '../../components/Dots.svelte';

    let data = [];
    //let path = "https://docs.google.com/spreadsheets/d/1-y0RKyaYHCBK1mxT4mnhygGpy7wSFp3jYHk6lQNmKBg/gviz/tq?tqx=out:csv";
    let path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYmcthdA2QHcxz-7LyWtPwFCw6EcrxqdbKk7ABJNdcDGEb4u5AyoU1Gg3716krw3_HmqaH7tzGBd17/pub?output=csv";
    let dotNum;
    let histData;
    let missedMeals;

 

    function processData () {
        console.log(data)
        // TODO filter to include only el salvador
        data = data.filter(obj => obj.country == 'SLV') 
        missedMeals = data.map(obj => (Number(obj.rcsi_meal_nb) > 0))//.filter( number => number > 0);
        let borrowedFood = data.map(obj => (Number(obj.rcsi_borrow) > 0))

        let incomeCurrency = data.map(obj => Number(obj.avg_income_currency))
        let income = data.map(obj => Number(obj.avg_income_amount))
            .filter((number, i) => ((number < 1000) && (incomeCurrency[i] == 1)));

        let incomePerCapita = data.map(obj => Number(obj.income_per_capita))
            .filter((number, i) => ((number < 500) && (incomeCurrency[i] == 1)));

        let debtCurrency = data.map(obj => Number(obj.debt_currency))
        let debt = data.map(obj => Number(obj.debt_amount))
            .filter((number, i) => ((number < 1000) && (number > 0)  && (debtCurrency[i] == 1)));

        let remittanceCurrency = data.map(obj => Number(obj.rem_currency))
        let remittance = data.map(obj => Number(obj.remesa_amount))
            .filter((number, i) => ((number < 1000) && (number > 0)  && (remittanceCurrency[i] == 1)));



        //console.log(Number(data[0].rsp_age)); // TODO change to income
        //console.log('stuff', data.map(obj => Number(obj.avg_income_amount)));
        //console.log('income', income);
        // console.log('ish', income.filter((n, i) => (i % 3 == 0)));
        // console.log(missedMeals);

        let div = 5
        dotNum = {
            'all': Number(Math.round(data.length / div)), 
            'missedMeals': Number(Math.round(missedMeals.filter(n => (n > 0) && (n != 88)).length / div)),
            'borrowedFood': Number(Math.round(borrowedFood.filter(n => (n > 0) && (n != 88)).length / div))
        };
        histData = {
            'income': {
                'all': income, 
                'missedMeals': [income.filter((n, i) => missedMeals[i]), income.filter((n, i) => ! missedMeals[i])],
                'borrowedFood': [income.filter((n, i) => borrowedFood[i]), income.filter((n, i) => ! borrowedFood[i])]
            },
            'incomePerCapita': {
                'all': incomePerCapita, 
                'missedMeals': [incomePerCapita.filter((n, i) => missedMeals[i]), incomePerCapita.filter((n, i) => ! missedMeals[i])],
                'borrowedFood': [incomePerCapita.filter((n, i) => borrowedFood[i]), incomePerCapita.filter((n, i) => ! borrowedFood[i])]
            },
            'debt': {
                'all': debt, 
                'missedMeals': [debt.filter((n, i) => missedMeals[i]), debt.filter((n, i) => ! missedMeals[i])],
                'borrowedFood': [debt.filter((n, i) => borrowedFood[i]), debt.filter((n, i) => ! borrowedFood[i])]
            },
            'remittance': {
                'all': remittance, 
                'missedMeals': [remittance.filter((n, i) => missedMeals[i]), remittance.filter((n, i) => ! missedMeals[i])],
                'borrowedFood': [remittance.filter((n, i) => borrowedFood[i]), remittance.filter((n, i) => ! borrowedFood[i])]
            }
            
        }
        //console.log(income);
        //console.log(dotNum);
    }

    onMount( () => {
        d3.csv(path).then((d) => {
                data = d;
        })//.then(processData())
	});

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
