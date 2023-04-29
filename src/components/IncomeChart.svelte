<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    export let data = [];
    export let person1 = {};

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    let svg;
    let xScale, yScale, xAxis, yAxis;


    onMount( () => {
        svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
        
        

    });



    function display () {

        //bar chart
        // xScale = d3.scaleBand()
        //   .domain(data.map(d => d[''])) //identifier of respondent
        //   .range([0, width])
        //   .padding(0.1);
          
        // yScale = d3.scaleLinear()
        //   .domain([0, d3.max(data, d => Number(d.avg_income_amount))])
        //   .range([height, 0]);
        
        // xAxis = d3.axisBottom(xScale);
        // yAxis = d3.axisLeft(yScale);
        //end barchart

        //histogram 

        data = data.filter( d => (Number(d.avg_income_amount) > 0 )); //only include non-null values

        xScale = d3.scaleLinear()
        .domain([0,d3.max(data.map((d) => Number(d.avg_income_amount)*0.1143))])
        .range([0,width]);

        const histogram = d3.histogram()
        .value(function(d) { return Number(d.avg_income_amount)*0.1143; })   // I need to give the vector of value
        .domain(xScale.domain())  // then the domain of the graphic
        .thresholds(xScale.ticks(80)); // then the numbers of bins; 

        // And apply this function to data to get the bins
        const bins = histogram(data);


        yScale = d3.scaleLinear()
        .range([height,0]);
        yScale.domain([0,d3.max(bins, function(d) {return d.length})]);

        //end histogram relevant code

        svg.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

        svg.append('g')
        .attr('class', 'axis y-axis')
        // .call(d3.axisLeft(yScale));
    
        //bar chart code
        // svg.selectAll('rect')
        //   .data(data)
        //   .enter()
        //   .append('rect')
        //   .attr('class', 'bar')
        //   .attr('x', d => xScale(d['']))
        //   .attr('y', d => (yScale(Number(d.avg_income_amount))))
        //   .attr('width', xScale.bandwidth())
        //   .attr('height', d => height - yScale(Number(d.avg_income_amount)))
        //   .on('click', function(event,d) {
        //     // Handle click event on bar
        //     console.log(`Clicked on ${d[""]} with income ${d.avg_income_amount}`);
        //   })
        //   .on('mouseover', function(d) {
        //     // Highlight the bar on mouseover
        //     d3.select(this).attr('fill', 'orange');
        //   })
        //   .on('mouseout', function(d) {
        //     // Unhighlight the bar on mouseout
        //     d3.select(this).attr('fill', 'steelblue');
        //   });

        //histogram code
        // console.log("Who is person1 ," ,person1);
        // console.log("Show bins, ", bins);
        let person1Bin = bins[2]
        svg.selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", 1)   //"translate(" + x(d.x0) + "," + y(d.length) + ")"
        .attr("transform", function(d) { return `translate(${xScale(d.x0)} , ${yScale(d.length)})`})
            .attr("width", function(d) { return (xScale(d.x1) - xScale(d.x0))/2 -1})
            .attr("height", function(d) { return height - yScale(d.length); })
            // .style("fill", function (d) { d.some( (person) => { "2211" === person[""] }) ? "#69b3a2" : "red"}  )
            .style("fill", function(d) { return bins.indexOf(d) === 2 ? "red" : "black" })
        
    }


    $: {
        if (data.length > 0 && person1){
            display();
        }
    }





</script>

<main>
<div id="chart"></div>
   
</main>


<style>

</style>