import { getDate } from './getDate.js';
import { createToolTip } from './createToolTip.js';
import { createBtnMoreContacts } from './createBtnMoreContacts.js';
import { deleteClientAutocompleteTable } from './deleteClientAutocompleteTable.js';
import { createLoaderWhileLoadingForButton } from './createLoaderWhileLoadingForButton.js';
import { createClientCardBylocationHashChanged } from './api.js';
import { createModalForDeleteClient } from './createModalForDeleteClient.js';
import { createLoaderWhileLoading } from './createLoaderWhileLoading.js';
import { deleteClientFromServer } from './api.js';
import { CHANGE_BTN_ICON, DELETE_BTN_ICON, TEL_ICON, MAIL_ICON, FB_ICON, VK_ICON, OTHER_CONTACTS_ICON, CLIENT_TABLE_CONTAINER, AUTOCOMPLETE_CONTAINER } from './constants.js';
// функция создание ДОМ-элемента + cтрока таблицы с данными клиента
export function createClientItemElement(clientData, createforAutocomplete) {
  // создание элементов
  let clientString = document.createElement('div');
  let clientCellId = document.createElement('div');
  let clientCellFio = document.createElement('div');
  let clientCellCreatedTime = document.createElement('div');
  let createdDate = document.createElement('time');
  let createdTime = document.createElement('span');
  let clientCellChangedTime = document.createElement('div');
  let changedDate = document.createElement('time');
  let changedTime = document.createElement('span');
  let clientCellContacts = document.createElement('div');
  let clientCellBtnWrapper = document.createElement('div');
  let changeBtn = document.createElement('button');
  let changeBtnText = document.createElement('span');
  let deleteBtn = document.createElement('button');
  let deleteBtnText = document.createElement('span');
  let contactBtn = document.createElement('button');
  // classes
  clientString.classList.add('clients-table__string');
  clientCellId.classList.add('clients-table__cell--id');
  clientCellFio.classList.add('clients-table__cell--fio');
  clientCellCreatedTime.classList.add('clients-table__cell--createdtime');
  clientCellChangedTime.classList.add('clients-table__cell--changedtime');
  clientCellContacts.classList.add('clients-table__cell--contacts');
  clientCellBtnWrapper.classList.add('clients-table__cell--buttons');
  changeBtn.classList.add('clients-table__change-btn', 'btn-reset');
  deleteBtn.classList.add('clients-table__delete-btn', 'btn-reset');
  createdDate.classList.add('date');
  changedDate.classList.add('date');
  createdTime.classList.add('clock');
  changedTime.classList.add('clock');
  // content
  clientCellId.textContent = clientData.id;
  clientCellFio.textContent = clientData.surname + ' ' +  clientData.name + ' ' +  clientData.lastName;
  // получение путем фукнции getDate нормального формата даты и времени из данных с сервера
  let dateOfCreation = getDate(clientData.createdAt);
  let dateOfUpdate = getDate(clientData.updatedAt);
  createdDate.textContent = dateOfCreation.dateValue;
  changedDate.textContent = dateOfUpdate.dateValue;
  createdTime.textContent = dateOfCreation.timeValue;
  changedTime.textContent = dateOfUpdate.timeValue;
  changeBtn.innerHTML = CHANGE_BTN_ICON;
  deleteBtn.innerHTML = DELETE_BTN_ICON;
  changeBtnText.textContent = 'Изменить';
  deleteBtnText.textContent = 'Удалить';

  // есть ли контакты в переданном обьекте с данными клиента, заключаем в переменную массив обьекто контактов
  let contacts = clientData.contacts;
  // если там что то есть то проходим циклом по этому массиву и исходя из значения type обьекта конаткат записываем 2 массива: массив со знаечнием этого контакта и массив с иконками соотвесвтующие этому типу
  if (contacts) {
    let arrayContactIcons = [];
    let arrayContactValue  = [];
    for (let contact of contacts) {
      switch (contact.type) {
      case 'Доп. телефон':
      case 'Телефон':
        arrayContactIcons.push(TEL_ICON);
        arrayContactValue.push(contact);
        break;
      case 'Email':
        arrayContactIcons.push(MAIL_ICON);
        arrayContactValue.push(contact);
        break;
      case 'Facebook':
        arrayContactIcons.push(FB_ICON);
        arrayContactValue.push(contact);
        break;
      case 'VK':
        arrayContactIcons.push(VK_ICON);
        arrayContactValue.push(contact);
        break;
      case 'Другое':
        arrayContactIcons.push(OTHER_CONTACTS_ICON);
        arrayContactValue.push(contact);
        break;
      }
    }
    // далее проходим по новому массиву с созданными знаечниями контактов (длина обоих массивов одинаковая)
    for (let i = 0; i < arrayContactValue.length; i++) {
      // добюавляем на каждое значение в контейнер контактов кнопку
      clientCellContacts.append(document.createElement('button'));
      //добавляем ей классы
      clientCellContacts.children[i].classList.add('btn-contact', 'btn-reset');
      // и записываем в эту кнопку иконку соотвесвубщую иконку данному типу конаткта, которая находится в другом массиве под тем же индексом
      clientCellContacts.children[i].innerHTML = arrayContactIcons[i];
      // создаем тултип и добавляем тултип в ДОМ (передаем в аргументах знаечние контакта и его тип)
      let toolTipBLock = createToolTip(arrayContactValue[i].type, arrayContactValue[i].value);
      clientCellContacts.children[i].append(toolTipBLock);
      // СОБЫТИЕ HOVER - показываем тултип
      clientCellContacts.children[i].addEventListener('mouseenter', function(){
          toolTipBLock.classList.remove('isHidden');
      })
      // СОБЫТИЕ mouseleave - скрываем тултип
      clientCellContacts.children[i].addEventListener('mouseleave', function(){
          toolTipBLock.classList.add('isHidden');
      })
      // СОБЫТИЕ focus - показываем тултип
      clientCellContacts.children[i].addEventListener('focus', function(){
          toolTipBLock.classList.remove('isHidden');
      })
      // СОБЫТИЕ blur - показываем тултип
      clientCellContacts.children[i].addEventListener('blur', function(){
          toolTipBLock.classList.add('isHidden');
      })
    }
  }

  // условие разрешение экрана и длина массива контактов (иконок контактов) - при котором скрываем часть конатктов, начиная с 5,вместо этого показываем конпку BTN_MORE_CONTACTS
  if (window.screen.width <= 1024 && clientCellContacts.childNodes.length > 3)  {
    let countOfContactsIsHidden = clientCellContacts.childNodes.length - 4;
    const BTN_MORE_CONTACTS =  createBtnMoreContacts(countOfContactsIsHidden);
    for (let i = 4; i < clientCellContacts.childNodes.length; i++) {
      clientCellContacts.children[i].style.display = 'none';
      // событие клика на кнопку - скрываем ее, а скрытыте контакты показыааем
      BTN_MORE_CONTACTS.addEventListener('click', function() {
          clientCellContacts.children[i].style.display = 'block';
          BTN_MORE_CONTACTS.style.display = 'none';
      })
    }
    clientCellContacts.append(BTN_MORE_CONTACTS);
  }

  // html
  // условие работы данной функции для AUTOCOMPLETE, если аргумент будет передан в функцию в виде true (по умолчанию false), тогда создасться элемент не для основной таблицы, а для таблицы AUTOCOMPLETE
  if (createforAutocomplete) {
    // создание элемента, классы, отрисовка
    const AUTOCOMPLETE_WRAPPER = document.createElement('div');
    AUTOCOMPLETE_WRAPPER.classList.add('autocomplete-wrapper');
    AUTOCOMPLETE_WRAPPER.setAttribute("tabindex", 0);
    AUTOCOMPLETE_WRAPPER.append(clientCellId);
    AUTOCOMPLETE_WRAPPER.append(clientCellFio);
    AUTOCOMPLETE_CONTAINER.append(AUTOCOMPLETE_WRAPPER);
    // событие клика на элемент с данными клиента в AUTOCOMPLETE при поисковом запросе
    AUTOCOMPLETE_WRAPPER.addEventListener('click', function(e) {
      // создание массива всех клиентов в таблице для дальнейшего поиска в нем нужного клиента
      const ALL_CLIENTS = Array.from(document.querySelectorAll('.clients-table__string'));
      // проходим по массиву и в зависимости от нажатого элемента в AUTOCOMPLETE находим соотвествующий элемент в  таблице по ID клиента и добавлем ему класс для выделения зеленным и скроллим до него
      ALL_CLIENTS.forEach((client) => {
        if (client.firstChild.textContent === clientData.id) {
          client.classList.add('isSelected');
          client.scrollIntoView({block: "center", behavior: "smooth"});
          // событие удаление класса выделения при клике вне элемента клиента в таблцие или клик на любой другйо элемент
          window.addEventListener('click', (e) => {
            const CLICK_IN_SELECTED_CLIENT = e.composedPath().includes(client);
            const CLICK_IN_AUTOCOMPLETE_CONTAINER = e.composedPath().includes(AUTOCOMPLETE_CONTAINER);
            if (!CLICK_IN_SELECTED_CLIENT && !CLICK_IN_AUTOCOMPLETE_CONTAINER) {
              client.classList.remove('isSelected');
            }
          })
        }
      })
      // удалем таблицу при клике на клиента в AUTOCOMPLETE
      deleteClientAutocompleteTable();
    })
    //возвращаемся чтобы следующий код невыполнился так как для AUTOCOMPLETE он не нужен
    return
  }

  // код отрисовки не для AUTOCOMPLETE, а для основной таблицы
  clientString.append(clientCellId);
  clientString.append(clientCellFio);
  createdDate.append(createdTime);
  clientCellCreatedTime.append(createdDate);
  changedDate.append(changedTime);
  clientCellChangedTime.append(changedDate);
  clientString.append(clientCellCreatedTime);
  clientString.append(clientCellChangedTime);
  clientString.append(clientCellContacts);
  changeBtn.append(changeBtnText);
  deleteBtn.append(deleteBtnText);
  clientCellBtnWrapper.append(changeBtn);
  clientCellBtnWrapper.append(deleteBtn);
  clientString.append(clientCellBtnWrapper);
  CLIENT_TABLE_CONTAINER.append(clientString);

  // сlick
  // событие клика на кнопку "Изменить"
  changeBtn.addEventListener("click", async function(e) {
    // создаем hash  страницы для конкретного клиента по его ID
    window.location.hash = `#clients/${clientData.id}`;
    // cоздаем индикатор загрузки через глобальную функцию пока выполняется асинхронная фнукция загрузки данных клиента
    createLoaderWhileLoadingForButton(true, changeBtn);
    // глобальная фнукция загрузки и отрсиовки карточки с конкретным клиентов ( внутри нее - функция загрузки данных клиента и фнукция отрсиовка его карточки)
    await createClientCardBylocationHashChanged(clientData);
    // убираем индикатор щагрузки по завершеию асинхронной функции которую ждем
    createLoaderWhileLoadingForButton(false, changeBtn);
  })

  // событие клика на кнопку "Удалить клиенат"
  deleteBtn.addEventListener("click", function(e) {
    // создаем модальное окно удаления
    const DELETE_MODAL = createModalForDeleteClient();
    // анимайия для модального окна путем добавления класса через 0.2 секунды
    setTimeout(() => {DELETE_MODAL.modalContent.classList.add('modal-content--active')}, 200)
    DELETE_MODAL.deleteBtn.addEventListener("click", async function(e) {
      // cоздаем индикатор загрузки через глобальную функцию пока выполняется асинхронная фнукция загрузки данных клиента (2 варианта на весь экран и только в кнопке)
      // createLoaderWhileLoadingForButton(true, deleteBtn);
      createLoaderWhileLoading(true, true);
      // глобальная фнукция API - удаление клиента с сервера
      await deleteClientFromServer(clientData);
      // убираем индикатор щагрузки по завершеию асинхронной функции
      createLoaderWhileLoading(false);
      // createLoaderWhileLoadingForButton(false, deleteBtn);
      // удалем из таблицы строку с клиентом
      clientString.remove();
      // удалем модальное окно
      DELETE_MODAL.modal.remove();
    })
  })
  return clientString;
}
