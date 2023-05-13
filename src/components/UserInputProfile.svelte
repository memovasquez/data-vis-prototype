<script>
  let img_src = "https://api.dicebear.com/6.x/thumbs/svg?seed=Pepper&mouth=variant3&mouthColor=742a24&radius=50&translateX=3&eyesColor=742a24&backgroundColor=742a24&shapeColor=69b3a2";

  import { userName } from '../stores.js';
  import { userAge } from '../stores.js';
  import { userSex } from '../stores.js';
  import { userLocation } from '../stores.js';
  import { userMonthlyIncome } from '../stores.js';
  import { userHouseholdSize } from '../stores.js';

  let inputAge = 0;
  let inputName = '';
  let inputSex = '';
  let inputLocation = '';
  let inputMonthlyIncome = 0;
  let inputHouseholdSize = 1;

  function handleChange() {
    event.preventDefault();
    userName.update( () => inputName)
    userAge.update(() => inputAge);
    userSex.update(() => inputSex);
    userLocation.update(() => inputLocation);
    userMonthlyIncome.update(() => inputMonthlyIncome);
    userHouseholdSize.update(() => inputHouseholdSize);
    console.log(inputAge, inputName, inputSex, inputLocation, inputMonthlyIncome, inputHouseholdSize);
  }

  const handleSelect = event => {
    event.preventDefault();
    let inputSex = event.target.value;
  };

  function validateMonthlyIncome(event) {
    event.preventDefault();
    const value = parseInt(event.target.value);
    if (isNaN(value) || value < 0 || value > 4500) {
      userMonthlyIncome.set(0);
      event.target.value = 0;
    } else {
      let inputMonthlyIncome = event.target.value;
    }
  }

  function validateHouseholdSize(event) {
    event.preventDefault();
    const value = parseInt(event.target.value);
    if (isNaN(value) || value < 1 || value > 18) {
      userHouseholdSize.set(1);
      event.target.value = 1;
    } else {
      let inputHouseholdSize = event.target.value;
    }
  }

</script>

<main>
    <div>
      <img src={img_src} alt="avatar" alignment="mx_auto" width="200" height="200"/>
    </div>
  <br>
    <div class="form-container">

        <label for="name" class="form-element">Name</label>
        <input bind:value={inputName} class="form-element"/>

        <label for="age" class="form-element">Age</label>
        <select bind:value={inputAge} class="form-element">
          {#each Array.from(Array(101).keys()).slice(1) as age}
            <option value={age}>{age}</option>
          {/each}
        </select>  

        <label for="sex" class="form-element">Sex</label>
        <select id="dropdown" on:change={handleSelect} class="form-element">
          <option value="option1">Female</option>
          <option value="option2">Male</option>
        </select>
      
        <label for="location" class="form-element">Location </label>
        <input bind:value={inputLocation} class="form-element"/>
  
        <label for="monthlyIncome" class="form-element">Monthly Income</label>
        <input type="number" id="monthlyIncome" bind:value={inputMonthlyIncome} on:change={validateMonthlyIncome} class="form-element"/>

        <label for="householdSize" class="form-element">Household Size</label>
        <input type="number" id="householdSize" bind:value={inputHouseholdSize} on:change={validateHouseholdSize} class="form-element"/>

      <button on:click={handleChange}>Submit</button>
    </div>
  </main>
  
  <style>
     * {
        box-sizing: border-box;
      }

      .form-container {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 10px;
        align-items: center;
      }
  
      .form-element {
        margin: 10px;
      }
  
      label {
        text-align: left;
      }

      button {
        background-color: #69b3a2;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
      }
  
      button:hover {
        opacity: 0.8;
      }

  </style>

