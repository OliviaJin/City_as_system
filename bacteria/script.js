d3.json('nyc-boroughs.geojson').then(geojsonData => {
    const width = 960, height = 600;
  
    const svg = d3.select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    const projection = d3.geoMercator()
      .center([-73.94, 40.70]) // Center coordinates for NYC
      .scale(65000)
      .translate([width / 2, height / 2]);
  
    const pathGenerator = d3.geoPath().projection(projection);
  
    svg.selectAll('path')
      .data(geojsonData.features)
      .enter().append('path')
      .attr('d', pathGenerator)
      .attr('fill', '#ccc');
  
    // Load the bacteria data
    d3.json('bacteria-data.json').then(bacteriaData => {
      // Convert the bacteria data to points using the projection
      const points = bacteriaData.map(d => {
        const [x, y] = projection([d.longitude, d.latitude]);
        return [x, y, d.bacteriaDNA]; // Add the bacteria DNA value as the third element in the array
      });
  
      // Create a hexbin generator
      const hexbinGenerator = d3.hexbin()
        .extent([[0, 0], [width, height]])
        .radius(10);
  
      // Generate the hexbin data
      const hexbinData = hexbinGenerator(points);
  
      // Find the max bacteriaDNA value for the color domain
      const maxBacteriaDNA = d3.max(bacteriaData, d => d.bacteriaDNA);
  
      // Create a color scale for the hexbins
      const colorScale = d3.scaleSequential(d3.interpolateReds)
        .domain([0, maxBacteriaDNA]);
  
      // Draw the hexbins with color based on the bacteriaDNA value
      svg.append('g')
        .selectAll('path')
        .data(hexbinData)
        .enter().append('path')
        .attr('d', hexbinGenerator.hexagon())
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .attr('fill', d => d.length ? colorScale(d3.mean(d, point => point[2])) : '#ccc')
        .append('title') // Tooltip to show information on hover
        .text(d => `${d.length ? d3.mean(d, point => point[2]) : 0}% bacteria DNA`);
    });

// Create a color legend
const legendWidth = 300, legendHeight = 20, numberOfSegments = 10;

const legend = svg.append('g')
  .attr('transform', `translate(10, ${height - 30})`);

const legendScale = d3.scaleLinear()
  .domain([0, maxBacteriaDNA])
  .range([0, legendWidth]);

legend.selectAll('rect')
  .data(d3.range(numberOfSegments))
  .enter().append('rect')
  .attr('x', d => d * (legendWidth / numberOfSegments))
  .attr('width', legendWidth / numberOfSegments)
  .attr('height', legendHeight)
  .attr('fill', d => colorScale(legendScale.invert(d * (legendWidth / numberOfSegments))));

// Add legend axis
const legendAxis = d3.axisBottom(legendScale)
  .ticks(5);

legend.append('g')
  .attr('transform', `translate(0, ${legendHeight})`)
  .call(legendAxis);

});
