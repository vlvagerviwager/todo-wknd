if (Modernizr.localstorage) {
	// window.localStorage is available
} else {
	// no native support for local storage
	// Replace alert with pop-up overlay to inform user
	alert('HTML5 local storage not supported :(');
}

function submitItem() {
	var itemText = document.getElementById('itemText').value;
	alert(itemText);
	//localStorage.setItem("bar", foo);
}