describe("Lunch", function() {
  var lunch;
  
  beforeEach(function() {
    lunch = new Lunch();
  });

  it("should be able to retrieve zero or more restaurants from REST web service", function() {
    var restaurants = lunch.getRestaurants();
		console.log(lunch.getRestaurants().length);
    expect(lunch.getRestaurants().length).toBeGreaterThan(-1);
  });

	it("should return a random ID number between 1 and total number of restaurants", function() {
		var id = lunch.getWeightedRandomID();
		expect(id).toBeGreaterThan(0);
 	});
	
});