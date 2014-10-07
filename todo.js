var datForm;
var id_num = 1;

var DeleteButton = function(){
	var ul = document.getElementById("toDoList");
	var li = document.getElementById(this.className);

	ul.removeChild(li);

	for (i = 1; i <= ul.childNodes.length; i++){ //reset the dom so everything is in order
		console.log(ul.childNodes.length);
		ul.childNodes[i].id = i;
		ul.childNodes[i].childNodes[1].className = i;
		ul.childNodes[i].childNodes[2].className = i;
	}
	id_num = ul.childNodes.length;
};

var DoneButton = function() {
	var li = document.getElementById(this.className);
	li.className ="strike";

	li.childNodes[1].innerText = "Undo";
	li.childNodes[1].removeEventListener("click", DoneButton);
	li.childNodes[1].addEventListener("click", UndoButton);
};

var UndoButton = function(){
	var li = document.getElementById(this.className);
	li.className ="";

	li.childNodes[1].innerText = "Done";
	li.childNodes[1].removeEventListener("click", UndoButton);
	li.childNodes[1].addEventListener("click", DoneButton);
};

var initialize = function(){
   datForm = document.getElementById("datForm");
	datForm.addEventListener("submit", function (event) {

	    // prevent the data from being sent to the server
	    event.preventDefault();
	    console.log('this is happening');

	    // add your code to deal with the user's data here.
	    // if your form has an text field  with a `name` (not `id`) of
	    // title, then you can access what the user typed with:
	    //
	    var toDoItem = this.toDoItem.value;
	    var text = document.createTextNode(toDoItem);
	    
	    var button1 = document.createElement("button");
	    button1.className=id_num;
	    button1.innerHTML = "Done";
	    button1.addEventListener("click", DoneButton);

	    var button2 = document.createElement("button");
	    button2.className=id_num;
	    button2.innerHTML = "Delete";
	    button2.addEventListener("click", DeleteButton);


	    var list = document.getElementById("toDoList"); 
	    var listItem = document.createElement("li");
	    listItem.id = id_num;
	    listItem.appendChild(text);
	    listItem.appendChild(button1);
	    listItem.appendChild(button2);
	    list.appendChild(listItem);
	    this.toDoItem.value = "";

	    window.localStorage["foo"] = "something";

	    id_num++;
	});
};

window.onload = initialize;