const classConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
class FormValidator {
  constructor(classConfig, form) {
    this.classConfig = classConfig;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(classConfig.inputSelector),
    );
    this._submitButton = this._form.querySelector(
      this.classConfig.submitButtonSelector,
    );
  }
  _showError(input) {
    const getErrorElement = this._getError(input);
    getErrorElement.textContent = input.validationMessage;
    getErrorElement.classList.add(this.classConfig.errorClass);
    input.classList.add(this.classConfig.inputErrorClass);
  }

  _hideError(input) {
    const getErrorElement = this._getError(input);
    getErrorElement.textContent = "";
    getErrorElement.classList.remove(this.classConfig.errorClass);
    input.classList.remove(this.classConfig.inputErrorClass);
  }
  _getError(input) {
    const errorSelector = "#" + input.name + "-error";
    const errorElement = document.querySelector(errorSelector);
    return errorElement;
  }
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }
  _toggleButtonState() {
    const isFormValid = this._inputList.every((input) => input.validity.valid);
    this._submitButton.disabled = !isFormValid;
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  setEventListeners() {
    this._setEventListeners();
  }
}
export default FormValidator;
