export const elemList = document.querySelector('.list');
export const elemWrapper = document.querySelector('.wrapper');

export const elemLi = function (text, time, status, id) {
  return `
    <li class="item">
    <div class="wrapper__block-content">
      <div class="block_checkbox">
        <input type="checkbox" class="input" ${status}>
        <span class="text" data-id=${id}>${text}</span>
      </div>
    </div> 
    <div class="block_edit">
      <span class="time">${time}</span>
      <div class="button button_edit">
          <svg class="icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="485.219px" height="485.22px" viewBox="0 0 485.219 485.22" style="enable-background:new 0 0 485.219 485.22;"
             xml:space="preserve">
          <g>
            <path d="M467.476,146.438l-21.445,21.455L317.35,39.23l21.445-21.457c23.689-23.692,62.104-23.692,85.795,0l42.886,42.897
              C491.133,84.349,491.133,122.748,467.476,146.438z M167.233,403.748c-5.922,5.922-5.922,15.513,0,21.436
              c5.925,5.955,15.521,5.955,21.443,0L424.59,189.335l-21.469-21.457L167.233,403.748z M60,296.54c-5.925,5.927-5.925,15.514,0,21.44
              c5.922,5.923,15.518,5.923,21.443,0L317.35,82.113L295.914,60.67L60,296.54z M338.767,103.54L102.881,339.421
              c-11.845,11.822-11.815,31.041,0,42.886c11.85,11.846,31.038,11.901,42.914-0.032l235.886-235.837L338.767,103.54z
               M145.734,446.572c-7.253-7.262-10.749-16.465-12.05-25.948c-3.083,0.476-6.188,0.919-9.36,0.919
              c-16.202,0-31.419-6.333-42.881-17.795c-11.462-11.491-17.77-26.687-17.77-42.887c0-2.954,0.443-5.833,0.859-8.703
              c-9.803-1.335-18.864-5.629-25.972-12.737c-0.682-0.677-0.917-1.596-1.538-2.338L0,485.216l147.748-36.986
              C147.097,447.637,146.36,447.193,145.734,446.572z"/>
          </g>
          </svg>
      </div>
      <div class="button button_remove">
        <svg class="icon" fill="grey" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="612.043px" height="612.043px" viewBox="0 0 612.043 612.043" style="enable-background:new 0 0 612.043 612.043;"
          xml:space="preserve">
          <g>
            <g id="cross">
               <g>
                 <path d="M397.503,306.011l195.577-195.577c25.27-25.269,25.27-66.213,0-91.482c-25.269-25.269-66.213-25.269-91.481,0
                   L306.022,214.551L110.445,18.974c-25.269-25.269-66.213-25.269-91.482,0s-25.269,66.213,0,91.482L214.54,306.033L18.963,501.61
                   c-25.269,25.269-25.269,66.213,0,91.481c25.269,25.27,66.213,25.27,91.482,0l195.577-195.576l195.577,195.576
                   c25.269,25.27,66.213,25.27,91.481,0c25.27-25.269,25.27-66.213,0-91.481L397.503,306.011z"/>
               </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </li>
    `;
};

export const getFullText = function (fullText) {
  return `
  <div class="block-fullcontent">
    <p class="text">
      ${fullText}
    </p>
  </div>
  `;
};

export const formAddTicket = `
<div class="wrapper__popup">
  <div class="popup popup_add">
    <form class="form" name="add-ticket">
      <header class="form__header">Добавить тикет</header>
      <label class="field-group">
        <span class="field-label text_form">Краткое описание</span>
        <input type="text" name="text" class="field" minlength="2" maxlength="30" required>
      </label>
      <label class="field-group">
        <span class="field-label text_form">Подробное описание</span>
        <textarea class="textarea" name="textarea" required></textarea>
      </label>
      <div class="block-buttons">
        <button class="form__button-reset form__buttons" type="reset">Отмена</button>
        <button class="form__button form__buttons">Ок</button>
      </div>
    </form>
  </div>
</div>
`;

export const formEditTicket = function (text, fullText) {
  return `
  <div class="wrapper__popup">
    <div class="popup popup_edit">
      <form class="form" name="edit-ticket">
        <header class="form__header">Изменить тикет</header>
        <label class="field-group">
          <span class="field-label text_form">Краткое описание</span>
          <input type="text" name="text" class="field" minlength="2" maxlength="30" value="${text}" required>
        </label>
        <label class="field-group">
          <span class="field-label text_form">Подробное описание</span>
          <textarea class="textarea" name="textarea" required>${fullText}</textarea>
        </label>
        <div class="block-buttons">
          <button class="form__button-reset form__buttons" type="reset">Отмена</button>
          <button class="form__button form__buttons">Ок</button>
        </div>
      </form>
    </div>
  </div>
  `;
};

export const formDeleteTicket = `
<div class="wrapper__popup">
  <div class="popup popup_delete">
    <form class="form" name="delete-ticket">
      <header class="form__header">Удалить тикет</header>
      <p class="text_form" id="delete-text">
        Вы уверены, что хотите удалить тикет? Это действие необратимо.
      </p>
      <div class="block-buttons">
        <button class="form__button-reset form__buttons" type="reset">Отмена</button>
        <button class="form__button form__buttons">Ок</button>
      </div>
    </form>
  </div>
</div>
`;