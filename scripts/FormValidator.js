class FormValidator{
    constructor(settings, form){
        this._settings = settings;
        this._form = form;
    }
    
    _showInputError(inputElement){
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputError);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorElementActive);
    }
    _hideInputError(inputElement){
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputError);
        errorElement.classList.remove(this._settings.errorElementActive);
        errorElement.textContent = '';  
    }
    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
          } else {
            this._hideInputError(inputElement);
          }
    }
    _hasInvalidInput(inputList){
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _toggleButtonState(inputList, buttonElement){
        if(this._hasInvalidInput(inputList)){
            buttonElement.classList.add(this._settings.buttonElementDisabled);
            buttonElement.disabled = true;
        }
        else{
            buttonElement.classList.remove(this._settings.buttonElementDisabled);
            buttonElement.disabled = false;
        }
    }
    _setEventListeners(){
        const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._form.querySelector(this._settings.buttonElement);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }
    
    enableValidation(){
        this._setEventListeners();
    }
}
export {FormValidator};