import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'

function App() {
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = React.useState(false);
  const [isOpenImagePopup,setIsOpenImagePopup] = React.useState(false); 
  const [selectedCard,setSelectedCard] = React.useState({})

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups(){
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsOpenImagePopup(false)
    }

    function handleCardClick (card) {
      setIsOpenImagePopup(true);
      setSelectedCard({
        ...selectedCard,
        name: card.name,
        link: card.link
      })
    }
  return (
    <div className="page">
      <Header />
      <Main
      onEditProfile ={handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar= {handleEditAvatarClick}
      onCardClick = {handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        name={'edit-profile'}
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        form = {'profile-edit'}
        buttonText={'Сохранить'}
        children = {(
          <>
            <input
            type="text"
            name="name"
            className="popup__input popup__input_type-name"
            placeholder="Имя"
            required=""
            autoComplete="off"
            minLength={2}
            maxLength={40}
          />
          <span id="username-error" className="popup__error" />
          <input
            type="text"
            name="about"
            className="popup__input popup__input_type-proffession"
            placeholder="О себе"
            required=""
            autoComplete="off"
            minLength={2}
            maxLength={200}
          />
          <span id="proffesion-error" className="popup__error" />
          </>
        )}
      />
          
      <PopupWithForm
        name={'add-mesto'}
        title={'Новое место'}
        isOpen={isAddPlacePopupOpen}
        form = {'mesto-add'}
        onClose={closeAllPopups}
        buttonText={'Сохранить'}
        children = {(
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
          />
          <span id="title-error" className="popup__error" />
          <input
            type="url"
            name="link"
            className="popup__input popup__input_type_image-mesto"
            placeholder="Ссылка на картинку"
            required=""
            autoComplete="off"
          />
          <span id="link-image-error" className="popup__error" />
          </>
        )}
      />
      <PopupWithForm 
      name={'delete-image'}
      title={'Вы уверены?'}
      isOpen={isAddPlacePopupOpen}
      form = {'delete-image'}
      onClose={closeAllPopups}
      buttonText ={'Да'}
      />
    <PopupWithForm
      name={'edit-avatar'}
      title={'Обновить аватар'}
      isOpen={isEditAvatarPopupOpen}
      form = {'avatar-edit'}
      onClose={closeAllPopups}
      buttonText={'Сохранить'}
      children ={(
        <>
          <input
            type="url"
            name="avatar"
            className="popup__input popup__input_type_avatar"
            placeholder="Ссылка на аватар профиля"
            required=""
            autoComplete="off"
          />
          <span id="avatar-error" className="popup__error" />
        </>
      )}
      />
      <ImagePopup
      isOpen ={isOpenImagePopup}
      card = {selectedCard}
      onClose = {closeAllPopups}
      />
    </div>
  );
}

export default App;
