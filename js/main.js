$(function(){

function showUsers() {
	var userList = $('<ul>').appendTo('.right-column');

	for (var i = 0; i < users.length; i++) {
		var userInfo = $('<li>').appendTo(userList);
		var userString = '<img alt="' + users[i].name + '" src="' + users[i].logo + '">' + users[i].name;
		userInfo.html(userString);
	}
}

function createNewMessage() {
	var stringCreateNewMessage = '<div id="new-message"><h3>Новое сообщение для:<a href="">' + $(this).text() + '</a></h3><form class="form-horizontal"><textarea class="form-control" rows="2" id="textArea" placeholder="Введите сообщение" ></textarea><a href="#" class="btn btn-default">Отправить</a></form></div>'
	$('.wrapper').html(stringCreateNewMessage);
}

showUsers();

$('.right-column ul li').click(createNewMessage);
$('.header>.wrap>a').click(function() {
	location.reload();
	});





});