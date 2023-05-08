import { createLoaderWhileLoading } from './createLoaderWhileLoading.js';
import { deleteClientAutocompleteTable } from './deleteClientAutocompleteTable.js';
import { createModalForNewClient } from './createModalForNewClient.js';
import { createClientTable } from './createClientTable.js';
import { SEARCH_FORM_INPUT } from './constants.js';

// работа с API
// функция ПОСТА клиента на сервер
export async function postClientToServer(name, surname, lastName, contacts) {
  // функция создания индикатора загрузки до выполнения загурзки данных
  createLoaderWhileLoading(true, true)
  const response = await fetch(' http://localhost:3000/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    name,
    surname,
    lastName,
    contacts,
    })
  });
  const data = await response.json();
  // функция удаления индикатора загрузки после выполнения загурзки данных
  createLoaderWhileLoading(false);
  return {
    response,
    data
  }
}

// функция ИЗМЕНЕНИЯ клиента на сервере (логика такая же с индикатором загрузки)
export async function patchClientToServer(name, surname, lastName, contacts, obj) {
  createLoaderWhileLoading(true, true)
  const response = await fetch(`http://localhost:3000/api/clients/${obj.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    name,
    surname,
    lastName,
    contacts,
    })
  });
  const data = await response.json();
  createLoaderWhileLoading(false);
  return {
    response,
    data
  }
}

// функция загрузки данных всех клиентов (+ индикатор загрузки)
export async function loadClients() {
  createLoaderWhileLoading(true);
  const response = await fetch('http://localhost:3000/api/clients');
  const data = await response.json();
  createLoaderWhileLoading(false);
  return data;
}

// функция загрузки данных одного клиента по ID (+ индикатор загрузки)
export async function loadClientByID(obj) {
  createLoaderWhileLoading(true);
  const response = await fetch(`http://localhost:3000/api/clients/${obj.id}`);
  const data = await response.json();
  createLoaderWhileLoading(false);
  return data;
}

// функция УДАЛЕНИЯ данных  клиента с сервера
// в данной функции функций с индикаторами загрузки нет, так как она находится в событии клика на кнопку, так как индикатор загрузки имеет аргумент в вижде кнопки в какую добавляется индикатор
// поэтому удобнее выполнить функции индикатора загрузки непосредственно в функции клика на кнопку, которую и передаем в аргумент
export async function deleteClientFromServer(obj) {
  const response = await fetch(`http://localhost:3000/api/clients/${obj.id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
}

// функция получения данных  клиента по подстроке, введенной в поисковом запросе
export async function getClientDataOnSearchRequest(searchRequest) {
  const response = await fetch(`http://localhost:3000/api/clients?search=${searchRequest}`, {
    method: 'GET'
  });
  const data = await response.json();
  // реализализация автодоплнения под поиском
  deleteClientAutocompleteTable();
  createClientTable(data, true);
  // необходимое условие чтобы при пустом инпуте не выводилась вся таблица с автодоплнением (когда пользвоатель стирает введенные данные)
  if (SEARCH_FORM_INPUT.value === '') {
    deleteClientAutocompleteTable();
  }
}


// функция открытие карточки клиент при изменении HASH страницы
export async function createClientCardBylocationHashChanged(clientData) {
  // загружаем данные клиента по ID
  let client = await loadClientByID(clientData);
  // создаем модальное окно -карточка с клиентом
  const MODAL = createModalForNewClient(client);
  // анимация путем добавления класса
  setTimeout(() => {MODAL.modalContent.classList.add('modal-content--active')}, 300);
}
