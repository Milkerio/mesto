class FormValidator{
    constructor(settings, form){
        this._buttonElement = settings.buttonElement;
        this._inputError = settings.inputError;
        this._errorElementActive = settings.errorElementActive;
        this._buttonElementDisabled = settings.buttonElementDisabled;
        this._inputSelector = settings.inputSelector;
        this._formSelector = settings.formSelector;
        this._form = form;
        this._submitButtonElement = this._form.querySelector(this._buttonElement);
    }
    
    _showInputError(inputElement){
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputError);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorElementActive);
    }
    _hideInputError(inputElement){
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputError);
        errorElement.classList.remove(this._errorElementActive);
        errorElement.textContent = '';  
    }
    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
          } else {
            this._hideInputError(inputElement);
          }
    }
    _toggleButtonState() {
        this._isFormValid = this._form.checkValidity();
        this._submitButtonElement.disabled = !this._isFormValid;
        this._submitButtonElement.classList.toggle(this._buttonElementDisabled, !this._isFormValid);
      }
    
    _setEventListeners(){
        this._inputList = this._form.querySelectorAll(this._inputSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    enableValidation(){
        this._setEventListeners();
    }
    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
      } 
}
export { FormValidator };