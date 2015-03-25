/**
 * @author SusanEMcG
 */

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {
	'packages' : ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

	var arraysData = [];

	//use a for loop to make an array of arrays out of relevant JSON data

	for (var i = 0; i < jsonFREDData.observations.length; i++) {

		var itemArray = [];
		// have to use the "new" keyword with dates
		var dateArray = jsonFREDData.observations[i].date.split("-");
		console.log(dateArray);
		var myYear = Number(dateArray[0]);
		var myMonth = Number(dateArray[1])-1;
		var myDay = Number(dateArray[2]);
		var myDate = new Date(myYear,myMonth,myDay);

		itemArray.push(myDate);
		itemArray.push(Number(jsonFREDData.observations[i].value));
		
		//push annotation text based on the date
		
		if(jsonFREDData.observations[i].date == "2008-01-01"){
			itemArray.push("In the year"+myYear+"home prices dropped 8%.");
		}else{
			itemArray.push("");
		}
		

		//add my little array to the "big" array
		arraysData.push(itemArray);

	}

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('date', 'Date');
	// this is the "zeroth" column
	data.addColumn('number', 'GDP');
	data.addColumn({type:'string', role:'annotation'}); 
	data.addRows(arraysData);

	var formatter = new google.visualization.DateFormat({
		pattern: 'MMM d, y'
	});

	// Reformat our data.
	formatter.format(data, 0);

	var myGrid = {
		'color' : '#ff0000'
	}

	var hAxisLabelFormat = 'MMM d, y';

	// Set chart options
	var options = {
		'title' : 'Lots of Pizza',
		'width' : 600,
		'height' : 500,
		'hAxis' : {},
		'vAxis' : {}
	};
	//end of options

	options.hAxis.format = hAxisLabelFormat;
	options.hAxis.textStyle = myTextStyle;
	options.vAxis.textStyle = myTextStyle;
	options.vAxis.gridlines = myGrid;

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
	chart.draw(data, options);
} //end of drawChart