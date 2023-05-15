<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />

    <script src="https://d3js.org/d3.v6.js" charset="utf-8"></script>
</head>

<svelte:head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<script>

  import { loop_guard } from "svelte/internal";
  import mapboxgl from 'mapbox-gl';
  import  {onMount} from 'svelte';
  import * as d3 from 'd3';
  
  
  onMount( () => {
      const margin = {top: 10, right: 30, bottom: 30, left: 30};
      const width = 600 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;
    
      mapboxgl.accessToken = 'pk.eyJ1IjoiamVjdW1taW4iLCJhIjoiY2xnZmExMGl0MTFqODNtcGYza3N4MThuYSJ9.PqUnWvtJxHzj8zho_DFRwg';
      const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/light-v11', // style URL
          center: [-88.8965, 13.7942], // starting position [lng, lat]
          zoom: 6, // starting zoom
      });
    
      map.on("viewreset", updateMarker);
      map.on("move", updateMarker);
      map.on("moveend", updateMarker);
    
      const markerContainer = d3
          .select(map.getCanvasContainer() )
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .style("position", "absolute")
          .style("z-index", 2)
          .attr("transform",
              `translate(${margin.left}, ${margin.top})`);
    
      function project(d) {
          return map.project(new mapboxgl.LngLat(+d.lon, +d.lat));
      }
    
      const markerLoc = {lon: -89.8411, lat: 13.9259}
    
      const marker = markerContainer
          .append("circle")
          .attr("r", 5)
          .style("fill", "#cf2513")
          .attr("stroke", "#cf2513")
          .attr("stroke-width", 1)
          .attr("fill-opacity", 0.8)
          .attr("cx", project(markerLoc).x)
          .attr("cy", project(markerLoc).y);
    
      function updateMarker () {
          marker
              .attr("cx", project(markerLoc).x)
              .attr("cy", project(markerLoc).y);
      }

  })
</script>





<main>
    <div id='map' style='width: 600px; height: 600px;'></div>
</main>



