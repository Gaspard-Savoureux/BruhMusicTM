import React from 'react';

import '../styles/settings.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-label">Theme</div>
      <select>
        <option>default</option>
      </select>
    </div>
  );
};

export default Settings;
