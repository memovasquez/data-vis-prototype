<script>

    import {onMount} from 'svelte';
    import * as d3 from 'd3';
    import Scroller from '@sveltejs/svelte-scroller';
    import Dots from './Dots.svelte';
    import Info from './Info.svelte';
    import Histogram from './Histogram.svelte';
    import Nutrition from './Nutrition.svelte';
    import CountryFoodInsecurity from './CountryFoodInsecurity.svelte';
    import Pie from './Pie.svelte';
    import Profile from './Profile.svelte';

    // properties for data to be passed in
    export let wfp_data = [];
    export let fao_data = [];
    let path = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYmcthdA2QHcxz-7LyWtPwFCw6EcrxqdbKk7ABJNdcDGEb4u5AyoU1Gg3716krw3_HmqaH7tzGBd17/pub?output=csv";

    
    let count;
	let index;
	let offset;
	let progress;
    let width;
	let top = 0.1;
	let threshold = 0.5;
	let bottom = 0.9;
    let storytext;
    

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
      <section class="panel" style="background-color: #eed4bc;">
        <b>Food is a basic human right and necessity. It provides us with the nutrition needed to sustain our lives; it fuels us; it connects us.</b>
    </section> 
    <section class="panel" style="background-color: #eed4bc;">
        <b>But what if we lost access to food? What does life look like without this basic necessity?</b>
    </section>
    <section class="panel" style="background-color: #eed4bc;">
        <b>In Central America, these are not rhetorical questions, but a reality. It is a reality that is not often easily understood.</b>
    </section>
    <section class="panel" style="background-color: #eed4bc;">
        <b>Scroll on to better understand what this means.</b>
    </section> 
      <section class="panel" style="background-color: #eed4bc;">
        <b>First, if you're comfortable sharing, let us know some details about yourself.</b>
      </section> 
      <section class="panel" style="background-color: #eed4bc;">
        <b>PROFILES + USER INPUT</b>
        <Profile/>
      </section>  
      <section class="panel" style="background-color: #eed4bc;">
        <b>"Hi, NAME. I'm Laura! Nice to meet you." Get to know Laura better! Here are some details about her.</b>
      </section> 
      <!-- <section class="panel" id="slide1" style="background-color: #eed4bc;">
          <b>ONE</b>
          {#if wfp_data.length !== 0 }
          <Histogram bind:hist_data={wfp_data}></Histogram>
          <Pie bind:pie_data={wfp_data}></Pie>
          {/if}
      </section> -->
      <section class="panel" style="background-color: #eed4bc;">
        <b>"Step into my shoes!" Hover over the infographic to get a better idea of Laura's life and wwhere she lives. Where do you fall in this context?</b>
          <Info />
        </section>
        <section class="panel" style="background-color: #eed4bc;">
            <b>"To be honest, I've been struggling to get enough food on the table this week."" If you're comfortable sharing, answer these questions before we continue.</b>
        </section> 
      <section class="panel" style="background-color: #eed4bc;">
        <b>"Interesting. Thank you for sharing your experiences."</b>
            <Nutrition />
        <b>According to the Global Nutrition report, an average of 12.5% of adult women in the Central American subregion live with diabetes, as well as 11.4% of men. 
            In addition, 34.5% of women and 25.1% of men live with obesity.
            No country in the subregion is on course to meet the targets for low birth weight, diabetes among men or women, or obesity among men or women.
            </b>
      </section>
      <section class="panel" style="background-color: #eed4bc;">
        <b>"Money has also been difficult this month. I've had to miss some meals and borrow money."</b>
    </section> 
      <section class="panel" style="display:block; margin:auto" align="center">
        <b>Notice where you fall in the data below. Would you have to miss a meal or borrow money for food this week?</b>
            <Dots />
        <b>According to a UN report in 2021, 40.6% of the Central American population experiences moderate or severe food insecurity, compared to 29.3% worldwide. 
            Severe food insecurity was also more frequent in the region (14.2%) than in the world (11.7%).</b>
      </section>
      <section class="panel" style="background-color: #eed4bc;">
        <b>"To be honest, I know lots of people in similar situations as me here in El Salvador."</b>
    </section> 
      <section class="panel" style="background-color: #eed4bc;">
        <b>How common do you think food insecurity is in Central American Countries?</b>
          {#if fao_data.length !== 0}
          <CountryFoodInsecurity bind:fao_data={fao_data}/>
          {/if}
          <b>How did your guesses compare to the actual rates of food insecurity?</b>
      </section>
      <section class="panel" style="background-color: #eed4bc;">
        <b>"Hopefully you understand me a bit better. But I do wonder..."</b>
    </section> 
    <section class="panel" style="background-color: #eed4bc;">
        <b>"What would you do if you were me?"</b>
    </section> 
    <section class="panel" style="background-color: #eed4bc;">
        <b>Links to support food insecurity in Central America</b>
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
		height: 100vh;
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


