import { createErrors } from './createErrors.js';

// функция валидации инпутов создание блока ошибки в зависимости от результата isInputsFilled
export  function validateInputsForFullness(saveBtn) {
  let error =  createErrors('Ошибка', "Не все обязательные поля заполнены");
  saveBtn.before(error);
}

// функция проверки на заполненость конкретных инпутов, возвращающая true/false
export function isInputsFilled() {
  const INPUT_WITH_NAME = document.querySelector('.modal-input--name');
  const INPUT_WITH_SURNAME = document.querySelector('.modal-input--surname');
  const INPUT_WITH_CONTACTVALUE = Array.from(document.querySelectorAll('.contacts-container__contact-value'));
  if (INPUT_WITH_CONTACTVALUE.length > 0) {
    const INPUTS = [INPUT_WITH_SURNAME, INPUT_WITH_NAME].concat(INPUT_WITH_CONTACTVALUE);
    return isInputValue(INPUTS);
  } else {
    const INPUTS = [INPUT_WITH_SURNAME, INPUT_WITH_NAME];
    return isInputValue(INPUTS);
  }
}

// общая функции валидации на заполненность массива любых инпутов + добавление к не заполненным инпутам атрибута aria-invalid
function isInputValue(inputs) {
  for (let input of inputs) {
    if (!input.value) {
      input.setAttribute('aria-invalid', 'true');
      return false;
    } else {
      input.removeAttribute('aria-invalid');
      // return true
    }
  }
}
