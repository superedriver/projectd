$(function(){

function showUsers() {
	var userList = $('<ul>').appendTo('.right-column');
	
	for (var i = 0; i < users.length; i++) {
		var userInfo = $('<li>').appendTo(userList);
		var userString = '<img alt="' + users[i].name + '" src="' + users[i].logo + '">' + users[i].name
		userInfo.html(userString);
	}
}

showUsers();

});