import React, {
  useState,
  useEffect
} from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import Main from './Main.js'
import Login from './Login.js'
import Register from './Register.js'
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import ImagePopup from './ImagePopup.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DelCardConfirmPopup from './DelCardConfirmPopup.js';
import {
  api
} from '../utils/Api.js'
import {
  auth
} from '../utils/auth.js'
import {
  CurrentUserContext
} from '../context/CurrentUserContext.js'
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
// import {
//   useCookies
// } from 'react-cookie';
// import Cookies from 'universal-cookie';
// import Cookies from "js-cookies";
// import jwt_decode from "jwt-decode";

function App() {

  const [openEditProfilePopup, setEditProfilePopupState] = useState(false);
  const [openEditAvatarPopup, setEditAvatarPopupState] = useState(false)
  const [openAddFotoPopup, setAddFotoPopupState] = useState(false)
  const [openConfirmPopup, setConfirmPopupState] = useState(false)
  const [openFotoPopup, setFotoState] = useState(false)
  const [openInfoTooltipPopup, setInfoTooltipState] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cardsArray, setCardsArray] = useState([])
  const [cardId, getCardId] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [headerProfileId, setHeaderProfileId] = useState({})
  const [link, setLink] = useState('')
  const [registrationStatus, setRegistrationStatus] = useState(false)
  const navigate = useNavigate();
  // const [cookies, setCookie] = useCookies(['jwt']);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {

      auth.handleTokenValidation(token).then(data => {
        handleLogin(data.data.email)
      }).catch(err => {
        console.log(err)
      })

    }

  }, []);

  useEffect(() => {

    refreshProfileData()

  }, []);

  useEffect(() => {

    api.getInitialCards().then(data => {
      setCardsArray(data.data)
    }).catch(err => {
      console.log(err)
    })

  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])


  function handleEditAvatarClick() {
    return setEditAvatarPopupState(true)
  }

  function handleEditProfileClick() {
    return setEditProfilePopupState(true)
  }

  function handleAddPlaceClick() {
    return setAddFotoPopupState(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setFotoState(true)
  }

  function closeAllPopups() {

    setEditProfilePopupState(false)
    setEditAvatarPopupState(false)
    setAddFotoPopupState(false)
    setConfirmPopupState(false)
    setFotoState(false)
    setSelectedCard({})

  }

  function closeInfoTooltipPopup() {
    setInfoTooltipState(false)
    setRegistrationStatus(true)
    return (registrationStatus ? navigate('sign-in') : '')
  }

  function handleUpdateUser(data) {
    api.patchUserInfo(data.name, data.about).then(data => {
      setCurrentUser(data.data)
      closeAllPopups()
    }).catch(err => {
      console.log(err)
    });
  }

  function refreshProfileData(){
    api.getProfileData().then(data => {
      setCurrentUser(data.data)
    }).catch(err => {
      console.log(err)
    });
  }

  function handleUpdateAvatar(data) {
    api.patchAvatar(data.avatar.value).then(data => {
      setCurrentUser(data.data)
      closeAllPopups()
    }).catch(err => {
      console.log(err)
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.putLike(card._id, !isLiked).then((newCard) => {
      setCardsArray((state) => state.map((c) => c._id === card._id ? newCard.data : c));
    }).catch(err => {
      console.log(err)
    });
  }

  function onUpdateCards(data) {
    api.postCard(data.name, data.src).then(data => {
      setCardsArray([data.data, ...cardsArray])
      closeAllPopups()
    }).catch(err => {
      console.log(err)
    });
  }

  function onDelCard(cardId) {
    api.deleteCard(cardId.id).then(data => {
      setCardsArray(cardsArray.filter(card => !(card._id === cardId.id)))
      closeAllPopups()
    }).catch(err => {
      console.log(err)
    });

  }

  function setRegisterHeaderIdState() {
    setHeaderProfileId({
      status: 'Войти'
    })
    setLink('sign-in')
  }

  function setLoginHeaderIdState() {
    setHeaderProfileId({
      status: 'Регистрация'
    })
    setLink('sign-up')
  }

  function handleLogin(mail) {

    setLoggedIn(true)
    setHeaderProfileId({
      status: 'Выйти',
      email: mail
    })
    navigate('/')
    setLink('')

    refreshProfileData()
  }

  function handleAuthorization(data) {
    // e.preventDefault()
    auth.handleAuthorization(data.mail, data.password)
      .then(auth => {
        localStorage.setItem('token', auth.token);
        handleLogin(data.mail)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleRegistration(data) {
    // e.preventDefault()

    auth.handleRegistration(data.password, data.mail)
      .then(data => {
        setRegistrationStatus(true)
      }).catch(err => {
        console.log(err)
      })
      .finally(() => {
        setInfoTooltipState(true)
      })
  }

  function logOut(e) {
    e.preventDefault()
    e.stopPropagation()
    if (loggedIn) {
      localStorage.removeItem('token')
      setLoggedIn(false);
    }
  }

  function refresh (isReload){
    if (isReload) {
      window.location.reload(false)
    }
    // setReload(false)
  }

  return (

      <
      div className = "App" >
      <
      div className = "root" >
      <
      CurrentUserContext.Provider value = {
        currentUser
      } >

      <
      Header headerID = {
        headerProfileId
      }
      link = {
        link
      }
      logOut = {
        logOut
      }
      loggedIn = {
        loggedIn
      }
      />

      <
      Routes >

      <
      Route path = "/"
      element = {
        <
        ProtectedRoute loggedIn = {
          loggedIn
        }
        component = {
          Main
        }
        onEditAvatar = {
          handleEditAvatarClick
        }
        closePopup = {
          closeAllPopups
        }
        onAddPlace = {
          handleAddPlaceClick
        }
        onEditProfile = {
          handleEditProfileClick
        }
        onCardClick = {
          handleCardClick
        }
        setConfirmPopupState = {
          setConfirmPopupState
        }
        cardsArray = {
          cardsArray
        }
        handleCardLike = {
          handleCardLike
        }
        getCardId = {
          getCardId
        }
        />
      }
      />

      <
      Route path = "/sign-in"
      element = {
        !loggedIn ? < Login
        loggedIn = {
          loggedIn
        }
        setHeaderIdState = {
          setLoginHeaderIdState
        }
        auth = {
          handleAuthorization
        }
        /> : '' } / >
        <
        Route path = "/sign-up"
        element = {
          !loggedIn ? < Register
          setHeaderIdState = {
            setRegisterHeaderIdState
          }
          auth = {
            handleRegistration
          }
          /> : ''} / >

          <
          /Routes>

          <
          Footer / >

          <
          EditProfilePopup onUpdateUser = {
            handleUpdateUser
          }
          isOpen = {
            openEditProfilePopup
          }
          onClose = {
            closeAllPopups
          }
          /> <
          EditAvatarPopup onUpdateAvatar = {
            handleUpdateAvatar
          }
          isOpen = {
            openEditAvatarPopup
          }
          onClose = {
            closeAllPopups
          }
          /> <
          AddPlacePopup onAddPlace = {
            onUpdateCards
          }
          isOpen = {
            openAddFotoPopup
          }
          onClose = {
            closeAllPopups
          }
          /> <
          DelCardConfirmPopup cardId = {
            cardId
          }
          onDelPlace = {
            onDelCard
          }
          isOpen = {
            openConfirmPopup
          }
          onClose = {
            closeAllPopups
          }
          /> <
          InfoTooltip regStatus = {
            registrationStatus
          }
          isOpen = {
            openInfoTooltipPopup
          }
          onClose = {
            closeInfoTooltipPopup
          }
          />

          <
          /CurrentUserContext.Provider>

          <
          ImagePopup card = {
            selectedCard
          }
          state = {
            openFotoPopup
          }
          closePopup = {
            closeAllPopups
          }
          />

          <
          /div> < /
          div >

        );
      }

      export default App;
