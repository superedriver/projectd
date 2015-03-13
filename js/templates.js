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
	<h3>Новое сообщение для:<a href="">' + $(this).text() + '</a></h3> \
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