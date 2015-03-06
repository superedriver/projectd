$(function(){

// Show user list in the right column
function showUsers() {
  var userList = $('<ul>').appendTo('.right-column');

  for (var i in users) {
    var userInfo = $('<li>').appendTo(userList);
    var userString = '<img alt="' + users[i].name + '" src="' + users[i].logo + '">' + users[i].name;
    userInfo.html(userString);
  }
}

// Show 'create new message form' when you click on user from userllist in the right column
function createNewMessage() {
  var stringCreateNewMessage = '<div id="new-message"><h3>Новое сообщение для:<a href="">' + $(this).text() + '</a></h3><form class="form-horizontal"><textarea class="form-control" rows="2" id="textArea" placeholder="Введите сообщение" ></textarea><a href="#" class="btn btn-default btn-cansel-message">Отменить</a><a href="#" class="btn btn-default btn-send-message">Отправить</a></form></div>'
  $('.wrapper').html(stringCreateNewMessage);
  $('#new-message form a.btn-cansel-message').click(function() {
    location.reload();
    });	
}

// Show dialog in the wrapper
function addDialog(dialogId) {
  // Add 0 to one-symbol data(date, hours, minutes, seconds)
  function addNull(data){
    return (data.toString().length == 1) ? '0' + data : data;
  }
  // Cut long messages to 50 symbols for showing in the dialog
  function getMessageText(messageText) {
    return (messageText.length < 50) ? messageText : messageText.slice(0, 47) + '...';
  }

  var months =['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  var responderName = users[dialogId.responder].name;
  var responderLogo = users[dialogId.responder].logo;
  // users[0] - Maks
  var senderName = (dialogId.send_status) ? users[dialogId.responder].name : users[0].name;
  var senderLogo = (dialogId.send_status) ? users[dialogId.responder].logo : users[0].logo;
  // reduction messageTime to view - DD Month YYYY в HH:MM:SS
  var messageTime = addNull(dialogId.time.getDate()) + ' ' + months[dialogId.time.getMonth()] + ' ' + dialogId.time.getFullYear() + ' в ' + addNull(dialogId.time.getHours()) + ':' + addNull(dialogId.time.getMinutes()) + ':' + addNull(dialogId.time.getSeconds());
  // Cutting the long text
  messageText = getMessageText(dialogId.text);
  // Create and append the dialog
  var dialog = '<div class="dialog"><div class="dialogs-photo"><img alt="' + responderName + '" src="' + responderLogo + '"></div><div class="dialogs-info"><div class="dialogs-info-name h3">' + responderName + '</div><div class="dialogs-info-date text-muted">' + messageTime + '</div></div><div class="dialogs-msg-contents"><div class="dialogs-message-image"><img alt="' + senderName + '" src="' + senderLogo + '"></div><div class="dialog-message-body">' + messageText + '</div></div></div>';
  $('.wrapper').append(dialog);
}


addDialog(messagesData[0]);
addDialog(messagesData[1]);
addDialog(messagesData[2]);
addDialog(messagesData[3]);
addDialog(messagesData[4]);

// Show the list of users in the right column
showUsers();
// Show create-new-message form after click on user in the right column
$('.right-column ul li').click(createNewMessage);
$('.header>.wrap>a').click(function() {
  location.reload();
  });




});