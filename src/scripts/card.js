// @todo: Функция создания карточки
import { delCardData, putLikeData, delLikeData } from './api.js';

function createCard(template, userID, {name, link, _id, owner, likes}, likefun, stretchImage) {
    if (name[0] !== name[0].toUpperCase()) {
        name = name[0].toUpperCase() + name.slice(1);
    }
    const newCard = template.querySelector('.card').cloneNode(true);
  
    newCard.querySelector('.card__image').src = link;
    newCard.querySelector('.card__image').alt = 'Изображение ' + name;
    newCard.querySelector('.card__description').querySelector('.card__title').textContent = name; 
    newCard.querySelector('.card__like-count').textContent = likes.length;

    if(userID === owner._id) {
        newCard.querySelector('.card__delete-button').addEventListener('click', (evt) => {delCard(evt,_id)});
        newCard.querySelector('.card__delete-button').style.display = "block";
    } else {
        newCard.querySelector('.card__delete-button').style.display = "none";
    }
    
    if (likes.some((like) => like._id === userID)) {
        newCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');    
    }
    newCard.querySelector('.card__like-button').addEventListener('click',(evt) => {likefun(evt, _id)});
    newCard.querySelector('.card__image').addEventListener('click', () => {stretchImage(link, name)});
    return newCard;

};
  
// @todo: Функция удаления карточки
function delCard(evt,_id) {
    delCardData(_id)
        .then(() => {
            const del = evt.target.closest('.places__item');
            del.remove();
        })
        .catch((res) => {console.error(`Ошибка ${res} при удалении`)});
};


function toggleLike(evt, _id) {
    const liked = evt.target.classList.contains('card__like-button_is-active');
    const count = evt.target.closest('.card__like-wrap').querySelector('.card__like-count');
    if(liked) {
        delLikeData(_id)
            .then((likes) => {
                evt.target.classList.toggle('card__like-button_is-active');
                count.textContent = likes.length;
            })
            .catch((res) => {console.error(`Ошибка ${res} удалении лайка`)});
    } else {
        putLikeData(_id)
            .then((likes) => {
                evt.target.classList.toggle('card__like-button_is-active');
                count.textContent = likes.length;
            })
            .catch((res) => {console.error(`Ошибка ${res} при постановке лайка`)});
};
};
  
export { createCard, delCard, toggleLike }
 // @todo: Вывести карточки на страницу