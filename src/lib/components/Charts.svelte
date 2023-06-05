<script>
    // @ts-nocheck

    import {map, reduce} from "lodash"
    import { aldoCache } from "$lib/svelte_data_stores/aldo_store";

    import Sunburst from "./Sunburst.svelte" 


    const type = "sun"

    let paused = false;

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
                        value: (inv >= 10 ? 0 : 
                            (inv >= 5 ? 2 : 
                                (inv > 1 ? 4 : 6)
                            )
                        )
                    }
                })
            }
            return val;
        })
    }

    function handlePause() {
        paused = !paused;
    }
</script>

<p>The sumburst chart shows only the stores / shoes with less than 10 items in inventory. </p>
<div class="wrapper">
    <div class="info">
        <div class="buttons">
            <button on:click={handlePause}>{paused ? "Resume Updates" : "Pause Updated" }</button>
        </div>
    </div>
    <div class="chart">
        {#if type === "sun"}
        <Sunburst data={sunburst_data} on:pause={handlePause} />
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
        border: solid 1px red;
        display: grid;
        grid-template-rows: 50px 1fr;
        grid-row-gap: 40px;
    }
</style>




