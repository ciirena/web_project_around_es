class Card {
  constructor(cardData, cardTemplate, handleClickOpenModal) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.cardTemplateSelector = cardTemplate;
    this.handleClickOpenModal = handleClickOpenModal;
  }

  _getElement() {
    this.templateCard = document.querySelector(this.cardTemplateSelector);
    this.cardElement =
      this.templateCard.content.cloneNode(true).firstElementChild;
    this.likeButton = this.cardElement.querySelector(".card__like-button");
    this.deleteButton = this.cardElement.querySelector(".card__delete-button");
    this.cardImage = this.cardElement.querySelector(".card__image");
    return this.cardElement;
  }

  getNewCard() {
    const newCard = this._getElement();
    newCard.querySelector(".card__title").textContent = this.name;
    newCard.querySelector(".card__image").setAttribute("src", this.link);

    this._setEventListeners();
    return newCard;
  }

  _handleLikeClick() {
    this.likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteClick() {
    this.cardElement.remove();
  }

  _setEventListeners() {
    this.likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this.deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this.cardImage.addEventListener("click", () => {
      this.handleClickOpenModal(this.name, this.link);
    });
  }
}

export default Card;
