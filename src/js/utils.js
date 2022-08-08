export const body = document.querySelector('body');
export const elemWrapper = document.querySelector('.wrapper');
export const elemForm = document.querySelector('.form');
export const elemWrapperChat = `
<div class="wrapper-chat">
  <main class="chat">
    <div class="box-chat"></div>
    <input type="text" class="field_chat" placeholder="Type you message here">
  </main>
  <aside class="names-users"></aside>
</div>
`;

export const elemWrapperMessage = function(id, type, time, text) {
    return `
      <div class="wrapper-message" data-id="${id}" data-type="${type}">
        <div class="box-message">
          <span class="nick-time">${id}, ${time}</span>
          <p class="message__text">${text}</p>
        </div>
      </div>
    `;
}

export const elemBoxUser = function(id, type) {
    return `
      <div class="box-user" data-id="${id}" data-type="${type}">
        <div class="box-user__foto"></div>
        <span class="user-name">${id}</span>
      </div>
    `;
}