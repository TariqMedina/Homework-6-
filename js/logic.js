$(document).ready(function () {

    var animal = ["lions", "tigers", "bears", "cats", "dogs", "parrots"];

    var createbuttons = function () {
        console.log("created");
        $("#button-holder").empty();
        for (i = 1; i < animal.length; i++) {
            var button = $("<button>");
            button.text(animal[i]);
            button.addClass("btn btn-primary m-2 gif-button")
            $("#button-holder").append(button);
        }
    }

    $("#submit").on("click", function (event) {
        if ($(".form-control").val() !== "") {
            event.preventDefault();
            var name = $("#animal-name").val().trim();
            animal.push(name);
            $(".form-control").val("");

            createbuttons();
        }
    })

    createbuttons();
    // Storing our giphy API URL for an image
    var apiKey = "8KL4dA6b34KTT2qetVQGTZu5DzX1TqnI";


    // Perfoming an AJAX GET request to our queryURL
    $(document).on("click", ".gif-button", function () {
        $("#gif-holder").empty();
        var animalID = $(this).text();
        console.log(animalID);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animalID + "&api_key=" + apiKey + "&limit=10";

        // After the data from the AJAX request comes back
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < 10; i++) {

                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);

                        var animalImage = $("<img>");

                        animalImage.attr("src", results[i].images.fixed_height.url);
                        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-animate", results[i].images.fixed_height.url);
                        animalImage.attr("data-state", "animate");
                        animalImage.addClass("gif");
                        gifDiv.addClass("d-inline-block m-1");

                        gifDiv.css({ "background-color": "white", "opacity": "0.9" });
                        gifDiv.append(p);
                        gifDiv.append(animalImage);


                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gif-holder").prepend(gifDiv);
                    }
                }
                // createbuttons();
            });
    });

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    
});