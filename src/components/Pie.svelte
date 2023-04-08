<script>
    import * as d3 from 'd3';
    //input data 
    export let pie_data = []
    
    
    let arcGenerator = d3.arc()
        .innerRadius(10)
		.outerRadius(100)
		.padAngle(.02)
		.cornerRadius(4);

	let arc_data = []

    // // color mapping function
	const arc_color_default = d3.scaleLinear()
		.range(["#faffd1", "#db921d", "#b86a04", "#a65d29" ,"#6e3003","#3c2411"])
		// .domain([0,3,6,9,12,15,18,21,24]);

    let color_function = arc_color_default;
    

	// state trackers
	let hovered = -1; // index of the hovered arc, -1 when nothing is hovered
	let recorded_mouse_position = { x: 0, y: 0 };

    $: {
        let person1 = pie_data[0];

        const picked = (({ fcs_staples, fcs_pulses, fcs_dairy, fcs_proteins, fcs_veg, fcs_fruits, fcs_fats, fcs_sugars }) => (
        {fcs_staples : Number(fcs_staples),
        fcs_pulses : Number(fcs_pulses),
        fcs_dairy : Number(fcs_dairy),
        fcs_proteins : Number(fcs_proteins),
        fcs_veg : Number(fcs_veg),
        fcs_fruits : Number(fcs_fruits),
        fcs_fats : Number(fcs_fats),
        fcs_sugars : Number(fcs_sugars)}))(person1);

        const arc_color = d3.scaleOrdinal(d3.schemeAccent).domain(Object.keys(picked));
        color_function = arc_color;

        let pie = d3.pie().value( (d) => d[1] );
        arc_data = pie(Object.entries(picked)); 
        

    }

  





</script>

<div class="visualization">
    <svg width="500" height="500">
        <g transform="translate(250,120)">
            {#each arc_data as data, index}
			<path 
				d={arcGenerator({
					startAngle: data.startAngle,
					endAngle: data.endAngle
				})}
				fill={index === hovered ? "blue": color_function(data.data[0]) }
                
                on:mouseover={(event) => {
                     hovered = index;
                     recorded_mouse_position = {
							x: event.pageX,
							y: event.pageY
						};
                }}
				on:mouseout={(event) => { hovered = -1; }}

			/>
			{/each}

        </g>
    </svg>
    <div
		class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}	
        style="left: {recorded_mouse_position.x + 40}px; top: {recorded_mouse_position.y + 40}px"
	>
		{#if hovered !== -1}
		    {arc_data[hovered].data[0].slice(4,)} were eaten {arc_data[hovered].data[1]} days in the past week
		{/if}
	</div>



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
