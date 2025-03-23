// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardName, cardImg) {
    if (cardName[0] !== cardName[0].toUpperCase()) {
        cardName = cardName[0].toUpperCase() + cardName.slice(1);
    }
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = cardImg;
    newCard.querySelector('.card__image').alt = 'Изображение ' + cardName;
    newCard.querySelector('.card__description').querySelector('.card__title').textContent = cardName; 
    newCard.querySelector('.card__delete-button').addEventListener('click', delCard);
    return newCard;
};

// @todo: Функция удаления карточки
function delCard(evt) {
    const del = evt.target.closest(".places__item");
    del.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    console.log(cardElement);
    cardList.append(cardElement);
});