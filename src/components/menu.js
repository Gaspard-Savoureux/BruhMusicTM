import React, { useState } from 'react';
import MenuLinkButton from './menu-link-button';
import MenuButton from './menu-button';
import ModalLogin from './modal-login';
import ModalRegister from './modal-register';
import useToken from '../hooks/useToken';
import '../styles/menu.css';
import '../styles/login.css';

function Menu() {
  const [menuIsSlim, setMenuIsSlim] = useState(true);
  const [loginModal, setLogin] = useState(false);
  const [registerModal, setRegister] = useState(false);

  const { changeToken, getToken } = useToken();
  const toggleMenuIsSlim = () => setMenuIsSlim(!menuIsSlim);

  // Test
  function switchLogin() {
    setRegister(false);
    setLogin(true);
  }

  function switchRegister() {
    setLogin(false);
    setRegister(true);
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
          text="Accueil"
          menuIsSlim={menuIsSlim}
        />
        <MenuLinkButton
          to="/search"
          icon="fas fa-search"
          text="Musique"
          menuIsSlim={menuIsSlim}
        />
        {getToken() && (
          <MenuLinkButton
            to="/playlists"
            icon="fas fa-music"
            text="Playlists"
            menuIsSlim={menuIsSlim}
          />
        )}
        <MenuLinkButton
          to="/album"
          icon="fas fa-users"
          text="Albums"
          menuIsSlim={menuIsSlim}
        />
        {getToken() && (
          <MenuLinkButton
            to="/favorite"
            icon="fas fa-heart"
            text="Favorites"
            menuIsSlim={menuIsSlim}
          />
        )}
        {getToken() && (
          <MenuLinkButton
            to="/owntracks"
            icon="fas fa-save"
            text="Your Tracks"
            menuIsSlim={menuIsSlim}
          />
        )}
        {getToken() && (
          <MenuLinkButton
            to="/create"
            icon="fas fa-plus"
            text="Cr????"
            menuIsSlim={menuIsSlim}
          />
        )}
      </div>
      <div className="menu-meme">
        {!menuIsSlim && (
          <img className="menu-meme-image" src="bunny.png" alt="meme" />
        )}
      </div>
      <div className="menu-footer">
        {getToken() ? (
          <MenuButton
            onClick={() => changeToken('')}
            icon="fas fa-sign-out-alt"
            text="D??connexion"
            menuIsSlim={menuIsSlim}
          />
        ) : (
          <MenuButton
            onClick={() => setLogin(true)}
            icon="fas fa-sign-in-alt"
            text="Connexion"
            menuIsSlim={menuIsSlim}
          />
        )}
        {getToken() ? (
          <MenuLinkButton
            to="/profile"
            params={{ id: getToken() }}
            icon="fas fa-user"
            text="Profile"
            menuIsSlim={menuIsSlim}
          />
        ) : (
          <MenuButton
            onClick={() => setRegister(true)}
            icon="fas fa-edit"
            text="S'enregistrer"
            menuIsSlim={menuIsSlim}
          />
        )}

        <MenuLinkButton
          to="/settings"
          icon="fas fa-cog"
          text="Param??tres"
          menuIsSlim={menuIsSlim}
        />
        <div
          role="button"
          className="menu-item collapse-menu-button"
          onClick={toggleMenuIsSlim}
          tabIndex={0}
        >
          <div className="menu-item-icon">
            {menuIsSlim ? (
              <i className="fas fa-chevron-right" />
            ) : (
              <i className="fas fa-chevron-left" />
            )}
          </div>
          {!menuIsSlim && <div className="menu-item-text">Collapse</div>}
        </div>
      </div>

      <ModalLogin
        isOpen={loginModal}
        onRequestClose={() => setLogin(false)}
        setLogin={setLogin}
        switchMod={() => switchRegister()}
      />

      <ModalRegister
        isOpen={registerModal}
        onRequestClose={() => setRegister(false)}
        setRegister={setRegister}
        setLogin={setLogin}
        switchMod={() => switchLogin()}
      />
    </div>
  );
}

export default Menu;
