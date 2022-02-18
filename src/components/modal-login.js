import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/menu.css';
import '../styles/login.css';

import useToken from '../hooks/useToken';
import { serveur } from '../const';

const ModalLogin = ({ isOpen, onRequestClose, setLogin, switchMod }) => {
  const [userCred, setUserCred] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { changeToken } = useToken();

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

    if (res.ok) {
      const data = await res.json();
      await changeToken(data.token);
      navigate('favorite'); // TODO navigation vers page profil
      setLogin(false);
    } else {
      console.error(res.statusText);
    }
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
          background: 'unset !important',
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
            <a to="/" onClick={switchMod}>
              Signup
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalLogin;
