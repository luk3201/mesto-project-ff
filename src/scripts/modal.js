function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeClickPopup);
    document.addEventListener('keydown', closeEscPopup);
}

function closeModal(popup) {
    document.removeEventListener('keydown',closeEscPopup);
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
}

function closeClickPopup(evt) {
    if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        const curPopup = document.querySelector('.popup_is-opened');
        closeModal(curPopup);
    }
}

function closeEscPopup(evt) {
    if(evt.key === 'Escape') {
        const curPopup = document.querySelector('.popup_is-opened');
        closeModal(curPopup);
    }
}

export { openModal, closeModal };

