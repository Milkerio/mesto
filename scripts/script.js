
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let edit_button = document.querySelector('.profile__edit-button');
let exit_button = popup.querySelector('.popup__exit-button');
let nameInput = document.querySelector('#userName');
let descriptionInput = document.querySelector('#userDescription');
let save_button = popup.querySelector('.popup__save-button');

nameInput.value = name.textContent;
descriptionInput.value = description.textContent;

togglePopup();

function stopDefAction(evt) {
    evt.preventDefault();
}
function togglePopup() {
    popup.classList.toggle('popup_opened');
}
function saveInfo(evt) {
    evt.preventDefault()
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    togglePopup();
}

edit_button.addEventListener('click', togglePopup);
exit_button.addEventListener('click', togglePopup);
save_button.addEventListener('click', saveInfo);
