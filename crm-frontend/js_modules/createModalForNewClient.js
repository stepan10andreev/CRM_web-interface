import { deleteErrors } from './deleteErrors.js';
import { createContactForm } from './createContactForm.js';
import { isInputsFilled, validateInputsForFullness } from './validateInputsForFullness.js';
import { getClientContactsArray } from './getClientContactsArray.js';
import { patchClientToServer, postClientToServer } from './api.js';
import { actionsDependsOnResponseStatus } from './actionsDependsOnResponseStatus.js';
import { ADD_CONTACT_ICON, ADD_CONTACT_ICON_HOVER, CLOSE_BTN_ICON, APP } from './constants.js';

// функция создания модального окна по нажатию на кнопку добавить
export function createModalForNewClient(object) {
  // создание ДОМ-элементов
  let modal = document.createElement('div');
  let modalContent = document.createElement('div');
  let title = document.createElement('h3');
  let modalForm = document.createElement('form');
  let labelName = document.createElement('label');
  let labelSurname = document.createElement('label');
  let labelLastname = document.createElement('label');
  let inputName = document.createElement('input');
  let inputSurname = document.createElement('input');
  let inputLastname = document.createElement('input');
  let addContactBtn = document.createElement('button');
  let textName = document.createElement('span');
  let textSurname = document.createElement('span');
  let textLastname = document.createElement('span');
  let saveBtn = document.createElement('button');
  let cancelBtn = document.createElement('button');
  let closeBtn = document.createElement('button');
  let addcontactsContainer = document.createElement('div');
  let idBlock = document.createElement('span');

  // добавление классов
  modal.classList.add('modal');
  modalContent.classList.add('modal-content');
  modalForm.classList.add('modal-form');
  title.classList.add('modal-title');
  inputSurname.classList.add('modal-input', 'modal-input--surname', 'input-reset');
  textSurname.textContent = 'Фамилия*';
  inputName.classList.add('modal-input', 'modal-input--name', 'input-reset');
  textName.textContent = 'Имя*';
  inputLastname.classList.add('modal-input', 'input-reset');
  textLastname.textContent = 'Отчество';
  addContactBtn.classList.add('add-contact-btn', 'btn-reset');
  saveBtn.classList.add('save-btn', 'btn-reset');
  cancelBtn.classList.add('cancel-btn', 'btn-reset');
  closeBtn.classList.add('close-btn', 'btn-reset');
  addcontactsContainer.classList.add('add-contact-container');
  idBlock.classList.add('modal__id-client');
  labelName.classList.add('modal__form-label');
  labelSurname.classList.add('modal__form-label');
  labelLastname.classList.add('modal__form-label');
  textName.classList.add('modal__input-placeholder');
  textSurname.classList.add('modal__input-placeholder');
  textLastname.classList.add('modal__input-placeholder');
  // добавление контента (в зависимости от того - передан ли обьект клиента, то есть в зависимости от создание нового клиента ИЛИ изменение существующего)
  // Если клик по кнопке изменить - клиент существует - обьект передан - открытие окна с данными данного клиента
  if (object) {
    // переменная массива контактов существущего клиента (обьекта клиента)
    let contacts = object.contacts;
    // конктент блоков
    title.textContent = 'Изменить данные';
    title.append(idBlock);
    idBlock.textContent = `ID: ${object.id}`;
    inputName.value = object.name;
    inputSurname.value = object.surname;
    inputLastname.value = object.lastName;
    cancelBtn.textContent = 'Удалить клиента';

    // условия добавления падднгов к контейнеру контактов если их 1 и более
    if (contacts.length >= 1) {
      addcontactsContainer.style.padding = '25px 30px';
    }
    // цикл по массиву контактов и создание контейнера контактов
    for (let contact of contacts) {
      let contactItem = createContactForm(contact);
      addcontactsContainer.prepend(contactItem);
    }
    // обработчик клика на кнопку "Сохранить"
    saveBtn.addEventListener('click', async function(event) {
      event.preventDefault();
      // удаление ошибок каждый раз по клику на кнопку, чтобы не дублировался рендер ошибок, если они есть
      deleteErrors();
      // валидация и создание ошибки если инпуты не заполнены
      if (isInputsFilled() === false) {
        validateInputsForFullness(saveBtn);
        return
      }

      // получения массива контактов (если произошли изменения или же если остался прежний)
      let contactsArrayForServer = getClientContactsArray();

      // API
      // можно добавить инждикатор загрузки на кнопку и заблокировать ее, либо в функции postClientToServer уже есть индикатор загрузки на весь экран
      // createLoaderWhileLoadingForButton(true, saveBtn);
      const {response, data} = await patchClientToServer(inputName.value, inputSurname.value, inputLastname.value, contactsArrayForServer, object);
      // createLoaderWhileLoadingForButton(false, saveBtn);

      // действия в завсисимости от ответа сервера
      actionsDependsOnResponseStatus(response.status, data.errors, modal, saveBtn);
    })
  } else {
  // Если клик по кнопке добавить  - клиент не существует - обьект не передан - открытие окна для добавления нового клиента
      title.textContent = 'Новый клиент';
      cancelBtn.textContent = 'Отмена';
      // обработчик клика на кнопку "Сохранить" - логика та же самая
      saveBtn.addEventListener('click', async function(event) {
        event.preventDefault();
        deleteErrors();
        if (isInputsFilled() === false) {
          validateInputsForFullness(saveBtn);
          return;
        }

        // получения массива контактов (если произошли изменения или же если остался прежний)
        let contactsArrayForServer = getClientContactsArray();

        // API
        // можно добавить инждикатор загрузки на кнопку и заблокировать ее, либо в функции postClientToServer уже есть индикатор загрузки на весь экран
        // createLoaderWhileLoadingForButton(true, saveBtn);
        const {response, data} = await postClientToServer(inputName.value, inputSurname.value, inputLastname.value, contactsArrayForServer);
        // createLoaderWhileLoadingForButton(false, saveBtn);

        // действия в завсисимости от ответа сервера
        actionsDependsOnResponseStatus(response.status, data.errors, modal, saveBtn);
      })
  }

  // общие настройки для обоих случаев
  inputName.placeholder = ' ';
  inputSurname.placeholder = ' ';
  inputLastname.placeholder = ' ';

  addContactBtn.innerHTML = ADD_CONTACT_ICON + 'Добавить контакт';
  saveBtn.textContent = 'Сохранить';
  closeBtn.innerHTML = CLOSE_BTN_ICON;

  // отрисовка ДОМ
  modal.append(modalContent);
  modalContent.append(title);
  modalContent.append(modalForm);
  labelName.append(inputName);
  labelName.append(textName);
  labelSurname.append(inputSurname);
  labelSurname.append(textSurname);
  labelLastname.append(inputLastname);
  labelLastname.append(textLastname);
  modalForm.append(labelSurname);
  modalForm.append(labelName);
  modalForm.append(labelLastname);
  addcontactsContainer.append(addContactBtn);
  modalForm.append(addcontactsContainer);
  modalForm.append(saveBtn);
  modalContent.append(cancelBtn);
  modalContent.append(closeBtn);

  APP.append(modal);

  // валидация инпутов модального окна (ВВОД только кириллицы) и удаление атрибута если пользователь ввел что то
  const MODAL_INPUTS = [inputSurname, inputName, inputLastname]
  MODAL_INPUTS.forEach(input => input.addEventListener('input', function(){
    this.value = this.value.replace(/[^а-яё\s]/gi, '');
    input.removeAttribute('aria-invalid');
  }));

  // СОБЫТИЯ КЛИКОВ для ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА и возврат HASH страницы к начальному значению
  // закрытие по клику на кнопку отмена
  closeBtn.addEventListener("click", function() {
    window.location.hash = ``;
    modal.remove();
  });

  // закрытие по клику на кнопку отмена
  cancelBtn.addEventListener("click", function() {
    window.location.hash = ``;
    modal.remove();
  });

  // определение глобальной переменной при клике внутри контента модального окна
  modalContent.addEventListener("click", function(event) {
    event._isClickWithinModal = true;
  });

  // закрытие по клику на клику вне его
  modal.addEventListener('click', event => {
    if (event._isClickWithinModal) return;
    window.location.hash = ``;
    modal.remove();
  });

  // СОБЫТИЕ HOVER на кнопку "ДОБАВИТЬ КОНТАКТ" со сменой иконки
  addContactBtn.addEventListener('mouseenter', function (event) {
    addContactBtn.innerHTML = ADD_CONTACT_ICON_HOVER + 'Добавить контакт';
  });

  addContactBtn.addEventListener('mouseleave', function (event) {
    addContactBtn.innerHTML = ADD_CONTACT_ICON + 'Добавить контакт';
  });

  // СОБЫТИЕ КЛИКА на кнопку "ДОБАВИТЬ КОНТАКТ" и добавление контакта
  addContactBtn.addEventListener('click', event => {
    event.preventDefault();
    // создание формы для контактов
    let contactForm = createContactForm();
    // добавление этой формы в контейнер контактов
    addcontactsContainer.prepend(contactForm);
    // переменная - массив всех контактов
    const ALL_CONTACTS = document.querySelectorAll('.contacts-container__item');
    // в зависимости от количества контактов скрытие кнопки  "ДОБАВИТЬ КОНТАКТ" - если больше 10, и добавление стилей к контейнеру конатктов если контакт добавлен
    if (ALL_CONTACTS.length >= 1) {
      addcontactsContainer.style.padding = '25px 30px';
    }
    if (ALL_CONTACTS.length >= 10) {
      addContactBtn.remove();
    }
  })

  return {
    inputName,
    inputSurname,
    inputLastname,
    modal,
    modalContent,
    saveBtn
  }
}
