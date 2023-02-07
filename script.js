
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let edit_button = document.querySelector('.profile__edit-button');
let exit_button = popup.querySelector('.popup__exit-button');
let popup_name = popup.querySelector('.popup__name')
let popup_desc = popup.querySelector('.popup__description')
let save_button = popup.querySelector('.popup__save-button');
let like_button = document.querySelectorAll('.elements__like-button');
popup_name.value = name.textContent;
popup_desc.value = description.textContent;

togglePopup();

function togglePopup() {
    popup.classList.toggle('popup_opened');
}
function saveInfo() {
    name.textContent = popup_name.value;
    description.textContent = popup_desc.value;
    togglePopup();
}
edit_button.addEventListener('click', togglePopup);
exit_button.addEventListener('click', togglePopup);
save_button.addEventListener('click', saveInfo);



