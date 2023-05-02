import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(popupSelector, {submitCallback}){
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._popup.querySelector('.popup__save-button');
    }
    _getInputValues(){
        const inputsValues = {};
        this._inputList.forEach((input) => {
            inputsValues[input.name] = input.value;
          });
        return inputsValues;
    }
    close(){
        this._form.reset();
        super.close();
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
    
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });
    }
}
export {PopupWithForm};