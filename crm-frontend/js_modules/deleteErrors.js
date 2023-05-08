// функция удаление ошибок
export function deleteErrors() {
  let errors = document.querySelectorAll('.error');
  errors.forEach(error => error.remove());
}
