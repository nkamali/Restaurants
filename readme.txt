PRE-REQUISITES
Sun JRE 6

SETUP
Extract files from the ZIP file into any directory. Execute java -jar Restaurants.jar command to launch the server. The
server will start on localhost, port 9998. REST web service URL is /restaurants. Service root returns the list of all
restaurants and /restaurants/{id} will return details for the restaurant with that id. The data is delivered in JSON
format (sample below).

It is possible to modify the server parameters by using command-line options:
--host hostname|ipaddress   Host name or IP address that will be used by the server
--port port                 Port on which the server will be listening
--baseDir directory         Directory which contains html, css, scripts and images sub-directories

FILE STRUCTURE
Individual files will be found in html, css and scripts directories. Due to simplicity of the server the directory is
tied to the content type, so files should not be mixed. Images (should the candidate decide to add any) should be placed
in the images directory.
The server doesn't cache any files, so editing the files makes them immediately available, no need to restart the server,
a browser refresh should pick up the edits right away.

TASK DESCRIPTION
Requires implementation of the web application that retrieves a list of local restaurants from a REST web
service and randomly chooses one upon load and in response to clicking a button. While the selection is random it should
be weighted by rating. For example, if the list contains just two selections, a 3-star and a 1-star then on average the
3-star one should be picked 75% of the time, not 50% of the time.

DETAILS
It is recommended that all Javascript code goes into scripts/lunch.js, CSS into css/lunch.css and HTML in html/lunch.html

1. Whenever the page is loaded the list of restaurants should be retrieved from the service and the table populated
2. Once the list is known, one of the restaurants should be chosen using the random-weighted algorithm and the chosen
   restaurant's details should be filled in the designated place
3. The clicking of the Spin button should re-run the random selection without reloading the list and update the
   selection

SAMPLE JSON
GET /restaurants
[
  {
    "name": "Sancho's Taqueria",
    "rating": 4.0,
    "id": 1
  },
  {
    "name": "Cafe Epi",
    "rating": 3.5,
    "id": 2
  }
]

GET /restaurants/2
{
  "name": "Cafe Epi",
  "rating": 3.5,
  "id": 2,
  "address": "405 University Avenue, Palo Alto, CA"
}


