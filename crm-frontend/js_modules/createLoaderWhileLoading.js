import { CLIENT_TABLE, APP } from './constants.js';

// функция содания индикатора зарузки для модального окна с аргументом  - идет загурзка или нет (true / false) и аргументом - формирвоать индикатор на весь экрна или только на таблицу
export function createLoaderWhileLoading(isLoading, fullScreen = false) {
  const LOADER_WRAPPER = document.createElement("div");
  const LOADER = document.createElement("div");
  LOADER_WRAPPER.classList.add("wrapper-loader");
  LOADER.classList.add("loader");
  LOADER_WRAPPER.append(LOADER);

  if (isLoading && !fullScreen) {
    CLIENT_TABLE.append(LOADER_WRAPPER);
  } else if (isLoading && fullScreen) {
    APP.append(LOADER_WRAPPER);
  } else {
    document.querySelector('.wrapper-loader').remove();
  }
}
