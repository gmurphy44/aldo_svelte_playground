<script lang="ts">
	import { page } from '$app/stores';

  // import { aldoListener } from "../svelte_data_stores/aldo_store"

  // let formEl: HTMLFormElement; 

  // $: if($aldoListener && formEl) {
  //   formEl.submit();
  // }

  // $: console.log("Header Listening", $aldoListener)
</script>

<!-- <nav> -->
  <!-- <div class="left">
    <a class:active={$page.url.pathname === '/'} href="/">Main</a>
    <a class:active={$page.url.pathname === '/charts'} href="/charts">Charts</a>
  </div>
  <div class="right">
  </div> -->

  <!-- <div class="hidden_form" style="display: none">
    <form bind:this={formEl} method="post" class="actions" action="/addEvent">
      <input type="text" name="store" value={$aldoListener.store} />
      <input type="text" name="model" value={$aldoListener.model} />
      <input type="number" name="inventory" value={$aldoListener.inventory} />
    </form>

  </div> -->
<!-- </nav> -->

<style>
  nav {
    display: flex;
    padding: 2rem;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #000;
    display: inline-block;
  }

  a + a {
    margin-left: 1rem;
  }

  .active{
    font-weight: bold;
  }

  .right {
    margin-left: auto;
  }

  .right a {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }
</style>
