import React, { useState } from 'react';
import Modal from 'react-modal';

import '../styles/menu.css';
import '../styles/login.css';

import useToken from '../hooks/useToken';
import { serveur } from '../const';

const ModalLogin = ({
  //
  isOpen,
  onRequestClose,
  setLogin,
  switchMod,
}) => {
  const [userCred, setUserCred] = useState('');
  const [password, setPassword] = useState('');
  const { changeToken } = useToken();

  async function login() {
    const bodyContent = {
      userCred,
      password,
    };

    fetch(`${serveur}/auth/create-token`, {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        changeToken(data.token);
        return fetch(`${serveur}/user`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${data.token}` },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('id', data.id);
      });

    setLogin(false);
  }

  function handleLogin(e) {
    e.preventDefault();
    login();
  }
  function handleChangeUserCred(event) {
    setUserCred(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      portalClassName="modal"
      ariaHideApp={false}
      style={{
        content: {
          /* background: 'unset !important', */
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'static',
        },
      }}
    >
      <div className="center">
        <h1>Connexion</h1>
        <form method="post" onSubmit={handleLogin}>
          <div className="txt_field">
            <input
              className="input-username"
              type="text"
              onChange={handleChangeUserCred}
              required
            />
            <span />
            <label>Nom d&apos;utilisateur</label>
          </div>
          <div className="txt_field">
            <input
              className="input-password"
              type="password"
              onChange={handleChangePassword}
              required
            />
            <span />
            <label>Mot de passe</label>
          </div>
          <div className="pass">Mot de passe oublié?</div>
          <input className="login-submit" type="submit" value="Connexion" />
          <div className="signup_link">
            Pas encore un membre? &nbsp;
            <a to="/" onClick={switchMod}>
              Inscrivez-vous!
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalLogin;
