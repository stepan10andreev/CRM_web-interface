// функция удаления таблицы автокомплита
export function deleteClientAutocompleteTable() {
  let allStringsTable = document.querySelectorAll('.autocomplete-wrapper');
  allStringsTable.forEach(string => string.remove());
}
