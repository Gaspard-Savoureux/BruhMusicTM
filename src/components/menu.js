import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { serveur } from "../const";
import "../styles/menu.css";
import "../styles/login.css";

const Menu = () => {
  const [menuIsSlim, setMenuIsSlim] = useState(true);
  const [loginModal, setLogin] = useState(false);
  const [registerModal, setRegister] = useState(false);
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");

  const toggleMenuIsSlim = () => {
    setMenuIsSlim(!menuIsSlim);
  };

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
      console.log(data);
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
        <div className="menu-item" onClick={() => setLogin(true)}>
          <div className="menu-item-icon">
            <i className="fas fa-user"></i>
          </div>
          {!menuIsSlim && <div className="menu-item-text">Profile</div>}
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
        isOpen={loginModal}
        onRequestClose={() => {
          setLogin(false);
        }}
        portalClassName="modal"
        style={{
          content: {
            background: "linear-gradient(120deg,#2980b9, #8e44ad)",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        <div class="center">
          <h1>Login</h1>
          <form method="post" onSubmit={handleLogin}>
            <div class="txt_field">
              <input
                class="input-username"
                type="text"
                onChange={handleChangeUserCred}
                required
              />
              <span></span>
              <label>Username</label>
            </div>
            <div class="txt_field">
              <input
                class="input-password"
                type="password"
                onChange={handleChangePassword}
                required
              />
              <span></span>
              <label>Password</label>
            </div>
            <div class="pass">Forgot Password?</div>
            <input type="submit" value="Login" />
            <div class="signup_link">
              Not a member?{" "}
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
            background: "linear-gradient(120deg,#2980b9, #8e44ad)",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        <div class="center">
          <h1>Register</h1>
          <form method="post" onSubmit={handleRegister}>
            <div class="txt_field">
              <input
                class="input-username"
                type="text"
                onChange={handleChangeUserCred}
                required
              />
              <span></span>
              <label>Username</label>
            </div>
            <div class="txt_field">
              <input
                class="input-password"
                type="password"
                onChange={handleChangePassword}
                required
              />
              <span></span>
              <label>Password</label>
            </div>
            <input type="submit" value="Register" />
            <div class="signup_link">
              Already a member?{" "}
              <a href="#" onClick={switchLogin}>
                Login
              </a>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
