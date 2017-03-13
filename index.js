function send_to_symonym(e) {
    if(event.keyCode == 13) {
        document.getElementById("syn_display").innerHTML = ""; //Clear the displays when enter is pressed to remove previous info.
        document.getElementById("sim_display").innerHTML = "";
		var word = document.getElementsByName("input_word")[0].value; //Check if input is empty. Sanitize input. Accept input after a second of waiting instead of enter
        $.ajax({
            url: "https://words.bighugelabs.com/api/2/6497baacbb91c7feedadf10454978aea/" + word + "/json",
            dataType: 'json',
            type: 'GET',
            timeout: 5000,
            success: function(data) {
                console.log(data);
                if ($(data.noun).length) { //Check if nouns for the word exist, and if so handle all nouns. Will return TypeError if data.noun is undefined.
                    $(data.noun).each(function(index, value) {
                        console.log("Nouns: " + value.syn);
                        $.each(value.syn, function(index, value) {
                            document.getElementById("syn_display").append(value + ", "); //appends display with next verb. Can add html into here.
                        });
                        if (typeof value.sim === "undefined") { //if true there are no similars.
                            delete no_similars;
                        } else { //Else there are similar words. Add title.
                            console.log("adding similar title");
                            document.getElementById("sim_title").style.display = "block";
                            $.each(value.sim, function(index, value) {
                                document.getElementById("sim_display").append(value + ", "); //If there are no similar words remove sim_title.
                            });
                        }
                    })
                } else {
                    console.log("No nouns.");
                    //$( "#display" ).append("<p>No nouns.</p>"); //https://i.imgur.com/odEZ9At.jpg
                }
                if ($(data.adjective).length) { //handle all adjectives
                    $(data.adjective).each(function(index, value) {
                        console.log("adjectives: " + value.syn);
                        $.each(value.syn, function(index, value) {
                            document.getElementById("syn_display").append(value + ", "); //appends display with next verb. Can add html into here.
                        });
                        if (typeof value.sim === "undefined") { //if true there are no similars.
                            delete no_similars;
                        } else { //Else there are similar words. Add title.
                            console.log("adding similar title");
                            document.getElementById("sim_title").style.display = "block";
                            $.each(value.sim, function(index, value) {
                                document.getElementById("sim_display").append(value + ", "); //If there are no similar words remove sim_title.
                            });
                        }
                    })
                } else {
                    console.log("No adjectives.");
                    //$( "#display" ).append("<p>No adjectives.</p>");
                }
                if ($(data.verb).length) { //handle all verbs
                    $(data.verb).each(function(index, value) {
                        console.log("verbs: " + value.syn);
                        $.each(value.syn, function(index, value) {
                            document.getElementById("syn_display").append(value + ", "); //appends display with next verb. Can add html into here.
                        });
                        if (typeof value.sim === "undefined") { //if true there are no similars.
                            delete no_similars;
                        } else { //Else there are similar words. Add title.
                            console.log("adding similar title");
                            document.getElementById("sim_title").style.display = "block";
                            $.each(value.sim, function(index, value) {
                                document.getElementById("sim_display").append(value + ", "); //If there are no similar words remove sim_title.
                            });
                        }
                    })
                } else {
                    console.log("No verbs.");
                    //$( "#display" ).append("<p>No verbs.</p>");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
               console.log("Erorr is: " + errorThrown); //Detect if 404, say no words, 500, nothing written, etc. ALSO REMOVE SYNONYM TITLE
           }
        })
        if (typeof no_similars === "undefined") { //If exists, meaning if there are not similars.
            console.log("Getting rid of similar title");
            document.getElementById("sim_title").style.display = "none";
        }
	}
}
