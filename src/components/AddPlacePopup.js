import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){
  const [nameMesto,setNameMesto] = useState('');
  const [urlMesto,setUrlMesto] = useState('');

  
  function handleNameMesto(e) {
    setNameMesto(e.target.value);
  }

  function handleUrlMesto(e) {
    setUrlMesto(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onAddMesto({
      name:nameMesto,
      link: urlMesto 
    });
    setNameMesto('');
    setUrlMesto('')
  }

  return(
    <PopupWithForm
    name={"add-mesto"}
    title={"Новое место"}
    isOpen={props.isOpen}
    form={"mesto-add"}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    children={
      <>
        <input
          type="text"
          name="name"
          className="popup__input popup__input_type_name-mesto "
          placeholder="Название"
          required=""
          autoComplete="off"
          minLength={2}
          maxLength={30}
          value={nameMesto}
          onChange={handleNameMesto}
        />
        <span id="title-error" className="popup__error" />
        <input
          type="url"
          name="link"
          className="popup__input popup__input_type_image-mesto"
          placeholder="Ссылка на картинку"
          required=""
          autoComplete="off"
          value={urlMesto}
          onChange={handleUrlMesto}
        />
        <span id="link-image-error" className="popup__error" />
      </>
    }
  />
  )
}

export default AddPlacePopup