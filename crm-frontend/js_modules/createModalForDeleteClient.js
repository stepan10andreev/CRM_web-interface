import { APP } from './constants.js';

// Функция создания модального окна для удаления клиента
export function createModalForDeleteClient() {
  // создание элементом
  let modal = document.createElement('div');
  let modalContent = document.createElement('div');
  let title = document.createElement('div');
  let questionDeleteOrNo = document.createElement('div');
  let deleteBtn = document.createElement('button');
  let cancelBtn = document.createElement('button');
  let closeBtn = document.createElement('button');
  // classes
  modal.classList.add('modal')
  modalContent.classList.add('modal__content---delete')
  title.classList.add('modal-title')
  questionDeleteOrNo.classList.add('modal__subtitle')
  deleteBtn.classList.add('btn-delete-client-full', 'btn-reset');
  cancelBtn.classList.add('cancel-btn', 'btn-reset');
  //content
  title.textContent = 'Удалить клиента';
  questionDeleteOrNo.textContent = 'Вы действительно хотите удалить данного клиента?';
  deleteBtn.textContent = 'Удалить';
  cancelBtn.textContent = 'Отмена';
  // отрисовка
  modal.append(modalContent);
  modalContent.append(title);
  modalContent.append(questionDeleteOrNo);
  modalContent.append(deleteBtn);
  modalContent.append(cancelBtn);
  APP.append(modal);
  //click
  // вводим переменную при клике на контент модального окна
  modalContent.addEventListener("click", function(event) {
    event._isClickWithinModal = true;
  });
  // при клике вне его (то есть на фон модального окна) - закрываем моадльное окно
  modal.addEventListener('click', event => {
    if (event._isClickWithinModal) return;
    modal.remove();
  })
  // клик на кнопки выйти и закрыть модальное окно
  closeBtn.addEventListener("click", function() {
    modal.remove();
  })
  cancelBtn.addEventListener("click", function() {
    modal.remove();
  })
  return {
    modal,
    modalContent,
    deleteBtn,
    cancelBtn
  }
}
