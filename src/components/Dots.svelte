<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    // import * as science from 'science';

    //import { draw } from 'svelte/types/runtime/transition';
    //input data 
    export let numDots = {};
    export let histData = {};
    let dots;
    let hist;
    let dotState = 'all';
    let histState = 'income';
    var bins = [];

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 1000 - margin.left - margin.right;
    
    let centerWidth = 400;
    let sidePlotWidth = (width - centerWidth) / 2


    var numColumns = 20;
    var dotCoords = [];//updateDotCoords('all')
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
                                    "y": getDotY(i),
                                "c": "#69b3a2"});
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
                        dotCoords.push({"x": getDotX(j, 0, centerWidth), "y": getDotY(i), "c": "#69b3a2"});  
                    } else {
                        //console.log('woo')
                        let x = j - firstRightCol - 1
                        let y = i - numLeftRows
                        if (x < 0) {
                            y--;
                            x = numColumns + x;
                        }

                        dotCoords.push({"x": getDotX(x, width - centerWidth, width), 
                                        "y": getDotY(y),
                                        "c": "#a83e32"});
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
        .attr("fill-opacity", 1)
        .transition()
                .duration(1000)
                .attr("cx", function (d) {
                    return d["x"]
                })
                .attr("cy", function (d) {
                    return d["y"]
                })
                .style("fill", function (d) {
                    return d["c"]
                })
                .attr("stroke", function (d) {
                    return d["c"]
                })
        // }
    }

    function splitHistogram (name, split) {
        console.log(histData);
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
        
        let leftBins = histogram(leftData);
        let rightBins = histogram(rightData);

        if (split == 'all') {
            leftBins = allBins;
            rightBins = histogram([]);
        }

        const leftTotal = leftBins.reduce((acc, cur) => acc + cur.length, 0);
        const rightTotal = (split == 'all') ? 1 : rightBins.reduce((acc, cur) => acc + cur.length, 0);
        const leftMax = d3.max(leftBins, function(d) {return d.length }) / leftTotal;
        const rightMax = (split == 'all') ? 0 : d3.max(rightBins, function(d) {return d.length }) / rightTotal;


        const y = d3.scaleLinear()
            .range([histHeight, 0])
            .domain([0, d3.max([leftMax, rightMax])]);//d3.max(allBins, function(d) {return d.length })]);  
        
        // TODO fix y-axis scale and scores?


        bins = []
        for (let i = 0; i < leftBins.length; i++) {
            
            // switched order? TODO
            bins.push(rightBins[i]);
            bins.push(leftBins[i]);
        }
        // console.log('hello', bins)
        // foo
        // d3.select("#histogram").select("g").selectAll("polygon")
        // .data(bins)
        // .join("polygon")
        // .transition()
        // .duration(1000)
        // .attr("points", function (d, i) {
        //     let offset;
        //     let width = d.x1 - d.x0;
        //     if (split == 'all') {
        //         offset = 0;
        //     } else {
        //         if (i % 2 == 1) {
        //             offset = width / 4;
        //         } else {
        //             offset = - width / 4;
        //         }
        //     }
        //     // todo change spacing if splitting
        //     let x0 = x(d.x0 + offset);
        //     let x1 = x(d.x1 + offset);
        //     let y0 = y(0);
        //     let y1;
        //     if (split == 'all') {            
        //         if (i % 2 == 1) { // TODO switched order
        //             y1 = d.length
        //         } else {
        //             y1 = 0.001;
        //         }
        //     }  else {
        //         y1 = d.length;
        //     }

        //     y1 /= (i % 2 == 1) ? leftTotal : rightTotal;
        //     y1 = y(y1);
        //     if (y1 == 0) {console.log('wut')};

        //     let pts = [
        //             [x0, y0], 
        //             [x0,  y1],
        //             [x1, y0],
        //             [x1 , y1],
        //         ]
        //     let points = d3.polygonHull(pts)
        //     return points
        //     })
        // .attr("class", function (d, i) {(i % 2 == 1) ? "leftBar" : "rightBar"})
        // .style("fill", function (d, i) {return (i % 2 == 1) ? "#69b3a2" : "#a83e32"})

        function kde(kernel, thresholds, data) {
            return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
        }
        function epanechnikov(bandwidth) {
            return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
        }
        

        
        let thresholds = x.ticks(40)
        let bandwidth = 150;


        if (split == 'all') {
            leftData = data;
        }

        let leftDensity = kde(epanechnikov(bandwidth), thresholds, leftData)

        let rightDensity
        if (split == 'all') {
            rightDensity = leftDensity.map(d => [d[0], 0]);
        } else {
            rightDensity = kde(epanechnikov(bandwidth), thresholds, rightData)

        }

        let newY = d3.scaleLinear()
            .range([histHeight, 0.0001])
            .domain([0, d3.max(
                [d3.max(leftDensity, function(d) {return d[1]}),
                d3.max(rightDensity, function(d) {return d[1]})])
             * 1.2]);
        let line = d3.line()
            .curve(d3.curveBasis)
            .x(d => x(d[0]))
            .y(d => newY(d[1]))

        // let rightDensity = []
        // for (let i = 0; i < leftDensity.length; i++) {
        //     rightDensity.push([leftDensity[i][0], 0])
        // }
        //let rightDensity = kde(epanechnikov(bandwidth), thresholds, rightData);

        d3.select('#leftCurve')
            .datum(leftDensity)
            .attr('id', 'leftCurve')
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("d", line);

        d3.select("#rightCurve")
            .datum(rightDensity)
            .attr('id', 'rightCurve')
            .transition()
            .duration(1000)
            .attr("fill", "none")
            .attr("stroke", "#a83e32")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("d", line);

        var area = d3.area()
            .x(function(d) { return x(d[0]); })
            .y0(y(0))
            .y1(function(d) { return newY(d[1]); });

        d3.select("#leftArea")
            .datum(leftDensity)
            .attr('id', 'leftArea')
            .attr("class", "area")
            .transition()
            .duration(1000)
            .style("fill", "#69b3a2")
            .style("opacity", 0.5)
            .attr("d", area);
        d3.select("#rightArea")
            .datum(rightDensity)
            .attr('id', 'rightArea')
            .attr("class", "area")
            .transition()
            .duration(1000)
            .style("fill", "#a83e32")
            .style("opacity", 0.5)
            .attr("d", area);
    }

    var updatePlots = function (name, histName) {
        return function () { 
            console.log(name, histName)
            if (dotState !== name) {
                moveDots(name);
                splitHistogram(histName, name);
            }
            else if (histState !== histName){
                splitHistogram(histName, name);
            }
            dotState = name;
            histState = histName;
        }
    }


    $: {
        if (numDots['all'] !== 0){// && (histData.length !== 0)){
            console.log('this',numDots, histData)
            histData = histData
            updateDotCoords('all');
            draw()
            //updateHistogramData('income', 'all');
        }
    }

    //onMount( () => {
    function draw() {
    d3.select(dots).html(null);

    const svg = d3.select("#dots")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "dotArray")
            .append("g")
            .attr("transform",
                    `translate(${margin.left}, ${margin.top})`);

    console.log('dots', dotCoords);
    d3.select("#dots").select("svg").select("g").selectAll("circle")
        .data(dotCoords)
        .enter()
        .append("circle")
        .attr("r", 5)
        .style("fill", "#69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("fill-opacity", 1)
        .attr("cx", function (d) {
            console.log('y')
            return d["x"];
        })
        .attr("cy", function (d) {
            return d["y"];
        })


        // build histogram

    d3.select(hist).html(null);
    const svgHist = d3.select("#hist")
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
    const leftTotal = leftBins.reduce((acc, cur) => acc + cur.length, 0);
    const rightBins = histogram([]);
    const rightTotal = rightBins.reduce((acc, cur) => acc + cur.length, 0)
    //const rightBins = leftBins;

    

    bins = []
    for (let i = 0; i < leftBins.length; i++) {
        // switched order? TODO
        bins.push(rightBins[i]);
        bins.push(leftBins[i]);
        
    }

    console.log('bins', bins)

    console.log(leftTotal);
    const y = d3.scaleLinear()
        .range([histHeight, 0.0001])
        .domain([0, d3.max(bins, function(d) {return d.length}) / leftTotal]);   // d3.hist has to be called before the Y axis obviously
            
    svgHist.append("g")
        .call(d3.axisLeft(y));

    let barWidth = (x(bins[0].x1) - x(bins[0].x0)) / 2 - 1

    ///////  ///// barplot
    // svgHist.selectAll("polygon")
    //     .data(bins)
    //     .join("polygon")
    //     .attr("points", function (d, i) {
    //         let x0 = x(d.x0);
    //         let x1 = x(d.x1);
    //         let y0 = y(0);
    //         let y1;
    //         if (i % 2 == 1) {
    //             y1 = d.length;
    //         } else {
    //             y1 = 0;
    //         }
    //         y1 /= (i % 2 == 1) ? leftTotal : 1;
    //         y1 = y(y1);
    //         console.log(y1);
    //         let pts = [
    //                 [x0, y0], 
    //                 [x0,  y1],
    //                 [x1, y0],
    //                 [x1 , y1],
    //             ]
    //         let points = d3.polygonHull(pts)
    //         return points
    //         })
    //     .attr("class", function (d, i) {(i % 2 == 1) ? "leftBar" : "rightBar"})
    //     .style("fill", function (d, i) {return (i % 2 == 1) ? "#69b3a2" : "#a83e32"})



            //
            // Show tooltip on hover
                    // .on("mouseover", showTooltip )
                    // .on("mousemove", moveTooltip )
                    // .on("mouseleave", hideTooltip )

    function kde(kernel, thresholds, data) {
        return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
    }
    function epanechnikov(bandwidth) {
        return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
    }
    // let newX = d3.scaleLinear()
    // .domain(d3.extent(histData['income']['all'])).nice()
    // .range([margin.left, width - margin.right])

    // let newY = d3.scaleLinear()
    // .domain([0, d3.max(bins, d => d.length) / histData['income']['all'].length])
    // .range([height - margin.bottom, margin.top])

    
    
    let thresholds = x.ticks(40)
    let bandwidth = 150;
    let leftDensity = kde(epanechnikov(bandwidth), thresholds, histData['income']['all'])

    let newY = d3.scaleLinear()
        .range([histHeight, 0.0001])
        .domain([0, d3.max(leftDensity, function(d) {return d[1]})]);
    
    let line = d3.line()
        .curve(d3.curveBasis)
        .x(d => x(d[0]))
        .y(d => newY(d[1]))


    let rightDensity = []
    for (let i = 0; i < leftDensity.length; i++) {
        rightDensity.push([leftDensity[i][0], 0])
    }
    //let rightDensity = kde(epanechnikov(bandwidth), thresholds, rightData);

    svgHist.append("path")
      .datum(leftDensity)
      .attr('id', 'leftCurve')
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d", line);

    svgHist.append("path")
      .datum(rightDensity)
      .attr("fill", "none")
      .attr('id', 'rightCurve')
      .attr("stroke", "#a83e32")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d", line);

    var area = d3.area()
        .x(function(d) { return x(d[0]); })
        .y0(y(0))
        .y1(function(d) { return newY(d[1]); });

    svgHist.append("path")
        .datum(leftDensity)
        .attr('id', 'leftArea')
        .attr("class", "area")
        .style("fill", "#69b3a2")
        .style("opacity", 0.5)
        .attr("d", area);
    svgHist.append("path")
        .datum(rightDensity)
        .attr('id', 'rightArea')
        .attr("class", "area")
        .style("fill", "#a83e32")
        .style("opacity", 0.5)
        .attr("d", area);

    // 
    
    //   });

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
    }//)

    console.log('here', dotMarkers);


</script>

<button type="button" on:click="{updatePlots('all', histState)}">All</button>
<button type="button" on:click="{updatePlots('missedMeals', histState)}">Missed meals</button>

<div id="dots" bind:this={dots} class="visualization"></div>

<button type="button" on:click="{updatePlots(dotState, 'income')}">Monthly Income</button>
<button type="button" on:click="{updatePlots(dotState, 'debt')}">Debt</button>

<div id="hist" bind:this={dots} class="visualization"></div>
