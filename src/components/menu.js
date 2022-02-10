import React, { useState } from 'react';
import Modal from 'react-modal';
import MenuLinkButton from './menu-link-button';
import MenuButton from './menu-button';
import '../styles/menu.css';
import '../styles/login.css';

const Menu = () => {
  const [menuIsSlim, setMenuIsSlim] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleMenuIsSlim = () => setMenuIsSlim(!menuIsSlim);
  const openModal = () => setModalIsOpen(true);

  return (
    <div className="menu" style={{ width: menuIsSlim ? '50px' : '200px' }}>
      <div className="menu-header">
        <img className="menu-logo" src="./bunny.png" alt="logo" />
      </div>
      <div className="menu-body">
        <MenuLinkButton to="/" icon="fas fa-home" text="Home" menuIsSlim={menuIsSlim} />
        <MenuLinkButton to="/search" icon="fas fa-search" text="Search" menuIsSlim={menuIsSlim} />
        <MenuLinkButton to="/" icon="fas fa-music" text="Playlists" menuIsSlim={menuIsSlim} />
        <MenuLinkButton to="/" icon="fas fa-heart" text="Favorites" menuIsSlim={menuIsSlim} />
      </div>
      <div className="menu-meme">
        {!menuIsSlim && (
          <img className="menu-meme-image" src="bunny.png" alt="meme" />
        )}
      </div>
      <div className="menu-footer">
        {/* TODO fix onclick for modal on next line */}
        <MenuButton onClick={() => setModalIsOpen(true)} icon="fas fa-sign-in-alt" text="Login" menuIsSlim={menuIsSlim} />
        <MenuButton onClick={() => setModalIsOpen(true)} icon="fas fa-edit" text="Register" menuIsSlim={menuIsSlim} />
        <MenuLinkButton to="/" icon="fas fa-cog" text="Settings" menuIsSlim={menuIsSlim} />
        <div className="menu-item collapse-menu-button" onClick={toggleMenuIsSlim}>
          <div className="menu-item-icon">
            { menuIsSlim
             ? <i className="fas fa-chevron-right"></i>
             : <i className="fas fa-chevron-left"></i>
            }
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
