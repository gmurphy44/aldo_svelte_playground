<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  export let store: PageData;
</script>

<h2>Store Inventory</h2>
<div class="stores">
  <h4>{store.name}</h4>
  {#if store.shoes?.length}
    <ul>
      {#each store.shoes as shoe, i (shoe.id)}
        <li>
          <strong>{shoe.model}</strong>: {shoe.inventory} items
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  div {
    color: inherit;
    padding: 2rem;
  }
  .stores {
    background: white;
    transition: box-shadow 0.1s ease-in;
  }

  
</style>
