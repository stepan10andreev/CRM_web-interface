import { createErrors } from './createErrors.js';

// функция создания действий в зависимости от ответа сервера
export function actionsDependsOnResponseStatus(responseStatus, dataError, modal, saveBtn) {
  if (responseStatus === 200 || responseStatus === 201) {
    modal.remove()
    window.location.hash = ``;
  } else if (responseStatus === 422 || responseStatus === 404) {
      for (let errorObj of dataError) {
        let errorFieldName = errorObj.field;
        let textError = errorObj.message;
        let error =  createErrors(errorFieldName, textError)
        saveBtn.before(error)
      }
  } else {
      createErrors('Ошибка', 'Что-то пошло не так...')
  }
}

