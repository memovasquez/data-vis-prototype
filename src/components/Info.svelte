<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    import Map from './Map.svelte';
    import IncomeChart from './IncomeChart.svelte';
    import HouseholdSizeChart from './HouseholdSizeChart.svelte';
    import AgeChart from './AgeChart.svelte';
    import SexChart from './SexChart.svelte';
  import { userAge } from '../stores';

    export let userInput = {}; 
    // (mainscroll) let userInput = {name: userNameValue, income: userMonthlyIncomeValue, sex: userSexValue, hh_size: userHouseholdSizeValue};


    let info;
    let data;
 `   // let map;
    // let markerContainer;`
    let path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYmcthdA2QHcxz-7LyWtPwFCw6EcrxqdbKk7ABJNdcDGEb4u5AyoU1Gg3716krw3_HmqaH7tzGBd17/pub?output=csv";
    let person1 = {};

    let selectedField = "location";
    let fields = [
        "age",
        "sex",
        "location",
        "monthlyIncome",
        "household",
    ]


    onMount( () => {
    //function processData () {
        d3.csv(path).then((d) => {
        data = d;
        console.log('data', data)
        // TODO filter to include only el salvador
        person1 = data[2211];
        console.log('person1 data', person1);
        data = data.filter(obj => obj.country == 'SLV') 
        })

    })

    let margin = {top: 10, right: 30, bottom: 30, left: 30};
    let width = 1000 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    function makeDisplay () {
    d3.select(info).html(null);
        let infoSVG = d3.select("#info")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "infoDisplay")
            .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);
        infoSVG.selectAll("circle")
            .data([{"r": 20, "cx": 100, "cy": 100, "color":""}])
            .enter()
            .append("circle")
            .attr("r", 20)
            .attr("cx", 250)
            .attr("cy", 400)
            .attr("color", "blue");
    }

    function pressButton (fieldName) {
        return function () {
            selectedField = fieldName;
        }
        // TODO display text or something
    }

    $: {
        if ((Object.keys(person1).length > 0) && (Object.keys(userInput).length > 0)) {
            makeDisplay()
            //updateHistogramData('income', 'all');
            
        }
        selectedField;
    }

</script>

<main>
    <div style="display: flex; justify-content:space-around">
            <div>
            <table style="height:600px">
                <tr><td>
                    <button 
                        class="button {selectedField === "location" ? "pressed" : ""}"
                        on:click="{pressButton("location")}"
                    >
                        Location
                    </button>
                </td></tr>
                <tr><td>
                    <button 
                        class="button {selectedField === "age" ? "pressed" : ""}" 
                        on:click="{pressButton("age")}"
                    >
                        Age
                    </button>
                </td></tr>
                <tr><td>
                    <button 
                        class="button {selectedField === "sex" ? "pressed" : ""}"
                        on:click="{pressButton("sex")}"
                    >
                        Sex
                    </button>
                </td></tr>
                <tr><td>
                    <button 
                        class="button {selectedField === "monthlyIncome" ? "pressed" : ""}"
                        on:click="{pressButton("monthlyIncome")}"
                    >
                        Income
                    </button>
                </td></tr>
                <tr><td>
                    <button 
                        class="button {selectedField === "household" ? "pressed" : ""}"
                        on:click="{pressButton("household")}"
                    >
                        Family size
                    </button>
                </td></tr>
            </table>
            </div>

            <div>
            {#if selectedField === "location"}
                <h2>Laura lives in Ahuachapan, El Salvador</h2>
                <Map  />
            {:else if selectedField === "monthlyIncome"}
                <h2>Laura makes ${person1.avg_income_amount} per month</h2>
                <IncomeChart bind:data={data} bind:person1={person1} bind:userIncome={userInput.income}/>
            {:else if selectedField === "household"}
                <h2>Laura provides for {person1.hh_size} people in her household</h2>
                <HouseholdSizeChart bind:data={data} bind:userHHSize={userInput.hh_size} />
            {:else if selectedField === "age"}
            <h2>Laura is {person1.rsp_age} years old</h2>
                <AgeChart bind:data={data} bind:userAge={userInput.age}/>
            {:else if selectedField === "sex"}
            <h2>Laura is female</h2>
                <SexChart bind:data={data} bind:userSex={userInput.sex} />
            {/if}
            </div>
    </div>

</main>

<style>
    table, th, td {
  border: 1px solid black;
  border-radius: 10px;
}

.button {
  border: noColor;
  /* color: '#00'; */
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.pressed {
    background-color: #742a24;
    color: white;
}

</style>

