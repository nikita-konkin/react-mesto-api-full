import React from 'react'
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup(props){

	const [placeName, setPlaceName] = React.useState('');
	const [placeSrc, setPlaceSrc] = React.useState('');


  React.useEffect(() => {
    setPlaceName('');
    setPlaceSrc('');
  }, [props.isOpen]);


	function handleSubmit(e) {

	  e.preventDefault();

	  props.onAddPlace({
	    name: placeName,
	    src: placeSrc
	  });
	}

	function handleChangeName(e){
		setPlaceName(e.target.value)
	}
	function handleChangeSrc(e){
		setPlaceSrc(e.target.value)
	}



	return(

      <PopupWithForm submitButtonName='Сохранить' onSubmit={handleSubmit}
      name='add-photo' title='Новое место' state = {props.isOpen} closePopup={props.onClose}>
          <input onChange={handleChangeName} value={placeName || ''}
          type="text" name="name" id="place-name-input"
          className="form__decription-input form__decription-input_type_photo-name"
          placeholder="Название" minLength={2} maxLength={30} required />
          <span className="form__input-error photo-name-input-error" />
          <input onChange={handleChangeSrc} value={placeSrc || ''}
          type="url" name="link" id="place-url-input"
          className="form__decription-input form__decription-input_type_photo-link"
          placeholder="Ссылка на картинку" required />
          <span className="form__input-error url-input-error" />
      </PopupWithForm>

		)

}