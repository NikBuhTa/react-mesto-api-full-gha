const options = {
    baseUrl: 'https://api.project15.nomoredomainsicu.ru',
    headers: {
        'Content-Type': 'application/json'
    }
}

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _makeRequest(endpoint, method, body = undefined) {
        const config = {
            method: method,
            credentials: 'include',
            headers: this._headers,
        }
    
        if (body !== undefined) {
            config.body = JSON.stringify(body)
        }
    
        return fetch(`${this._baseUrl}/${endpoint}`, config)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status);
                }
            })
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    }

    getUserInfo() {
        return this._makeRequest('users/me', 'GET', undefined)
    }

    getCards() {
        return this._makeRequest('cards', 'GET', undefined);
    }

    updateAvatar(avatar) {
        return this._makeRequest('users/me/avatar', 'PATCH', {avatar});
    }

    updateUserInfo({name, about}) {
        return this._makeRequest('users/me', 'PATCH', {name, about});
    }

    addCard({name, link}){
        return this._makeRequest('cards', 'POST', {name, link});
    }

    deleteCard(cardId){
        return this._makeRequest(`cards/${cardId}`, 'DELETE', undefined);
    }

    likeCard(cardId) {
        return this._makeRequest(`cards/${cardId}/likes`, 'PUT', undefined);
    }

    dislikeCard(cardId) {
        return this._makeRequest(`cards/${cardId}/likes`, 'DELETE', undefined);
    }
}

const api = new Api(options);

export default api;