import { getClientDataOnSearchRequest } from './api.js';

// переменная для таймаут
export let timeout
// функция создание клиента по поиcковому запросу с ожиданием пока польщователь ведет запрос, т.е. введет последний символ
export function createClientItemOnSearchRequest(searchRequest) {
  if (timeout) {
      clearTimeout(timeout);
  }
  timeout = setTimeout(getClientDataOnSearchRequest, 300, searchRequest);
}
