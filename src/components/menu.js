import React, { useState } from 'react';
import '../styles/menu.css';

const Menu = () => {
  const [menuIsSlim, setMenuIsSlim] = useState(true);

  const toggleMenuIsSlim = () => {
    setMenuIsSlim(!menuIsSlim);
  };

  return (
    <div className="menu" style={{ width: menuIsSlim ? '50px' : '200px' }}>
      <div className="menu-header">
        <img className="menu-logo" src="./bunny.png" alt="logo" />
      </div>
      <div className="menu-body">
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-home"></i>
          </div>
          { !menuIsSlim &&
            <div className="menu-item-text">Home</div>
          }
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-search"></i>
          </div>
          { !menuIsSlim &&
            <div className="menu-item-text">Search</div>
          }
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-music"></i>
          </div>
          { !menuIsSlim &&
            <div className="menu-item-text">Playlist</div>
          }
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-heart"></i>
          </div>
          { !menuIsSlim &&
            <div className="menu-item-text">Favorites</div>
          }
        </div>
      </div>
      <div className="menu-meme">
        { !menuIsSlim &&
          <img className="menu-meme-image" src="bunny.png" alt="meme" />
        }
      </div>
      <div className="menu-footer">
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-user"></i>
          </div>
          { !menuIsSlim &&
            <div className="menu-item-text">Profile</div>
          }
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <i className="fas fa-cog"></i>
          </div>
          { !menuIsSlim &&
            <div className="menu-item-text">Settings</div>
          }
        </div>
        <div className="menu-item collapse-menu-button" onClick={toggleMenuIsSlim}>
          <div className="menu-item-icon">
            { menuIsSlim
              ? <i className="fas fa-chevron-right"></i>
              : <i className="fas fa-chevron-left"></i>
            }
          </div>
          { !menuIsSlim &&
            <div className="menu-item-text">Collapse</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Menu;
