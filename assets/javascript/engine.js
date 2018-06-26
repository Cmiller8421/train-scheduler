// Initialize Firebase
var config = {
    apiKey: "AIzaSyA1Sx0TbIXSB7FIVfXPCsA-hUCUyHyKfiw",
    authDomain: "cmiller8421-1.firebaseapp.com",
    databaseURL: "https://cmiller8421-1.firebaseio.com",
    projectId: "cmiller8421-1",
    storageBucket: "cmiller8421-1.appspot.com",
    messagingSenderId: "175996070428"
  };
  firebase.initializeApp(config);
var snap;
var database = firebase.database();

var newTrainName,
	newDestination,
	newFirstArrival,
	newFrequency,
	goodArrival,
	goodFrequency;

var now = moment();

//retreive form info from html
function retrieveFormInfo() {
	newTrainName = $('#trainName').val().trim();
	newDestination = $('#destination').val().trim();
	newFirstArrival = $('#nextArrival').val().trim();
	newFrequency = $('#frequency').val().trim();


	//clear forms
	$('#trainName').val('');
	$('#destination').val('');
	$('#nextArrival').val('');
	$('#frequency').val('');
}

//append row to Train Table
function appendRow (trainName, destination, frequency, firstArrival) {
	var formattedArrival = moment(firstArrival, 'HH:mm');
	var formattedFrequency = moment(frequency, 'HH:mm')
	console.log(formattedArrival.format('HH:mm'));
	console.log(formattedArrival.isValid());

	var diffTime = moment().diff(formattedArrival, 'm');
	console.log(diffTime);
	var timeTillNext = diffTime % frequency;
	console.log('timeTillNext' + timeTillNext);

	var row = $('<tr>');
	var nameData = $('<td>').append(trainName);
	var destinationData = $('<td>').append(destination);
	var frequencyData = $('<td>').append(frequency);
	var arrivalData = $('<td>').append(formattedArrival.format('HH:mm'));
	var awayData = $('<td>').append(timeTillNext);

	var arr = [nameData, destinationData, frequencyData, arrivalData, awayData];
	for(var i=0; i<arr.length;i++) {
		row.append(arr[i]);
	}
	
	$('#trainTableBody').append(row);

}

var count=0;
//calculate next Arrival based on frequency and first arrival
function nextArrival (freq, firstArr) {
	//create Today's date with first Arrival time to ...
	var currentT = moment();
	console.log(currentT);
	console.log(freq);
	freq=parseInt(freq);
	console.log(freq);
	var arrivalTime = moment(freq, 'HH:mm');
	// var arrivalTime = moment(new Date(moment().year(year), moment().date(day), moment().month(month), parseInt(firstArr.substring(0,2)), parseInt(firstArr.substring(3,5))));
	console.log(arrivalTime);
	//if difference is positive, then current time is past first arrival
	var diffTime = moment().diff(arrivalTime, 'm');
	console.log(diffTime);

		
}

//calculate minutes
function minutesAway (nextArrive) {
	//-current time from nextArrival time in momentJS

}

//When submit clicked, submit form info to Database
$('#submitBtn').on('click', function(){
	//retrieve form info and then
	retrieveFormInfo();
	console.log(newTrainName);
	console.log(newDestination);
	console.log(newFirstArrival);
	console.log(newFrequency);

	//send info to FireBase
	database.ref().push({
		trainName : newTrainName,
		destination : newDestination,
		firstArrival : newFirstArrival,
		frequency : newFrequency
	});
});

//build table
database.ref().on('value', function(snapshot) {
	//clear table
	$('#trainTableBody').html('');
	
	snap = snapshot.val();
	Object.keys(snap).forEach(function(index){
		// var nextArrival = nextArrival(snap[index].frequency, snap[index].firstArrival);
		var minutesAway = 0;		
		appendRow(snap[index].trainName, snap[index].destination, snap[index].frequency, snap[index].firstArrival);
	})	
});

$(document).ready(function(){
	console.log('doc ready');
	$('#currentTime').html('Now: ' + moment().format("h:mm a"));
});