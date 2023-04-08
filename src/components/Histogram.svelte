<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    //input data 
    export let hist_data = [];
    let hist;

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    let reduced_meal_size_days = hist_data.map(obj => Number(obj.rcsi_meal_size)).filter( number => number > 0);
    let reduced_child_meal_days = hist_data.map(obj => Number(obj.rcsi_meal_adult)).filter(number => number > 0);


    onMount( () => {
        d3.select(hist).html(null); 

        // append the svg object to the body of the page
            const svg = d3.select("#histogram")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    `translate(${margin.left}, ${margin.top})`);

            
            // X axis: scale and draw:
            const x = d3.scaleLinear()
                .domain([0, d3.max(reduced_meal_size_days)])     // can use this instead of 1000 to have the max of data: d3.max(data) turns out to be 7
                .range([0, width]); //width of histogram

            svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")).tickValues([0, 1, 2, 3, 4, 5, 6, 7]));
             
            const histogram = d3.histogram()
            .value(function(d) { return d; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(6)); // then the numbers of bins; 6 here because we remove 0

            // And apply this function to data to get the bins
            const bins = histogram(reduced_meal_size_days);
            console.log(bins);
            // Y axis: scale and draw:
            const y = d3.scaleLinear()
                .range([height, 0]);
                y.domain([0, d3.max(bins, function(d) {return d.length })]);   // d3.hist has to be called before the Y axis obviously
            
                svg.append("g")
            .call(d3.axisLeft(y));



            // append the bar rectangles to the svg element
            svg.selectAll("rect")
                .data(bins)
                .join("rect")
                    .attr("x", 1)
                .attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`})
                    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1})
                    .attr("height", function(d) { return height - y(d.length); })
                    .style("fill", "#69b3a2")

        
        })

    



    $: {
        

    }

  
</script>

<div id="histogram" bind:this={hist} class="visualization">

</div>

<style>
	.visualization {
		font: 25px sans-serif;
		margin: auto;
		margin-top: 1px;
		text-align: middle;
      
	}

	/* dynamic classes for the tooltip */
	.tooltip-hidden {
		visibility: hidden;
		font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute;
	}

	.tooltip-visible {
		font: 25px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #f0dba8;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px;
	}
</style>
