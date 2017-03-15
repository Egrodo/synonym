function send_to_symonym(e) {
    document.getElementById("syn_display").innerHTML = ""; //Clear the displays when enter is pressed to remove previous info.
    document.getElementById("sim_display").innerHTML = "";

	var word = document.getElementsByName("input_word")[0].value; //Check if input is empty. Sanitize input. Accept input after a second of waiting instead of enter
    var word = word.replace(/[^A-Za-z]+/ig, ''); //Sanitize inputs to only allow letters.
    $.ajax({
        url: "https://words.bighugelabs.com/api/2/6497baacbb91c7feedadf10454978aea/" + word + "/json",
        dataType: 'json',
        type: 'GET',
        timeout: 5000,
        success: function(data) {

            console.log(data);
            function perType(t) {
                if ($(data[t]).length) { //handle all Nouns
                    $(data[t]).each(function(index, value) {
                        if (typeof value.syn !== "undefined") {
                            document.getElementById("syn_title").innerHTML = "Synonyms:";
                            console.log(t + " synonyms: " + value.syn);
                            $.each(value.syn, function(index, value) {
                                $("#syn_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        } else {
                            console.log("No " + t + " synonyms.");
                        }
                        if (typeof value.sim === "undefined") { //if true there are no similars.
                            delete no_similars;
                            console.log("No " + t + " similars.");
                        } else { //Else there are similar words. Add title.
                            console.log(t +  " similars: " + value.sim);
                            console.log("Adding similar title");
                            document.getElementById("sim_title").style.display = "block";
                            $.each(value.sim, function(index, value) {
                                $("#sim_display").append("<a class='syn' target='_blank' href='http://www.dictionary.com/browse/" + value + "'>" + value + " </a>"); //appends display with next verb. Can add html into here.
                            });
                        }
                    });
                } else {
                    console.log("No " + t + "s.");
                }
            }
            perType("adjective");
            perType("noun");
            perType("verb");
            perType("adverb");

        },
        error: function(xhr, textStatus, errorThrown) {
            if (xhr.status === 0) {
                console.log("Couldn't connect to the API.");
                document.getElementById("syn_title").innerHTML = "Couldn't connect to the API. Are you offline? If not, email me.";
            } else if (xhr.status === 404) {
                //console.log("That word could not be found.");
                //document.getElementById("syn_title").innerHTML = "No word found, check spelling?";
            } else if (xhr.status === 303) {
                console.log("That word wasn't found but I have a recommendation.");
            } else if (xhr.status === 500) {
                //console.log("You didn't type anything.");
                //document.getElementById("syn_title").innerHTML = "You didn't type a word!";
                document.getElementById("syn_title").innerHTML = "";
            }
       }
    });
    if (typeof no_similars === "undefined") { //Remove similars title if there are no similar words to the input.
        console.log("Getting rid of similar title");
        document.getElementById("sim_title").style.display = "none";
    }
}
