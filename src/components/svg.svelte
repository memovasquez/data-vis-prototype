<svg bind:this={el} transform="translate({margin.left}, {margin.top})">
    <g>
        <!-- bars -->
        {#each data as d}
            <rect 
                x="{xScale(d.date)}" 
                y="{yScale(d[city])}"
                width="2"				
                height="{height - yScale(d[city])}"
                fill="blue"
                stroke="#fff"
            />
        {/each}
    </g>
    
    <!-- y axis -->
    <g transform="translate({margin.left}, 0)">
        <path stroke="currentColor" d="{yPath}" fill="none" />

        {#each yTicks as y} 
            <g class="tick" opacity="1" transform="translate(0,{yScale(y)})">
                <line stroke="currentColor" x2="-5" />
                <text dy="0.32em" fill="currentColor" x="-{margin.left}">
                    {y}
                </text>
            </g>
         {/each}
    </g>
    
    <!-- x axis -->
    <g transform="translate(0, {height})">
        <path stroke="currentColor" d="{xPath}" fill="none" />
        
        {#each xTicks as x} 
            <g class="tick" opacity="1" transform="translate({xScale(x)},0)">
                <line stroke="currentColor" y2="6" />
                <text fill="currentColor" y="9" dy="0.71em" x="-{margin.left}">
                    {xLabel(x)}
                </text>
            </g>
        {/each}
</svg>

<!-- 

 -->

 <svg transform="translate({margin.left}, {margin.top})">
        <g>
            <!-- bars -->
            {#each bins as bin, index}
                <rect x={x(index)}
                    y={index}
                    width={2}
                    height={height - 0}
                    fill="blue"
                    stroke="#fff"
                >
                </rect>
            {/each}
        </g>

        <!-- y-axis -->
        <g transform="translate({margin.left},0)" 
        d={d3.axisLeft(y)}>

            
        </g>

    </svg>