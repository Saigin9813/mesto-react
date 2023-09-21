import React from "react";
import apiFetch from "../utils/api";
import Card from "./Card";

function Main (props){
  const [userName,setUserName] = React.useState('');
  const [userDescription,setUserDescription] = React.useState('');
  const [userAvatar,setUserAvatar] = React.useState('');
  const [cards,setCards] = React.useState([]);

  React.useEffect(()=>{
    Promise.all([apiFetch.getUserInfo(),apiFetch.getInitialCard()])
    .then(([userData,initialCards])=>{
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar)
      setCards(initialCards);
})
.catch((err) =>{
  console.log(err)
});
  })

  return(
  <>
    <section className="profile">
      <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
      <button
        type="button"
        className="profile__avatar-edit"
        aria-label="Редактировать аватар"
        onClick={props.onEditAvatar}></button>
      <div className="profile__info">
        <h1 className="profile__name">{userName}</h1>
        <button
          type="button"
          className="profile__editor"
          aria-label="Редактировать профиль"
          onClick={props.onEditProfile}></button>
        <p className="profile__proffesion">{userDescription}</p>
      </div>
      <button
        className="profile__add"
        type="button"
        aria-label="Добавить место"
        onClick={props.onAddPlace}></button>
    </section>
    <section className="element">
      {cards.map((card)=>{
        return(
          <Card
          key={card._id}
          link={card.link}
          name = {card.name}
          likes = {card.likes.length}
          onCardClick = {props.onCardClick}
          card = {card}
          />
        )
      })}
    </section>
  </>
  )
}
export default Main;