class Card{
    constructor(data, handleCardClick, templateSelector){
        this._title = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
    _handleClick(){
        this._handleCardClick({name: this._title, link: this._image});
    }
    generateCard(){
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.elements__image');
        this._cardTitle = this._card.querySelector('.elements__title');
        this._cardLike = this._card.querySelector('.elements__like-button');
        this._cardDelete = this._card.querySelector('.elements__delete-button');

        this._cardTitle.textContent = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        
        this._setEventListeners();

        return this._card;
    }
    _setEventListeners(){
        this._cardLike.addEventListener('click', () => this._cardButtonLike());
        this._cardDelete.addEventListener('click', () => this._cardButtonDelete());
        this._cardImage.addEventListener('click', () => this._handleClick());
    }
}
export {Card};