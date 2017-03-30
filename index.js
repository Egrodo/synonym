var ants_enabled = false; //Antonyms off by default.
var are_ants = false; //This is used for checking if ants of any value exist so we can add or remove the ant title.
var are_sims = false;
function perType(t, data) {
    if ($(data[t]).length) { //handle all words of type t
        $(data[t]).each(function(index, value) {
            if (ants_enabled === false) { //If we're not working with antonyms.
                document.getElementById("top_title").innerHTML = "Synonyms:";
                if (typeof value.syn !== "undefined") {
                    console.log(t + " synonyms: " + value.syn);
                    $.each(value.syn, function(index, value) {
                        $("#top_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb..
                    });
                } else {
                    console.log("No " + t + " synonyms.");
                }
                if (typeof value.sim === "undefined") { //if true there are no similars
                    console.log("No " + t + " similars.");
                } else { //Else there are similar words. Add title.
                    are_sims = true;
                    console.log(t +  " similars: " + value.sim);
                    console.log("Adding similar title");
                    document.getElementById("bot_title").style.display = "block";
                    $.each(value.sim, function(index, value) {
                        $("#bot_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>");
                    });
                }
            } else { //If we are working with antonyms.
                if (typeof value.ant !== "undefined") {
                    are_ants = true;
                    console.log(t + " antonyms: " + value.ant);
                    $.each(value.ant, function(index, value) {
                        $("#top_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>");
                    });
                    $(".syn").addClass("change");
                } else {
                    console.log("No " + t + " antonyms.");
                }
            }
        });
    } else {
        console.log("No " + t + "s.");
    }
}

function ant_toggle() { 
    document.getElementById("top_display").innerHTML = ""; //Clear displays when type toggled so can append new of correct type.
    document.getElementById("bot_display").innerHTML = "";
    document.getElementById("bot_title").removeAttribute("style"); //Clear sim title.
    if (ants_enabled === false) { //These need to check if an error was thrown most recently.
        console.log("Enabling antonyms.")
        ants_enabled = true;
        document.getElementById("title").innerHTML = "Antonym Finder";
        $("body").addClass("change");
        if (typeof word_data !== "undefined") {
            document.getElementById("top_title").innerHTML = "";
            get_words();
        }
        $(".syn").addClass("change");
        ant_title();
    }
    else {
        console.log("Disabling antonyms.")
        ants_enabled = false;
        document.getElementById("title").innerHTML = "Synonym Finder";
        $("body").removeClass("change");
        if (typeof word_data !== "undefined") {
            get_words();
        }
        $(".syn").removeClass("change");
    }
}


var last_submit = 0;
function send_to_symonym(e) {
    if(event.keyCode == 13) {
        if(Date.now() - last_submit > 1500) { //Restrict spamming, only allow one word per 1.5 seconds.
            last_submit = Date.now();
            document.getElementById("top_display").innerHTML = ""; //Clear the displays when enter is pressed to remove previous info.
            document.getElementById("bot_display").innerHTML = "";
            document.getElementById("bot_title").removeAttribute("style");
            $("#word_box").blur(); //Unfocuses input box after enter is pressed so the keyboard gets minimized on mobile.
    		word = document.getElementsByName("input_word")[0].value; //Check if input is empty. Sanitize input. Accept input after a second of waiting instead of enter
            word = word.replace(/[^A-Za-z]+/ig, ''); //Sanitize inputs to only allow letters.
            are_sims = false;
            $.ajax({
                url: "https://words.bighugelabs.com/api/2/6497baacbb91c7feedadf10454978aea/" + word + "/json",
                dataType: "json",
                type: "GET",
                timeout: 5000,
                success: function(data) {
                    word_data = data; //Give our data object to global so perType doesn't have to be inside the ajax funct.
                    console.log(data); //Log data for Chrome's nifty object inspection.
                    are_ants = false;
                    get_words();
                    if (ants_enabled === true) {
                        ant_title();
                    } else if (ants_enabled === false & are_sims === false) {
                        console.log("Removing sim title.");
                        document.getElementById("bot_title").style.display = "none";
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    if (xhr.status === 0) {
                        console.log("Couldn't connect to the API.");
                        console.log(xhr);
                        document.getElementById("top_title").innerHTML = "Couldn't connect to the API.";
                    } else if (xhr.status === 404) {
                        console.log("That word could not be found.");
                        document.getElementById("top_title").innerHTML = "No word found, check spelling?";
                    } else if (xhr.status === 303) {
                        console.log("That word wasn't found but I have a recommendation.");
                    } else if (xhr.status === 500) {
                        console.log("You didn't type anything."); //Handle 500 Usage Exceeded and 500 Inactive Key.
                        document.getElementById("top_title").innerHTML = "You didn't type a word!";
                    }
               }
            });
    	}
    }
}

function ant_title() {
    if (ants_enabled === true & are_ants === true) { //If antonym is toggled and antonyms for a given word exist.
        console.log("Adding ant title.");
        document.getElementById("top_title").innerHTML = "Antonyms";
    } else if (ants_enabled === true & are_ants === false & typeof word !== "undefined") {
        console.log("Ants are enabled but none exist for input.");
        document.getElementById("top_title").innerHTML = "No Antonyms for this word.";
    } else {
        console.log("Removing ant title.");
        document.getElementById("top_title").innerHTML = "";
    }
}

function get_words() {
    perType("adjective", word_data);
    perType("noun", word_data);
    perType("verb", word_data);
    perType("adverb", word_data);
}
