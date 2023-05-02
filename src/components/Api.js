class Api{
    constructor(options){
        this._url = options.url;
        this._headers = options.headers;
    }

    /* прверка на ошибки */
    _errorCheck(res) {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res.status);
    }
    /* получаем карточки */ 
    getInitialCards(){
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
        .then(res => this._errorCheck(res))
    }
    /* добавляем новую карточку */
    addNewCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => this._errorCheck(res))
    }
    /* удаление карточки */ 
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(res => this._errorCheck(res))
    }
    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(res => this._errorCheck(res))
    }
    setUserInfo(data){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => this._errorCheck(res))
    }
    setUserAvatar(data){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(res => this._errorCheck(res))
    }
    putLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(res => this._errorCheck(res))
    }
    deleteLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => this._errorCheck(res))
    }
}
export { Api };