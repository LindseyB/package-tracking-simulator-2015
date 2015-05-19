var destination;
var curDate;
var deliveryDate;
var dateFormat = 'dddd, MMMM Do YYYY';
var won = false;

function setup() {
	destination = chance.city() + ", " + chance.state();
	start = chance.city() + ", " + chance.state();
	startDate = moment();
	curDate = startDate;
	deliveryDate = startDate.clone().add(Math.floor(Math.random()*10)+1, 'days');
	startDateString = startDate.format(dateFormat);

	$('#destination').text(destination);
	$('#delivery-date').text(deliveryDate.format(dateFormat));
	$('.start-loc').each(function(){
		$(this).text(start);
	});
	$('.start-date').each(function(){
		$(this).text(startDateString);
	});
}

function progress() {
	var actions = ['Processed Through Sort Facility', 'Re-routed', 'Shipping Exception', 'Weather Delay', 'Colossal Mutant Lizard'];
	var tablePrepend = "";
	curDate.add(Math.floor(Math.random()*3)+1, "days")
	curDateString = curDate.format(dateFormat);
	curLocation = chance.city() + ", " + chance.state();

	if(won){return;}

	// 100+ rows pity party
	if(Math.floor(Math.random()*3)+1 == 1 && $('tr').length > 100){
		curLocation = destination;
	}

	if(curLocation == destination){
		tablePrepend = "<tr><td>"+curDateString
						+"</td><td>Delivered"
						+"</td><td>"+curLocation
						+"</td></tr>";
		tablePrepend += "<tr><td>"+curDateString
						+"</td><td>Out For Delivery"
						+"</td><td>"+curLocation
						+"</td></tr>";
		$('.progtrckr-todo').toggleClass("progtrckr-todo progtrckr-done");
		$('.alert').fadeIn(500);
		won = true;
	} else {
		if(curDate.isAfter(deliveryDate)){
			deliveryDate = curDate.add(Math.floor(Math.random()*10)+1, 'days');
			$('#delivery-date').text(deliveryDate.format(dateFormat));
		}

		tablePrepend = "<tr><td>"+curDateString
					   +"</td><td>"+actions[Math.floor(Math.random()*actions.length)]
					   +"</td><td>"+curLocation
					   +"</td></tr>";
	}

	$('table > tbody > tr:first').before(tablePrepend);
}


$("#refresh").click(function() {
	progress();
});

$(document).keydown(function(e) {
	if (e.keyCode == 82) {
		progress();
	}
});

setup();