<script>
  import { Img } from 'flowbite-svelte';
  let img_src = "data:image/png;base64,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";

  let name;
  let age;
  let sex;
  let location;
  let monthlyIncome;
  let household;
  let profileData = [
        "name",
        "age",
        "sex",
        "location",
        "monthlyIncome",
        "household",
    ]

</script>

<main>
    <div>
      <Img src={img_src} alt="sample 1" alignment="mx_auto" size="max-w-lg" class="rounded-full" />
    </div>

    <form>
      <div>
          <label for="name">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value=""
          />
      </div>
      <div>
        <label for="name">Age</label>
        <input
          type="integer"
          id="age"
          name="age"
          value=""
        />
      </div>
      <div>
        <label for="name">Sex</label>
        <input
          type="text"
          id="sex"
          name="sex"
          value=""
        />
      </div>
      <div>
        <label for="Location">Income</label>
        <input
          type="text"
          id="location"
          name="location"
          value=""
        />
      </div>
      <div>
        <label for="name">Household Size</label>
        <input
          type="text"
          id="household"
          name="household"
          value=""
        />
      </div>
      <button class:active="submit" >Submit</button>
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