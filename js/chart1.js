var bleed = 50,
    width = 960,
    height = 600;

var pack = d3.layout.pack()
    .sort(null)
    .size([width, height + bleed * 2])
    .padding(2);

var svg = d3.select("#bubble")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(0," + -bleed + ")");

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("padding", "14px")
    .style("background-color", "#f5f5f5")
    .style("color", "black")
    .style("border-radius", "6px")
    .style("border-color", "black")
    .style("font", "12px sans-serif")
    .text("tooltip");

d3.json("README.json", function(error, json) {
  if (error) throw error;

  var node = svg.selectAll(".node")
      .data(pack.nodes(flatten(json))
        .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .on("mouseover", function(d) {
              tooltip.text(d.name + " — " + d.value +" депутатів");
              tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

  node.append("text")
      .text(function(d) { return d.name; })
      .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
      .attr("dy", ".35em");
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function flatten(root) {
  var nodes = [];

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    else nodes.push({name: node.name, value: node.size});
  }

  recurse(root);
  return {children: nodes};
}
var bleed1 = 100,
    width1 = 960,
    height1 = 960;

var pack1 = d3.layout.pack()
    .sort(null)
    .size([width1, height1 + bleed1 * 2])
    .padding(2);

var svg1 = d3.select("#bubble1")
    .attr("width", width1)
    .attr("height", height1)
  .append("g")
    .attr("transform", "translate(0," + -bleed1 + ")");

var tooltip1 = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("padding", "14px")
    .style("background-color", "#f5f5f5")
    .style("color", "black")
    .style("border-radius", "6px")
    .style("border-color", "black")
    .style("font", "12px sans-serif")
    .text("tooltip");

d3.json("dep.json", function(error, json) {
  if (error) throw error;

  var node1 = svg1.selectAll(".node")
      .data(pack1.nodes(flatten(json))
        .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node1.append("circle")
      .attr("r", function(d) { return d.r; })
      .on("mouseover", function(d) {
        tooltip1.text(d.text + " — " + d.value +" МДО");
        tooltip1.style("visibility", "visible");;
      })
      .on("mousemove", function() {
          return tooltip1.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("mouseout", function(){return tooltip1.style("visibility", "hidden");});

  node1.append("text")
      .text(function(d) { return d.name; })
      .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
      .attr("dy", ".35em");
});
// Returns a flattened hierarchy containing all leaf nodes under the root.
function flatten(root) {
  var nodes1 = [];

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    else nodes1.push({name: node.name, value: node.size, text: node.text});
  }

  recurse(root);
  return {children: nodes1};
}