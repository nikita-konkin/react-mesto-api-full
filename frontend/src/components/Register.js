import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(props){

	const [mail, setMail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		props.setHeaderIdState()
  }, []);


  function handleAuthorization(e){
  	e.preventDefault()

  	props.auth({
  		mail: mail,
  		password: password
  	})

  }

  function handleChangeMail(e){
		setMail(e.target.value)
	}
	function handleChangePassword(e){
		setPassword(e.target.value)
	}

	return(
		<form onSubmit={handleAuthorization} className="authorization">

			<h1 className="authorization__header">Регистрация</h1>
			<input onChange={handleChangeMail} value={mail} type="text" name="email"
			className="authorization__email-input" placeholder="Email"
			minLength={2} maxLength={30} required />
		  <span className="form__input-error" />
		  <input onChange={handleChangePassword} value={password} type="password" name="password"
		  className="authorization__password-input" placeholder="Пароль" required />
		  <span className="form__input-error" />
		  <button type="submit" className="authorization__submit">Зарегистрироваться</button>
		  <h2 className="authorization__check-text">Уже зарегистрированы? <Link
		  className="authorization__check-text_link" to="/sign-in">Войти</Link></h2>

	  </form>
		)
}
