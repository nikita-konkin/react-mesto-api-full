import React from 'react';

export default function ImagePopup(props){

  return(
    <div className={`popup popup-photo ${props.state ? 'popup_opened':''}`}>
      <div className="popup-photo__container">
        <img className="popup-photo__img" src={props.card.link} alt={props.card.name} />
        <h2 className="popup-photo__photo-descriprion">{props.card.name}</h2>
        <button onClick={props.closePopup} className="popup-photo__close-button" />
      </div>
    </div>
  )

}
