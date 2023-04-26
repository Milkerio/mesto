export default class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._exitButton = this._popup.querySelector('.popup__exit-button');
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose)
    }
    _handleEscClose = (evt) =>{
        if (evt.key === 'Escape') {
            this.close();
          }
    }
    setEventListeners(){
        this._exitButton.addEventListener('click', () =>{
            this.close();
        });
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }
}