<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import MenuLinkButton from './menu-link-button';
import MenuButton from './menu-button';
import { serveur } from '../const';
import '../styles/menu.css';
import '../styles/login.css';
=======
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
>>>>>>> refs/remotes/origin/master

const Menu = () => {
  const context = useContext(TokenContext);
  const [menuIsSlim, setMenuIsSlim] = useState(true);
  const [loginModal, setLogin] = useState(false);
  const [registerModal, setRegister] = useState(false);
  const [userCred, setUserCred] = useState('');
  const [password, setPassword] = useState('');

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
      password,
      email: userCred,
      username: userCred,
    };

    const res = await fetch(`${serveur}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setRegister(false); // Close Modal once registered
    } else {
      console.log('NOPE');
      console.error(res.statusText);
    }
  }

  async function login() {
    const bodyContent = {
      userCred,
      password,
    };

    const res = await fetch(`${serveur}/auth/create-token`, {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: { 'Content-Type': 'application/json' },
    });

<<<<<<< HEAD
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      navigate('profile'); // TODO navigation vers page profil
=======
    if (response.ok) {
      let data = await response.json();
      context.setToken(data.token);
      console.log(context.token);
      navigate("profile"); // TODO navigation vers page profil
>>>>>>> refs/remotes/origin/master
      setLogin(false);
    } else {
      console.log('NOPE');
      console.error(res.statusText);
    }
  }

  return (
    <div className="menu" style={{ width: menuIsSlim ? '50px' : '200px' }}>
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
<<<<<<< HEAD
              <i className="fas fa-chevron-right" />
            ) : (
              <i className="fas fa-chevron-left" />
=======
              <i className="fas fa-chevron-right"></i>
            ) : (
              <i className="fas fa-chevron-left"></i>
>>>>>>> refs/remotes/origin/master
            )}
          </div>
          {!menuIsSlim && <div className="menu-item-text">Collapse</div>}
        </div>
      </div>

      <ModalLogin
        isOpen={loginModal}
<<<<<<< HEAD
        onRequestClose={() => {
          setLogin(false);
        }}
        portalClassName="modal"
        style={{
          content: {
            background: 'linear-gradient(120deg,#2980b9, #8e44ad)',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
          },
        }}
      >
        <div className="center">
          <h1>Login</h1>
          <form method="post" onSubmit={handleLogin}>
            <div className="txt_field">
              <input
                className="input-username"
                type="text"
                onChange={handleChangeUserCred}
                required
              />
              <span></span>
              <label>Username</label>
            </div>
            <div className="txt_field">
              <input
                className="input-password"
                type="password"
                onChange={handleChangePassword}
                required
              />
              <span></span>
              <label>Password</label>
            </div>
            <div className="pass">Forgot Password?</div>
            <input type="submit" value="Login" />
            <div className="signup_link">
              Not a member?{' '}
              <a href="#" onClick={switchRegister}>
                Signup
              </a>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={registerModal}
        onRequestClose={() => {
          setRegister(false);
        }}
        portalClassName="modal"
        style={{
          content: {
            background: 'linear-gradient(120deg,#2980b9, #8e44ad)',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
          },
        }}
      >
        <div className="center">
          <h1>Register</h1>
          <form method="post" onSubmit={handleRegister}>
            <div className="txt_field">
              <input
                className="input-username"
                type="text"
                onChange={handleChangeUserCred}
                required
              />
              <span></span>
              <label>Username</label>
            </div>
            <div className="txt_field">
              <input
                className="input-password"
                type="password"
                onChange={handleChangePassword}
                required
              />
              <span></span>
              <label>Password</label>
            </div>
            <input type="submit" value="Register" />
            <div className="signup_link">
              Already a member?{' '}
              <a href="#" onClick={switchLogin}>
                Login
              </a>
            </div>
          </form>
        </div>
      </Modal>
=======
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
>>>>>>> refs/remotes/origin/master
    </div>
  );
};

export default Menu;
