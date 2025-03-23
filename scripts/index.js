// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardlist = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardname, cardimg) {
    if (cardname[0] !== cardname[0].toUpperCase()) {
        cardname = cardname[0].toUpperCase() + cardname.slice(1);
    }
    const newcard = cardTemplate.querySelector('.card').cloneNode(true);
    newcard.querySelector('.card__image').src = cardimg;
    newcard.querySelector('.card__image').alt = 'Изображение ' + cardname;
    newcard.querySelector('.card__description').querySelector('.card__title').textContent = cardname; 
    newcard.querySelector('.card__delete-button').addEventListener('click', delCard);
    return newcard;
};

// @todo: Функция удаления карточки
function delCard(evt) {
    const del = evt.target.closest(".places__item");
    del.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = addCard(cardData.name, cardData.link);
    console.log(cardElement);
    cardlist.append(cardElement);
});