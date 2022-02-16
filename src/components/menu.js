import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLinkButton from "./menu-link-button";
import MenuButton from "./menu-button";
import ModalLogin from "./modal-login";
import ModalRegister from "./modal-register";
import { serveur } from "../const";
import { TokenContext } from "../TokenContext";
import "../styles/menu.css";
import "../styles/login.css";

const Menu = () => {
  const context = useContext(TokenContext);
  const [menuIsSlim, setMenuIsSlim] = useState(true);
  const [loginModal, setLogin] = useState(false);
  const [registerModal, setRegister] = useState(false);
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toggleMenuIsSlim = () => setMenuIsSlim(!menuIsSlim);

  function handleChangeUserCred(event) {
    setUserCred(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleRegister(e) {
    e.preventDefault();
    register();
  }

  function handleLogin(e) {
    e.preventDefault();
    login();
  }

  // Test
  function switchLogin() {
    setRegister(false);
    setLogin(true);
  }
  function switchRegister() {
    setLogin(false);
    setRegister(true);
  }

  async function register() {
    const bodyContent = {
      password: password,
      email: userCred,
      username: userCred,
    };

    let response = await fetch(`${serveur}/auth/register`, {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data);
      setRegister(false); // Close Modal once registered
    } else {
      console.log("NOPE");
      console.error(response.statusText);
    }
  }

  async function login() {
    const bodyContent = {
      userCred: userCred,
      password: password,
    };

    let response = await fetch(`${serveur}/auth/create-token`, {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      let data = await response.json();
      context.setToken(data.token);
      console.log(context.token);
      navigate("profile"); // TODO navigation vers page profil
      setLogin(false);
    } else {
      console.log("NOPE");
      console.error(response.statusText);
    }
  }

  return (
    <div className="menu" style={{ width: menuIsSlim ? "50px" : "200px" }}>
      <div className="menu-header">
        <img className="menu-logo" src="./bunny.png" alt="logo" />
      </div>
      <div className="menu-body">
        <MenuLinkButton
          to="/"
          icon="fas fa-home"
          text="Home"
          menuIsSlim={menuIsSlim}
        />
        <MenuLinkButton
          to="/search"
          icon="fas fa-search"
          text="Search"
          menuIsSlim={menuIsSlim}
        />
        <MenuLinkButton
          to="/"
          icon="fas fa-music"
          text="Playlists"
          menuIsSlim={menuIsSlim}
        />
        <MenuLinkButton
          to="/"
          icon="fas fa-heart"
          text="Favorites"
          menuIsSlim={menuIsSlim}
        />
      </div>
      <div className="menu-meme">
        {!menuIsSlim && (
          <img className="menu-meme-image" src="bunny.png" alt="meme" />
        )}
      </div>
      <div className="menu-footer">
        <MenuButton
          onClick={() => setLogin(true)}
          icon="fas fa-sign-in-alt"
          text="Login"
          menuIsSlim={menuIsSlim}
        />
        <MenuButton
          onClick={() => setRegister(true)}
          icon="fas fa-edit"
          text="Register"
          menuIsSlim={menuIsSlim}
        />
        <MenuLinkButton
          to="/"
          icon="fas fa-cog"
          text="Settings"
          menuIsSlim={menuIsSlim}
        />
        <div
          className="menu-item collapse-menu-button"
          onClick={toggleMenuIsSlim}
        >
          <div className="menu-item-icon">
            {menuIsSlim ? (
              <i className="fas fa-chevron-right"></i>
            ) : (
              <i className="fas fa-chevron-left"></i>
            )}
          </div>
          {!menuIsSlim && <div className="menu-item-text">Collapse</div>}
        </div>
      </div>

      <ModalLogin
        isOpen={loginModal}
        onRequestClose={() => setLogin(false)}
        onSubmit={handleLogin}
        userCred={handleChangeUserCred}
        password={handleChangePassword}
        switchMod={switchRegister}
      />

      <ModalRegister
        isOpen={registerModal}
        onRequestClose={() => setRegister(false)}
        onSubmit={handleRegister}
        userCred={handleChangeUserCred}
        password={handleChangePassword}
        switchMod={switchLogin}
      />
    </div>
  );
};

export default Menu;
