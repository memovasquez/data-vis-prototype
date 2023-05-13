<script>
  import { Img } from 'flowbite-svelte';
  let img_src = "data:image/png;base64,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";

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
      <Img src={img_src} alt="sample 1" alignment="mx_auto" size="max-w-lg" class="rounded-full" />
    </div>

    <form>
      <div>
          <label for="name">Name</label>
          <input bind:value={inputName}/>
      </div>
      <div>
        <label for="age">Age</label>
        <select bind:value={inputAge}>
          {#each Array.from(Array(101).keys()).slice(1) as age}
            <option value={age}>{age}</option>
          {/each}
        </select>        
      </div>
      <div>
        <label for="sex">Sex</label>
        <select id="dropdown" on:change={handleSelect}>
          <option value="option1">Female</option>
          <option value="option2">Male</option>
        </select>
      </div>
      <div>
        <label for="location">Location </label>
        <input bind:value={inputLocation}/>
      </div>
      <div>
        <label for="monthlyIncome">Monthly Income</label>
        <input type="number" id="monthlyIncome" bind:value={inputMonthlyIncome} on:change={validateMonthlyIncome}/>
      </div>
      <div>
        <label for="householdSize">Household Size</label>
        <input type="number" id="householdSize" bind:value={inputHouseholdSize} on:change={validateHouseholdSize}/>
      </div>
      <button on:click={handleChange}>Submit</button>
    </form>

  </main>
  
  <style>
     * {
        box-sizing: border-box;
      }
      form {
        display: flex;
        flex-direction: column;
        width: 300px;
      }
  
      form > div{
        display: flex;
        justify-content: space-between;
      }
  
      form > div + * {
        margin-top: 10px;
      }

      button {
      display: block;
      } 

      .active {
      background-color: #ff3e00;
      color: white;
      }
  </style>

