// from data.js
var tableData = data;

// function to display UFO sightings
function tableDisplay(ufoSightings) {
  var tbody = d3.select("tbody");
  ufoSightings.forEach((ufoRecord) => {
    var row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
};

// function to clear the table for new data
function deletetBody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};

// initial display of all UFO sightings
console.log(tableData);
tableDisplay(tableData);

// Assign event handle for 'Filter Table' button
var button = d3.select("#filter-btn");
button.on("click", handleSearch);

// Assign event handle for 'Clear Search' button
// When "Clear Search" button is clicked, 
// all search criteria will be cleared, page is reset to show all UFO sighting
var clearButton = d3.select("#clear-btn");
clearButton.on("click", function(){
    tableDisplay(tableData);
});

// Function to search UFO based on Date, City, State and Shape
function handleSearch() {
    // prevent table reloading
    d3.event.preventDefault();
    // delete table content for filtered data
    deletetBody();
    // set filtered data as tableData
    var filteredData = tableData;

    // get search criteria
    var inputDate = d3.select("#datetime").property("value");
    var inputCity = d3.select("#city").property("value");
    var inputState = d3.select("#state").property("value");
    var inputShape = d3.select("#shape").property("value");

    // search for datetime criteria
    // if datetime search is not empty, perform the filter
    if (inputDate.trim() !== "") {
        var filteredData = tableData.filter(ufoSighting =>
          ufoSighting.datetime.toLowerCase().trim() === inputDate.toLowerCase().trim());
      };
  
    if (inputCity.trim() !== "") {
      var filteredData = filteredData.filter(ufoSighting =>
        ufoSighting.city.toLowerCase().trim() === inputCity.toLowerCase().trim());
      };
  
    if (inputState.trim() !== "") {
      var filteredData = filteredData.filter(ufoSighting =>
        ufoSighting.state.toLowerCase().trim() === inputState.toLowerCase().trim());
      };
  
    if (inputShape.trim() !== "") {
          var filteredData = filteredData.filter(ufoSighting =>
            ufoSighting.shape.toLowerCase().trim() === inputShape.toLowerCase().trim());
      };
    
    // if there is no result, display no record found
    if (filteredData.length == 0) {
        d3.select("tbody")
          .append("tr")
          .append("td")
            .attr("colspan", 7)
            .html("<h4>No Records Found</h4>");
    };

    tableDisplay(filteredData);
};








  /*var inputID = document.getElementsByClassName("form-control");

  for (var i = 0; i < inputID.length; i++) {
      var idName = inputID[i].id;
      var field = d3.select("#" +idName).property("value");

      if (field.trim() !== "" ) {
        // display the whole database if the date field has no date
        var filterData = data.filter(ufoSighting =>
            ufoSighting[idName].toLowerCase().trim() === field.toLowerCase().trim());
      };
  }; 
    
      // display message if no records found
    if (filterData.length == 0) {
        d3.select("tbody")
          .append("tr")
          .append("td")
            .attr("colspan", 7)
            .html("<h4>No Records Found</h4>");
    };

  console.log(filterData);
  tableDisplay(filterData);
});*/



