import React from 'react'
import PopupWithForm from './PopupWithForm.js';


export default function DelCardConfirmPopup(props){

	function handleSubmit(e) {

	  e.preventDefault();

	  props.onDelPlace({
	    id: props.cardId
	  });
	}


	return(

    <PopupWithForm submitButtonName='Да'
    onSubmit={handleSubmit} name='confirm'
    title='Вы уверены?' state = {props.isOpen}
    closePopup={props.onClose}>

    </PopupWithForm>

		)

}