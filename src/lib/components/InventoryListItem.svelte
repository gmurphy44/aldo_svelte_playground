<script>
    // @ts-nocheck
    export let child;
</script>


<li>
    {#if child.shoes >= 10 }
        <em style="color: #999">{child.name}: {child.shoes}</em>
    {:else if child.shoes >= 5}
        {child.name}: {child.shoes}
    {:else if child.shoes > 2}
        <strong>{child.name}</strong>: {child.shoes}
    {:else }
        <strong style="color: red">{child.name}</strong>: <strong>{child.shoes}</strong>

    {/if}
</li>