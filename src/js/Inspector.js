import {
  body, elemWrapper, elemForm, elemWrapperChat, elemBoxUser
} from './utils';

export default class Inspector {
  constructor() {
    this.data = undefined;
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
            elemWrapper.remove();
            console.log(this.data)
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
