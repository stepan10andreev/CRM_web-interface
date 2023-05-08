import { inputOnlyNumbers } from './inputOnlyNumbers.js';

// Функция изменения типа контакта в поле "тип контакта" в зависимсоти от выбора опции в списке дропдауна
export function changeTypeContactValue (dropdownList, commonOption, dropdownListOption, contactItem) {
  // переменная со значения поля "тип контакта"
  let commonOptionValue = commonOption.firstChild.textContent
  // изменение этого значения на значение поля из списка дропдауна
  commonOption.firstChild.textContent =  dropdownListOption.textContent;
  // изменение значения поля дропдауна(который выбрали) -  на тот который поменяли
  dropdownListOption.textContent = commonOptionValue
  // закрытие дропдауна
  dropdownList.remove();
  // переменная - инпут ввода значения контакта
  let input = contactItem.children[1]
  // событие input и их валидация (для того чтобы валидация работала для каждого нового  изменении типа контакта)
  // так как валидация непосредственно в функции createContactForm работает только для вновь добавленного контакта с полем тип контата  "Телефон"
  input.removeEventListener('input', inputOnlyNumbers)
  switch (commonOption.firstChild.textContent) {
    case 'Доп. телефон':
    case 'Телефон':
      input.addEventListener('input', inputOnlyNumbers)
      break;
    case 'Email':
      input.addEventListener('input', function(){
        this.value = this.value.replace(/[^0-9\.\_\-\@\^a-z\s]/g, '');
      })
      break;
  }
}
