// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const card_list = document.querySelector('.places__list');

// @todo: Функция создания карточки
function AddCard(card_name, card_img) {
    if (card_name[0] !== card_name[0].toUpperCase()) {
        card_name = card_name[0].toUpperCase() + card_name.slice(1);
    }
    const new_card = cardTemplate.querySelector('.card').cloneNode(true);
    new_card.querySelector('.card__image').src = card_img;
    new_card.querySelector('.card__image').alt = 'Изображение ' + card_name;
    new_card.querySelector('.card__description').querySelector('.card__title').textContent = card_name; 
    card_list.append(new_card);
    new_card.querySelector('.card__delete-button').addEventListener('click', DelCard);
};

// @todo: Функция удаления карточки
function DelCard(evt) {
    const del = evt.target;
    del.parentElement.remove();
};

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    let name = initialCards[i].name;
    let link = initialCards[i].link;
    AddCard(name, link);
}