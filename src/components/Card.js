class Card{
    constructor({data, userId, templateSelector, handleCardClick, handleCardDelete, handleCardLike, handleCardLikeDelete}){
        this._title = data.name;
        this._image = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this.cardData = data;
        this._userId = userId;
        this._userCardId = data.owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._handleCardLikeDelete = handleCardLikeDelete;
    }
    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.elements__card')
          .cloneNode(true);
    
        return cardElement;
    }

    isLikedCard(){
        return this._likes.some(like => like._id === this._userId)
    }

    toggleLike(){
        if(this.isLikedCard()){
            this._handleCardLikeDelete(this._cardId);
        }
        else {
            this._handleCardLike(this._cardId);
        }
    }

    renderLikes(card){
        this._likes = card.likes;
        if(this._likes.length === 0){
            this._cardLikes.textContent = '0';
        }
        else {
            this._cardLikes.textContent = this._likes.length;
        }
        if(this.isLikedCard()) {
            this._cardLike.classList.add('elements__like-button_active');
        }
        else {
            this._cardLike.classList.remove('elements__like-button_active');
        }
    }
    deleteCard(){
        this._card.remove();
        this._card = null;
    }
    generateCard(){
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.elements__image');
        this._cardTitle = this._card.querySelector('.elements__title');
        this._cardLike = this._card.querySelector('.elements__like-button');
        this._cardDelete = this._card.querySelector('.elements__delete-button');
        this._cardLikes = this._card.querySelector('.elements__like-counter');

        this._cardTitle.textContent = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;

        this.renderLikes(this.cardData);
        if(this._userCardId !== this._userId){
            this._cardDelete.remove();
        }
        this._setEventListeners();

        return this._card;
    }
    _setEventListeners(){
        this._cardLike.addEventListener('click', () => this.toggleLike());
        this._cardDelete.addEventListener('click', () => this._handleCardDelete(this, this._cardId));
        this._cardImage.addEventListener('click', () => this._handleCardClick());
    }
}
export {Card};