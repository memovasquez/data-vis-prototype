<script>
    import Avatar from '@fouita/avatar';
</script>

<main>
    <div class="flex justify-center" key="k1">
        <Avatar src="https://randomuser.me/api/portraits/men/62.jpg" size=12>
            <div class="rounded-none text-white text-xl">
            </div>
        </Avatar>
        <Avatar src="https://randomuser.me/api/portraits/women/68.jpg" size=12 class="rounded-none text-white text-xl"/>
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
        <div>
            <label for="name">Sex</label>
            <input
              type="text"
              id="sex"
              name="sex"
              value=""
        />
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
      <button type="submit">Submit</button>
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
  </style>