// функция удаления таблицы
export function deleteClientTable() {
  let allStringsTable = document.querySelectorAll('.clients-table__string');
  allStringsTable.forEach(string => string.remove());
}
