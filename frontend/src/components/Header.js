import { useState, useEffect} from 'react';
import logo from '../images/logo.svg';
import hamburgerBtn from '../images/hamburger_btn.svg';
import { Link } from 'react-router-dom';



function Header(props) {

  const [menuState, setMenuState] = useState(false)
  const [windoWidth, setWindoWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => setWindoWidth(window.innerWidth));
  }, []);


  function outProfile(e){
    if(props.loggedIn){
        props.logOut(e)
    }
  }


  function hamburgerHandler(){

    function openMenu(){
      menuState ? setMenuState(false) : setMenuState(true)
    }

    if(windoWidth <= 520){
      return(
        <img src={hamburgerBtn} onClick={openMenu}
        className="header__hamburger-btn" alt="Логотип" />
        )
    } else {
      return(
        <>
        {props.loggedIn ? <h2 className="header__email">{props.headerID.email}</h2> : ''}
        <Link  onClick={outProfile}
        className="header__auth-status" to={props.link}>{props.headerID.status}</Link>
        </>
        )
    }
  }

  function returnMenu(){
    return(
      <div className='header__mobile-menu'>
      <h2 className="header__email">{props.headerID.email}</h2>
      <Link  onClick={outProfile}
      className="header__auth-status-menu"
      to={props.link}>{props.headerID.status}</Link>
      </div>
      )
  }
  

  return (
    <>
    {menuState ? returnMenu() : ''}
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип" />
      <div className="header__status-wrap">
      {hamburgerHandler()}      
      </div>
    </header>
    </>
  )
}

export default Header;