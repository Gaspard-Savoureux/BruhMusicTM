import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/menu.css";
import "../styles/login.css";

const ModalRegister = ({
  isOpen,
  onRequestClose,
  onSubmit,
  userCred,
  password,
  switchMod,
}) => {
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
        <h1>Register</h1>
        <form method="post" onSubmit={onSubmit}>
          <div className="txt_field">
            <input
              className="input-username"
              type="text"
              onChange={userCred}
              required
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              className="input-password"
              type="password"
              onChange={password}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <input className="login-submit" type="submit" value="Register" />
          <div className="signup_link">
            Already a member?{" "}
            <a href="#" onClick={switchMod}>
              Login
            </a>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalRegister;
