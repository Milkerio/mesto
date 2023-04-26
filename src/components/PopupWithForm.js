import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(popupSelector, {submitCallback}){
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }
    _getInputValues(){
        this._inputValue = {};
        this._inputList.forEach((input) => {
            this._inputValue[input.name] = input.value;
          });
        return this._inputValue;
    }
    close(){
        this._form.reset();
        super.close();
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