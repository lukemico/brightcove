var myPlayer = videojs.getPlayer('myPlayerID'),
	volumeLevel = 0.7;

// +++ Wait for loadedmetadata then try to play video +++
myPlayer.on('loadedmetadata', function() {
	// Play video which returns a promise
	var promise = myPlayer.play();
	console.log('promise', promise);

	// +++ Use promise to see if video is playing or not +++
	if (promise !== undefined) {
		promise
			.then(function() {
				// Autoplay started!
				// If video playing unmute and set the volume
				myPlayer.muted(false);
				myPlayer.volume(volumeLevel);
			})
			.catch(function(error) {
				// Autoplay was prevented.
				// // +++ If autoplay prevented mute the video, play video and display unmute button +++
				myPlayer.muted(true);
				myPlayer.play();

				var button = document.createElement('button');

				// +++ Add button's event listener +++
				button.addEventListener('click', function() {
					myPlayer.muted(false);
					myPlayer.volume(volumeLevel);
					playerContainer.removeChild(button);
				});

				// +++ Configure the button +++
				button.textContent = 'Unmute';
				button.classList.add('inner');
				button.setAttribute(
					'style',
					'color:black; background-color:red; width:100px; height:50px; opacity: .4;'
				);

				// +++ Add the button to the container +++
				playerContainer.appendChild(button);
			});
	}
});

// question 6
var loopPlayer,
	videoLoopNum = 0;

videojs.getPlayer('loopVideoPlayer').ready(function() {
	// Get a reference to the player when it is ready
	loopPlayer = this;
	// Listen for the "ended" event and play the video
	// You can also do this by adding the loop attribute to the player code
	loopPlayer.on('ended', function() {
		playVideo();
	});

	// Play the video first time
	playVideo();
});

// +++ Loop video 3 times +++
function playVideo() {
	// Check the number of times the video has played
	if (videoLoopNum < 3) {
		// Start video playback
		loopPlayer.play();
		// Increment number of times video played
		videoLoopNum++;
	}
}

videojs.getPlayer('loopVideoPlayer').ready(function() {
	// When the player is ready, get a reference to it
	var myPlayer = this,
		// Set the large and small sizes
		// You could also all options to be passed in to set these sizes
		largeWidth = 640,
		largeHeight = 360,
		smallWidth = 272,
		smallHeight = 153,
		// Get a reference to the player wrapper
		// If that element doesn't exist in the HTML, this plugin will fail
		playerWrapper = document.getElementById('playerWrapper');

	// +++ Change the size of the player +++
	/**
	 * Make the player large
	 */
	function makePlayerLarge() {
		playerWrapper.setAttribute(
			'style',
			'width:' +
				largeWidth +
				'px;height:' +
				largeHeight +
				'px;transition: width .4s ease-in-out, height .4s ease-in-out;'
		);
	}

	/**
	 * Make the player small
	 */
	function makePlayerSmall() {
		playerWrapper.setAttribute(
			'style',
			'width:' +
				smallWidth +
				'px;height:' +
				smallHeight +
				'px;transition: width .4s ease-in-out, height .4s ease-in-out;'
		);
	}

	// +++ Listen for the mouseout event +++
	/**
	 * Add the mouseout event listener
	 */
	function mouseoutOn() {
		// add the event listener to make the player small on mouseout
		playerWrapper.addEventListener('mouseout', makePlayerSmall);
		// make the player small now
		makePlayerSmall();
	}

	/**
	 * Remove the mouseout event listener
	 */
	function mouseoutOff() {
		// Remove the mouseout event listener
		playerWrapper.removeEventListener('mouseout', makePlayerSmall);
	}

	// +++ Control the player size +++
	// Make sure the player wrapper exists - otherwise, do nothing
	if (playerWrapper !== null) {
		// Initially, make sure the player is small
		makePlayerSmall();
		// On mouseover make the player large
		playerWrapper.addEventListener('mouseover', makePlayerLarge);
		// On mouseout, make the player small
		mouseoutOn();
		// On play, keep the player large
		myPlayer.on('play', mouseoutOff);
		// On pause or video end, make the player small
		myPlayer.on('pause', mouseoutOn);
		myPlayer.on('ended', mouseoutOn);
	}
});

// Question 7 - Lightbox

// Get a reference to the video poster image and the lightbox
var myPlayer,
	eContainer = document.getElementById('container'),
	eLightbox = document.getElementById('playerLightbox');

videojs.getPlayer('mylightBoxPlayerID').ready(function() {
	// Get a reference to the player
	myPlayer = this;

	// +++ Wait for loadstart +++
	// Listen for the loadstart event
	myPlayer.on('loadstart', function() {
		var str = '';
		// Get the video's poster image and use it in the img tag
		str +=
			'<img src="' +
			myPlayer.mediainfo.posterSources[0].src +
			'" alt="' +
			myPlayer.mediainfo.name +
			'" width="100%" height="100%"/>';
		eContainer.innerHTML = str;

		// +++ Listen for poster click +++
		// Add click event listener to the video poster image
		eContainer.onclick = function(e) {
			// reveal the lightbox
			eLightbox.className = 'playerShow';
			// play the video
			myPlayer.play();
		};

		// +++ Close the lightbox +++
		// Listen for a click event on the close button
		playerClose.onclick = function(e) {
			myPlayer.pause();
			// hide the lightbox
			eLightbox.className = 'playerHide';
		};
	});
});
