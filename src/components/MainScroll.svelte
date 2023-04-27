<script>

    import {onMount} from 'svelte';
    import * as d3 from 'd3';
    import Scroller from '@sveltejs/svelte-scroller';
    import Dots from './Dots.svelte';
    import Histogram from './Histogram.svelte';
    import Nutrition from './Nutrition.svelte';
    import CountryFoodInsecurity from './CountryFoodInsecurity.svelte';
    import Pie from './Pie.svelte';

    // properties for data to be passed in
    export let wfp_data = [];
    export let fao_data = [];
    
    let count;
	let index;
	let offset;
	let progress;
    let width;
	let top = 0.1;
	let threshold = 0.5;
	let bottom = 0.9;
    

</script>

<main>
    <Scroller
        top={0.0}
        bottom={1}
        threshold={0.5}
        bind:count
        bind:index
        bind:offset
        bind:progress
    >

    <!-- Progress Bars -->
    <!-- Toogle visibility on/off in css -->
    <div class="progress-bars" slot="background">
      <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress value={count ? (index + 1) / count : 0} />

      <p>offset in current section</p>
      <progress value={offset || 0} />

      <p>total progress</p>
      <progress value={progress || 0} />
    </div>


  <div class="foreground" slot="foreground">
      <section class="panel blue" id="slide1" style="background-color: turquoise;">
          <b>ONE</b>
          {#if wfp_data.length !== 0 }
          <Histogram bind:hist_data={wfp_data}></Histogram>
          <Pie bind:pie_data={wfp_data}></Pie>
          {/if}
      </section>
      <section class="panel" style="background-color: white-smoke;">
          <b>TWO</b>
            <Nutrition />
      </section>
      <section class="panel" style="display:block; margin:auto" align="center">
          <b>THREE</b>
            <Dots/>
      </section>
      <section class="panel" style="background-color: burlywood;">
          <b>FOUR</b>
          {#if fao_data.length !== 0}
          <CountryFoodInsecurity bind:fao_data={fao_data}/>
          {/if}
      </section>
  </div>


    </Scroller>

</main>

<style>
    main {
        text-align: center;
        font-family: "Nunito", sans-serif;
        font-weight: 300;
        line-height: 2;
        font-size: 24px;
        color: var(--color-text);

    }

    .panel {
		height: 150vh;
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

    .background {
    width: 100%;
    height: 100vh;
    position: relative;
    /* outline: green solid 3px; */
    }
    .foreground {
        width: 100%;
        margin: 0 auto;
        height: auto;
        position: relative;
        /* outline: red solid 3px; */
    }
    .progress-bars {
        position: absolute;
        background: rgba(170, 51, 120, 0.2) /*  40% opaque */;
        visibility: hidden;
    }



</style>


