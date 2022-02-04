import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/menu.css';
import '../styles/login.css';

const Menu = () => {
  const [menuIsSlim, setMenuIsSlim] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleMenuIsSlim = () => {
    setMenuIsSlim(!menuIsSlim);
  };

  return (
    <div className="menu" style={{ width: menuIsSlim ? '50px' : '200px' }}>
      <div className="menu-header">
        <img className="menu-logo" src="./bunny.png" alt="logo" />
      </div>
      <div className="menu-body">
        <Link className="menu-item" to="/">
          <div className="menu-item-icon">
            <i className="fas fa-home" />
          </div>
          {!menuIsSlim && <div className="menu-item-text">Home</div>}
        </Link>
        <Link className="menu-item" to="/search">
          <div className="menu-item-icon">
            <i className="fas fa-search" />
          </div>
          {!menuIsSlim && <div className="menu-item-text">Search</div>}
        </Link>
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-music"></i>
          </div>
          {!menuIsSlim && <div className="menu-item-text">Playlist</div>}
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-heart"></i>
          </div>
          {!menuIsSlim && <div className="menu-item-text">Favorites</div>}
        </div>
      </div>
      <div className="menu-meme">
        {!menuIsSlim && (
          <img className="menu-meme-image" src="bunny.png" alt="meme" />
        )}
      </div>
      <div className="menu-footer">
        <div className="menu-item"
             onClick={() => setModalIsOpen(true)}
        >
          <div className="menu-item-icon">
            <i className="fas fa-user"></i>
          </div>
          {!menuIsSlim && (
            <div
              className="menu-item-text"
            >
              Profile
            </div>
          )}
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-cog"></i>
          </div>
          {!menuIsSlim && <div className="menu-item-text">Settings</div>}
        </div>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
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
        <div class="center">
          <h1>Login</h1>
          <form method="post">
            <div class="txt_field">
              <input class="input-username" type="text" required />
              <span></span>
              <label>Username</label>
            </div>
            <div class="txt_field">
              <input class="input-password" type="password" required />
              <span></span>
              <label>Password</label>
            </div>
            <div class="pass">Forgot Password?</div>
            <input type="submit" value="Login" />
            <div class="signup_link">
              Not a member? <a href="#">Signup</a>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
