// функция индикатора загрузки для кнопки
export function createLoaderWhileLoadingForButton(isLoading, button) {
  const LOADER = document.createElement("div");
  LOADER.classList.add("btn-loader");
  if (isLoading) {
    button.firstChild.style.display = "none";
    button.prepend(LOADER);
    button.setAttribute('disabled', 'true');
  } else if (!isLoading) {
    document.querySelector('.btn-loader').remove();
    button.firstChild.style.display = "block";
    button.removeAttribute('disabled', 'true');
  }
}
