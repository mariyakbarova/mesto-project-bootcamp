//функциональность валидации форм

export const showInputError = (inputElement, errorMessage, selectors) => {
    const spanId = `${inputElement.id}-error`;
    const errorElement = document.getElementById(spanId);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
};

export const hideInputError = (inputElement, selectors) => {
    const spanId = "".concat(inputElement.id, "-error");
    const errorElement = document.getElementById(spanId);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent='';
};

export const checkInputValidity = (inputElement, selectors) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(inputElement, selectors);
    }
};

export const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

export const toggleButtonState = (inputList, buttonElement, selectors) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectors.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(selectors.inactiveButtonClass)
        buttonElement.disabled = false;
    }
};

export const setEventListeners = (formElement, selectors) => {
const buttonElement = formElement.querySelector(selectors.submitButtonSelector)
const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
toggleButtonState(inputList, buttonElement, selectors);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(inputElement, selectors);
            toggleButtonState(inputList, buttonElement, selectors);
        });
    });
};

export const resetErrors = (formElement, selectors) => {
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector)
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(inputElement, selectors);
        });
    toggleButtonState(inputList, buttonElement, selectors);
};

export const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, selectors);
    });
};
