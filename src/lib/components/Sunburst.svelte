
<script>
    // @ts-nocheck
    //GM: Adapted from:
    //https://observablehq.com/@d3/zoomable-sunburst

    import * as d3 from "d3"
    import { find } from "lodash";

    import { createEventDispatcher } from "svelte"

    export let data;
    export let selected = null;

    let htmlNode;
    let outerWidth

    let root;
    let parentCircle;
    let gWrapper;
    let pathSel;
    let labelSel;

    const dispatch = createEventDispatcher();

    const format = d3.format(",d")

    function partition(data) {
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        return d3.partition()
            .size([2 * Math.PI, root.height + 1])
            (root);
    }

    
    function clicked(event, p) {
        if(!p.children) { 
            selected = p.parent.data;
            return
         }

        dispatch("pause")

        parentCircle.datum(p.parent || root);
        root.each(d => d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
        });

        const t = gWrapper.transition().duration(750);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        pathSel
            .transition(t)
            .tween("data", d => {
                const i = d3.interpolate(d.current, d.target);
                return t => d.current = i(t);
            })
            .filter(function(d) {
                return +this.getAttribute("fill-opacity") || arcVisible(d.target);
            })
            .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")
            .attrTween("d", d => () => arc(d.current));

        labelSel
            .filter(function(d) {
                return +this.getAttribute("fill-opacity") || labelVisible(d.target);
            })
            .transition(t)
                .attr("fill-opacity", d => +labelVisible(d.target))
                .attrTween("transform", d => () => labelTransform(d.current));
    }

    function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    function shoesCount(d) {
        if(isNaN(d)){
            return ""
        }
        return ` (${d})`
    }


    $: console.log(data, htmlNode, outerWidth)

    $: radius = outerWidth / 6;

    $: arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))



    $: if(selected && data) {
       selected = data.children.find(c => c.name == selected.name)
    }


    //run this if the data changes and we have a DOM node
    $: if(outerWidth > 0 && data && htmlNode) {
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
        
        root = partition(data);
        root.each(d => d.current = d);

        const rootSel = d3.select(htmlNode); 
        
        //create SVG container if it doesn't exist
        let svg = rootSel.select("svg")
        let paths = null
        let labels = null

        if(svg.empty()) {
            svg = rootSel.append("svg").style("font", "10px sans-serif");
            gWrapper = svg.append("g").attr("class", "wrapper")
            paths = gWrapper.append("g").attr("class", "paths")
            labels = gWrapper.append("g")
                .attr("class", "labels")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style("user-select", "none");

            parentCircle = gWrapper.append("circle")
                .attr("fill", "none")
                .attr("pointer-events", "all")
                .on("click", clicked);

        } else {
            gWrapper = svg.select("g.wrapper")
            paths = gWrapper.select("g.paths")
            labels = gWrapper.select("g.labels")
            parentCircle = gWrapper.select("circle")
        }

        svg.attr("viewBox", [0, 0, outerWidth, outerWidth])

        gWrapper.attr("transform", `translate(${outerWidth / 2},${outerWidth / 2})`);



        // BUILD THE SUNBURST SLICES
        pathSel = paths.selectAll("path.slice").data(root.descendants().slice(1))
            
        pathSel.enter()
            .append("path")
            .attr("class", "slice")
            .style("cursor", "pointer")
            .on("click", clicked)
            .append("title");
        
        pathSel.select("title")
            .text(d => `${d.ancestors().map(d => `${d.data.name} ${shoesCount(d.data)} `).reverse().join("/")}\n${format(d.shoes)}`);
        

        pathSel.transition()
            .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")
            .attr("d", d => arc(d.current));

        pathSel.filter(d => d.children)

        pathSel.exit().remove();


        //ADD THE LABELS
        labelSel = labels.selectAll("text.label")
            .data(root.descendants().slice(1))

        
        labelSel.enter().append("text")
            .attr("class", "label")
            .attr("dy", "0.35em")

        labelSel.transition()    
            .attr("fill-opacity", d => +labelVisible(d.current))
            .attr("transform", d => labelTransform(d.current))
            .style("font-weight", d => d.data.shoes > 5 ? "normal" : "bold")
            .style("font-size", d => d.data.shoes > 5 ? "1em" : "1.5em")
            .style("fill", d => d.data.shoes < 2 ? "red" : "black")
            .text(d => `${d.data.name} (${d.data.shoes})`);

        // UPDATE THE CIRCLE
        parentCircle.datum(root).attr("r", radius)
    }

    
</script>

<svelte:window  bind:outerWidth />

<div bind:this={htmlNode} />