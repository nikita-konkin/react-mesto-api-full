import React, { useEffect, useState } from 'react'
import regSucces from '../images/reg_succes.svg';
import regError from '../images/reg_error.svg';

export default function InfoTooltip(props){

	const [text, setText] = useState('')

	useEffect(() => {

			if(props.regStatus){
				setText('Вы успешно зарегистрировались!')
			}else{
				setText('Что-то пошло не так! Попробуйте ещё раз.')
			}

  }, [props.regStatus]);

  return (

    <div className = {`popup ${props.isOpen ? 'popup_opened' : '' }`}>

      <div className="popup__container">
        <button onClick={props.onClose} type="button" className={`popup__close-button `} />

        	<img src={props.regStatus ? regSucces : regError}
        	className="popup__reg-logo" alt="Удача" />
          <h1 className="popup__reg-text">{text}</h1>

      </div>
    </div>

  )



}
