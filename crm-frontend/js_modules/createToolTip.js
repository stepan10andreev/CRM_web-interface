//функция создания тултипа
export function createToolTip(type, value) {
  let toolTip = document.createElement("div");
  let contactTypeToolTip = document.createElement("span");
  let contactValueToolTip = document.createElement("a");
  // условия контента тултипа в зависимости от типа контакта
  if (type === 'Телефон') {
    contactTypeToolTip.textContent = '';
  } else contactTypeToolTip.textContent = type + ": ";

  switch (type) {
    case 'Доп. телефон':
    case 'Телефон':
      contactValueToolTip.href = `tel: ${value}`;
      break;
    case 'Email':
      contactValueToolTip.href = `mailto: ${value}`;
      break;
    case 'Facebook':
    case 'VK':
    case 'Другое':
      contactValueToolTip.href = value;
      break;
  }
  contactValueToolTip.textContent = value;

  // class
  toolTip.classList.add('tooltip-contact', 'isHidden');
  // html
  toolTip.append(contactTypeToolTip);
  toolTip.append(contactValueToolTip);

  return toolTip;
}
