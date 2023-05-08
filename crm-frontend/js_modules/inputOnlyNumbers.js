// Функция валидации инпута ввода только цифр
export function inputOnlyNumbers(){
  this.value = this.value.replace(/[^0-9]/g, '');
}
