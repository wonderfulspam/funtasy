$(document).ready(function() {
	// Initiate gifLoop for set interval
	var refresh;
	// Duration count in seconds
	const duration = 1000 * 10;
	// Giphy API defaults
	const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
		tag: "soccer",
		type: "random",
		rating: "R"
	};
	// Target gif-wrap container
	const $gif_wrap = $("#gif-wrap");
	// Giphy API URL
	let giphyURL = encodeURI(
		giphy.baseURL +
			giphy.type +
			"?api_key=" +
			giphy.apiKey +
			"&tag=" +
			giphy.tag +
			"&rating=" +
			giphy.rating
	);

	// Call Giphy API and render data
	var newGif = () => $.getJSON(giphyURL, json => renderGif(json.data));

	// Display Gif in gif wrap container
	var renderGif = _giphy => {
		console.log(_giphy);
		// Set gif as bg image
		$gif_wrap.css("background-image", 'url("' + _giphy.image_original_url + '")');
		var height = _giphy.image_height;
		var width = _giphy.image_width;
		console.log(height);
		console.log(width);
		var aspectRatio = width * 1.0 / height;
		width = Math.min(470, width);
		height = width / aspectRatio;
		console.log(height);
		console.log(width);
		$gif_wrap.css("height", height);
		$gif_wrap.css("width", width);

		// Start duration countdown
		refreshRate();
	};

	// Call for new gif after duration
	var refreshRate = () => {
		// Reset set intervals
		clearInterval(refresh);
		refresh = setInterval(function() {
			// Call Giphy API for new gif
			newGif();
		}, duration);
	};

	// Call Giphy API for new gif
	newGif();
	
	
	const newGifButton = $('#new-gif');
	
	newGifButton.click(newGif)
});
