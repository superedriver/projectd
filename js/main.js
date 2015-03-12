$(function(){

// Show user list in the right column
function showUsers() {
  var userList = $('<ul>').appendTo('.right-column');

  for (var i in users) {
    var userInfo = $('<li>').appendTo(userList);
    var currentUser = users[i];
    var userString = '<img alt="' + currentUser.name + '" src="' + currentUser.logo + '">' + currentUser.name;
    // var userString = '<img alt="' + users[i].name + '" src="' + users[i].logo + '">' + users[i].name;
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

// Show last dialog whith each user in the wrapper
function  showDialogs() {

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
    // index of this message in messages[]
    var indexDialog = _.findIndex(messages, {'id': dialogId});
    var thisMessage = messages[indexDialog];
    // message sender in users[]  
    var messageSender = _.find(users, {'id': thisMessage.sender_id});
    // message receiver in users[]    
    var messageReceiver = _.find(users, {'id': thisMessage.receiver_id});
    // this user's index in users[]
    var thisUser = _.find(users, {'id': idThisUser});
    // recipient's index in users[]
    var recipient = messageSender;
    if (recipient == thisUser) {recipient = messageReceiver};
    // reduction messageTime to view - DD Month YYYY в HH:MM:SS
    var messageTime = addNull(thisMessage.created_at.getDate()) + ' ' + months[thisMessage.created_at.getMonth()] + ' ' + thisMessage.created_at.getFullYear() + ' в ' + addNull(thisMessage.created_at.getHours()) + ':' + addNull(thisMessage.created_at.getMinutes()) + ':' + addNull(thisMessage.created_at.getSeconds());
    // Cutting the long text
    var messageText = getMessageText(thisMessage.text); 
    // Create and append the dialog
    var dialog = '<div class="dialog"><div class="dialogs-photo"><img alt="' + recipient.name + '" src="' + recipient.logo + '"></div><div class="dialogs-info"><div class="dialogs-info-name h3">' + recipient.name + '</div><div class="dialogs-info-date text-muted">' + messageTime + '</div></div><div class="dialogs-msg-contents"><div class="dialogs-message-image"><img alt="' + messageSender.name + '" src="' + messageSender.logo + '"></div><div class="dialog-message-body">' + messageText + '</div></div></div>';
    $('.wrapper').append(dialog);
    // If message hasn`t been read -> dark it 
    if (!thisMessage.read_status) {$('.wrapper .dialog:last-child').addClass('notread');}; 
  }

  function lastDialogWithUser(recipientId) {
    var correspondence;

    if (recipientId == idThisUser) {
      // correspondence with userself
      correspondence = _.filter(messages, function(element){ return (element.sender_id == idThisUser)&&(element.receiver_id == idThisUser); });
    } 
    else {
      // correspondence with another user
      correspondence = _.filter(messages, function(element) {
        return (element.sender_id == recipientId) || (element.receiver_id == recipientId);
        });    
    }; 
    // sort by time
    correspondence = _.sortBy(correspondence, function(element){ return element.created_at; });
    // add the lastest dialog with this user to list
    usersDialogList.push(_.last(correspondence));
  }
  // last dialogs
  var usersDialogList = [];
  // get last dialog with each user
  _.each(users, function(element){
    lastDialogWithUser(element.id);
  });
  // sort by time
  usersDialogList = _.sortBy(usersDialogList, function(element){ return element.created_at; }).reverse();
  // last dialog with each user
  _.each(usersDialogList, function(element){
    addDialog(element.id);
  });  
}

// this user's ID in users[]
var idThisUser = 1;
// Show dialogs in the left column
showDialogs();
// Show the list of users in the right column
showUsers();
// Show create-new-message form after click on user in the right column
$('.right-column ul li').click(createNewMessage);
$('.header>.wrap>a').click(function() {
  location.reload();
  });




});