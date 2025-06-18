const apiConfig = {
    apiUrl: 'https://nomoreparties.co/v1/wff-cohort-40',
    headers: {
        authorization: '51caa796-f339-486f-9971-c2b21076c1ea',
        'Content-Type': 'application/json',
    },
};

const getReturn = (res) => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    };
};

const getUserData = () => {
    return fetch(`${apiConfig.apiUrl}/users/me`, {
        method: 'GET',
        headers: apiConfig.headers,
    }).then(getReturn);
};

const getCardsData = () => {
    return fetch(`${apiConfig.apiUrl}/cards`, {
        method: 'GET',
        headers: apiConfig.headers,
    }).then(getReturn);
};

const editUserData = (newName, newAbout) => {
    return fetch(`${apiConfig.apiUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({name: newName, about: newAbout})
    }).then(getReturn);
};

const editUserAvatar = (newAvatar) => {
    return fetch(`${apiConfig.apiUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({avatar: newAvatar})
    })
    .then(getReturn)
    .then((data) => {return data.avatar;});;
};

const addCardData = (cardName, cardLink) => {
    return fetch(`${apiConfig.apiUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({name: cardName, link: cardLink})
    })
        .then(getReturn)
        .then((card) => {return card;});
};

const delCardData = (_id) => {
    return fetch(`${apiConfig.apiUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    }).then(getReturn);
};


const putLikeData = (_id) => {
    return fetch(`${apiConfig.apiUrl}/cards/likes/${_id}`, {
        method: 'PUT',
        headers: apiConfig.headers,
    })  
        .then(getReturn)
        .then((data) => {return data.likes;});
}

const delLikeData = (_id) => {
    return fetch(`${apiConfig.apiUrl}/cards/likes/${_id}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    })  
        .then(getReturn)
        .then((data) => {return data.likes;});
}

export {getUserData, getCardsData, editUserData, addCardData, delCardData, putLikeData, delLikeData, editUserAvatar}