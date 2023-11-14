// Load the world GeoJSON data (this is just a placeholder, you need to load actual data)
d3.json('path_to_your_geojson_file.json').then(worldData => {
    // Assuming 'worldData' is a GeoJSON object containing countries' data
  
    // Define the globe and the projection
    var projection = d3.geoOrthographic()
      .scale(145)
      .translate([150, 150])
      .clipAngle(90); // Clip the back half of the globe
  
    var path = d3.geoPath().projection(projection);
  
    var svg = d3.select('#city-map').append('svg')
      .attr('width', '100%')
      .attr('height', '300px')
      .attr('viewBox', '0 0 300 300');
  
    // Draw the world
    svg.selectAll("path.land")
      .data(worldData.features)
      .enter().append("path")
      .attr("class", "land")
      .attr("d", path)
      .style("fill", "grey");
  
    // Draw the graticule
    svg.append("path")
      .datum(d3.geoGraticule())
      .attr("class", "graticule")
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", "#ccc");
  
    // Define the locations of the cities
    var locations = [
      {name: 'Singapore', coordinates: [103.851959, 1.290270]},
      {name: 'Delhi', coordinates: [77.102490, 28.704060]}
    ];
  
    // Draw the cities
    svg.selectAll(".city")
      .data(locations)
      .enter().append("circle")
      .attr("class", "city")
      .attr("cx", d => projection(d.coordinates)[0])
      .attr("cy", d => projection(d.coordinates)[1])
      .attr("r", 5)
      .style("fill", "red");
  
    // Update function
    function updateGlobe(selectedCity) {
      // ... (update function implementation as before)
    }
  
    // Event listener for the radio buttons
    d3.selectAll('input[name="city"]').on('change', function() {
      updateGlobe(this.value);
    });
  
    // Initial render of the globe
    updateGlobe('Singapore'); // Render Singapore as the default view
  });
  