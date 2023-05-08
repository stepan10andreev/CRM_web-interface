// глобальная функция создания блока с текстом ошибки
export function createErrors(errorFieldName, textError) {
  let errorBlock = document.createElement("div");
  let errorField = document.createElement("span");
  let errorContent = document.createElement("span");
  errorField.textContent = errorFieldName + ": ";
  errorContent.textContent = textError;
  errorBlock.classList.add("error");
  errorBlock.append(errorField);
  errorBlock.append(errorContent);
  return errorBlock;
}
