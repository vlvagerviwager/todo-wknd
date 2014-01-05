if (Modernizr.localstorage) {
	// window.localStorage is available
} else {
	// no native support for local storage
	// Replace alert with pop-up overlay to inform user
	alert('HTML5 local storage not supported :(');
}

// -- The list of items to do ================================================== 

$(function() {
	$( "#todoList" ).sortable();
	$( "#todoList" ).disableSelection();
});
$( "#todoList" ).on( "click", ".delete", function() {
    $(this).parent().remove();
});

function submitItem() {
	var itemText = document.getElementById('itemText').value;
	var day = document.getElementById('dayList').value;
	
	$('#todoList').append("<li>Some thing<button class='delete'>Delete</button></li>");
	//localStorage.setItem("bar", foo);
}
