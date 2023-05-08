import { createClientItemElement } from './createClientItemElement.js';

// функция создания таблицы студентов из массива в качестве параметра и переменной, определябщей создание таблицы для АВТОДОПОЛНЕНИЯ при поисковом запросе
export function createClientTable (array, createforAutocomplete = false) {
  // сортировка по умолчанию по ID в возрастании
  array = array.sort((a, b) => (Number(a['id']) > Number(b['id'])));
  // 2 условия создание таблицы для автокомплита или полноценнйо таблицы
  for (const obj of array) {
    if (createforAutocomplete) {
      createClientItemElement(obj, createforAutocomplete);
    } else createClientItemElement(obj);
  }
}
