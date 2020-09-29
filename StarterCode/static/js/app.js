var url = "samples.json";

d3.json(url).then(function (data) {
  console.log("data", data)
  console.log("data.samples", data.samples)
  // Loop through data.names and create an option element for each name
  // <option value="dog">Dog</option>
  data.names.forEach(function (name) {
    var option = document.createElement("option");
    option.text = name;
    option.value = name;
    var select = document.getElementById("selDataset");
    select.appendChild(option);
    console.log(name);
  });
  barChart(data)
});

function barChart(data) {

  // Use sample_values as the values for the bar chart.
  var labels = data.samples[0].otu_labels.slice(0, 10);
  console.log(labels)
  // get only top 10 otu ids for the plot OTU and reversing it. 
  var OTU_top = (data.samples[0].otu_ids.slice(0, 10)).reverse();


  // Use otu_ids as the labels for the bar chart.
  var sampleValues = data.samples[0].sample_values.slice(0, 10)
  var labels = data.samples[0].otu_labels.slice(0, 10);
  console.log(`OTU_labels: ${labels}`)
  var trace = {
    x: sampleValues,
    y: OTU_top,
    text: labels,
    marker: {
      color: 'blue'
    },
    type: "bar",
    orientation: "h",
  };

  //Create the data variable
  var data = [trace];

  var layout = {
    title: "Top 10 OTU",
    yaxis: {
      tickmode: "linear",
    },
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 30
    }
  };

  // Build the bar chart
  Plotly.newPlot("bar", data, layout);
  // The bubble chart
  
  var samples = data.samples;
  var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
  var result = resultArray[0];

  var data = [trace1]

  var otu_ids = result.otu_ids;
  var otu_labels = result.otu_labels;
  var sample_values = result.sample_values;

  console.log(sample_values);

  var bubbleData = [
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }
  ];

  // Create the bubble chart layout
  var layout1 = {
    xaxis: { title: "OTU ID" },
    margin: { t: 0 },
    hovermode: "closest",
    margin: { t: 30 },
    title: "Belly Button Biodiversity Bubble Chart"
  };

  Plotly.newPlot("bubble", bubbleData, layout1)
};

//Display the metadata in the demographic info section
function demoInfo(id) {
  d3.json("./static/js/samples.json").then((data) => {
    var metadata = data.metadata;
    console.log(metadata)
    var result = metadata.filter(meta => meta.id.toString() === id)[0];

    // print on the html doc
    var demoInfo = d3.select("#sample-metadata");
    console.log(demoInfo);
    demoInfo.html("");

    Object.entries(result).forEach((key) => {
      demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });
  });
}
// Link the code above to the HTML
function optionChanged(id) {
  getPoints(id);
  getDemoInfo(id);
}

// Create a function for the dropdown
function init() {
  var dropdownMenu = d3.select("#selDataset");
  //read data
  d3.json("./samples.json").then((data) => {
    console.log(data)

    data.names.forEach(function (name) {
      dropdownMenu.append("option").text(name).property("value");
    });
    // Call on functions and print in the dropdown
    getPoints(data.names[0]);
    getdemoInfo(data.names[0]);
  });
}
//Initialize the dashboard
init();




























