<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import Store from '$lib/components/Store.svelte'
  import type { PageData } from './$types'
  import { aldoCache, aldoListener } from "../lib/svelte_data_stores/aldo_store"

  import Charts from "$lib/components/Charts.svelte";

  export let data: PageData

  let cache = null
  let cacheManager = null
  let unsubscribe: any;


  $: if(data?.feed) {
    console.log("========= Data feed", data)
    aldoCache.updateBatch(data.feed)    
  }

 </script>

<div>
  <h1>ALDO SUPPORT DESK</h1>
  <main>
    <div>
      <Charts />
    </div>
  </main>
</div>
