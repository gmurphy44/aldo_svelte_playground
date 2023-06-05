
<script lang="ts">
    import Charts from "$lib/components/Charts.svelte";
    import { aldoListener } from "$lib/svelte_data_stores/aldo_store";

    // import Post from "$lib/components/Post.svelte";
    // import type { PageData } from "./$types";
  
    // export let data: PageData;

    // $: console.log($aldoListener)
</script>

<div>
    <h1>Charts</h1>
    <main>
      <p>Displays the current state of all the known ALDO franchise stores</p>
      <div>
        <Charts />
      </div>
    </main>
  </div>




