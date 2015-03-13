$(function(){

// Show user list in the right column
function showUsers() {
  // usersTemplate in templates.js
  $('.right-column').html(Mustache.render(usersTemplate, { listOfUsers: users }));
}

// Show 'create new message form' when you click on user from userllist in the right column
function createNewMessage() {
  // stringCreateNewMessage in templates.js
  $('.wrapper').html(createNewMessageString);
  // button "Отменить"
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
    var months =['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];    
    var messageTime = addNull(thisMessage.created_at.getDate()) + ' ' + months[thisMessage.created_at.getMonth()] + ' ' + thisMessage.created_at.getFullYear() + ' в ' + addNull(thisMessage.created_at.getHours()) + ':' + addNull(thisMessage.created_at.getMinutes()) + ':' + addNull(thisMessage.created_at.getSeconds());
    // Cutting the long text
    var messageText = getMessageText(thisMessage.text); 
    // Container for saving data of the dialog
    var dialogDataContainer =  
      {
        dialog_recipient: recipient,
        dialog_sender: messageSender,
        dialog_body: 
          {
            created_at: messageTime,
            text: messageText
          }        
      }
    // render and add the dialog to wrapper
    $('.wrapper').append(Mustache.render(dialogTemplate, dialogDataContainer));
    // If message hasn`t been read -> dark it 
    if (!thisMessage.read_status) {$('.wrapper .dialog:last-child').addClass('notread');}; 
  }

  // collect last dialog whith each user
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