class Api {
  constructor(config) {
    this._cardsUrl = config.cardsUrl;
    this._profileUrl = config.profileUrl;
    this._avatarsUrl = config.avatarsUrl;
    this._headers = config.headers;
    this._likesUrl = config.likesUrl;
  }


  error(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {

    return fetch(this._cardsUrl, {
        method: "GET",
        credentials: 'include',
        headers: this._headers
      })
      // .then(res => res.json())
      .then(res => this.error(res));
  }

  getProfileData() {

    return fetch(this._profileUrl, {
        method: "GET",
        credentials: 'include',
        headers: this._headers
      })
      .then(res => this.error(res));

  }

  patchAvatar(link) {

    return fetch(this._avatarsUrl, {
        method: 'PATCH',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(res => this.error(res));

  }

  patchUserInfo(name, about) {

    return fetch(this._profileUrl, {
        method: 'PATCH',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => this.error(res));

  }

  postCard(name, link) {

    return fetch(this._cardsUrl, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this.error(res));

  }

  deleteCard(cardId) {

    return fetch(`${this._cardsUrl}/${cardId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      })
      .then(res => this.error(res));

  }

  putLike(cardId, state) {

    const method = state ? 'PUT' : 'DELETE';

    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: method,
        credentials: 'include',
        headers: this._headers
      })
      .then(res => this.error(res));

  }

}

export const api = new Api({
  cardsUrl: 'http://api.mesto.niki-konkin.nomoredomains.work/cards',
  avatarsUrl: 'http://api.mesto.niki-konkin.nomoredomains.work/users/me/avatar',
  profileUrl: 'http://api.mesto.niki-konkin.nomoredomains.work/users/me',
  // likesUrl: 'http://localhost:3000/cards/likes',
  headers: {
    // authorization: '6dcc8eb5-b36f-4e58-925f-68f8caf1b64a',
    'Content-Type': 'application/json'
  }

});
