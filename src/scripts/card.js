// @todo: Функция создания карточки
function createCard(template, cardName, cardImg, likefun, stretchImage) {
    if (cardName[0] !== cardName[0].toUpperCase()) {
        cardName = cardName[0].toUpperCase() + cardName.slice(1);
    }
    const newCard = template.querySelector('.card').cloneNode(true);
  
    newCard.querySelector('.card__image').src = cardImg;
    newCard.querySelector('.card__image').alt = 'Изображение ' + cardName;
    newCard.querySelector('.card__description').querySelector('.card__title').textContent = cardName; 
  
    newCard.querySelector('.card__delete-button').addEventListener('click', delCard);
    newCard.querySelector('.card__like-button').addEventListener('click', likefun);
    newCard.querySelector('.card__image').addEventListener('click', () => {stretchImage(cardImg, cardName)});
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
  
export { createCard, delCard, toggleLike }
 // @todo: Вывести карточки на страницу