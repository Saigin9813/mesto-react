import React from "react";

function Card (props){

  function handleClick(){
    props.onCardClick(props.card)
  }

  return(
    <article className="elements__card" key={props.id}>
      <button type="button" className="cards__delete" aria-label="Удалить"></button>
        <img src={props.link} alt={props.name} className="elements__image" onClick={handleClick}/>
          <div className="elements__description">
            <h2 className="elements__title">{props.name}</h2>
            <div className="elements__like-area">
            <button type="button" className="elements__like"></button>
            <p className="elements__like-counter">{props.likes}</p>
        </div>
      </div>
    </article>
  )
}
export default Card;