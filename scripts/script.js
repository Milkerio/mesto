
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let edit_button = document.querySelector('.profile__edit-button');
let exit_button = popup.querySelector('.popup__exit-button');
let popup_name = popup.querySelector('#userName');
let popup_desc = popup.querySelector('#userDescription');
let save_button = popup.querySelector('.popup__save-button');

popup_name.value = name.textContent;
popup_desc.value = description.textContent;

togglePopup();

function stopDefAction(evt) {
    evt.preventDefault();
}
function togglePopup() {
    popup.classList.toggle('popup_opened');
}
function saveInfo(evt) {
    evt.preventDefault()
    name.textContent = popup_name.value;
    description.textContent = popup_desc.value;
    togglePopup();
}

edit_button.addEventListener('click', togglePopup);
exit_button.addEventListener('click', togglePopup);
save_button.addEventListener('click', saveInfo);
