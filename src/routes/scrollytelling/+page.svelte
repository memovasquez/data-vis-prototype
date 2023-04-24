<script>

    import {onMount} from 'svelte';
    import * as d3 from 'd3';
    import Histogram from '../../components/Histogram.svelte';
    // import { TweenMax, TimelineMax } from "gsap"; // What to import from gsap
    // import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

    
    let pie_data = [];
    let path = "https://docs.google.com/spreadsheets/d/1-y0RKyaYHCBK1mxT4mnhygGpy7wSFp3jYHk6lQNmKBg/gviz/tq?tqx=out:csv";
    
    onMount(async () => {
        d3.csv(path).then((d) => {
            pie_data = d;
        })
	});
    
    
    onMount( async () => {
        
        const ScrollMagic = (await import('scrollmagic')).default;
        const plugin = (await import('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'));
        // ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax); // Pass gsap import to Scrollmagic


        let controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave',
                duration: "100%" // this works just fine with duration 0 as well
                // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
                // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
            }
        });

        // let wipeAnimation = new TimelineMax()
        //     // animate to second panel
		// 	.to("#slideContainer", 0.5, {z: -150})		// move back in 3D space
		// 	.to("#slideContainer", 1,   {x: "-25%"})	// move in to first panel
		// 	.to("#slideContainer", 0.5, {z: 0})				// move back to origin in 3D space
		// 	// animate to third panel
		// 	.to("#slideContainer", 0.5, {z: -150, delay: 1})
		// 	.to("#slideContainer", 1,   {x: "-50%"})
		// 	.to("#slideContainer", 0.5, {z: 0})
		// 	// animate to forth panel
		// 	.to("#slideContainer", 0.5, {z: -150, delay: 1})
		// 	.to("#slideContainer", 1,   {x: "-75%"})
		// 	.to("#slideContainer", 0.5, {z: 0});
        
        // get all slides
        let slides = document.querySelectorAll("section.panel");


        // create scene for every slide
        for (let i=0; i<slides.length; i++) {
            new ScrollMagic.Scene({
                    triggerElement: slides[i]
                })
                .setPin(slides[i], {pushFollowers: false})
                .addIndicators() // add indicators (requires plugin)
                .addTo(controller);
        }   

    //     // create scene to pin and link animation
	// 	new ScrollMagic.Scene({
	// 			triggerElement: "#pinContainer",
	// 			triggerHook: "onLeave",
	// 			duration: "500%"
	// 		})
	// 		.setPin("#pinContainer")
	// 		.setTween(wipeAnimation)
	// 		.addIndicators() // add indicators (requires plugin)
	// 		.addTo(controller);


    })
    
    


</script>

<main>
    <h1>storytelling</h1>
    <!-- <div id="pinContainer"> -->
        <!-- <div id="slideContainer"> -->
            <section class="panel blue" id="slide1" style="background-color: turquoise;">
                <b>ONE</b>
                {#if pie_data.length !== 0 }
                <Histogram bind:hist_data={pie_data}></Histogram>
                {/if}
            </section>
            <section class="panel" style="background-color: white-smoke;">
                <b>TWO</b>
            </section>
            <section class="panel" style="background-color: green;">
                <b>THREE</b>
            </section>
            <section class="panel" style="background-color: burlywood;">
                <b>FOUR</b>
            </section>
        <!-- </div>     -->
    <!-- </div> -->

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

    .panel {
		height: 200vh;
		width: 100%;
	}

	.panel.green {
		margin-bottom: 400px
	}

    #pinContainer {
        width: 100%;
		height: 100%;
		overflow: hidden;
		-webkit-perspective: 1000;
		        perspective: 1000;
    }

    #slideContainer {
		width: 400%; /* to contain 4 panels, each with 100% of window width */
		height: 100%;
	}


</style>


