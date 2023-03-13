const validationContainer = {
  formList: '.popup__form',
  inputList: '.popup__input',
  buttonElement: '.popup__save-button',
  inputError: 'popup__input_error',
  errorElementActive: 'popup__error_active',
  buttonElementDisabled: 'popup__save-button_disabled',
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorElementActive);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputError);
  errorElement.classList.remove(settings.errorElementActive);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 
function toggleButtonState(inputList, buttonElement, settings){
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(settings.buttonElementDisabled);
  buttonElement.disabled = true;
} else {
  buttonElement.classList.remove(settings.buttonElementDisabled);
  buttonElement.disabled = false;
} 
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputList));
  const buttonElement = formElement.querySelector(settings.buttonElement);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}; 
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formList));
  formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
  });
};

enableValidation(validationContainer);


