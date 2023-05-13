<script>
    import { userFatsSweets } from '../stores.js';
    import { userGrains } from '../stores.js';
    import { userProtein } from '../stores.js';
    import { userVegetables } from '../stores.js';
    import { userFruit } from '../stores.js';
    import { userDairy } from '../stores.js';

    let inputFatsSweets;
    let inputGrains;
    let inputProtein;
    let inputVegetables;
    let inputFruit;
    let inputDairy;
  
    function handleChange() {
      event.preventDefault();
      userFatsSweets.update( () => inputFatsSweets)
      userGrains.update(() => inputGrains);
      userProtein.update(() => inputProtein);
      userVegetables.update(() => inputVegetables);
      userFruit.update(() => inputFruit);
      userDairy.update(() => inputDairy);
      console.log(inputFatsSweets, inputsGrains, inputProtein, inputVegetables, inputFruit, inputDairy);
    }
  </script>
  
  <main>
      <div class="form-container">
        <label for="title" class="form-element">How many servings of...</label>

          <label for="fatsSweets" class="form-element">fats & sweets</label>
          <select bind:value={inputFatsSweets} class="form-element">
            {#each Array.from(Array(15).keys()).slice(1) as serving}
              <option value={serving}>{serving}</option>
            {/each}
         </select>
  
         <label for="grains" class="form-element">grains</label>
         <select bind:value={inputGrains} class="form-element">
           {#each Array.from(Array(15).keys()).slice(1) as serving}
             <option value={serving}>{serving}</option>
           {/each}
        </select>

        <label for="protein" class="form-element">protein</label>
        <select bind:value={inputProtein} class="form-element">
          {#each Array.from(Array(15).keys()).slice(1) as serving}
            <option value={serving}>{serving}</option>
          {/each}
       </select>

       <label for="vegetables" class="form-element">vegetables</label>
       <select bind:value={inputVegetables} class="form-element">
         {#each Array.from(Array(15).keys()).slice(1) as serving}
           <option value={serving}>{serving}</option>
         {/each}
        </select>

        <label for="fruit" class="form-element">fruit</label>
        <select bind:value={inputFruit} class="form-element">
            {#each Array.from(Array(15).keys()).slice(1) as serving}
            <option value={serving}>{serving}</option>
            {/each}
        </select>

        <label for="dairy" class="form-element">dairy</label>
        <select bind:value={inputDairy} class="form-element">
        {#each Array.from(Array(15).keys()).slice(1) as serving}
            <option value={serving}>{serving}</option>
        {/each}
        </select>
        
        <label for="title" class="form-element">...have you had this week?</label>
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
  
  