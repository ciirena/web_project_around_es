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
    this.form = form;
  }
  _showError(input) {
    this._getError(input).textContent = input.validationMessage;
    this._getError(input).classList.add(this.classConfig.errorClass);
    input.classList.add(this.classConfig.inputErrorClass);
  }

  _hideError(input) {
    this._getError(input).textContent = "";
    this._getError(input).classList.remove(this.classConfig.errorClass);
    input.classList.remove(this.classConfig.inputErrorClass);
  }
}
