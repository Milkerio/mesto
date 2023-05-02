import { Card } from '../components/Card.js';
import { FormValidator} from '../components/FormValidator.js';
import { initialCards } from '../utils/utils.js';

import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import '../pages/index.css';

/* переменные */ 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('#userName');
const descriptionInput = document.querySelector('#userDescription');
const profileAvatar = document.querySelector('.profile__avatar');
let userId;

/* API */
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'c91a4e83-ef53-4c6a-8f39-2feb1534aaa6',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([user, card]) => {
  userId = user._id;
  userInfo.setUserInfo(user);
  userInfo.setUserAvatar(user);
  cardsContainer.renderItem(card, userId)
})
.catch(err => console.log(err))

/* создание карточки */
const createCard = (data, userId) => {
  const card = new Card({data: data, userId: userId, templateSelector: '#elements__card',
  handleCardClick: () => {
    popupWithPicture.open(data);
  },
  handleCardDelete: (cardId, cardElement) => {
    popupWithDel.open(cardId, cardElement)
    .catch(err => console.log(err))
  },
  handleCardLike: (cardId) => {
    api.putLike(cardId)
    .then(res => {
      card.renderLikes(res)
    })
    .catch(err => console.log(err))
  },
  handleCardLikeDelete: (cardId) => {
    api.deleteLike(cardId)
    .then(res => {
      card.renderLikes(res)
    })
    .catch(err => console.log(err))
  }
  });
  return card.generateCard();
}

/* попап с картинкой */
const popupWithPicture = new PopupWithImage('.popup_image');
popupWithPicture.setEventListeners();

/* данные профиля */
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

/* попап профиля */
const popupWithProfile = new PopupWithForm('.popup_edit_profile',{
  submitCallback: (data) =>{
    popupWithProfile.preloader(true, 'Сохранение...')
    api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo(res);
      popupWithProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() =>{
      popupWithProfile.preloader(false)
    })
  }
}
);
popupWithProfile.setEventListeners();

/* попап добавления картинки */
const popupWithAdd = new PopupWithForm('.popup_add_element',{
  submitCallback: (data) => {
    popupWithAdd.preloader(true, 'Загружаем...')
    api.addNewCard(data)
    .then((newCard) => {
      cardsContainer.prependItem(createCard(newCard, userId));
      popupWithAdd.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithAdd.preloader(false)
    })
  }
});
popupWithAdd.setEventListeners();

const popupWithAvatar = new PopupWithForm('.popup_avatar', {
  submitCallback: (data) => {
    popupWithAvatar.preloader(true, 'Обновляем...')
    api.setUserAvatar(data)
    .then(res => {
      userInfo.setUserAvatar(res);
      popupWithAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithAvatar.preloader(false)
    })
  }
})
popupWithAvatar.setEventListeners();

const popupWithDel = new PopupWithSubmit('.popup_delete', {
  submitCallback: (cardId, card) => {
    popupWithDel.preloader(true, 'Удаляем...')
    api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      popupWithDel.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithDel.preloader(false)
    })
  }
})
popupWithDel.setEventListeners();
const cardsContainer = new Section({
  renderer: (item, userID) => {
    cardsContainer.addItem(createCard(item, userID))
  }
},
'.elements')

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
profileAvatar.addEventListener('click', () =>{
  popupWithAvatar.open();
  validatorForms['form-avatar'].resetValidation();
})


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
