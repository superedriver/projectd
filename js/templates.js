// template for showing users
var usersTemplate = 
'<ul> \
	{{#listOfUsers}} \
		<li><img alt="{{name}}" src="{{logo}}">{{name}}</li> \
	{{/listOfUsers}} \
</ul>';

// template for creating new message
var createNewMessageString = 
'<div id="new-message"> \
	<h3>Новое сообщение для:<a href="#"></a></h3> \
	<form class="form-horizontal"> \
		<textarea class="form-control" rows="2" id="textArea" placeholder="Введите сообщение" ></textarea> \
		<a href="#" class="btn btn-default btn-cansel-message">Отменить</a> \
		<a href="#" class="btn btn-default btn-send-message">Отправить</a> \
	</form> \
</div>';

// template for dialog
var dialogTemplate = 
'<div class="dialog"> \
	<div class="dialogs-photo"><img alt="{{dialog_recipient.name}}" src="{{dialog_recipient.logo}}"></div> \
	<div class="dialogs-info"> \
		<div class="dialogs-info-name h3">{{dialog_recipient.name}}</div> \
		<div class="dialogs-info-date text-muted">{{dialog_body.created_at}}</div> \
	</div> \
	<div class="dialogs-msg-contents"> \
		<div class="dialogs-message-image"><img alt="{{dialog_sender.name}}" src="{{dialog_sender.logo}}"></div> \
		<div class="dialog-message-body">{{dialog_body.text}}</div> \
	</div> \
</div>';

// template for active dialog
var activeDialogTemplate = 
'<div class="dialogs-with-users"> \
</div> \
<div id="correspondence"> \
</div> \
<div id="input-text"> \
	<div id="it-user-holder"> \
		<img alt="SMS" src="images/sms.jpg"> \
	</div> \
	<div id="it-write-form"> \
		<form class="form-horizontal"> \
	        <textarea class="form-control" rows="2" id="textArea" placeholder="Введите сообщение" ></textarea> \
	        <a href="#" class="btn btn-default ">Отправить</a> \
		</form> \
	</div> \
	<div id="it-receiver-holder"> \
		<img alt="" src=""> \
	</div> \
</div>'

// template for active user
var dialogUsersNames = 
'<ul> \
	{{#dialogsWhithUsers}} \
		<li> \
			<h4 class="dialogs-user-name">{{name}}</h4> \
			<button type="button" class="close dialogs-user-close">×</button> \
		</li> \
	{{/dialogsWhithUsers}} \
</ul>';


var messageTemplate = 
'<div class="message"> \
	<div class="message-left-space"></div> \
	<div class="message-not-read-wrapper {{notReadClass}}"> \
		<div class="message-author"> \
			<img alt="{{messageSender.name}}" src="{{messageSender.logo}}"> \
		</div> \
		<div class="message-body "> \
			<div class="message-body-author-name"><a href="#"><strong>{{messageSender.name}}</strong></a></div> \
			<div class="message-body-text">{{messageBody.text}}</div> \
		</div> \
		<div class="message-time text-muted">{{messageBody.created_at}}</div> \
	</div> \
	<div class="clear"></div> \
</div>'
