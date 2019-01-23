$(document).ready(function() {
   var animals = ["cat"];
   
   // This function will add buttons based on the animals array
   function renderButtons() {
       $(".animalButtons").empty();
       animals.forEach(function(animal){
           //console.log(animal);
           var button = $("<button>");
           button.addClass("animalSearch");
           //button.attr("data-name", animal);
           button.text(animal);
           $(".animalButtons").append(button);
           //console.log(button);
       })
   }

   // This function will take the entered animal name and add it to the animals array
   $("#plusAnimal").on("click", function(event) {
       event.preventDefault();
       var value = $("#addAnAnimal").val().trim();
       animals.push(value);
       renderButtons();
   });

   // This function will take the name of the animal from the button pressed and search for said 
   // animal then display still images and their ratings
   $(".animalButtons").on("click", function(event) {
       var animalToFind = event.target.innerText;
	   // This is how I clear the div where the animal pictures go
       $(".animalsView").empty();

	   // I based my jQuery AJAX on the W3Schools examples at https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
       $.get("https://api.giphy.com/v1/gifs/search?api_key=3RAdvavxhi69zT49G8Fcr2QE3nIIdz4a&q=" + animalToFind + "&limit=10&offset=0&rating=PG&lang=en", function(response) {
           //console.log(response);
		   // Array to hold the moving gif links
           var moveUrl = [];
		   
           for(var i = 0; i<response.data.length; i++) {
               var animalDiv = $("<div id = 'animal'>");
			   // This variable could be changed to an array and populated like the moveUrl
               var stillUrl = response.data[i].images.fixed_height_still.url;
               var rating = response.data[i].rating;
               var img = $("<img>").attr("src", stillUrl);
               var ratingEl = $("<p>").text("Rating: " + rating);

			   // This is where I set the data-value to assist in changing from still to moving gif
               img.attr("data-value",i);
               animalDiv.append(ratingEl,img);
               moveUrl.push(response.data[i].images.fixed_height.url);

               $(".animalsView").append(animalDiv);
           }
		   // This function will change the still image to a moving gif.
		   // I do this by looking at the data-value in the img attribute
		   // and using the moveUrl array set the corresponding gif.
           $("img").click(function() {
            var index = $(this).data("value");
            //console.log(index);
            $(this).attr("src",moveUrl[index]);
           });
       })
   });

   
   renderButtons();

});