/* переменные по мелочи */ 
const popupEdit = document.querySelector('.popup_edit_profile');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('#userName');
const descriptionInput = document.querySelector('#userDescription');
const popupAddElement = document.querySelector('.popup_add_element'); 
const popupImage = document.querySelector('.popup_image');
const deleteButtons = document.querySelectorAll('.elements__delete-button');
const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements__card').content;
const caption = document.querySelector('#caption');
const pictureUrl = document.querySelector('#pictureURL');
const exitButtons = document.querySelectorAll('.popup__exit-button');
const popupCardPicture = popupImage.querySelector('.popup__card-picture');
const popupCardText = popupImage.querySelector('.popup__card-text');
const formEdit = document.querySelector('#popup__form_edit');
const formAdd = document.querySelector('#popup__form_add');
const popups = document.querySelectorAll('.popup'); 


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
/* инфо профиля */
function setProfileInfo() {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
}

function openPopup(somePopup){//открытие попапа
  somePopup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClose);  //добавляем закрытие открытого попапа через esc
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
  evt.submitter.classList.add('popup__save-button_disabled')
  evt.submitter.disabled = true; 
}

const addCard = (evt) => {//добавляем карточку
  evt.preventDefault();
  showCards({
    name: caption.value,
    link: pictureUrl.value,
  });
  closePopup(popupAddElement);
  evt.target.reset();
  evt.submitter.classList.add('popup__save-button_disabled')
  evt.submitter.disabled = true; 
};

/* заполняем страницу карточками */
const generateCards = (cardInfo) => {
  const cardElement = elementsTemplate.querySelector('.elements__card').cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
  const cardLike = cardElement.querySelector(".elements__like-button");
  const cardDelete = cardElement.querySelector(".elements__delete-button");
  cardTitle.textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  

  function openImage() {
    popupCardPicture.src = cardInfo.link;
    popupCardPicture.alt = cardInfo.textContent;
    popupCardText.textContent = cardInfo.textContent; 
    openPopup(popupImage);
  }
  const like = (evt) => {
    evt.target.classList.toggle('elements__like-button_active');
  };
  const deleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
  };
  cardImage.addEventListener('click', openImage);
  cardDelete.addEventListener('click', deleteCard);
  cardLike.addEventListener('click', like);
  return cardElement;
};

/* добавляем карточки с начала */
const showCards = (cardInfo) => {
  elementsContainer.prepend(generateCards(cardInfo));
};
initialCards.forEach((cardInfo) => {
  showCards(cardInfo);
})


/* закрытие по нажатию кнопки Escape*/
const escapeClose = (evt) =>{
  if(evt.key === 'Escape'){
    const escPopup = document.querySelector('.popup_opened');
    closePopup(escPopup);
  }
}

/* обработчики */
formEdit.addEventListener('submit', saveInfo);
formAdd.addEventListener('submit', addCard);
editButton.addEventListener('click', () => {
  setProfileInfo();
  openPopup(popupEdit);
});
exitButtons.forEach((button) => {//закрытие попапа через крестик
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
addButton.addEventListener('click', () => {
  openPopup(popupAddElement);
});
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    };
  });
});








