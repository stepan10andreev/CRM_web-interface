import { loadClients, createClientCardBylocationHashChanged } from './js_modules/api.js';
import { ADD_BTN, SEARCH_FORM_INPUT, SORT_BTN_BY_ID, SORT_BTN_BY_FIO, SORT_BTN_BY_CREATEDTIME, SORT_BTN_BY_CHANGEDTIME } from './js_modules/constants.js';
import { deleteClientAutocompleteTable } from './js_modules/deleteClientAutocompleteTable.js';
import { createClientItemOnSearchRequest } from './js_modules/createClientItemOnSearchRequest.js';
import { createClientTable } from './js_modules/createClientTable.js';
import { createModalForNewClient } from './js_modules/createModalForNewClient.js';
import { sortCientsByProps, sortOnID, sortOnFio, sortOnTime } from './js_modules/sorting.js';

document.addEventListener('DOMContentLoaded', async function() {
  // загружаем данные клиентов с сервера
  let clientsData = await loadClients();
  // проходим циклом по массиву обьектов клиентов, если хэш станицы совпадает с ID клиента открываем его карточку
  for (let clientData of clientsData) {
    if (location.hash === `#clients/${clientData.id}`) {
      createClientCardBylocationHashChanged(clientData);
    }
  }

  // функция клика по кнопке ДОБАВИТЬ КЛИЕНТА - открываем модальное окно + анимация
  ADD_BTN.addEventListener('click', function(){
    const MODAL = createModalForNewClient();
    // анимация путем добавления класса
    setTimeout(() => {MODAL.modalContent.classList.add('modal-content--active')}, 300);
  })

  // событие ИНПУТА на инпуте формы пооиска клиента и создание АВТОДОПОЛНЕНИЯ и поиска клиентов
  // сначало удаляем все (при изменении значения инпута), затем формируем таблицу АВТОДОПОЛНЕНИЯ
  SEARCH_FORM_INPUT.addEventListener('input', (event) => {
    deleteClientAutocompleteTable();
    createClientItemOnSearchRequest(event.target.value);
  })

  // функция создания таблицы по загруженным данным
  createClientTable (clientsData);

  // функции сортировки
  sortCientsByProps(SORT_BTN_BY_ID, sortOnID, 'id');

  sortCientsByProps(SORT_BTN_BY_FIO, sortOnFio, 'name', 'surname', 'lastName');

  sortCientsByProps(SORT_BTN_BY_CREATEDTIME, sortOnTime, 'createdAt');

  sortCientsByProps(SORT_BTN_BY_CHANGEDTIME, sortOnTime, 'updatedAt');
})
