<script>
    import { fade, fly } from 'svelte/transition';
  
    let texts = [
      'Food is a basic human right and necessity. It provides us with the nutrition needed to sustain our lives; it fuels us; it connects us.',
      'But what if we lost access to food? What does life look like without this basic necessity?',
      'In Central America, these are not rhetorical questions, but a reality. It is a reality that is not often easily understood.',
      'Scroll on to better understand what this means.'
    ];
  
  </script>
  
  <main>

    <div style="text-align: center">
    {#each texts as text (text)}
      <p class="paragraph" style="text-align:left; width:600px; display: inline-block;" 
        >
        <!-- in:fly={{ y: 50, duration: 500 }} out:fly={{ y: -50, duration: 500 }} animate:fade={{ duration: 200 }} transition={{ delay: 100, duration: 500, easing: 'ease-out' }} -->
        {text}
      </p>
    <br/>
    {/each}
  </div>
  
  </main>
  
  <style>
    .paragraph {
      margin: 1rem 0;
    }
  </style>
  