<script>

    import {onMount} from 'svelte';
    import { fly } from 'svelte/transition'
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
    let pieIndex = 11;
    let pieWindowHeight = 5000;
    

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
    <!-- <div class="progress-bars" slot="background">
      <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress value={count ? (index + 1) / count : 0} />

      <p>offset in current section</p>
      <progress value={offset || 0} />

      <p>total progress</p>
      <progress value={progress || 0} />
    </div> -->

    <!-- <div class="pie-chart" slot="background" style="background-color: #eed4bc;">
        {#if (index == pieIndex)}
        <Nutrition bind:progress={progress} bind:index={index} bind:offset={offset}/>
        {/if}
    </div> -->


  <div class="foreground" slot="foreground">
    <section class="panel" >
        <div class="text">
            <p class="context">Food is a basic human right and necessity. It provides us with the nutrition needed to 
                sustain our lives; it fuels us; it connects us.</p>
        </div>
    </section> 
    <section class="panel">
        <div class="text">
            <p class="context">But what if we lost access to food? What does life look like without this basic necessity?</p>
        </div>
    </section>
    <section class="panel" style="background-color: #eed4bc;">
        <div class="text">
            <p class="context">In Central America, these are not rhetorical questions, but a reality. It is a reality 
                that is not often easily understood.</p>
        </div>
    </section>
    <section class="panel" style="background-color: #eed4bc;">
        <div class="text">
            <p class="context">Scroll on to better understand what this means.</p>
        </div>
    </section> 
    <section class="panel" style="background-color: #eed4bc;">
        <table width="100%">
            <tr>
                <td width="50%">
                    <p style="text-align:left">First, if you're comfortable sharing, let us know some details about yourself. 
                        We'll use your answers to show you how you compare to people in El Salvador.</p>
                </td>
                <td>
                    <Profile/>
                </td>
            </tr>  
        </table>

    </section> 
    <section class="panel">
        TODO introduce dataset
    </section>
    <!-- <section class="panel" style="background-color: #eed4bc;">
        <b>PROFILES + USER INPUT</b>
        <Profile/>
    </section>   -->
    <section class="panel" style="background-color: #eed4bc;">
        <table width="100%">
            <tr>
                <td width="50%">
                    <b style="margin-bottom:10cm;"> "Hi, NAME. I'm Laura! Nice to meet you."</b>
                    <br/>
                    <br/>
                    <br/>
                    <p style="text-align:left">Laura is a Salvadoran woman who responded to the WFP survey. 
                        We'll use her responses to introduce you to food insecurity in El Salvador.</p>
                </td>
                <td>
                <img src="https://drive.google.com/uc?export=view&id=1JK7MqnTyOQA0c1l8Ahsk6L-yGR6jiF2s" alt="Image of Laura"/>
                </td>
            </tr>  
        </table>
    </section> 
      <!-- <section class="panel" id="slide1" style="background-color: #eed4bc;">
          <b>ONE</b>
          {#if wfp_data.length !== 0 }
          <Histogram bind:hist_data={wfp_data}></Histogram>
          <Pie bind:pie_data={wfp_data}></Pie>
          {/if}
      </section> -->
    <section class="panel" style="background-color: #eed4bc; height:150vh">
        <b class="laura">"Step into my shoes!"</b>
        <br/>
        <br/>
        <div class="text">
        <p class="context">Learn more about Laura by selecting the information fields below. Laura's information is 
            represented in red on the charts and yours in blue. How do you compare to Laura and other Salvadorans?</p>
        </div>
        <br />
          <Info />
        
    </section>
    <section class="panel" >
        <div class="text">
            <b class="laura">"To be honest, I've been struggling to get enough food on the table this week."</b> 
            <br />
            <br />
            <p class="context">If you're comfortable sharing, answer these questions before we continue.</p>
            <br />
            <br />
            <br />
            <b>TODO are we missing stuff here?</b>
        </div>
        </section> 
    <section class="panel" >
        <div class="text">
            <b class="laura"> "Thank you for sharing your experiences with me."</b>

        </div>
    </section>
    <section class="textPanel" >
        <div class="text">
            {#if index == 10}
            <p class="context" transition:fly="{{ y: 20, duration: 200 }}">
                El Salvador has made significant progress in recent years to improve food security among its citizens. 
                However, due to high poverty levels and crime rates, food security continues to be a serious problem.
                In El Salvador, <a href="https://www.wfp.org/countries/el-salvador">14% of children under 5 suffer from malnutrition</a> 
                whereas in the United States, <a href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/malnutrition">
                    child malnutrition rates are closer to 1% </a>.
            </p> 
            {/if}
        </div>
      </section>
      <section class="panel" style="height:{pieWindowHeight}px">

            <!-- <Nutrition /> -->
            <Nutrition bind:progress={progress} bind:index={index} bind:offset={offset} bind:windowHeight={pieWindowHeight}/>

        
      </section>
      <section class="panel">
        <div class="text">
        <p class="context">According to the Global Nutrition report, an average of 12.5% of adult women in the Central American subregion live with diabetes, as well as 11.4% of men. 
            In addition, 34.5% of women and 25.1% of men live with obesity.
            No country in the subregion is on course to meet the targets for low birth weight, diabetes among men or women, or obesity among men or women.
        </p>
        <br/>
        <br/>
        <br/>
        <b>
            TODO do we need to cite these?
        </b>
        </div>
      </section>
      <section class="panel" >
        <div class="text">
            <b class="laura">"Money has also been difficult this month. I've had to miss some meals and borrow money."</b>
        </div>
    </section> 
    <section class="panel" >
        <div class="text">
            <p class="context">
            Food insecurity and financial security are very often linked. In El Salvador, the poverty rate is 
                <a href="https://www.worldbank.org/en/country/elsalvador/overview">nearly three times</a> what it is in the 
                United States. What does the relationship between food security and financial security indicators look like in El Salvador 
                and how do you compare?
            </p> 
        </div>
      </section>
      <section class="panel" style="background-color: #eed4bc; height:200vh">
        <div class="text">
            <p class="context"> The dots below represent people and the graph underneath shows their distribution according to a financial indicator. 
                Laura is represented with red and you are represented with blue. Notice where you fall in the data below. Would you have to miss a meal or borrow money for food this week?</p>
        </div>
        <Dots />
        <br />
        <br />
        <div class="text">
            <p class="context">According to a UN report in 2021, 40.6% of the Central American population experiences moderate or severe food insecurity, compared to 29.3% worldwide. 
                Severe food insecurity was also more frequent in the region (14.2%) than in the world (11.7%).</p>
            <br/>
            <br/>
            <b>TODO cite these stats^</b>
        </div>

      </section>
      <section class="panel" style="background-color: #eed4bc;">
        <div class="text">
            <b class="laura"> "To be honest, I know lots of people in similar situations as me here in El Salvador."</b>
        </div>
    </section> 
      <section class="panel" style="background-color: #eed4bc;">
        <div class="text">
            <p class="context">How common do you think food insecurity is in Central American Countries?</p>
        </div>
          {#if fao_data.length !== 0}
          <CountryFoodInsecurity bind:fao_data={fao_data}/>
          {/if}
        <div class="text">
            <p class="context"> How did your guesses compare to the actual rates of food insecurity? </p>
        </div>
      </section>
      <section class="panel" style="background-color: #eed4bc;">
        <div class="text">
            <b class="laura">"Hopefully you understand me a bit better. But I do wonder..."</b>
        </div>
    </section> 
    <section class="panel" style="background-color: #eed4bc;">
        <div class="text">
            <b class="laura">"What would you do if you were me?"</b>
        </div>
    </section> 
    <section class="panel" style="background-color: #eed4bc;">
        <div class="text">
            <p class="context">Links to support food insecurity in Central America</p>
            <br/>
            <br/>
            <b>TODO include links</b>
        </div>
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
        background-color: #eed4bc;
	}

    .textPanel {
        height: 50vh;
        width: 100%;
        background-color: #eed4bc;
    }

    .text {
        width: 75%;
        margin: auto;
        text-align: center;
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

    .context {
        text-align:left; 
        width:600px; 
        display: inline-block;
    }

    .laura {
        text-align:left; 
        width:600px; 
        display: inline-block;
    }

</style>


