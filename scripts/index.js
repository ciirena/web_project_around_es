let initialCards = [
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

initialCards.forEach(function (card) {
  console.log(card.name);
});

const editProfile = document.querySelector(".profile__edit-button");
const modalPopup = document.querySelector("#edit-popup");
const closePopup = modalPopup.querySelector(".popup__close");
let formElement = document.querySelector("#edit-profile-form");
const cardsList = document.querySelector(".cards__list");
const newCardPopup = document.querySelector("#new-card-popup");
const profileAddButton = document.querySelector(".profile__add-button");
const profileCloseButton = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const formInputs = Array.from(formElement.querySelectorAll("input"));
const submitButton = formElement.querySelector(".button.popup__button");
const newCardFormInputs = Array.from(newCardForm.querySelectorAll("input"));
const newCardSubmitButton = newCardForm.querySelector(".button.popup__button");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

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
  toggleSubmitButton(formInputs.every((input) => validateInput(input)));
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = modalPopup.querySelector(".popup__input_type_name");
  let aboutInput = modalPopup.querySelector(".popup__input_type_description");

  let userName = nameInput.value;
  let aboutUser = aboutInput.value;

  let profileName = document.querySelector(".profile__title");
  let descriptionName = document.querySelector(".profile__description");

  profileName.textContent = userName;
  descriptionName.textContent = aboutUser;
  closeModal(modalPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
editProfile.addEventListener("click", handleOpenEditModal);

closePopup.addEventListener("click", function () {
  closeModal(modalPopup);
});

profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
  newCardForm.reset();
  toggleNewCardSubmitButton(false);
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

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      closeModal(activePopup);
    }
  }
});

newCardPopup.addEventListener("click", handleOverlayClick);
modalPopup.addEventListener("click", handleOverlayClick);

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const templateCard = document.querySelector("#card-template").content;
  const cardElement = templateCard.cloneNode(true).firstElementChild;

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openModal(imagePopup);
  });
  return cardElement;
}

function renderCard(name, link, cardContainer) {
  const cardElement = getCardElement(name, link);
  cardContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = newCardForm.querySelector(
    ".popup__input_type_card-name",
  );
  const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);
  closeModal(newCardPopup);
  newCardForm.reset();
}
function getError(input) {
  const errorSelector = "#" + input.name + "-error";
  console.log("Buscando:", errorSelector);
  console.log("Elemento encontrado:", document.querySelector(errorSelector));
  const errorElement = document.querySelector(errorSelector);
  return errorElement;
}

function showError(input) {
  getError(input).textContent = input.validationMessage;
}

function hideError(input) {
  getError(input).textContent = "";
}

function validateInput(input) {
  if (!input.validity.valid) {
    showError(input);
  } else {
    hideError(input);
  }
  return input.validity.valid;
}

function toggleSubmitButton(isValid) {
  submitButton.disabled = !isValid;
}

function toggleNewCardSubmitButton(isValid) {
  newCardSubmitButton.disabled = !isValid;
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    toggleSubmitButton(formInputs.every((input) => validateInput(input)));
  });
});

newCardFormInputs.forEach((input) => {
  input.addEventListener("input", () => {
    toggleNewCardSubmitButton(
      newCardFormInputs.every((input) => validateInput(input)),
    );
  });
});
