import React from 'react'
import PopupWithForm from './PopupWithForm.js';


export default function EditAvatarPopup(props) {

  const avatarSrc = React.useRef('');

  function handleSubmit(e) {

      e.preventDefault();

      props.onUpdateAvatar({
          avatar: avatarSrc.current,
      });
  }

  return (
      <PopupWithForm submitButtonName='Сохранить' onSubmit={handleSubmit}
      name='avatar-edit' title='Обновить аватар' state = {props.isOpen}
      closePopup={props.onClose}>
				<input  ref={avatarSrc} type="url" name="link" id="urls-input"
        className="form__decription-input form__decription-input_type_avatar-edit"
        placeholder="Ссылка на аватар" required />
				<span className="form__input-error url-input-error url-input-error_type_avatar" />
			</PopupWithForm>
  )
}