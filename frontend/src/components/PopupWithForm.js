import React from 'react';

function PopupWithForm(props) {

    
  return (
 
    <div className = {`popup popup_type_${props.name} ${props.state ? 'popup_opened' : '' }`}>
    
      <div className="popup__container">
        <button onClick={props.closePopup} type="button"
        className={`popup__close-button popup__close-button_type_${props.name}`} />
        <form onSubmit={props.onSubmit} name={props.name}
        className={`form form_type_${props.name}`}>
          <fieldset className="form__set">
            <h2 className="form__header">{props.title}</h2>
            {props.children}
            <button type="submit" className="form__submit">{props.submitButtonName}</button>
          </fieldset>
        </form>
      </div>
    </div>

  )

}

export default PopupWithForm;