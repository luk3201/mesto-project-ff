import '../pages/index.css';
import {createCard, delCard, toggleLike, initialCards} from './cards.js';
import {openModal, closeModal } from './modal.js';

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link, toggleLike, openImagePopup);
    cardList.append(cardElement);
  });
  
const elements = {
    addCardPopup: document.querySelector('.popup_type_new-card'),
    addCardButton: document.querySelector('.profile__add-button'),
    editProfilePopup: document.querySelector('.popup_type_edit'),
    editProfileButton: document.querySelector('.profile__edit-button'),
    name: document.querySelector('.profile__title'),
    description: document.querySelector('.profile__description'),
    addForm: document.forms['new-place'],
    editProfileNameInput: document.forms['edit-profile'].elements['name'],
    editProfileDescriptionInput: document.forms['edit-profile'].elements['description'],
    addCardNameInput: document.forms['new-place'].elements['place-name'],
    editProfileDescriptionInput: document.forms['new-place'].elements['link'],
    imagePopup: document.querySelector('.popup_type_image'),
    imagePopupImage: document.querySelector('.popup__image'),
    imagePopupCaption: document.querySelector('.popup__caption'),
};

elements.addCardButton.addEventListener('click', () => { openAddPopup() });
elements.editProfileButton.addEventListener('click', () => { openEditProfilePopup() });

elements.editProfilePopup.addEventListener('submit', submitEditProfille);
elements.addCardPopup.addEventListener('submit',submitAddCard);

function openAddPopup() {
    elements.addForm.reset();
    openModal(elements.addCardPopup);
}

function openEditProfilePopup() {
    elements.editProfileNameInput.value = elements.name.textContent;
    elements.editProfileDescriptionInput.value = elements.description.textContent;
    openModal(elements.editProfilePopup);
}

function openImagePopup(card) {
    elements.imagePopupImage.src = card.querySelector('.card__image').src;
    elements.imagePopupImage.alt = card.querySelector('.card__image').alt;
    elements.imagePopupCaption.textContent = card.querySelector('.card__title').textContent;
    openModal(elements.imagePopup);
}

function submitEditProfille(evt) {
    evt.preventDefault();
    elements.name.textContent = elements.editProfileNameInput.value; 
    elements.description.textContent = elements.editProfileDescriptionInput.value;
    closeModal(elements.editProfilePopup);
}

function submitAddCard(evt) {
    evt.preventDefault();
    cardList.prepend(createCard(elements.addCardNameInput.value,elements.editProfileDescriptionInput.value, toggleLike, openImagePopup));
    closeModal(elements.addCardPopup);
}

export { cardTemplate };










