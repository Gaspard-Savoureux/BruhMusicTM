import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import { serveur } from '../const';

import '../styles/menu.css';
import '../styles/login.css';

const ModalRegister = ({
  //
  isOpen,
  onRequestClose,
  setRegister,
  setLogin,
  switchMod,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function register() {
    const bodyContent = {
      password,
      email,
      username,
    };

    const res = await fetch(`${serveur}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setRegister(false); // Ferme la modal une fois enregistrer
      setLogin(true); // ouvrir la modal login une fois enregistrer
    } else {
      console.error(res.statusText);
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    register();
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangeUserCred(event) {
    setUsername(event.target.value);
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
          // le background me derangeais un peu, vous pouvez le remettre si vous le voulez vraiment
          /* background: "linear-gradient(120deg,#2980b9, #8e44ad)", */
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'static',
        },
      }}
    >
      <div className="center">
        <h1>S&apos;inscrire</h1>
        <form method="post" onSubmit={handleRegister}>
          <div className="txt_field">
            <input
              className="input-username"
              type="text"
              onChange={handleChangeEmail}
              required
            />
            <span></span>
            <label>Email</label>
          </div>

          <div className="txt_field">
            <input
              className="input-username"
              type="text"
              onChange={handleChangeUserCred}
              required
            />
            <span></span>
            <label>Nom d&apos;utilisateur</label>
          </div>
          <div className="txt_field">
            <input
              className="input-password"
              type="password"
              onChange={handleChangePassword}
              required
            />
            <span></span>
            <label>Mot de passe</label>
          </div>
          <input className="login-submit" type="submit" value="S'incrire" />
          <div className="signup_link">
            Déjà enregistrer?{' '}
            <a href="#" onClick={switchMod}>
              Connexion
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalRegister;
