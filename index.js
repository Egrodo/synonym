function send_to_symonym(e) {
    if(event.keyCode == 13) {
		var word = document.getElementsByName("input_word")[0].value; //Check if input is empty. Sanitize input. Accept input after a second of waiting instead of enter
		var url = "http://words.bighugelabs.com/api/2/6497baacbb91c7feedadf10454978aea/" + word + "/";
		console.log(url);
		fetch(url) //fetch not supported by iOS :(
			.then(function(data) { //check if returned null, means not a word
				return response = data.text();
			})
			.then(function(text) {
				var regex = /(syn|rel)\|[a-zA-Z]*/gmi;

				var regexed1 = text.match(regex);
				var regexed2 = regexed1.toString();
				var regexed3 = regexed2.replace(/(syn\||rel\||\,)/gmi," "); //This doesn't allow for words with spaces in them.

				document.getElementById("display").innerHTML = regexed3;
			})
			.catch(function(err) {
				console.log(err);
                if (status === 404) {
                    document.getElementById("display").innerHTML = "That's not a word!";
                }
			});
	}
}
