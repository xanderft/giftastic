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
       $(".animalsView").empty();

       $.get("https://api.giphy.com/v1/gifs/search?api_key=3RAdvavxhi69zT49G8Fcr2QE3nIIdz4a&q=" + animalToFind + "&limit=10&offset=0&rating=PG&lang=en", function(response) {
           //console.log(response);
           var moveUrl = [];
           for(var i = 0; i<response.data.length; i++) {
               var animalDiv = $("<div id = 'animal'>");
               var stillUrl = response.data[i].images.fixed_height_still.url;
               var rating = response.data[i].rating;
               var img = $("<img>").attr("src", stillUrl);
               var ratingEl = $("<p>").text("Rating: " + rating);

               img.attr("data-value",i);
               animalDiv.append(ratingEl,img);
               moveUrl.push(response.data[i].images.fixed_height.url);

               $(".animalsView").append(animalDiv);
           }
           $("img").click(function() {
            var index = $(this).data("value");
            //console.log(index);
            $(this).attr("src",moveUrl[index]);
           });
       })
   });

   
   renderButtons();

});
/*
$.ajax({
    url: "https://api.giphy.com/v1/gifs/search?api_key=3RAdvavxhi69zT49G8Fcr2QE3nIIdz4a&q=cat&limit=10&offset=0&rating=PG&lang=en",
    method: "GET"
    }).then(function(response) {
        console.log(response);
        var moveurl = [];
        for (var i =0; i<response.data.length; i++) {
        var animalDiv = $("<div class = 'animal'>");
        var stillUrl = response.data[i].images.fixed_height_still.url;
        var rating = response.data[i].rating;
        moveurl.push(response.data[i].images.fixed_height.url);
        //var moveUrl = response.data[i].images.fixed_height.url;
        var img = $("<img>").attr("src", stillUrl);
        img.attr("data-value",i);
        
            
        var ratingEl = $("<p>").text("Rating: "+ rating);
        
        animalDiv.append(ratingEl, img);
        $("#animalsView").before(animalDiv);
        
        //$(img).on("click", function(){
        //    if ("src" === stillUrl);
        //    $(img).appendTo("src", moveUrl);
         //   animalDiv.before(ratingEl, img);
           // $("#animalsView").
             //else 
               // $(img).replaceWith("src", stillUrl);
           //});

           $(img).click(function(){
            var index = $(this).data("value");
            $(this).attr("src",moveurl[index]);
            //console.log(moveurl[index]);
           })
        }    
       
});*/