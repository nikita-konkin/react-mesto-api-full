import React, { useContext } from 'react';
import Card from './Card.js';
// import {api} from '../utils/Api.js'
import {CurrentUserContext} from '../context/CurrentUserContext.js'

function Main(props) {

	const currentUser = useContext(CurrentUserContext);

    return (

	    <main className="content">
			<section className="profile">
				<div className="profile__avatar-container">
					<img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" />
					<div onClick={props.onEditAvatar} className="profile__avatar-edit-cover">
					<button  type="button" className="profile__avatar-edit" />
					</div>
				</div>
				<div className="profile__description-wrap">
				<div className="profile__description">
					<h1 className="profile__name" >{currentUser.name}</h1>
					<p className="profile__career">{currentUser.about}</p>
				</div>
				<button onClick={props.onEditProfile} type="button"
				className="profile__edit-button" />
				</div>
				<button onClick={props.onAddPlace} type="button"
				className="profile__add-button" />
			</section>
			<section className="elements" aria-label="article">
				{props.cardsArray.map(card => (<Card
					key={card._id}
					id={card._id}
					name={card.name}
					link={card.link}
					likes={card.likes}
					onCardClick={props.onCardClick}
					card = {card}
					setConfirmPopupState={props.setConfirmPopupState}
					onCardLike = {props.handleCardLike}
					onCardDelete = {props.handleCardDelete}
					getCardId={props.getCardId}/>)
					)}
			</section>
		</main>

    )
}

export default Main
