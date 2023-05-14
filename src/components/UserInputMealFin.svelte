<script>
  
    import {userMissedMeal, userBorrowedMoney, userHasDebt, userDebtAmt} from '../stores';
    
    let hasBorrowedMoney = false;
    let hasMissedMeal = false;
    let hasDebt = false;
    let debtAmount = 0;

  
    function handleChange() {
      event.preventDefault();
        userBorrowedMoney.update(() => hasBorrowedMoney);
        userMissedMeal.update(() => hasMissedMeal);
        userHasDebt.update(() => hasDebt);
        userDebtAmt.update(() => debtAmount);
    }
  
    const handleSelectMoney = event => {
      event.preventDefault();
      hasBorrowedMoney = event.target.value;
    };

    const handleSelectMeal = event => {
      event.preventDefault();
      hasMissedMeal = event.target.value;
    };

    const handleSelectDebt = event => {
      event.preventDefault();
      hasDebt = event.target.value;
    };


  
    function validateDebtAmount(event) {
      event.preventDefault();
      const value = parseInt(event.target.value);
      if (isNaN(value) || value < 0 || value > 1200) {
        userDebtAmt.set(0);
        event.target.value = 0;
        debtAmount = 0;
      } else {
        debtAmount = event.target.value;
      }
    }
  
  
  </script>

<main>
    
    <div class="form-container">

        <label for="missedMeal" class="label">Have you missed a meal in the past week?</label>
        <select id="dropdown" on:change={handleSelectMeal} class="form-element">
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>

        <label for="borrowedMoney" class="label">Have you borrowed money for food in the past week?</label>
        <select id="dropdown" on:change={handleSelectMoney} class="form-element">
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>

        <label for="hasDebt" class="label">Do you have any revolving debt?</label>
        <select id="dropdown" on:change={handleSelectDebt} class="form-element">
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>

        {#if hasDebt}
        <label for="debtAmount" class="label">Amount of Debt</label>
        <input type="number" id="debtAmount" bind:value={debtAmount} on:change={validateDebtAmount} class="form-element"/>
        {/if}

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
       margin-right: 300px;
       margin-left: 300px;
       margin-top:10px;
       margin-bottom:10px
     }
 
     label {
       text-align: left;
       margin-left: 100px;
       margin-right: 10px;
       margin-top:10px;
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
       margin: 4px 100px;
       cursor: pointer;
       border-radius: 5px;
     }
 
     button:hover {
       opacity: 0.8;
     }

 </style>

