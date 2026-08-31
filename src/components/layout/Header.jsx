import React from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import './Header.css';

const Header = ({ onMenuClick, title }) => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu" onClick={onMenuClick} aria-label="Abrir menu">
          <FiMenu size={20} />
        </button>
        <h1 className="header__title">{title}</h1>
      </div>
      <div className="header__right">
        <button className="header__icon" title="Notificações">
          <FiBell size={18} />
          <span className="header__dot" />
        </button>
        <div className="header__user">
          <span className="header__avatar"><FiUser size={16} /></span>
          <span className="header__name">{user?.name || 'Convidado'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
