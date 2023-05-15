<script>

    import {onMount} from 'svelte';
    import { fly, fade, slide } from 'svelte/transition'
    import * as d3 from 'd3';
    import Scroller from '@sveltejs/svelte-scroller';
    import Dots from './Dots.svelte';
    import Info from './Info.svelte';
    import Histogram from './Histogram.svelte';
    import Nutrition from './Nutrition.svelte';
    import CountryFoodInsecurity from './CountryFoodInsecurity.svelte';
    import Pie from './Pie.svelte';
    import UserProfile from './UserInputProfile.svelte';
    import UserInputDiet from './UserInputDiet.svelte';
    import UserInputMealFin from './UserInputMealFin.svelte';
    import Introduction from './Introduction.svelte';

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
    let pieIndex = 9;
    let pieWindowHeight = 5000;

    // INTRODUCTION, FOR TESTING
    const paragraphs = [
        "Food is a basic human right and necessity. It provides us with the nutrition needed to sustain our lives; it fuels us; it connects us.",
        "But what if we lost access to food? What does life look like without this basic necessity?",
        "In Central America, these are not rhetorical questions, but a reality. It is a reality that is not often easily understood.",
        "Scroll on to better understand what this means."
    ];

    function goTop() {
    document.body.scrollIntoView();
  }

    // stores variables (user input)
    import {userAge, userName} from '../stores';
    import { userSex } from '../stores.js';
    import { userMonthlyIncome } from '../stores.js';
    import { userHouseholdSize } from '../stores.js';

    import {userMissedMeal, userBorrowedMoney, userHasDebt, userDebtAmt} from '../stores';

    let userNameValue;
    let userSexValue;
    let userMonthlyIncomeValue;
    let userHouseholdSizeValue;
    let userAgeValue;
    
    let userMissedMealValue;
    let userBorrowedMoneyValue;
    let userHasDebtValue;
    let userDebtAmtValue;

    //user profile things
    userName.subscribe(value => {
        userNameValue = value;
    })

    userSex.subscribe(value => {
        userSexValue = value;
    })

    userMonthlyIncome.subscribe(value => {
        userMonthlyIncomeValue = value;
    })

    userHouseholdSize.subscribe(value => {
        userHouseholdSizeValue = value;
    })

    userAge.subscribe(value => {
        userAgeValue = value;
    })

    //meal and financial indicators
    userMissedMeal.subscribe(value => {
        userMissedMealValue = value;
    })

    userBorrowedMoney.subscribe(value => {
        userBorrowedMoneyValue = value;
    })
    
    userHasDebt.subscribe(value => {
        userHasDebtValue = value;
    })

    userDebtAmt.subscribe(value => {
        userDebtAmtValue = value;
    })

    let userInput;

    $:{

        userInput = {
            name: userNameValue, 
            income: userMonthlyIncomeValue, 
            sex: userSexValue, 
            hh_size: userHouseholdSizeValue, 
            age: userAgeValue,
            missedMeal: userMissedMealValue,
            hasDebt: userHasDebtValue,
            debtAmt: userDebtAmtValue,
            borrowedMoney: userBorrowedMoneyValue,
        };
    }

    
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

    <!-- <section id="section">
        <Introduction />
    </section> -->
    <div class="foreground" slot="foreground">
    <section class="panel">
        {#if index == 0}
        <p class="context" transition:fly="{{ y: 20, duration: 200 }}">
            Food is a basic human right and necessity. It provides us with the nutrition needed to sustain our lives; it fuels us; it connects us.
        </p>
        {/if}
        <!-- 'But what if we lost access to food? What does life look like without this basic necessity?',
        'In Central America, these are not rhetorical questions, but a reality. It is a reality that is not often easily understood.',
        'Scroll on to better understand what this means.' -->

    </section>
    <section class="panel">
        {#if index == 1}
        <p class="context" transition:fly="{{ y: 20, duration: 200 }}">
            But what if we lost access to food? What does life look like without this basic necessity?
        </p>
        {/if}
        <!-- 'But what if we lost access to food? What does life look like without this basic necessity?',
        'In Central America, these are not rhetorical questions, but a reality. It is a reality that is not often easily understood.',
        'Scroll on to better understand what this means.' -->
    </section>
    <section class="panel">
        {#if index == 2}
        <p class="context" transition:fly="{{ y: 20, duration: 200 }}">
            In Central America, these are not rhetorical questions, but a reality. It is a reality that is not often easily understood.
        </p>
        {/if}
        <!-- 'But what if we lost access to food? What does life look like without this basic necessity?',
        'In Central America, these are not rhetorical questions, but a reality. It is a reality that is not often easily understood.',
        'Scroll on to better understand what this means.' -->
    </section>
    <section class="panel">
        {#if index == 3}
        <p class="context" transition:fly="{{ y: 20, duration: 200 }}">
            Scroll on to better understand what this means.
        </p>
        {/if}
        <!-- 'But what if we lost access to food? What does life look like without this basic necessity?',
        'In Central America, these are not rhetorical questions, but a reality. It is a reality that is not often easily understood.',
        'Scroll on to better understand what this means.' -->
    </section>
    <section class="panel" style="background-color: #eed4bc;">
        {#if index == 4}
        <div align="center" transition:fly="{{ y: 20, duration: 200 }}">
        <table width="80%">
            <tr>
                <td width="50%">
                    <p style="text-align:left">First, if you're comfortable sharing, let us know some details about yourself. 
                        We'll use your answers to show you how you compare to people in El Salvador.</p>
                </td>
                <td align="center">
                    <UserProfile/>
                </td>
            </tr>  
        </table>
        </div>
        {/if}
    </section> 

    <section class="panel">
        {#if index == 5}
        <div class="text"  transition:fly="{{ y: 20, duration: 200 }}">
            <p class="context">
                In the following visualizations, we will be using data contributed by the United Nations World Food Programme (WFP)
                which includes responses from over 1700 Salvadorans to questions regarding their experiences with food security and nutrition.
            </p>
        </div>
        {/if}
    </section>

    <section class="panel" style="background-color: #eed4bc;">
        {#if index == 6}
        <div align="center" transition:fly="{{ y: 20, duration: 200 }}">
        <table width="90%">
            <tr>
                <td width="50%">
                    <b style="margin-bottom:10cm;"> "Hi, {userNameValue}. I'm Laura! Nice to meet you."</b>
                    <br/>
                    <br/>
                    <br/>
                    <p style="text-align:left">Laura is a Salvadoran woman who responded to the WFP survey. 
                        We'll use her responses to introduce you to food insecurity in El Salvador.</p>
                </td>
                <td align="center">
                    <img src="https://drive.google.com/uc?export=view&id=1JK7MqnTyOQA0c1l8Ahsk6L-yGR6jiF2s" alt="Image of Laura"/>
                </td>
            </tr>  
        </table>
        </div>
        {/if}
    </section> 
      <!-- <section class="panel" id="slide1" style="background-color: #eed4bc;">
          <b>ONE</b>
          {#if wfp_data.length !== 0 }
          <Histogram bind:hist_data={wfp_data}></Histogram>
          <Pie bind:pie_data={wfp_data}></Pie>
          {/if}
      </section> -->
    <section class="panel" style="background-color: #eed4bc; height:150vh">
        {#if index == 7}
        <b class="laura" transition:fly="{{ y: 20, duration: 200 }}">"Step into my shoes!"</b>
        <br/>
        <br/>
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
        <p class="context" transition:fly="{{ y: 20, duration: 200 }}">Learn more about Laura by selecting the information fields below. How do you compare to Laura and other Salvadoreans?  Laura's information is 
            represented in red on the charts and yours in blue (if in same category, the bar will be gray). </p>
        </div>
        <br />
          <Info bind:userInput={userInput} />
        {/if}
    </section>
    <section class="panel" >
        {#if index == 8}
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <b class="laura">"To be honest, I've been struggling to get enough food on the table this week."</b> 
            <br />
            <br />
            <p class="context">If you're comfortable sharing, answer these questions before we continue.</p>
            <br />
            <br />
            <br />
        </div>
        {/if}
        </section> 

    <section class="panel">
        <!-- <UserInputDiet /> -->
        <UserInputMealFin />

        <!-- <p>{userMissedMealValue}</p>
        <p>{userBorrowedMoneyValue}</p>
        <p>{userHasDebtValue}</p>
        <p>{userDebtAmtValue}</p> -->
    </section>

    <section class="panel" >
        {#if index == 10}
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <b class="laura"> "Thank you for sharing your experiences with me."</b>
        </div>
        {/if}
    </section>
    <section class="textPanel" >
        <div class="text">
            {#if index == 11}
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
      <!-- </section>
      <section class="panel">
        <div class="text">
        <p class="context">
            <a href="https://globalnutritionreport.org/resources/nutrition-profiles/latin-america-and-caribbean/central-america/?fbclid=IwAR2x_uxJPhO7Er4RdMdym1iUhFr7FLRVlU9i1EXwUBR0cuwoahMM_EGLfaU">
                According to the Global Nutrition report </a>, an average of 12.5% of adult women in the Central American subregion live with diabetes, as well as 11.4% of men. 
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
      </section> -->
      <section class="panel" >
        {#if index == 13}
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <b class="laura">"Money has also been difficult this month. I've had to miss some meals and borrow money."</b>
        </div>
        {/if}
    </section> 
    <section class="panel" >
        {#if index == 14}
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <p class="context">
            Food insecurity and financial security are very often linked. In El Salvador, the poverty rate is 
                <a href="https://www.worldbank.org/en/country/elsalvador/overview">nearly three times</a> what it is in the 
                United States. What does the relationship between food security and financial security indicators look like in El Salvador 
                and how do you compare?
            </p> 
        </div>
        {/if}
      </section>
      <section class="panel" style="background-color: #eed4bc; height:200vh">
        <!-- {#if index == 15} -->
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <p class="context"> The dots below represent people and the graph underneath shows their distribution according to a financial indicator. 
                Laura is represented with red and you are represented with blue. Notice where you fall in the data below. Would you have to miss a meal or borrow money for food this week?</p>
        </div>
        <!-- {/if} -->
        <Dots bind:userInput={userInput}/>

        </section>
        <section class="panel" style="background-color: #eed4bc;">
        {#if index == 16}
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <p class="context">
                According to a <a href="https://www.paho.org/en/news/19-1-2023-report-131-million-people-latin-america-and-caribbean-cannot-access-healthy-diet?fbclid=IwAR1vB5a8lAmefLsKEq_xS1-3SHQ1sRR4btBgLh0Iep1OBR7NarKNF6bILbs#:~:text=In%202021%2C%2040.6%25%20of%20the,in%20the%20world%20(11.7%25)"> UN report in 2021 </a>
                , 40.6% of the Central American population experiences moderate or severe food insecurity, compared to 29.3% worldwide. 
                Severe food insecurity was also more frequent in the region (14.2%) than in the world (11.7%).</p>
            <br/>
            <br/>
        </div>
        {/if}
      </section>
      <section class="panel" style="background-color: #eed4bc;">
        {#if index == 17}
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <b class="laura"> "Frankly, I know MANY people in similar situations as me here in El Salvador."</b>
        </div>
        <br/>
        <div class="text">
            <p class="context"> 
                Food insecurity is a serious issue in all regions of the world; unfortunately, there's been a recent upward trend in reported food insecurity in many countries. <br/> The Food and Agriculture Oranization of the United Nations <a href="https://data.apps.fao.org/catalog/about" target="_blank">(FAO)</a> has been collecting data on food security indicators
                 for over 245 countries including El Salvador and even more developed countries, such as the United States, since 1961.<br/>
                <br/> How common do you think food insecurity is in El Salvador?
            </p>
        </div>
        {/if}
        </section> 
        
    <section class="panel" style="background-color: #eed4bc;">
          <!-- {#if fao_data.length !== 0} -->
          <CountryFoodInsecurity bind:fao_data={fao_data}/>
          <!-- {/if} -->

    </section>
    

    <section class="panel" style="background-color: #eed4bc;">
        {#if index == 19}
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <b class="laura">"Hopefully you understand me a bit better. But I do wonder..."</b>
        </div>
        <div class="text">
            <b class="laura">"What would you do if you were me?"</b>
        </div>
        {/if}
    </section> 
    <section class="panel" style="background-color: #eed4bc;">
        {#if index == 20}
        <div class="text" transition:fly="{{ y: 20, duration: 200 }}">
            <p class="context">Links to support food insecurity in Central America</p>
            <br/>
            <br/>
            <b>TODO include links</b>
        </div>
        {/if}
    </section> 
    <button on:click={goTop} style="justify-self:left ; align-self: center; margin-right: 50px; background-color: #742a24; height:100px; width:200px; color:white; border-radius: 5px;" >Go back to top</button>
    <p style="background-color: #eed4bc;">Thank you to the <a href="https://www.wfp.org/" target="_blank">World Food Programme</a> for providing the data used in these interactive data visualizations</p>

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


