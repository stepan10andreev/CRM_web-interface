import { createContactTypeDropdown } from './createContactTypeDropdown.js';
import { inputOnlyNumbers } from './inputOnlyNumbers.js';
import { changeTypeContactValue } from './changeTypeContactValue.js';
import { CONTACT_SELECT_TYPE_ICON, CONTACT_DELETE_ICON } from './constants.js';

// Функция создания формы для введение данных контактов клиента
export function createContactForm(object) {
  let contactItem = document.createElement('div');
  let contactType = document.createElement('div');
  let contactTypeText = document.createElement('span');
  let contactValue = document.createElement('input');
  let contactWrapperBtn = document.createElement('div');
  let contactDeleteBtn = document.createElement('button');
  //classes
  contactItem.classList.add('contacts-container__item');
  contactType.classList.add('contacts-container__contact-type');
  contactValue.classList.add('contacts-container__contact-value');
  contactWrapperBtn.classList.add('contacts-container__contact-btn-wrapper');
  contactDeleteBtn.classList.add('contacts-container__contact-delete-btn', 'btn-reset');
  // content - в зависимости от того - передан обьект или нет, то есть существует клиент или это новый клиент - нажатие на кнопку "Изменить" ИЛИ "Добавить" - та же логика (зависит от новый это клиент или нет)
  // если обьект передан то заполняем поля данными из переднанного обьекта с данными клиента (формируем карточку клиента)
  if (object) {
      contactTypeText.textContent = object.type
      contactValue.value = object.value
  } else
  contactTypeText.textContent = 'Телефон';
  contactType.innerHTML = CONTACT_SELECT_TYPE_ICON;
  contactType.prepend(contactTypeText);
  contactDeleteBtn.innerHTML = CONTACT_DELETE_ICON;
  contactValue.placeholder = 'Введите данные контакта';
  contactType.setAttribute('tabindex', 0);

  // html
  contactItem.append(contactType);
  contactItem.append(contactValue);
  contactWrapperBtn.append(contactDeleteBtn);
  contactItem.append(contactWrapperBtn);

  // click
  // Переменная выпадающего списка (создание выпадающего списка)
  let dropdown = createContactTypeDropdown();

  // валидация инпута при добавлении первого контакта (котоырй по умолчанию является телефоном) - ВВОД только цифр
  if (contactTypeText.textContent === 'Телефон') {
    contactValue.addEventListener('input', inputOnlyNumbers);
  }

  // СОБЫТИЕ КЛИКА на  блок ТИП КОНТАКТА и открытие ДРОПДАУНА,
  contactType.addEventListener('click', function(e) {
    // поворот стрелки при открытие дропдауна
    contactType.children[1].classList.toggle('rotate');
    // добавление/открытие дропдауна и изменение его видимости по клику
    contactType.append(dropdown.dropdownList);
    dropdown.dropdownList.classList.toggle('isHidden');
    // события клика вне дродайна и вне блока с названием типа контакта и соотвественно закрытие дропдауна при клике вне этих элементов
    document.addEventListener( 'click', function (event) {
      // переменная определения пути клика по дропдауну и полю тип контакта
      const CLICK_IN_DROPDOWNLIST= event.composedPath().includes(dropdown.dropdownList);
      const CLICK_IN_CONTACT_TYPE = event.composedPath().includes(contactType);
      // условие клика вне их
      if (!CLICK_IN_DROPDOWNLIST && !CLICK_IN_CONTACT_TYPE) {
        contactType.children[1].classList.remove('rotate');
        dropdown.dropdownList.classList.add('isHidden');
      }
      // условие при клике вне поля тип контакта и возвращение иконки стрелки в исходное положение
      if (!CLICK_IN_CONTACT_TYPE) {
        contactType.children[1].classList.remove('rotate');
      }
    })
    // далее меняем значение поля тип контакта в зависимости от клика на опцию дропдауна
    // используем глобальную функцию changeTypeContactValue
    dropdown.emailDropdownOption.addEventListener('click', () => changeTypeContactValue(dropdown.dropdownList, contactType, dropdown.emailDropdownOption, contactItem));
    dropdown.fbDropdownOption.addEventListener('click', () => changeTypeContactValue(dropdown.dropdownList, contactType, dropdown.fbDropdownOption, contactItem));
    dropdown.vkDropdownOption.addEventListener('click', () => changeTypeContactValue(dropdown.dropdownList, contactType, dropdown.vkDropdownOption, contactItem));
    dropdown.telDropdownOption.addEventListener('click', () => changeTypeContactValue(dropdown.dropdownList, contactType, dropdown.telDropdownOption, contactItem));
    dropdown.otherDropdownOption.addEventListener('click', () => changeTypeContactValue(dropdown.dropdownList, contactType, dropdown.otherDropdownOption, contactItem));
  })
  // СОБЫТИЕ КЛИКА на кнопку удалить конаткт
  contactDeleteBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const ALL_CONTACTS = document.querySelectorAll('.contacts-container__item');
    // условие если удалили все контакты то изменяем стиль контейнера контактов (паддинги)
    if (ALL_CONTACTS.length === 1) {
      document.querySelector('.add-contact-container').style.padding = '0px 30px';
    }
    contactItem.remove();
  })
  return contactItem;
}
