class Auth {
  constructor(config) {
    this._headersAuth = config.headersAuth;
    this._authorizationUrl = config.authorizationUrl;
  }


  handleError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }



  handleRegistration(pass, email) {

    return fetch(`${this._authorizationUrl}/signup`, {
        method: 'POST',
        headers: this._headersAuth,
        body: JSON.stringify({
          password: pass,
          email: email
        })
      })
      .then(res => this.handleError(res));

  }

  handleAuthorization(email, pass) {

    return fetch(`${this._authorizationUrl}/signin`, {
        method: 'POST',
        headers: this._headersAuth,
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: pass
        })
      })
      .then(res => this.handleError(res));

  }

  handleTokenValidation(JWT) {

    return fetch(`${this._authorizationUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      }
    }).then(res => this.handleError(res));

  }

}

export const auth = new Auth({
  authorizationUrl: 'http://localhost:3000',
  headersAuth: {
    'Content-Type': 'application/json'
  },
});
