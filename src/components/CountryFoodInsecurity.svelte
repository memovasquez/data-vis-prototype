<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';

    export let fao_data = [];

    let necessaryUSAData = [];
    let necessarySalvadorData = [];
    let necessaryData = [];
    // let hist;

    let x;
    let y;
    let xAxis;
    let yAxis;
    let svg;


    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    onMount( () => {

        let filteredData = fao_data.filter( (item) => (item.Country == 'El Salvador' || item.Country == 'United States of America') && Number(item.Year) > 2015);
        // necessarySalvadorData = salvadorData.map( (obj) => {return {year:obj.Year, perecentFoodInsec: obj['Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)']} });
        necessaryData = filteredData.map( (obj) => {return {year:obj.Year, percentFoodInsec: obj['Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)'], country: obj.Country}} );
        // let usaData = fao_data.filter( (item) => item.Country == 'United States of America' && Number(item.Year) > 2015);
        // necessaryUSAData = usaData.map( (obj) => {return {year:obj.Year, perecentFoodInsec: obj['Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)'], country: obj.Country } } );
        

        // append the svg object to the body of the page
        svg = d3.select("#my_dataviz")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

            // Initialize the X axis
            x = d3.scaleBand()
            .range([ 0, width ])
            .padding(0.2);
            xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`);
        
            // Initialize the Y axis
            y = d3.scaleLinear()
            .range([ height, 0]);
            yAxis = svg.append("g")
            .attr("class", "myYaxis");
    });


    
    


      

    // A function that create / update the plot for a given variable:
    function update(data) {
        console.log("called update");
        // Parse the Data
        // X axis
        x.domain(data.map(d => d.country));
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
        //filter by year
        let selected_year = '2016';
        data = data.filter((obj) => obj.year == selected_year);

        // Add Y axis
        y.domain([0, d3.max(data, d => d.percentFoodInsec) ]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

    
        // variable u: map data to existing bars
        const u = svg.selectAll("rect")
            .data(data)

        // update bars
        u.join("rect")
            .transition()
            .duration(1000)
            .attr("x", d => x(d.country))
            .attr("y", d => y(Number(d.percentFoodInsec)))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.percentFoodInsec))
            .attr("fill", "#69b3a2")
        
    }



    $: {



        if (necessaryData.length > 0){
            update(necessaryData);
        }


    }



</script>

<main>

    <button on:click="{update(necessaryData)}">Variable 1</button>
    <button on:click="{update(necessaryData)}">Variable 2</button>
    
    <!-- Create a div where the graph will take place -->
    <div id="my_dataviz"></div>

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