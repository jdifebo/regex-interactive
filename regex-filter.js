let words = [];
const RESULTS_TO_SHOW = 20;

function callAjax(url, callback) {
	var xmlhttp;
	// compatible with IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			callback(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function filterResults(){
    let input = document.getElementById("input").value;
	let filtered = words.filter(word => word.match(new RegExp(input)));
	let divs = filtered
        .slice(0, RESULTS_TO_SHOW)
        .map(word => "<div style='width: 50%; float: left;'>" + word + "</div>")	// lol inline styles
		.join("");
	let resultCountMessage = filtered.length > RESULTS_TO_SHOW ?
		"Showing " + RESULTS_TO_SHOW + " matches of " + filtered.length + " total matches" :
		"Showing all " + filtered.length + " matches";
    document.getElementById("result-count").innerHTML = resultCountMessage;
    document.getElementById("results").innerHTML = divs;
}

document.getElementById("input").addEventListener("input", filterResults);

callAjax("english.txt", data => {
    words = data.split("\n");
    filterResults();
});