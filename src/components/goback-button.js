import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoBack({ escape }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(escape);
  };
  return (
    <div className="menu-item" onClick={() => goBack()}>
      <div className="menu-item-icon">
        <i className="fas fa-angle-double-left" />
      </div>
    </div>
  );
}
