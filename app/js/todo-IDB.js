if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Unfortunately you will not be able to use todo-wknd :(");
}

// -- IndexedDB ================================================================

/*
Functions:

add (on button click)
delete (click on x on item)
create indices for item and day - have a search box on the page
*/

// Open IDB
const dbName = "todoDB";
var request = indexedDB.open(dbName);	// item | day 

request.onupgradeneeded = function(event) {
	var db = event.target.result;
	var objectStore = db.createObjectStore("todoItems", {autoincrement:true});	// i.e. key autoincrements from 1

	// search index
	objectStore.createIndex("item", "item", { unique: true });
	objectStore.createIndex("day", "day", { unique: false });

	// Mke sure objectStore creation is finished before adding data
	objectStore.transaction.oncomplete = function(event) {
	// Store values in  newly created objectStore
	var itemObjectStore = db.transaction("items", "readwrite").objectStore("items");
		for (var i in itemsData) {
			itemObjectStore.add(itemsData[i]);
		}
	}
};
request.onerror = function(event) {
  alert("Whoops...something went wrong. Please try again.\n\nDatabase error: " + event.target.errorCode);	// Do something with request.errorCode!
};
request.onsuccess = function(event) {
  // Do something with request.result!
};

// Add item
function() {
	var transaction = db.transaction(["items"],"readwrite").objectStore("items").add(itemsData);
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
