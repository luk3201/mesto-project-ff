import { cardTemplate } from './index.js';

const initialCards = [
    {
      name: "Архыз",
      link: new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url),
    },
    {
      name: "Челябинская область",
      link: new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url),
    },
    {
      name: "Иваново",
      link: new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url),
    },
    {
      name: "Камчатка",
      link: new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url),
    },
    {
      name: "Холмогорский район",
      link: new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url),
    },
    {
      name: "Байкал",
      link: new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url),
    }
];

// @todo: Функция создания карточки
function createCard(cardName, cardImg, likefun, stretchImage) {
  if (cardName[0] !== cardName[0].toUpperCase()) {
      cardName = cardName[0].toUpperCase() + cardName.slice(1);
  }
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__image').src = cardImg;
  newCard.querySelector('.card__image').alt = 'Изображение ' + cardName;
  newCard.querySelector('.card__description').querySelector('.card__title').textContent = cardName; 

  newCard.querySelector('.card__delete-button').addEventListener('click', delCard);
  newCard.querySelector('.card__like-button').addEventListener('click', likefun);
  newCard.querySelector('.card__image').addEventListener('click', () => {stretchImage(newCard)});
  return newCard;
};

// @todo: Функция удаления карточки
function delCard(evt) {
  const del = evt.target.closest(".places__item");
  del.remove();
};


function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

// @todo: Вывести карточки на страницу
export {createCard, delCard, toggleLike, initialCards}