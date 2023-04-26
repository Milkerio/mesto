import { Card } from './components/Card.js';
import { FormValidator} from './components/FormValidator.js';
import { initialCards } from './utils/utils.js';

import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { Section } from './components/Section.js';
import { UserInfo } from './components/UserInfo.js';

import './pages/index.css';

/* переменные */ 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('#userName');
const descriptionInput = document.querySelector('#userDescription');
const caption = document.querySelector('#caption');
const pictureUrl = document.querySelector('#pictureURL');



/* создание карточки */
const createCard = (item) => {
  const card = new Card(
    item,
    () => {
      popupWithPicture.open(item);
    },
    '#elements__card');
    const cardElement = card.generateCard();
    return cardElement;
}

/* попап с картинкой */
const popupWithPicture = new PopupWithImage('.popup_image');
popupWithPicture.setEventListeners();

/* данные профиля */
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description'
});

/* попап профиля */
const popupWithProfile = new PopupWithForm('.popup_edit_profile',{
  submitCallback: (item) =>{
    userInfo.setUserInfo(item);
    popupWithProfile.close();
  }
}
);
popupWithProfile.setEventListeners();

/* попап добавления картинки */
const popupWithAdd = new PopupWithForm('.popup_add_element',{
  submitCallback: () => {
    const cardInfo = {
      name: caption.value,
      link: pictureUrl.value
    }
    cardsContainer.prependItem(createCard(cardInfo));  
    popupWithAdd.close();
  }
});
popupWithAdd.setEventListeners();


const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsContainer.addItem(createCard(item));
  }
},'.elements');
cardsContainer.renderItem();


/* обработчики */
editButton.addEventListener('click', () => {
  popupWithProfile.open();
  const getInfo = userInfo.getUserInfo();
  nameInput.value = getInfo['name'];
  descriptionInput.value = getInfo['about'];
  validatorForms['form-edit'].resetValidation();
});

addButton.addEventListener('click', () => {
  popupWithAdd.open();
  validatorForms['form-add'].resetValidation();
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









