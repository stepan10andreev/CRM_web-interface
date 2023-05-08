// функция создания дропдауна
export function createContactTypeDropdown() {
  // создание элементов
  let dropdownList = document.createElement('ul');
  let telDropdownOption = document.createElement('li');
  let emailDropdownOption = document.createElement('li');
  let fbDropdownOption = document.createElement('li');
  let vkDropdownOption = document.createElement('li');
  let otherDropdownOption = document.createElement('li');
  //classes
  dropdownList.classList.add('contacts-container__dropdown', 'dropdown', 'list-reset');
  telDropdownOption.classList.add('dropdown__tel');
  emailDropdownOption.classList.add('dropdown__email');
  fbDropdownOption.classList.add('dropdown__facebook');
  vkDropdownOption.classList.add('dropdown__vk');
  otherDropdownOption.classList.add('dropdown__other');
  // content
  telDropdownOption.textContent = 'Доп. телефон';
  emailDropdownOption.textContent = 'Email';
  fbDropdownOption.textContent = 'Facebook';
  vkDropdownOption.textContent = 'VK';
  otherDropdownOption.textContent = 'Другое';
  //html
  dropdownList.append(telDropdownOption);
  dropdownList.append(emailDropdownOption);
  dropdownList.append(fbDropdownOption);
  dropdownList.append(vkDropdownOption);
  dropdownList.append(otherDropdownOption);
  dropdownList.classList.add('isHidden');

  return {
    dropdownList,
    telDropdownOption,
    emailDropdownOption,
    fbDropdownOption,
    vkDropdownOption,
    otherDropdownOption
  }
}
