
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
let exitButton = popup.querySelector('.popup__exit-button');
let nameInput = document.querySelector('#userName');
let descriptionInput = document.querySelector('#userDescription');
let saveButton = popup.querySelector('.popup__save-button');



function profileInfo() {
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
}
function togglePopup() {
    profileInfo();
    popup.classList.toggle('popup_opened');
}
function saveInfo(evt) {
    evt.preventDefault()
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    togglePopup();
}

editButton.addEventListener('click', togglePopup);
exitButton.addEventListener('click', togglePopup);
saveButton.addEventListener('click', saveInfo);
