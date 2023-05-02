import Popup from './Popup.js';

class PopupWithSubmit extends Popup{
    constructor(popupSelector, {submitCallback}){
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._submitButton = this._popup.querySelector('.popup__save-button');
    }

    preloader(load, text){
        if(load){
            this._initialText = this._submitButton.textContent;
            this._submitButton.textContent = text;
        }
        else{
            this._submitButton.textContent = this._initialText;
        }
    }
    open(cardElement, cardId){
        super.open();
        this.card = cardElement;
        this.id = cardId;
    }
    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
          this._submitCallback(this.id, this.card);
        });
    }
}
export { PopupWithSubmit };