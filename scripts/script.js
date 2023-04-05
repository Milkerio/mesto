import { Card } from './Card.js';
import { FormValidator} from './FormValidator.js';


/* переменные по мелочи */ 
const popupEdit = document.querySelector('.popup_edit_profile');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('#userName');
const descriptionInput = document.querySelector('#userDescription');
const popupAddElement = document.querySelector('.popup_add_element'); 
const caption = document.querySelector('#caption');
const pictureUrl = document.querySelector('#pictureURL');
const elementsContainer = document.querySelector('.elements');
const exitButtons = document.querySelectorAll('.popup__exit-button');
const popupImage = document.querySelector('.popup_image');
const formEdit = document.querySelector('#popup__form_edit');
const formAdd = document.querySelector('#popup__form_add');
const popups = document.querySelectorAll('.popup');
const popupPicture = popupImage.querySelector('.popup__card-picture');
const popupText = popupImage.querySelector('.popup__card-text');

/* карточки */
const initialCards = [
    {
      name: 'Китя',
      link: 'https://avatars.dzeninfra.ru/get-zen_doc/4120518/pub_63c9182e39ba68535e80538d_63c9187039ba68535e80620f/scale_1200'
    },
    {
      name: 'Озеро',
      link: 'https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Горный туман',
      link: 'https://images.unsplash.com/photo-1635783295846-442bbb118b10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
    },
    {
      name: 'Лесная дорога',
      link: 'https://images.unsplash.com/photo-1511312817910-ffa2ca5d954e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
      name: 'Рыбалка',
      link: 'https://images.unsplash.com/photo-1529230117010-b6c436154f25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Звездное небо',
      link: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }
  ]; 

/* Создание и добавление карточки */
const createCard = (name, link) => {
  const cardElement = new Card(name, link, '#elements__card').generateCard();
  return cardElement;
} 
const addCard = (card, container) => {
  container.prepend(card);
}
initialCards.forEach((item) => {
  addCard(createCard(item.name, item.link), elementsContainer);
});


const addNewCard = (evt) =>{
  evt.preventDefault();
  addCard(createCard(caption.value, pictureUrl.value), elementsContainer);
  formAdd.reset();
  closePopup(popupAddElement);
}

function openPopup(somePopup){//открытие попапа
  somePopup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClose);  //добавляем закрытие открытого попапа через esc
}
function setProfileInfo() {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
}
function closePopup(somePopup){//закрытие попапа
  somePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClose); //убираем обработчик, т.к попап закрыт
}
function saveInfo(evt) {//сохранение данных профиля
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(popupEdit);
}
const escapeClose = (evt) =>{
  if(evt.key === 'Escape'){
    const escPopup = document.querySelector('.popup_opened');
    closePopup(escPopup);
  }
}
/* обработчики */
formEdit.addEventListener('submit', saveInfo);
formAdd.addEventListener('submit', addNewCard);
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  setProfileInfo();
  validatorForms['form-edit'].resetValidation();
});
exitButtons.forEach((button) => {//закрытие попапа через крестик
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
addButton.addEventListener('click', () => {
  openPopup(popupAddElement); 
  validatorForms['form-add'].resetValidation();
});
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    };
  });
});

/* валидация */
const validationContainer = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonElement: '.popup__save-button',
  inputError: 'popup__input_error',
  errorElementActive: 'popup__error_active',
  buttonElementDisabled: 'popup__save-button_disabled',
}

const validatorForms = {};

const enableValidation = (validationContainer) =>{
  const formList = Array.from(document.querySelectorAll(validationContainer.formSelector));
  formList.forEach((formElement) => {
  const validateForm = new FormValidator(validationContainer, formElement);
  const formName = formElement.getAttribute('name');
  validatorForms[formName] = validateForm;

  validateForm.enableValidation();
  });
}
enableValidation(validationContainer);


 export {popupImage, openPopup, popupPicture, popupText};








