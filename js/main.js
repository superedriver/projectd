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
  // index of this dialog in dialogs[]
  var indexDialog = _.findIndex(dialogs, {'id': dialogId});
  var thisDialog = dialogs[indexDialog];
  // message creator's index in users[]  
  var indexMessageSender = _.findIndex(users, {'id': dialogs[indexDialog].sender});
  // message receiver's index in users[]    
  var indexMessageReceiver = _.findIndex(users, {'id': dialogs[indexDialog].receiver});
  // text of message index in messages[]      
  var indexMessage = _.findIndex(messages, {'id': dialogs[indexDialog].text});
  var thisMessage = messages[indexMessage];

  // this user's ID in users[]
  var idThisUser = 1;
  // this user's index in users[]
  var indexThisUser = _.findIndex(users, {'id': idThisUser});
  
  // recipient's index in users[]
  var indexRecipient = indexMessageSender;
  if (indexRecipient == indexThisUser) {indexRecipient = indexMessageReceiver};

  var recipientName = users[indexRecipient].name;
  var recipientLogo = users[indexRecipient].logo;
  // users[0] - Maks
  var senderName = users[indexMessageSender].name;
  var senderLogo = users[indexMessageSender].logo;
  // reduction messageTime to view - DD Month YYYY в HH:MM:SS
  var messageTime = addNull(thisDialog.time.getDate()) + ' ' + months[thisDialog.time.getMonth()] + ' ' + thisDialog.time.getFullYear() + ' в ' + addNull(thisDialog.time.getHours()) + ':' + addNull(thisDialog.time.getMinutes()) + ':' + addNull(thisDialog.time.getSeconds());
  // Cutting the long text
  var messageText = getMessageText(thisMessage.text);
  // Create and append the dialog
  var dialog = '<div class="dialog"><div class="dialogs-photo"><img alt="' + recipientName + '" src="' + recipientLogo + '"></div><div class="dialogs-info"><div class="dialogs-info-name h3">' + recipientName + '</div><div class="dialogs-info-date text-muted">' + messageTime + '</div></div><div class="dialogs-msg-contents"><div class="dialogs-message-image"><img alt="' + senderName + '" src="' + senderLogo + '"></div><div class="dialog-message-body">' + messageText + '</div></div></div>';
  $('.wrapper').append(dialog);
}

addDialog(1);
addDialog(2);
addDialog(3);
addDialog(4);
addDialog(5);


// Show the list of users in the right column
showUsers();
// Show create-new-message form after click on user in the right column
$('.right-column ul li').click(createNewMessage);
$('.header>.wrap>a').click(function() {
  location.reload();
  });




});