import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <form
          name={props.form}
          className={`popup__form popup__form_type_${props.name}`}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
