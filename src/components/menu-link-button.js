import React from 'react';
import { Link } from 'react-router-dom';

const MenuLinkButton = ({ to, icon, text, menuIsSlim }) => {
  return (
    <Link className="menu-item" to={to}>
      <div className="menu-item-icon">
        <i className={icon} />
      </div>
      {!menuIsSlim && <div className="menu-item-text">{text}</div>}
    </Link>
  );
};

export default MenuLinkButton;
