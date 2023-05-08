// функция получения массива контактов для сохранения на сервер по клику
export function getClientContactsArray() {
  const allContacts = document.querySelectorAll('.contacts-container__item');
  let contactsArrayForServer = [];
  allContacts.forEach(contact => {
    // создаем обьект и записываем в него тип контакта и его знаечния, пушим его в массив, и возвращаем массив этих обьектов, чтобы затем можно было передать его при сохранении на сервер
    let contactObject = {};
    contactObject.type = contact.firstChild.firstChild.textContent;
    contactObject.value = contact.childNodes[1].value;
    contactsArrayForServer.push(contactObject);
  })
  return contactsArrayForServer;
}
