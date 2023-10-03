import { useState, useEffect } from "react";
import currentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import apiFetch from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isOpenImagePopup, setIsOpenImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([apiFetch.getUserInfo(), apiFetch.getInitialCard()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    apiFetch
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((cardItem) => (cardItem._id === card._id ? newCard : cardItem))
        );
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }
  function handleUpdateUser(userItem) {
    apiFetch
      .editProfile(userItem.name, userItem.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }

  function handleUpdateAvatar(userItem) {
    apiFetch
      .editAvatar(userItem.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }
  function handleAddPlaceSubmit(cardItem) {
    apiFetch
      .addCard(cardItem.name, cardItem.link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }

  function handleDeleteCard(card) {
    apiFetch.deleteCard(card._id).then(() => {
      setCards((cardArray) =>
        cardArray.filter((cardItem) => cardItem._id !== card._id)
      );
    });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenImagePopup(false);
  }

  function handleCardClick(card) {
    setIsOpenImagePopup(true);
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link,
    });
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddMesto={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={isOpenImagePopup}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
