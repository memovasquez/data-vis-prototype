<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
    // import * as science from 'science';

    //import { draw } from 'svelte/types/runtime/transition';
    //input data 
    let numDots = {};
    let histData = {};
    let dots;
    let hist;
    let dotState = 'all';
    let histState = 'income';
    var bins = [];
    let isPressed = false;

    const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 1000 - margin.left - margin.right;
    
    let centerWidth = 400;
    let sidePlotWidth = (width - centerWidth) / 2


    var numColumns = 20;
    var dotCoords = [];
    var size = centerWidth / numColumns - 4;
    let numRows;
    let height; 

    var histWidth = 600
    var histHeight = 400

    var dotMarkers;

    let path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYmcthdA2QHcxz-7LyWtPwFCw6EcrxqdbKk7ABJNdcDGEb4u5AyoU1Gg3716krw3_HmqaH7tzGBd17/pub?output=csv";
    let data;


    onMount( () => {
    //function processData () {
        d3.csv(path).then((d) => {
            data = d;
        console.log('data', data)
        // TODO filter to include only el salvador
        data = data.filter(obj => obj.country == 'SLV') 
        let missedMeals = data.map(obj => (Number(obj.rcsi_meal_nb) > 0))//.filter( number => number > 0);
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

        let div = 5
        numDots = {
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
    })


    console.log('hist', histData)

	});



    
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
        console.log('numDots', numDots);
        console.log('dotcoords', dotCoords);
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
            .domain([0, d3.max(histData[name]['all'])*1.25])     // can use this instead of 1000 to have the max of data: d3.max(data) turns out to be 7
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
        
        // TODO redo x axis ticks


        bins = []
        for (let i = 0; i < leftBins.length; i++) {
            
            // switched order? TODO
            bins.push(rightBins[i]);
            bins.push(leftBins[i]);
        }
  
        function kde(kernel, thresholds, data) {
            return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
        }
        function epanechnikov(bandwidth) {
            return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
        }
        

        
        let thresholds = x.ticks(200)
        let bandwidth = 300;


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

    var updatePlots = function (name, histName, buttonName) {
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
        //console.log('this', numDots.length, histData.length)
        if ((Object.keys(numDots).length > 0) && (Object.keys(histData).length > 0)){
            //console.log('this',numDots, histData)
            console.log('that',numDots, histData);
            numRows = Math.floor(numDots['all'] / numColumns);
            height = numRows * (size + 4);
            //histData = histData
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
            .domain([0, d3.max(histData['income']['all']) * 1.25])     // can use this instead of 1000 to have the max of data: d3.max(data) turns out to be 7
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
            
    let barWidth = (x(bins[0].x1) - x(bins[0].x0)) / 2 - 1


    function kde(kernel, thresholds, data) {
        return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
    }
    function epanechnikov(bandwidth) {
        return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
    }
    
    
    let thresholds = x.ticks(200)
    let bandwidth = 150;
    let leftDensity = kde(epanechnikov(bandwidth), thresholds, histData['income']['all'])

    let newY = d3.scaleLinear()
        .range([histHeight, 0.0001])
        .domain([0, d3.max(leftDensity, function(d) {return d[1]})]);

    svgHist.append("g")
        .call(d3.axisLeft(newY).tickFormat(""));

    //d3.axis().tickFormat("")
    
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

    }

    console.log('here', dotMarkers);


</script>


<button class="button dotButton {dotState === 'all' ? 'pressed' : ''}" id="allButton" on:click="{updatePlots('all', histState, 'allButton')}">All</button>
<button class="button dotButton {dotState === 'missedMeals' ? 'pressed' : ''}" id="mealsButton" on:click="{updatePlots('missedMeals', histState, 'mealsButton')}">Missed meals</button>
<button class="button dotButton {dotState === 'borrowedFood' ? 'pressed' : ''}" id="borrowedButton" on:click="{updatePlots('borrowedFood', histState, 'borrowButton')}">Borrowed Money for Food</button>

<div id="dots" bind:this={dots} class="visualization"></div>

<button class="button histButton {histState === 'income' ? 'pressed' : ''}" id="incomeButton" on:click="{updatePlots(dotState, 'income', 'incomeButton')}">Monthly Income</button>
<button class="button histButton {histState === 'incomePerCapita' ? 'pressed' : ''}" id="incomePerCapitaButton" on:click="{updatePlots(dotState, 'incomePerCapita', 'incomePerCapitaButton')}">Income per capita</button>
<button class="button histButton {histState === 'debt' ? 'pressed' : ''}" id="debtButton" on:click="{updatePlots(dotState, 'debt', 'debtButton')}">Debt</button>
<button class="button histButton {histState === 'remittance' ? 'pressed' : ''}" id="remittanceButton" on:click="{updatePlots(dotState, 'remittance', 'remittanceButton')}">Remittances</button>


<div id="hist" bind:this={dots} class="visualization"></div>

<style>
    .button {
  border: "#a83e32";
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
    background-color: #69b3a2;
}

</style>
