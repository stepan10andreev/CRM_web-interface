// функция создания кнопки "показать больше контактов"
export function createBtnMoreContacts(countOfContacts) {
  const BTN_MORE_CONTACTS = document.createElement('button');
  BTN_MORE_CONTACTS.classList.add('contacts-btn-more', 'btn-reset');
  BTN_MORE_CONTACTS.textContent = '+' + countOfContacts;
  return BTN_MORE_CONTACTS;
}
