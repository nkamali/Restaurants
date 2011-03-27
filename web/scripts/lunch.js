/**
 * List of Restaurants is retrieved from the server inside the Lunch constructor.
 * The list of restaurants and their corresponding ratings is displayed inside the HTML table.
 * When the user clicks on the submit button, a weighted random restaurant is chosen. The higher the rating,
 * the greater the chance that restaurant will be chosen.
 * 
 * Author: Navid Kamali
 * Date: 	 3/21/2011
 */

var GET_ALL_URL = "http://localhost:9998/restaurants";

// Loads All Restaurants from Restaurants server
// Displays All Restaurants on the HTML Table
function Lunch() {	
	
	// This is a synchronous request, for simplicity, since data will only be loaded in constructor,
	// since server runs on localhost, so no lag time and since I wanted to keep the code cleaner by using
	// using object-oriented nature of JavaScript.
	$.ajax({
	  url: GET_ALL_URL,
		dataType: 'json',
		context: this,
		async: false, 
	  success: function(restaurants){
			this.allRestaurants = restaurants;
		
			if(restaurants.length > 0) {
				$("#placeholder_row").remove(); // if more than one restaurant, removes placeholder row.
				this.displayRestaurants(restaurants);
			}
			else {
				$("#error span").text("No Results Returned From Server");
			}
		}
	});
}

// Displays List of Restaurants in HTML Table
// Input: This function takes as input 'restaurants' which is an array of records in JSON format.
// The format of the JSON expected should be similar to the following:
// 		[{"name": "Sancho's Taqueria", "rating": 4.0, "id": 1}, {"name": "Cafe Epi", "rating": 3.5, "id": 2}, etc]
Lunch.prototype.displayRestaurants = function(restaurants){
	// Iterates through JSON (array of restaurant records)
	$.each(restaurants, function(index, restaurant) {				
		$("<tr class='restaurant_row'>").attr('id', restaurant["id"]).insertAfter($('table tbody tr:last'))
			.append( $('<td>').addClass('name_cell').text(restaurant["name"]) )
			.append( $('<td>').addClass('rating_cell').text(restaurant["rating"]) )
	});		
}

// Returns the list of all restaurants
Lunch.prototype.getRestaurants = function(){		
	return this.allRestaurants;
}

// Generates a weighted random ID number.
// The restaurant id number generated is chosen randomly, with consideration of its rating
Lunch.prototype.getWeightedRandomID = function(){
	var allRestaurants = this.allRestaurants;
	var numberOfRestaurants = allRestaurants.length;
	
	// This array contains IDs. Each ID is added to the arrayOfIDs the floor of number of times divisible by 0.5
	var arrayOfIDs = [];
		
	// Each id is added to new array arrayOfIDs as many times 0.5 divides into its rating value.
	for(var i=0; i < numberOfRestaurants; i++) {
		var numberOfTimesToAddToArray = Math.floor(parseFloat(allRestaurants[i]["rating"]) / 0.5);
		for(var j=0; j < numberOfTimesToAddToArray; j++) {
			arrayOfIDs.push(allRestaurants[i]["id"]);
		}
	}

	// A random number is chosen for the index of the array
	var randomIndex=Math.floor(Math.random()*arrayOfIDs.length);
	
	// The ID value at index randomIndex is returned.
	return arrayOfIDs[randomIndex];	
}

// Displays Weighted Random Chosen Restaurant in the DOM
// Since results from server always come back in order of IDs from 1 to N, I will assume index is 1 less than ID
Lunch.prototype.displayChosenRestaurant = function(id){
	if(id != undefined) {
		var indexRandomlyChosen = parseInt(id) - 1;

		$("#pick_name").fadeOut(0);
		$('#pick_name').text(this.allRestaurants[indexRandomlyChosen]['name']);		
		$("#pick_name").fadeIn(1700);

		$("#pick_rating").fadeOut(0);
		$('#pick_rating').text(this.allRestaurants[indexRandomlyChosen]['rating']);		
		$("#pick_rating").fadeIn(1700);
	}
	else {
		$("#error span").text("Unable to display chosen restaurant since ID is not valid.");
	}
}

// Handler for when the DOM is ready
$(function(){
	$('input:button').click(function(){
		lunch.displayChosenRestaurant(lunch.getWeightedRandomID());
	});
	
	var lunch = new Lunch();
});