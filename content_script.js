function loadMapsAPI() {
    var script = document.createElement('script');
		var apiKey = "AIzaSyBdhbJqLe8IvJdalQIoyh8cipZTfYHiHaY" 
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&libraries=places";
    document.body.appendChild(script);
		console.log("Loaded maps API.");
}

function handleLocationChange() {
	var place = autocomplete.getPlace();
	console.log("Filling in place: " + place)
}

var autocomplete;
var autocompleteListener;
function initAutocomplete() {
  console.log("Initializing Autocomplete");
  // Create the autocomplete object, with no restriction on place type
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')));

  // When the user selects an address from the dropdown, handle the location change
  autocompleteListener = autocomplete.addListener('place_changed', handleLocationChange);
}

function removeAutocomplete() {
  if (autocomplete !== undefined) {
    console.log("Remove Autocomplete listener");
    google.maps.event.removeListener(autocompleteListener);
    console.log("Remove Autocomplete");
    google.maps.event.clearInstanceListeners(autocomplete);
    var pacContainers = document.getElementByClassName(".pac-container");
    var pacContainer = pacContainers[0].remove();
  }
}

function addLocationInput() { 
  var whereHeader = document.createElement("div");
    whereHeader.setAttribute("class", "color: #1b1b1b; font-family: Arial; font-size: 13px; clear: both;");

    var tileLabel = document.createElement("div");
    tileLabel.setAttribute("class", "title-label");
    tileLabel.setAttribute("style","height: 18px; line-height: 18px; color: #9b9b9b; font-size: 11px; font-weight: bold;");

    var label = document.createElement("label");
    var text = document.createTextNode("Where");
    label.appendChild(text);
    tileLabel.appendChild(label);

    whereHeader.appendChild(tileLabel);

    var tileContent = document.createElement("div");
    tileContent.setAttribute("class", "tile-content");
    tileContent.setAttribute("style", "height: 36px; line-height: 36px;position: relative;");

    var input = document.createElement("input");
    input.setAttribute("class", "gcal-textinput");
		input.setAttribute("id", "autocomplete");
		input.setAttribute("placeholder", "Enter your location");
    tileContent.appendChild(input);

    whereHeader.appendChild(tileContent);

    var elements = document.getElementsByClassName("event-create-container");
    var element = elements[0];
    element.insertBefore(whereHeader, element.children[2]);
}

console.log("Starting");
loadMapsAPI();
var target = document.body;
var observer = new MutationObserver(function(mutations) {  
  mutations.forEach(function(mutation) {
    console.log(mutation);
    if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList.value.includes("bubble")) {
      console.log("Found a new bubble. Adding location input.");
      addLocationInput();
      initAutocomplete();
    }
    if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList.value.includes("pac-container")) {
      console.log("Updating z-index of pac-container.");
      var pacContainer = mutation.addedNodes[0];
      var oldStyle = pacContainer.getAttribute("style");
      pacContainer.setAttribute("style", oldStyle + " z-index: 2000;");
    }
    if (mutation.removedNodes.length > 0 && mutation.removedNodes[0].classList.value.includes("bubble")) {
      removeAutocomplete();
    }
  });    
});

var config = { attributes: true, childList: true, characterData: true };
observer.observe(target, config);
