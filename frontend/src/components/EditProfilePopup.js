import React, {useState} from 'react'
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../context/CurrentUserContext.js'

export default function EditProfilePopup(props){

	const currentUser = React.useContext(CurrentUserContext);

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	React.useEffect(() => {
	  setName(currentUser.name);
	  setDescription(currentUser.about);
	}, [props.isOpen, currentUser]);

	function handleSubmit(e) {

	  e.preventDefault();

	  props.onUpdateUser({
	    name,
	    about: description,
	  });
	}

	function handleChangeName(e){
		setName(e.target.value)
	}
	function handleChangeDescription(e){
		setDescription(e.target.value)
	}

	return(
		<PopupWithForm submitButtonName='Сохранить' onSubmit={handleSubmit}
		name='profile' title='Редактировать данные профайла'
		state = {props.isOpen} closePopup={props.onClose}>
		  <input onChange={handleChangeName} value={name || ''}
		  type="text" name="name" id="photo-name-input"
		  className="form__decription-input form__decription-input_type_photo-name"
		  placeholder="Имя" minLength={2} maxLength={30} required />
		  <span className="form__input-error photo-name-input-error" />
		  <input onChange={handleChangeDescription} value={description || ''}
		  type="text" name="description" id="url-input"
		  className="form__decription-input form__decription-input_type_photo-link"
		  placeholder="О себе" required />
		  <span className="form__input-error url-input-error" />
		</PopupWithForm>
	)
}
