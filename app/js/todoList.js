if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Unfortunately you will not be able to use todo-wknd :(");
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
}
