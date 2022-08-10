import {
  body, elemWrapper, elemForm, elemWrapperChat, elemWrapperMessage, elemBoxUser, getDate
} from './utils';

export default class Inspector {
  constructor() {
    this.data = undefined;
    this.logoutUser = undefined;
  }

  getChat() {
    body.insertAdjacentHTML('afterbegin', elemWrapperChat);
    const elemNamesUsers = document.querySelector('.names-users');
    elemNamesUsers.insertAdjacentHTML('afterbegin', elemBoxUser(this.data.name, 'You'));
    const elemBoxUserFull = document.querySelector('.box-user[data-type="You"]');
    elemBoxUserFull.querySelector('.user-name').textContent = 'You';

    for (let i = 0; i < this.data.response.length - 1; i += 1) {
      elemNamesUsers.insertAdjacentHTML('beforeend', elemBoxUser(this.data.response[i], 'user'));
    }

    const ws = new WebSocket('ws://localhost:7070/ws');
    ws.user = this.data.name;
    ws.binaryType = 'blob';

    ws.addEventListener('open', () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({newUser: this.data.name}));
      }
    });

    const elemFormChat = document.querySelector('.form_chat');
    const elemInput = document.querySelector('.field_chat');
    elemFormChat.addEventListener('submit', (e) => {
      e.preventDefault();
      ws.send(JSON.stringify({newMessage: elemInput.value, sender: this.data.name}));
      elemFormChat.reset();
    });

    ws.addEventListener('message', (evt) => {
      if (ws.readyState === WebSocket.OPEN) {
        const messageData = evt.data;
        try {
          const message = JSON.parse(messageData);
          const elemBoxChat = document.querySelector('.box-chat');
          const {sender} = message;
          if (message.hasOwnProperty('newUser') && message.newUser !== this.data.name) {
            elemNamesUsers.insertAdjacentHTML('beforeend', elemBoxUser(message.newUser, 'User'));
          } else if (message.hasOwnProperty('newMessage')) {
            elemBoxChat.insertAdjacentHTML('beforeend', elemWrapperMessage(this.data.name, this.data.name === sender ? 'You' : sender, getDate(), message.newMessage))
          } else if (message.hasOwnProperty('logoutUser')) {
            const {logoutUser} = message;
            this.logoutUser = logoutUser;
            document.querySelector(`[data-id=${logoutUser}]`).remove();
            elemBoxChat.insertAdjacentHTML('beforeend', elemWrapperMessage(this.logoutUser, this.logoutUser, getDate(), 'Всем пока!'))
          }
        } catch (e) {
          console.log(e)
        }
      }
    });

    const elemButtonClose = document.querySelector('.button_logout');
    elemButtonClose.addEventListener('click', () => {
      ws.send(JSON.stringify({logoutUser: this.data.name}))
      const formDataClose = new FormData();
      formDataClose.append('key', `${this.data.name}`);
      const xhrClose = new XMLHttpRequest();
      const urlClose = 'http://localhost:7070/?method=removeUser';
      xhrClose.open('POST', urlClose);
      xhrClose.send(formDataClose);
      ws.close();
      document.querySelector('.wrapper-chat').remove();
      elemWrapper.classList.remove('hidden');
    });

    ws.addEventListener('close', (evt) => {
      console.log('connection closed', evt);
    });
    
    ws.addEventListener('error', () => {
      console.log('error');
    });
  }

  getName() {
    const formData = new FormData(elemForm);
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:7070/?method=getName';
    xhr.open('POST', url);
    xhr.send(formData);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          this.data = JSON.parse(xhr.responseText);
          if (typeof this.data.response === 'object') {
            elemWrapper.classList.add('hidden');
            elemForm.reset();
            this.getChat();
          } else if (typeof this.data.response === 'string') {
            alert(this.data.response);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
}
