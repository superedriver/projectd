$(function(){

// Show user list in the right column
function showUsers() {
  // usersTemplate in templates.js
  $('.right-column').html(Mustache.render(usersTemplate, { listOfUsers: users }));
  $('.right-column ul li').click(createNewMessage);
}





// Show 'create new message form' when you click on user from userllist in the right column
function createNewMessage() {
  // stringCreateNewMessage in templates.js
  $('.wrapper').html(createNewMessageString);
  // add message receiver name
  var newMessageRecieverName = $(this).text();
  $('#new-message h3 a').html(newMessageRecieverName);

  // button "Отменить"
  $('#new-message form a.btn-cansel-message').click(function() {
    showInitialStatement();
    });
  $('#new-message form a.btn-send-message').click(function() {
    // create new message
    var newMessageReciever = _.find(users, {'name': newMessageRecieverName});
    var newMessageText = $('#new-message textarea').val();

    if (newMessageText) {
      addNewMessage(newMessageReciever, newMessageText);
    };
  });

  $('.header ul li').eq(1).removeClass('active');
  $('.header ul li').eq(0).removeClass('active');
}


function addNewMessage(newMessageReciever, newMessageText) {
  var newMessage = {
    id: messages.length + 1,
    sender_id: thisUser.id, // message sender_id ID in users[]
    receiver_id: newMessageReciever.id, // message receiver_id ID in users[]
    created_at: new Date(),
    text: newMessageText,
    read_status: false, // true - message has been read
    delete_status: false // true - message has been deleted      
  };  

  messages.push(newMessage);
  showCorrespondenceWithUser(newMessageReciever);
}





function getMessageTime (createdAt, vParametr) {
   // Add 0 to one-symbol data(date, hours, minutes, seconds)
  function addNull(data){
    return (data.toString().length == 1) ? '0' + data : data;
  } 
  // reduction messageTime to view - DD Month YYYY в HH:MM:SS
  var months =['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];    
  return addNull(createdAt.getDate()) + ' ' + months[createdAt.getMonth()] + ' ' + createdAt.getFullYear() + vParametr + addNull(createdAt.getHours()) + ':' + addNull(createdAt.getMinutes()) + ':' + addNull(createdAt.getSeconds());
}


// Show last dialog whith each user in the wrapper
function  showDialogs() {

  // Show dialog in the wrapper
  function addDialog(dialogId) {

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
    // recipient's index in users[]
    var recipient = messageSender;
    if (recipient == thisUser) {recipient = messageReceiver};
    
    // reduction messageTime to view - DD Month YYYY в HH:MM:SS
    var messageTime = getMessageTime(thisMessage.created_at, ' в ');
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

  // collect last dialog with each user
  function lastDialogWithUser(recipientId) {
    var correspondenceSortedByTime = getCorrespondenceWhithUser(recipientId);
    // add the lastest dialog with this user to list
    usersDialogList.push(_.last(correspondenceSortedByTime));
  }
  // clear wrapper
  $('.wrapper').empty();
  // container for last dialog with each user
  var usersDialogList = [];
  // get last dialog with each user
  _.each(users, function(element){
    lastDialogWithUser(element.id);
  });
  // sort by time
  usersDialogList = _.sortBy(usersDialogList, function(element){ return element.created_at; }).reverse();
  // last dialog with each user
  _.each(usersDialogList, function(dialog){
    addDialog(dialog.id);
  });
  // onclick - show corresponder with user
  $('.dialog').click( function(){
    // get responder
    var responder_name = $(this).find('.dialogs-info-name').text();
    var responder = _.find(users, {'name': responder_name});
    showCorrespondenceWithUser(responder);    
  }); 

  $('.header ul li').eq(0).addClass('active');
  $('.header ul li').eq(1).removeClass('active');

}


function getCorrespondenceWhithUser(recipientId) {
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
  return correspondence;
}


// show correspondence with user
function showCorrespondenceWithUser(responder) {

   // add active users in the left column
  function addActiveUsers() {
    // add list of users
    $('.dialogs-with-users').html(Mustache.render(dialogUsersNames, { dialogsWhithUsers: activeResponders }));
    // mark responder
    var activeUsers = $('.dialogs-with-users ul li');
    _.each(activeUsers, function(element){
      var currentActiveUserName = $(element).children('h4').text();
      if (currentActiveUserName == responder.name) { $(element).addClass('dialog-active');};
      });

    // click on user in the left column -> show correspondence with user
    $('.dialogs-with-users ul li').click( function(){
      // get responder
      var responder_name = $(this).children('h4').text();
      var responder = _.find(users, {'name': responder_name});
      showCorrespondenceWithUser(responder);    
    }); 

    // delete responder from list
    $('.dialogs-with-users ul li button').click( function(){

      // get responder
      var deletedUserName = $(this).siblings('h4').text();
      var deletedUser = _.find(users, {'name': deletedUserName});
      // delete user from active responders list
      activeResponders = _.without(activeResponders, deletedUser);

      // if it was active responder and we have another responders ->
      // active responder -> the first responder
      // if there aren't any responders -> showInitialStatement
      if ($(this).parent().hasClass('dialog-active')) {

        currentActiveResponder = '';
        if (activeResponders.length > 0) {
          var activeResponder = activeResponders[0];
          showCorrespondenceWithUser(activeResponder);
        }else {
          showInitialStatement();
        };
      }else{
        addActiveUsers();        
      };
    }); 
  }

  // activeDialogTemplate
  $('.wrapper').html(activeDialogTemplate);

  // add responder to the list of users
  var flagUserInactiveResponders = false;
  _.each(activeResponders, function(user){
      if ( user.id == responder.id ) {flagUserInactiveResponders = true;};
    });
  if ( !flagUserInactiveResponders ) {activeResponders.push(responder);};

  $('#it-receiver-holder img').attr({
      src: responder.logo,
      alt: responder.name
    });

  // add list of active users active users in the left column
  addActiveUsers();  

  $('#it-write-form form a').click(function() {
    // create new message
    var newMessageText = $('#it-write-form textarea').val();

    if (newMessageText) {
      addNewMessage(responder, newMessageText);
    };
  });



  // get correspondence
  var correspondenceSortedByTime = getCorrespondenceWhithUser(responder.id);

  // show correspondence with user
  _.each(correspondenceSortedByTime, function(message){
    // container for message data
    var messageDataContainer =  
    {
      messageSender: _.find(users, {'id': message.sender_id}),
      messageBody: 
        {
          created_at: getMessageTime (message.created_at, ' '),
          text: message.text
        },
      notReadClass: ''       
    }
    if (!message.read_status) {messageDataContainer.notReadClass = 'notread'};

    // thisUser.name - 'Вы'
    var messageSenderNameTemp = messageDataContainer.messageSender.name;
    if (messageDataContainer.messageSender.id == idThisUser) {messageDataContainer.messageSender.name = 'Вы'};
    // show message
    var correspondence = $('#correspondence');
    correspondence.append(Mustache.render(messageTemplate, messageDataContainer));
    // scroll to bottom // correspondence[0] - get DOM element from jQuery element
    if (message == _.last(correspondenceSortedByTime)) { correspondence[0].scrollTop = correspondence[0].scrollHeight;}
    // return name of user instead of 'Вы'
    messageDataContainer.messageSender.name = messageSenderNameTemp;

  });

  // show tab "Просмотр диалогов"
  $('.header ul li').eq(1).show();

  $('.header ul li').eq(1).addClass('active');
  $('.header ul li').eq(0).removeClass('active');
  // save responder
  currentActiveResponder = responder;

}



function showInitialStatement(){
  activeResponders = [];
  
  // Show dialogs in the left column
  showDialogs();
  // Show the list of users in the right column
  showUsers();

  // Show create-new-message form after click on user in the right column
  $('.header>.wrap>a').click(function() {
    showDialogs();
    });
  $('#img-logo').click(function() {
    showInitialStatement();
    });

  $('.header>.wrap>a').click(function() {
    showDialogs();
    });

  // hide tab "Просмотр диалогов"
  $('.header ul li').eq(1).hide();

  $('.header ul li').eq(0).click(function() {
    if(!($(this).hasClass('active'))) {
      showDialogs();
    }
  });

  $('.header ul li').eq(1).click(function() {
    if(!($(this).hasClass('active'))) {
      if (currentActiveResponder) {
        showCorrespondenceWithUser(currentActiveResponder); 
      } else{
        showCorrespondenceWithUser(activeResponders[0]);        
      };
    }
  });
}

// this user's ID in users[]
var idThisUser = 1;
// this user's index in users[]
var thisUser = _.find(users, {'id': idThisUser});
// active responders list
var activeResponders = [];
// current active responder
var currentActiveResponder;

showInitialStatement();

});