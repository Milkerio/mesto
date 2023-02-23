/* переменные по мелочи */ 
let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup__edit_profile');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let nameInput = document.querySelector('#userName');
let descriptionInput = document.querySelector('#userDescription');
let popupAddElement = document.querySelector('.popup__add_element'); 
let popupImage = document.querySelector('.popup_image');
let deleteButtons = document.querySelectorAll('.elements__delete-button');
let elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements__card').content;
let caption = document.querySelector('#caption');
let pictureUrl = document.querySelector('#pictureURL');
let addCardButton = document.querySelector('#addCard');


/* карточки */
let initialCards = [
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
function profileInfo() {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
}

  function showPopup(somePopup) {
    somePopup.classList.add('popup_opened'); 
    let exitButton = somePopup.querySelector('.popup__exit-button');
    if(somePopup == popupEdit){ //попап редактирования профиля
      profileInfo();
      let saveButton = popup.querySelector('.popup__save-button');
      function saveInfo(evt) {//сохранение данных профиля
        evt.preventDefault();
        name.textContent = nameInput.value;
        description.textContent = descriptionInput.value;
        closePopup(somePopup);
    }
    saveButton.addEventListener('click', saveInfo);
    }
    else if(somePopup == popupAddElement){//попап с добавлением карточки
      let addCardButton = somePopup.querySelector('#addCard');
      function addCard(evt){
        evt.preventDefault();
        closePopup(somePopup);
      }
      addCardButton.addEventListener('click', addCard);
    }
    function closePopup() {
      somePopup.classList.remove('popup_opened');
    }
    exitButton.addEventListener('click', () => {
      closePopup(somePopup);
    });
  }
  editButton.addEventListener('click', () => {
    showPopup(popupEdit);
  });
  addButton.addEventListener('click', () => {
    showPopup(popupAddElement);
  });

const addCard = (event) => {
  event.preventDefault();
  showCards({
    name: caption.value,
    link: pictureUrl.value,
  });
  event.target.reset();
  closePopup(popupImage);
};

/* заполняем страницу карточками */
let generateCards = (cardInfo) => {
  let cardElement = elementsTemplate.querySelector('.elements__card').cloneNode(true);
  let cardImage = cardElement.querySelector(".elements__image");
  let cardTitle = cardElement.querySelector(".elements__title");
  let cardLike = cardElement.querySelector(".elements__like-button");
  let cardDelete = cardElement.querySelector(".elements__delete-button");
  cardTitle.textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  
  function openImage() {
    popupImage.querySelector('.popup__card-picture').src = cardImage.src;
    popupImage.querySelector('.popup__card-picture').alt = cardTitle.textContent;
    popupImage.querySelector('.popup__card-text').textContent = cardTitle.textContent; 
    showPopup(popupImage);
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
let showCards = (cardInfo) => {
  elements.prepend(generateCards(cardInfo));
};
initialCards.forEach((cardInfo) => {
  showCards(cardInfo);
})
  
addCardButton.addEventListener('click', addCard);






