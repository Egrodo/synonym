function send_to_symonym(e) {
    if(event.keyCode == 13) {
        document.getElementById("syn_display").innerHTML = ""; //Clear the displays when enter is pressed to remove previous info.
        document.getElementById("sim_display").innerHTML = "";
        document.getElementById("syn_title").innerHTML = "Synonyms:";
        $("#word_box").blur();
		var word = document.getElementsByName("input_word")[0].value; //Check if input is empty. Sanitize input. Accept input after a second of waiting instead of enter
        var word = word.replace(/[^A-Za-z]+/ig, ''); //Sanitize inputs to only allow letters.
        $.ajax({
            url: "https://words.bighugelabs.com/api/2/6497baacbb91c7feedadf10454978aea/" + word + "/json",
            dataType: 'json',
            type: 'GET',
            timeout: 5000,
            success: function(data) {

                console.log(data);
                if ($(data.noun).length) { //handle all Nouns
                    $(data.noun).each(function(index, value) {
                        if (typeof value.syn !== "undefined") {
                            console.log("Noun synonyms: " + value.syn);
                            $.each(value.syn, function(index, value) {
                                $("#syn_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        } else {
                            console.log("No noun synonyms.");
                        }
                        if (typeof value.sim === "undefined") { //if true there are no similars.
                            delete no_similars;
                            console.log("No noun similars.");
                        } else { //Else there are similar words. Add title.
                            console.log("Noun similars: " + value.sim);
                            console.log("Adding similar title");
                            document.getElementById("sim_title").style.display = "block";
                            $.each(value.sim, function(index, value) {
                                $("#sim_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        }
                    });
                } else {
                    console.log("No nouns.");
                }

                if ($(data.adjective).length) { //handle all adjectives
                    $(data.adjective).each(function(index, value) {
                        if (typeof value.syn !== "undefined") {
                            console.log("Adjective synonyms: " + value.syn);
                            $.each(value.syn, function(index, value) {
                                $("#syn_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        } else {
                            console.log("No adjective synonyms.");
                        }
                        if (typeof value.sim === "undefined") { //if true there are no similars.
                            delete no_similars;
                            console.log("No adjective similars.");
                        } else { //Else there are similar words. Add title.
                            console.log("Adjective similars: " + value.sim);
                            console.log("Adding similar title");
                            document.getElementById("sim_title").style.display = "block";
                            $.each(value.sim, function(index, value) {
                                $("#sim_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        }
                    });
                } else {
                    console.log("No adjectives.");
                }

                if ($(data.verb).length) { //handle all verbs
                    $(data.verb).each(function(index, value) {
                        if (typeof value.syn !== "undefined") {
                            console.log("Verb synonyms: " + value.syn);
                            $.each(value.syn, function(index, value) {
                                $("#syn_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        } else {
                            console.log("No verb synonyms.");
                        }
                        if (typeof value.sim === "undefined") { //if true there are no similars.
                            delete no_similars;
                            console.log("No verb similars.");
                        } else { //Else there are similar words. Add title.
                            console.log("Verb similars: " + value.sim);
                            console.log("Adding similar title");
                            document.getElementById("sim_title").style.display = "block";
                            $.each(value.sim, function(index, value) {
                                $("#sim_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        }
                    });
                } else {
                    console.log("No verbs.");
                }

                if ($(data.adverb).length) { //handle all adverbs
                    $(data.adverb).each(function(index, value) {
                        if (typeof value.syn !== "undefined") {
                            console.log("Adverb synonyms: " + value.syn);
                            $.each(value.syn, function(index, value) {
                                $("#syn_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        } else {
                            console.log("No adverb synonyms.");
                        }
                        if (typeof value.sim === "undefined") { //if true there are no similars.
                            delete no_similars;
                            console.log("No adverb similars.");
                        } else { //Else there are similar words. Add title.
                            console.log("Adding similar title");
                            document.getElementById("sim_title").style.display = "block";
                            $.each(value.sim, function(index, value) {
                                console.log("Adverb similars: " + value.sim);
                                $("#sim_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        }
                    });
                } else {
                    console.log("No adverbs.");
                }

            },
            error: function(xhr, textStatus, errorThrown) {
                if (xhr.status === 0) {
                    console.log("Couldn't connect to the API.");
                    document.getElementById("syn_title").innerHTML = "Couldn't connect to the API. Are you offline? If not, email me.";
                } else if (xhr.status === 404) {
                    console.log("That word could not be found.");
                    document.getElementById("syn_title").innerHTML = "No word found, check spelling?";
                } else if (xhr.status === 303) {
                    console.log("That word wasn't found but I have a recommendation.");
                } else if (xhr.status === 500) {
                    console.log("You didn't type anything."); //Handle 500 Usage Exceeded and 500 Inactive Key.
                    document.getElementById("syn_title").innerHTML = "You didn't type a word!";
                }
           }
        });
        if (typeof no_similars === "undefined") { //Remove similars title if there are no similar words to the input.
            console.log("Getting rid of similar title");
            document.getElementById("sim_title").style.display = "none";
        }
	}
}
