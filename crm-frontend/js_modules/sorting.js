import { deleteClientTable } from './deleteClientTable.js';
import { createClientTable } from './createClientTable.js';
import { loadClients } from './api.js';

//  переменная которая определяеь направление сортировки
let isAscending = false;

// глобальная ФуНкция сортировки c аргументами (кнопка для клика, функция сортировки, свойства по которым сортируется)
export function sortCientsByProps(button, sortFn, prop1, prop2, prop3) {
  button.addEventListener('click', async function() {
    // загружаем данные из сервера при каждой сортировки
    let clientsData = await loadClients();
    // удаляем разметку, чтобы не дублировать уже отсортированный код
    deleteClientTable();
    // в зависимости от переменной, определяющей направление сортировки (по умолчанию в восходящем)
    if (!isAscending) {
      // сортируем
      let sortedCLientsData = sortFn(clientsData, prop1, prop2, prop3);
      // отрисовываем
      createClientTable(sortedCLientsData);
      button.children[1].classList.add('rotate');
      isAscending = true;
      return;
    }
    let sortedCLientsData = sortFn(clientsData, prop1, prop2, prop3);
    createClientTable(sortedCLientsData);
    button.children[1].classList.remove('rotate');
    isAscending = false;
  })
}

// функция сорировки по ID
export function sortOnID(array, prop) {
  return array.sort((a, b) => (!isAscending ? Number(a[prop]) > Number(b[prop]) : Number(a[prop]) < Number(b[prop])) ? -1 : 1);
}

// функция сортировки по ФИО
export function sortOnFio(array, prop1, prop2, prop3) {
  return array.sort(function (a, b) {
    let lowfullnameA = `${a[prop2]}${a[prop1]}${a[prop3]}`.toLowerCase();
    let lowfullnameB = `${b[prop2]}${b[prop1]}${b[prop3]}`.toLowerCase();
    if (!isAscending) {
      if (lowfullnameA > lowfullnameB) return -1;
    } else {
      if (lowfullnameA < lowfullnameB) return -1;
    }
  })
}

// функция сортировки по датам
export function sortOnTime(array, prop) {
  return array.sort(function (a, b) {
    let timeA = new Date(`${a[prop]}`);
    let timeB = new Date(`${b[prop]}`);
    if (!isAscending) {
      if (timeA < timeB) return -1;
    } else {
      if (timeA > timeB) return -1;
    }
  })
}

