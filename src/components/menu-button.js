import React from 'react';

const MenuButton = ({ icon, text, menuIsSlim, onClick }) => {
  return (
    <div className="menu-item" onClick={onClick}>
      <div className="menu-item-icon">
        <i className={icon} />
      </div>
      {!menuIsSlim && <div className="menu-item-text">{text}</div>}
    </div>
  );
};

export default MenuButton;
