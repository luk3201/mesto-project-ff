import '../pages/index.css';
import { createCard, toggleLike } from './card.js'
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation, validationConfig } from './validation.js';
import { getUserData, getCardsData, editUserData, addCardData, editUserAvatar} from './api.js';
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
let userID = "";
Promise.all([getUserData(),getCardsData()]) 
    .then(([user, cards]) => {
        userID = user._id;
        elements.name.textContent = user.name;
        elements.description.textContent = user.about;    
        if (user.avatar) {
            elements.profileAvatar.style.backgroundImage = `url(${user.avatar})`;
        } else {
            elements.profileAvatar.style.backgroundImage = 'none';
        }
        cards.forEach(({name, link, _id, owner, likes}) => {
            cardList.append(createCard(cardTemplate, userID, {name, link, _id, owner, likes}, toggleLike, openImagePopup));
        }); 
    });

const elements = {
    editAvatarPopup: document.querySelector('.popup_type_avatar'),
    editAvatarButton: document.querySelector('.profile__image_edit'),
    profileAvatar: document.querySelector('.profile__image'),
    addCardPopup: document.querySelector('.popup_type_new-card'),
    addCardButton: document.querySelector('.profile__add-button'),
    editProfilePopup: document.querySelector('.popup_type_edit'),
    editProfileButton: document.querySelector('.profile__edit-button'),
    name: document.querySelector('.profile__title'),
    description: document.querySelector('.profile__description'),
    avatarForm: document.forms['edit-avatar'],
    editProfileForm: document.forms['edit-profile'],
    addCardForm: document.forms['new-place'],
    avatarFormInput: document.forms['edit-avatar'].elements['link-avatar'],
    editProfileNameInput: document.forms['edit-profile'].elements['name'],
    editProfileDescriptionInput: document.forms['edit-profile'].elements['description'],
    addCardNameInput: document.forms['new-place'].elements['place-name'],
    addCardLinkInput: document.forms['new-place'].elements['link'],
    imagePopup: document.querySelector('.popup_type_image'),
    imagePopupImage: document.querySelector('.popup__image'),
    imagePopupCaption: document.querySelector('.popup__caption'),
};

elements.addCardButton.addEventListener('click', () => { openAddPopup() });
elements.editProfileButton.addEventListener('click', () => { openEditProfilePopup()});
elements.editAvatarButton.addEventListener('click', () => {openEditAvatarPopup()});


elements.editProfilePopup.addEventListener('submit', submitEditProfille);
elements.addCardPopup.addEventListener('submit', submitAddCard);
elements.editAvatarPopup.addEventListener('submit', submitEditAvatar);

enableValidation(validationConfig);

function openAddPopup() {
    elements.addCardForm.reset();
    clearValidation(elements.addCardForm, validationConfig);
    openModal(elements.addCardPopup);
}

function openEditAvatarPopup() {
    elements.avatarForm.reset();
    clearValidation(elements.avatarForm, validationConfig);
    openModal(elements.editAvatarPopup);
}

function openEditProfilePopup() {
    clearValidation(elements.editProfileForm, validationConfig);
    elements.editProfileNameInput.value = elements.name.textContent;
    elements.editProfileDescriptionInput.value = elements.description.textContent;
    openModal(elements.editProfilePopup);
}

function openImagePopup(cardImage, cardName) {
    elements.imagePopupImage.src = cardImage;
    elements.imagePopupImage.alt = 'Изображение ' + cardName;
    elements.imagePopupCaption.textContent = cardName;
    openModal(elements.imagePopup);
}

function submitEditAvatar(evt) {
    evt.preventDefault();
    evt.target.querySelector('.button').textContent = 'Сохранение...'
    editUserAvatar(elements.avatarFormInput.value)
        .then((url) => {elements.profileAvatar.style.backgroundImage = `url(${url})`})
        .finally(() => {evt.target.querySelector('.button').textContent = 'Сохранить'});
    closeModal(elements.editAvatarPopup);
}

function submitEditProfille(evt) {
    evt.preventDefault();
    evt.target.querySelector('.button').textContent = 'Сохранение...'
    editUserData(elements.editProfileNameInput.value, elements.editProfileDescriptionInput.value)
        .finally(() => {evt.target.querySelector('.button').textContent = 'Сохранить'});
    elements.name.textContent = elements.editProfileNameInput.value; 
    elements.description.textContent = elements.editProfileDescriptionInput.value;
    closeModal(elements.editProfilePopup);
}
///////
function submitAddCard(evt) {
    evt.preventDefault();
    evt.target.querySelector('.button').textContent = 'Сохранение...'
    addCardData(elements.addCardNameInput.value,elements.addCardLinkInput.value)
        .then((card) => {cardList.prepend(createCard(cardTemplate, userID, {name: card.name, link: card.link, _id: card._id, owner: card.owner, likes: card.likes}, toggleLike, openImagePopup))})
        .finally(() => {evt.target.querySelector('.button').textContent = 'Сохранить'});
    closeModal(elements.addCardPopup);
}
///////
export { cardTemplate };










