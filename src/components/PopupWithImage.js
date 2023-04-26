import Popup from './Popup.js';

class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._picture = this._popup.querySelector('.popup__card-picture');
        this._text = this._popup.querySelector('.popup__card-text');
    }
    open(data){
        this._picture.src = data.link;
        this._picture.alt = data.name;
        this._text.textContent = data.name;
        super.open();
    }
}
export {PopupWithImage};