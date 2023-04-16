<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    //import { draw } from 'svelte/types/runtime/transition';
    //input data 
    export let numDots = {};
    export let histData = {};
    let dots;
    var bins = [];

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 1000 - margin.left - margin.right;
    
    let centerWidth = 400;
    let sidePlotWidth = (width - centerWidth) / 2


    var numColumns = 20;
    var dotCoords = updateDotCoords('all')
    var size = centerWidth / numColumns - 4;
    var numRows = Math.floor(numDots['all'] / numColumns);
    var height = numRows * (size + 4)

    var histWidth = 600
    var histHeight = 400

    var dotMarkers;
    
    function updateDotCoords (fieldName) {
         //- margin.top - margin.bottom;

        dotCoords = []
        let offset = 0
        if (fieldName == 'all') {
            for (let i =0; i < numRows; i++) {
                for (let j=0; j < numColumns; j ++) {
                    dotCoords.push({"x": getDotX(j, sidePlotWidth, sidePlotWidth + centerWidth), 
                                    "y": getDotY(i)});
                }
            }
        } else {
            let numLeftRows = 0;
            let firstRightCol = 0;
            for (let i=0; i < numRows; i++) {
                for (let j=0; j < numColumns; j ++) {
                    if (i * numColumns + j < numDots[fieldName]) {
                        numLeftRows = i;
                        firstRightCol = j
                        dotCoords.push({"x": getDotX(j, 0, centerWidth), "y": getDotY(i)});  
                    } else {
                        //console.log('woo')
                        let x = j - firstRightCol - 1
                        let y = i - numLeftRows
                        if (x < 0) {
                            console.log('woo')
                            y--;
                            x = numColumns + x;
                        }

                        dotCoords.push({"x": getDotX(x, width - centerWidth, width), 
                                        "y": getDotY(y)});
                    }
                     
                }
            }
        }
        dotCoords = dotCoords.sort((a, b) => 0.5 - Math.random());
    }
    
    function getDotX(x, minX, maxX) {
        const scale = d3.scaleLinear()
            .domain([0, numColumns])
            .range([minX, maxX])
        return scale(x)
    }

    function getDotY(y) {
        const scale = d3.scaleLinear()
            .domain([0, numRows])
            .range([0, height])
        return scale(y)
    }

    var moveDots = function (name) {
        // return function () {
            updateDotCoords(name);
            d3.select("#dots").select("svg").select("g").selectAll("circle")
        .data(dotCoords)
        .join("circle")
        .attr("r", 5)
        .style("fill", "#0909bd")
        .attr("stroke", "#0909bd")
        .attr("fill-opacity", 1)
        .transition()
                .duration(1000)
                .attr("cx", function (d) {
                    return d["x"]
                })
                .attr("cy", function (d) {
                    return d["y"]
                })
        // }
    }

    function splitHistogram (name, split) {
        console.log('whattt', histData);
        let data = histData[name][split];
        let leftData = data[0];
        let rightData = data[1];

        const x = d3.scaleLinear()
            .domain([0, d3.max(histData[name]['all'])+1])     // can use this instead of 1000 to have the max of data: d3.max(data) turns out to be 7
            .range([0, histWidth]);

        const histogram = d3.histogram()
            .value(function(d) { return d; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(20)); // then the numbers of bins; 6 here because we remove 0

        const allBins = histogram(histData[name]['all']);
        const y = d3.scaleLinear()
            .range([histHeight, 0])
            .domain([0, d3.max(allBins, function(d) {return d.length })]);  
        
        let leftBins = histogram(leftData);
        let rightBins = histogram(rightData);

        if (split == 'all') {
            rightBins = histogram([]);
        }
        bins = []
        for (let i = 0; i < leftBins.length; i++) {
            bins.push(leftBins[i]);
            bins.push(rightBins[i]);
        }

        d3.select("#histogram").select("g").selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("transform", function(d, i) { 
                if (i % 2 == 0) {
                    return `translate(${x(d.x0) - (x(d.x1) - x(d.x0))/4 } , ${y(d.length)})`
                } else {
                    return `translate(${x(d.x0) + (x(d.x1) - x(d.x0))/4 } , ${y(d.length)})`
                }})
            .transition()
            .duration(1000)
            .attr("height", function(d) { return histHeight - y(d.length); })

        //     d3.select("#histogram").select("g").selectAll("rect").selectAll(".rightBar")
        //         .data(rightBins)
        //         .append("rect")
        //         .attr("x", function(d) { return (x(d.x1) - x(d.x0))/2 + 1})
        //         .attr("transform", function(d) { return `translate(${x(d.x0) - (x(d.x1) - x(d.x0))/4 } , ${y(d.length)})`})
        //         .transition()
        //             .duration(1000)
        //             .attr("height", function(d) { return histHeight - y(d.length); })
        // // } else {
        //     const y = d3.scaleLinear()
        //     .range([histHeight, 0])
        //     .domain([0, d3.max(bins, function(d) {return d.length })]);   // d3.hist has to be called before the Y axis obviously
            
        //     // const svgHist = d3.selev.append("g")
        //     //     .call(d3.axisLeft(y));

        //     d3.select("#histogram").select("g").selectAll("rect").selectAll(".leftBar")
        //     .data(bins)
        //     .join("rect")
        //     .attr("x", 1)
        //     .attr("transform", function(d) { return `translate(${x(d.x0) - (x(d.x1) - x(d.x0))/4 } , ${y(d.length)})`})
        //     .transition()
        //         .duration(1000)
        //         .attr("height", function(d) { return histHeight - y(d.length); })
        // }

        // svgHist.selectAll("rect")
        // .data(bins)
        // .join("rect")
        //     .attr("x", 1)
        // .attr("transform", function(d) { return `translate(${x(d.x0) - (x(d.x1) - x(d.x0))/4 } , ${y(d.length)})`})
        //     .attr("width", function(d) { return (x(d.x1) - x(d.x0))/2 -1})
        //     .attr("height", function(d) { return height - y(d.length); })
        //     .style("fill", "#69b3a2")
        //     // Show tooltip on hover
        //             // .on("mouseover", showTooltip )
        //             // .on("mousemove", moveTooltip )
        //             // .on("mouseleave", hideTooltip )
        //   })
        
    }

    var updatePlots = function (name) {
        return function () { 
            moveDots(name);
            splitHistogram('income', name);
        }
    }


        //svg = d3.select("#dots").select("svg").select("g").selectAll("circle")//.select("#histogram")
        // if (split == 'all') {


    $: {
        if (numDots.length !== 0){// && (histData.length !== 0)){
            histData = histData
            console.log(numDots)
            console.log(histData)
            updateDotCoords('all');
            //updateHistogramData('income', 'all');
        }
    }

    // TODO state variable so we don't randomize when button is double pressed

    onMount( () => {
    d3.select(dots).html(null);

    const svg = d3.select("#dots")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "dotArray")
            .append("g")
            .attr("transform",
                    `translate(${margin.left}, ${margin.top})`);

    d3.select("#dots").select("svg").select("g").selectAll("circle")
        .data(dotCoords)
        .enter()
        .append("circle")
        .attr("r", 5)
        .style("fill", "#0909bd")
        .attr("stroke", "#0909bd")
        .attr("fill-opacity", 1)
        .attr("cx", function (d) {
            console.log('y')
            return d["x"];
        })
        .attr("cy", function (d) {
            return d["y"];
        })


        // build histogram

    const svgHist = d3.select("#dots")
        .append('svg')
            .attr("width", histWidth + margin.left + margin.right)
            .attr("height", histHeight + margin.top + margin.bottom)
            .attr("id", "histogram")
        .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
            .domain([0, d3.max(histData['income']['all'])+1])     // can use this instead of 1000 to have the max of data: d3.max(data) turns out to be 7
            .range([0, histWidth]); //width of histogram

    // TODO fix 
    svgHist.append("g")
        .attr("transform", `translate(0, ${histHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    const histogram = d3.histogram()
        .value(function(d) { return d; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(20)); // then the numbers of bins; 6 here because we remove 0

    // console.log('this', histData['income']['all'])
    const leftBins = histogram(histData['income']['all']);
    const rightBins = histogram([]);
    //const rightBins = leftBins;

    bins = []
    for (let i = 0; i < leftBins.length; i++) {
        bins.push(leftBins[i]);
        bins.push(rightBins[i]);
    }

    const y = d3.scaleLinear()
        .range([histHeight, 0])
        .domain([0, d3.max(bins, function(d) {return d.length })]);   // d3.hist has to be called before the Y axis obviously
            
    svgHist.append("g")
        .call(d3.axisLeft(y));

    let barWidth = (x(bins[0].x1) - x(bins[0].x0)) / 2 - 1
    svgHist.selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", function (d, i) {return (i % 2 == 0) ? 1 :1})
        .attr("class", function (d, i) {(i % 2 == 0) ? "leftBar" : "rightBar"})
        .attr("transform", function(d, i) { 
            if (i % 2 == 0) {
                return `translate(${x(d.x0) - (x(d.x1) - x(d.x0))/4 } , ${y(d.length)})`
            } else {
                return `translate(${x(d.x0) + (x(d.x1) - x(d.x0))/4 } , ${y(d.length)})`
            }})
        .attr("width", function(d) { return barWidth})
        .attr("height", function(d) { return histHeight - y(d.length) })
        .style("fill", function (d, i) {return (i % 2 == 0) ? "#69b3a2" : "#a83e32"});
            //
            // Show tooltip on hover
                    // .on("mouseover", showTooltip )
                    // .on("mousemove", moveTooltip )
                    // .on("mouseleave", hideTooltip )


    // svgHist.data(bins)
    //     .append("rect")
    //     .attr("x", 10)
    //     .attr("class", "rightBar")
    //     .attr("transform", function(d) { return `translate(${x(d.x0) - (x(d.x1) - x(d.x0))/4 } , ${y(d.length)})`})
    //         .attr("width", function(d) { return (x(d.x1) - x(d.x0))/2 -1})
    //         .attr("height", function(d) { return histHeight - y(d.length); })
    //         .style("fill", "#a83e32")
            // Show tooltip on hover
                    // .on("mouseover", showTooltip )
                    // .on("mousemove", moveTooltip )
                    // .on("mouseleave", hideTooltip )
    })

    console.log('here', dotMarkers);


</script>

<button type="button" on:click="{updatePlots('all')}">All</button>
<button type="button" on:click="{updatePlots('missedMeals')}">Missed meals</button>

<div id="dots" bind:this={dots} class="visualization"></div>

