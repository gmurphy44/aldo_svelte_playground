<script>
    // @ts-nocheck

    import {map, reduce} from "lodash"
    import { aldoCache } from "$lib/svelte_data_stores/aldo_store";

    import Sunburst from "./Sunburst.svelte" 
    import InventoryListItem from "./InventoryListItem.svelte";


    const type = "sun"

    let paused = false;
    let selected = null;
    /******
     * {
     *  storeName: {shoeName: inventory, shoename, inventory}
     * }
     *
     * Converts it into a structure for the sunburst chart  
    */
    $: sunburst_data = !paused && type === "sun" && {
        name: "Aldo Stores",
        children: map($aldoCache, (shoes, store) => {
            const val = {
                name: store,
                shoes: reduce(shoes, (total, inv) => total + inv, 0),
                children: map(shoes, (inv, shoe) => {
                    return {
                        name: shoe,
                        shoes: inv,
                        //4 slice sizes 0, 2, 4, 6 inversely based on inventory amount 
                        // (so less inventory means a bigger slice so its more obvious)
                        // GM: This could be done nicer with a d3-scale, but this is quick and crude
                        value: (inv >= 10 ? 1 : 
                            (inv >= 5 ? 5 : 
                                (inv > 2 ? 10 : 20)
                            )
                        )
                    }
                })
            }
            return val;
        })
    }

    $: selected_children = selected?.children.sort((a,b) => {
        return a.shoes - b.shoes
    })

    function handlePause() {
        paused = !paused;
    }
    function handleClear() {
        selected = null
    }
</script>


<p>Displays the current state of all the known ALDO franchise stores </p>
<div class="wrapper">
    <div class="info">
        <div class="buttons">
            <button on:click={handlePause}>{paused ? "Resume Updates" : "Pause Updated" }</button>
            {#if selected}
                <button on:click={handleClear}>Clear Selection</button>
            {/if}
        </div>
        {#if selected}
            <div class="inventory">
                <h5>{selected.name}</h5>
                <ul>
                    {#each selected.children as child}
                        <InventoryListItem {child} />
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
    <div class="chart">
        {#if type === "sun"}
        <Sunburst data={sunburst_data} bind:selected on:pause={handlePause} />
        {/if}
    </div>
</div>

<style>
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 4fr;
        grid-column-gap: 40px;
    }


    .info  {
        border: solid 1px #666;
        display: grid;
        grid-template-rows: 50px 1fr;
        grid-row-gap: 40px;
        padding: 10px;
    }
</style>




