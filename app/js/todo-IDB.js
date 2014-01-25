if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Unfortunately you will not be able to use todo-wknd :(");
}

/* IndexedDB
		================================================== */

/*
Functions:

add 
delete 
create indices for item and day - have a search box on the page
*/

var todowknd = {};
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

if ('webkitIndexedDB' in window) {
	window.IDBTransaction = window.webkitIDBTransaction;
	window.IDBKeyRange = window.webkitIDBKeyRange;
}

todowknd.indexedDB = {};
todowknd.indexedDB.db = null;

todowknd.indexedDB.onerror = function(e) {
	console.log(e);
};

todowknd.indexedDB.open = function() {
  var version = 2;
  var request = indexedDB.open("items", version);

  // Can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = todowknd.indexedDB.onerror;

    if(db.objectStoreNames.contains("item")) {
      db.deleteObjectStore("item");
    }

    var store = db.createObjectStore("item", {keyPath: 'id', autoIncrement: true});
  };

  request.onsuccess = function(e) {
    todowknd.indexedDB.db = e.target.result;
    todowknd.indexedDB.getAllItems();
  };

  request.onerror = todowknd.indexedDB.onerror;
};

todowknd.indexedDB.addTodo = function(todoText, dayValue) {
  var db = todowknd.indexedDB.db;
  var trans = db.transaction(["item"], "readwrite");
  var store = trans.objectStore("item");
  var request = store.put({
    "text": todoText,
    "day": dayValue
  });

  request.onsuccess = function(e) {
    // Re-render all the todo's
    todowknd.indexedDB.getAllItems();
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};

todowknd.indexedDB.getAllItems = function() {
  var items = document.getElementById("todoList");
  items.innerHTML = "";

  var db = todowknd.indexedDB.db;
  var trans = db.transaction(["item"], "readwrite");
  var store = trans.objectStore("item");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    renderTodo(result.value);
    result.continue();
  };

  cursorRequest.onerror = todowknd.indexedDB.onerror;
};

function renderTodo(row) {

  var items = document.getElementById("todoList");
  var li = document.createElement("li");
  li.className = "ui-state-default";
  var a = document.createElement("a");
  var t = document.createTextNode();
  t.data = row.text;

  a.addEventListener("click", function(e) {
    todowknd.indexedDB.deleteTodo(row.id);
  });
  a.textContent = " [Delete]";
  
  li.appendChild(t);
  li.appendChild(a);
  items.appendChild(li);
}

todowknd.indexedDB.deleteTodo = function(id) {
  var db = todowknd.indexedDB.db;
  var trans = db.transaction(["item"], "readwrite");
  var store = trans.objectStore("item");

  var request = store.delete(id);

  request.onsuccess = function(e) {
    todowknd.indexedDB.getAllItems();  // Refresh the screen
  };

  request.onerror = function(e) {
    console.log(e);
  };
};

function init() {
  todowknd.indexedDB.open(); // open displays the data previously saved
}

window.addEventListener("DOMContentLoaded", init, false);

function addTodo() {
  var item = document.getElementById('itemText');
  var day = document.getElementById('dayList');

  todowknd.indexedDB.addTodo(item.value, day.value);
  item.value = '';
  day.value = '';
}

/* List UI
		================================================== */

$(function() {
	$( "#todoList" ).sortable();
	$( "#todoList" ).disableSelection();
});
