<script>
    import * as d3 from 'd3';
    import {onMount, onDestroy} from 'svelte';
    import {sliderBottom, sliderHorizontal} from 'd3-simple-slider';

    export let fao_data = [];


    let necessaryData = [];
    // let hist;

    let x;
    let y;
    let xAxis;
    let yAxis;
    let svg;
    let selectedYear = 2016;
    let sliderVisble = false;
    let confirmGuessButtonVisible = false;
    let blinking = true;
    let tooltip;
    let dragTooltip;

    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 500 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    onMount( () => {

        let filteredData = fao_data.filter( (item) => (item.Country == 'El Salvador' || item.Country == 'United States of America') && Number(item.Year) > 2015);
        necessaryData = filteredData.map( (obj) => {return {year:obj.Year, percentFoodInsec: obj['Prevalence of moderate or severe food insecurity in the total population (percent) (3-year average)'], country: obj.Country}} );
        // let usaData = fao_data.filter( (item) => item.Country == 'United States of America' && Number(item.Year) > 2015);
        
        // append the svg object to the body of the page
        svg = d3.select("#my_dataviz")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

    
         tooltip = d3.select("#my_dataviz")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip-visible")
            .style("background-color", "#742a24")
            .style("color", "white")
            .style("border-radius", "5px")
            .style("width","200px")
            .style("height", "150px")
            .style("padding", "10px")
            .style("font-size", "medium")

        dragTooltip = d3.select("#my_dataviz")
            .append("div")
            .attr("id", "dragging-tooltip")
            .style("opacity", 0)
            .attr("class", "tooltip-visible")
            .style("background-color", "red")
            .style("color", "white")
            .style("border-radius", "5px")
            .style("width","200px")
            .style("height", "50")
            .style("padding", "10px")
            .style("font-size", "medium")
            .style("position", "absolute")


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
            yAxis.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black")
            .attr("transform", "rotate(-90) translate(" + (-height/2) + "," + (-50) + ")") // position the label at the left center of the axis and rotate it by -90 degrees
            .text("% of Population Reporting Moderate to Severe Food Insecurity");
            
            
            // Add Y axis
            y.domain([0, d3.max(necessaryData, d => Number(d.percentFoodInsec)) + 5 ]);
            yAxis.transition().duration(1000).call(d3.axisLeft(y));

            // Add slider input
            const slider = d3.select('#year-slider');
            slider.attr('min', 2016)
            .attr('max', 2021)
            .attr('step', 1)
            .attr('value', 2016)
            .attr('list', 'tickmarks')
            .on('input', () => {
                selectedYear = +slider.node().value; // Convert to number
                update(necessaryData, selectedYear);
            });
            
            
            const tickValues = d3.range(2016, 2022);
            
            const slider_container = d3.select('#slider_container');

            var d3Slider = sliderHorizontal()
                .min(d3.min(necessaryData, function(d) { return d.year; }))
               .max(d3.max(necessaryData, function(d) { return d.year; }))
               .step(1)
                .tickValues(["2016","2017","2018","2019","2020","2021"])
                .tickFormat(d3.format("d"))
               .default(2016)
               .width(750)
               .on("onchange", function(year) {
                 update(necessaryData, year);
               });

            const g = slider_container.append('svg')
            .attr('width',800)
            .attr('height', 100)
            .append('g')
            .attr('transform', 'translate(30,30)');
            g.call(d3Slider);
            
        });
        
        function dragStart(d) {
            d3.select( this )
                .raise()
                .style('stroke', 'black');
            dragTooltip.style("opacity",1);
        }
    
        function dragging(d) {
            let new_y = d3.max([0,d.y]);
            // Calculate the new value of the rectangle based on the y position
            let value = y.invert(new_y);
            // Update the data and the y position of the rectangle
            d.value = value
            d3.select(this)
            .attr("y", y(value))
            .attr("height", d3.max([height - y(value),0]));
            dragTooltip.text("Percentage: " + (d.value.toFixed(1))) // update the tooltip text to show the new y value
        
    
        }
    
        function dragEnd(d) {
            let new_y = d.y;
            // Calculate the new value of the rectangle based on the y position
            let value = y.invert(new_y);
            // Update the data and the y position of the rectangle
            d.value = value;
            d3.select(this)
            .attr("y", y(value))
            .attr("height", height - y(value));
            confirmGuessButtonVisible = true;
    
            dragTooltip.style("opacity", 0);
    
        }
        
        function keyFunction(d) {
        return d.country;
    }
    
    function disableDrag() {
        const bar = d3.selectAll(".bar");//will select both bars on the chart
        bar.style('stroke', 'none');
        
        bar.call(d3.drag()
        .on("start", null)
        .on("drag", null)
        .on("end", null)
        );
    }
    
    function showRealVis() {
        blinking = false;
        update(necessaryData,2016);
        disableDrag();
        sliderVisble = true;
        confirmGuessButtonVisible = false;
    }
    // define the blinking function
    function blink(selection) {
        (function repeat() {
            selection.transition()
            .duration(500)
            .style('fill', 'red')
            .transition()
            .duration(500)
            .style('fill', '#742a24')
            .ease(d3.easeSin)
            .on("end", blinking ? repeat : null);
        })();
    }
        
    function showPercent(event, d) {
        if (sliderVisble) {

            tooltip
            .style("opacity", 1)
            tooltip
            .html('Percentage of population with food insecurity in ' + d.year + ' in '+  d.country + ': '+d.percentFoodInsec)
        }

    }

    function hidePercent() {
        tooltip.style("opacity",0)
    }

    
    
    
    
    
    function firstDisplay(data) {
        // console.log("See data before ", data);
        // Parse the Data
        // X axis
        x.domain(data.map(d => d.country));
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
        //filter by year
        const u = svg.selectAll("rect")
        .data(data.filter(obj => Number(obj.year) === 2016), keyFunction)
        
        // update bars
        u.join("rect")
        .attr("x", d => x(d.country))
        .attr("class", "bar")
        .attr("y", function(d) {return d.country === "El Salvador" ? y(10.5) : y(Number(d.percentFoodInsec))})
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return d.country === "El Salvador" ? height - y(10.5) : height - y(d.percentFoodInsec)})
        .attr('id', d => d.country + d.year)
        .attr("fill", function (d) { return d.country === "El Salvador" ? "rgb(207, 37, 19)": "#69b3a2"})
        .on("mouseover",  showPercent)
        .on('mouseleave', hidePercent)
        .filter(d => d.country === 'El Salvador') //makes only El Salvador bar draggable
        .call(d3.drag()
        .on("start", dragStart)
        .on("drag", dragging)
        .on("end", dragEnd)
        );
        let leftBar = d3.selectAll(".bar").filter(":nth-child(odd)");//selects left bar
        blink(leftBar);
    }
    
    // A function that create / update the plot for a given variable:
    function update(data, selected_year) {
        console.log("called update");
        // Parse the Data
        // X axis
        x.domain(data.map(d => d.country));
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
        //filter by year
        data = data.filter((obj) => Number(obj.year) == selected_year);

        
        const bars = svg.selectAll(".bar").data(data, keyFunction)
            // .attr("x", d => x(d.country))
            .transition()
            .duration(1000)
            .attr("y", d => y(Number(d.percentFoodInsec)))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.percentFoodInsec))
            .style("fill", function (d) { return d.country === "El Salvador" ? "#742a24": "#69b3a2"})
            
    }

    
    

    $: {

        if (necessaryData.length > 0){
            firstDisplay(necessaryData);
            // update(necessaryData, 2016);
        }
        necessaryData = necessaryData;

    }



</script>



    <!-- <button on:click="{() => {sliderVisble = !sliderVisble}}">View Slider</button> -->
    <h3>Prevalence of moderate or severe food insecurity in the total population (percent)</h3>
    <h3>The % of the population in the U.S. that reported moderate to severe food insecurity in 2016 was 10.5</h3>
    
    <p style="visibility: {!sliderVisble ? "visible" : "hidden"};" id="guessInstruction">Drag the bar on the left to what you think the metric is for El Salvador</p> 
    
    <!-- Create a div where the graph will take place -->
    <div id="my_dataviz" style="display: flex; justify-content:center" >
        <button on:click={() => showRealVis()} style="visibility: {confirmGuessButtonVisible ? "visible" : "hidden"}; justify-self:left ; align-self: center; margin-right: 50px; background-color: #742a24; height:100px; width:200px; color:white; border-radius: 5px;" >Confirm guess</button>
    </div>
    
    <div id="slider_container" style="visibility: {sliderVisble ? "visible" : "hidden"}; display: flex; justify-content: center">

        <!-- <input id="year-slider" type="range" bind:value={selectedYear} /> -->
        
    </div>
    <p style="font-size: medium;">The visualization above is made possible with the <a href="https://www.fao.org/faostat/en/#data/FS" target="_blank">FAO Suite of Food Security Indicators dataset </a> </p>







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
    .axis text,
    .slider text {
        font-size: 18px;
    }

    /* #tick-container {
        position: relative;
        height: 2em;
    }

    .tick-labels {
        position: relative;
        height: 2em;
    }
    .tick-label {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 20%;
        transform: translateX(-50%);
    }

    .tick {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 20%;
        transform: translateX(-50%);
     } */

     .range__tick {
        fill: #000000;
    }
   
   

</style>