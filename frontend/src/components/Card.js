import React, { useContext } from 'react';
import {CurrentUserContext} from '../context/CurrentUserContext.js'


export default function Card(props){

	const currentUser = useContext(CurrentUserContext);
	const isOwn = props.card.owner === currentUser._id;

	const isLiked = props.likes.some(i => i === currentUser._id);

	const cardDeleteButtonClassName = (
	  `element__trash-button ${isOwn ? 'element__trash-button_visible' : 'element__trash-button_invisible'}`
	);
	const cardLikeButtonClassName = (
	  `element__like ${isLiked ? 'element__like_liked' : ''}`
	);

	function handleClick() {
	  props.onCardClick(props.card);
	}

	function deleteCardhandle() {
		props.setConfirmPopupState(true)
		props.getCardId(props.id)
	}

	function handleLikeClick(){
		props.onCardLike(props.card)
	}


	return(
		<div id={props.id} className="element"  aria-label="article" >
		  <button onClick={deleteCardhandle} type="button"
		  className={`${cardDeleteButtonClassName}`}></button>
		  <img onClick={handleClick} name={props.name}
		  className="element__user-photo" src={props.link} alt={props.name}/>
		  <div className="element__user-photo-description">
		    <h2 className="element__user-photo-text">{props.name}</h2>
		    <div className="element__like-wrap">
		      <button onClick={handleLikeClick} type="button"
		      className={`${cardLikeButtonClassName}`}></button>
		      <span className="element__click">{props.likes.length}</span>
		    </div>
		  </div>
		</div>
	)

}
