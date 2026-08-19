import {
  openModal,
  closeModal,
  handleOverlayClick,
  handleCardFormSubmit,
  handleProfileFormSubmit,
} from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editProfile = document.querySelector(".profile__edit-button");
const modalPopup = document.querySelector("#edit-popup");
const closePopup = modalPopup.querySelector(".popup__close");
const formElement = document.querySelector("#edit-profile-form");
const cardsList = document.querySelector(".cards__list");
const newCardPopup = document.querySelector("#new-card-popup");
const profileAddButton = document.querySelector(".profile__add-button");
const profileCloseButton = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const cardTemplate = "#card-template";
const cardContainer = document.querySelector(".cards__list");

const domElements = {
  newCardForm,
  cardTemplate,
  cardContainer,
  newCardPopup,
};

function fillProfileForm() {
  const currentName = document.querySelector(".profile__title");
  const currentDescription = document.querySelector(".profile__description");
  const nameInput = modalPopup.querySelector(".popup__input_type_name");
  const aboutInput = modalPopup.querySelector(".popup__input_type_description");

  nameInput.value = currentName.textContent;
  aboutInput.value = currentDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modalPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
editProfile.addEventListener("click", handleOpenEditModal);

closePopup.addEventListener("click", function () {
  closeModal(modalPopup);
});

profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
  newCardForm.reset();
});
profileCloseButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

imagePopupClose.addEventListener("click", function () {
  closeModal(imagePopup);
});

imagePopup.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closeModal(imagePopup);
  }
});

newCardPopup.addEventListener("click", handleOverlayClick);
modalPopup.addEventListener("click", handleOverlayClick);

function handleClickOpenModal(name, link) {
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openModal(imagePopup);
}

function renderCard(cardData, cardTemplateSelector, cardContainer) {
  const cardElement = new Card(
    cardData,
    cardTemplateSelector,
    handleClickOpenModal,
  );
  const newCardElement = cardElement.getNewCard();
  cardContainer.prepend(newCardElement);
}

initialCards.forEach((card) => {
  renderCard(card, cardTemplate, cardContainer);
});

const formValidators = {};
const classConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

document.querySelectorAll(".popup__form").forEach((form) => {
  const validator = new FormValidator(classConfig, form);
  validator.setEventListeners();
  formValidators[form.name] = validator;
});
