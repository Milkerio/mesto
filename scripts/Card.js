import { popupImage, openPopup } from "./script.js";

class Card{
    constructor(name, link, templateSelector){
        this._link = link;
        this._name = name;
        this._alt = name;
        this._templateSelector = templateSelector;
    }
    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.elements__card')
          .cloneNode(true);
    
        return cardElement;
    }
    _cardButtonLike(){
        this._cardLike.classList.toggle('elements__like-button_active');
    }
    _cardButtonDelete(){
        this._card.remove();
        this._card = null;
    }
    
    _cardOpen(){
        popupImage.querySelector('.popup__card-picture').src = this._link;
        popupImage.querySelector('.popup__card-picture').alt = this._name;
        popupImage.querySelector('.popup__card-text').textContent = this._name;
        openPopup(popupImage);
    }
    generateCard(){
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.elements__image');
        this._cardTitle = this._card.querySelector('.elements__title');
        this._cardLike = this._card.querySelector('.elements__like-button');
        this._cardDelete = this._card.querySelector('.elements__delete-button');

        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        
        this._setEventListeners();

        return this._card;
    }
    _setEventListeners(){
        this._cardLike.addEventListener('click', () => this._cardButtonLike());
        this._cardDelete.addEventListener('click', () => this._cardButtonDelete());
        this._cardImage.addEventListener('click', () => this._cardOpen());
    }
}
export {Card};