var messagesData = [
  {
    id: 1,
    responder: 2, //responder index users[messages.responder]
    send_status: false, //true - message was sent by responder, false - message was sent by Maks
    time: new Date(2015, 2, 5, 13, 8, 7),
    text: messagesText[0],
    read_status: true, // true - message has been read
    delete_status: false // true - message has been deleted
  },
  {
    id: 2,
    responder: 1, //responder index users[messages.responder]
    send_status: true, //true - message was sent by responder, false - message was sent by Maks
    time: new Date(2015, 2, 5, 14, 1, 15),
    text: messagesText[1],
    read_status: true, // true - message has been read
    delete_status: false // true - message has been deleted		
  },
  {
    id: 3,
    responder: 4, //responder index users[messages.responder]
    send_status: false, //true - message was sent by responder, false - message was sent by Maks
    time: new Date(2015, 2, 5, 13, 15, 1),
    text: messagesText[2],
    read_status: true, // true - message has been read
    delete_status: false // true - message has been deleted
  },
  {
    id: 4,
    responder: 3, //responder index users[messages.responder]
    send_status: true, //true - message was sent by responder, false - message was sent by Maks
    time: new Date(2015, 2, 5, 13, 10, 5),
    text: messagesText[3],
    read_status: true, // true - message has been read
    delete_status: false // true - message has been deleted
  },
  {
    id: 5,
    responder: 0, //responder index users[messages.responder]
    send_status: false, //true - message was sent by responder, false - message was sent by Maks
    time: new Date(2015, 2, 5, 13, 1, 1),
    text: messagesText[4],
    read_status: true, // true - message has been read
    delete_status: false // true - message has been deleted
  }
];


