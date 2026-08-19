function handleEscClose(modal) {
  return function (event) {
    if (event.key === "Escape") {
      closeModal(modal);
    }
  };
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal._escHandler = handleEscClose(modal);
  document.addEventListener("keydown", modal._escHandler);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", modal._escHandler);
}

export function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

export function handleProfileFormSubmit(modal) {
  return function (event) {
    event.preventDefault();

    const nameInput = modal.querySelector(".popup__input_type_name");
    const aboutInput = modal.querySelector(".popup__input_type_description");

    const userName = nameInput.value;
    const aboutUser = aboutInput.value;

    const profileName = document.querySelector(".profile__title");
    const descriptionName = document.querySelector(".profile__description");

    profileName.textContent = userName;
    descriptionName.textContent = aboutUser;
    closeModal(modal);
  };
}

export function handleCardFormSubmit(domElements, event, renderCard) {
  event.preventDefault();
  const inputCardName = domElements.newCardForm.querySelector(
    ".popup__input_type_card-name",
  );
  const inputImageLink = domElements.newCardForm.querySelector(
    ".popup__input_type_url",
  );
  const cardData = { name: inputCardName.value, link: inputImageLink.value };
  renderCard(cardData, domElements.cardTemplate, domElements.cardContainer);
  closeModal(domElements.newCardPopup);
  domElements.newCardForm.reset();
}
