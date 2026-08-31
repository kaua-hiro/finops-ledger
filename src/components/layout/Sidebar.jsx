import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiRepeat, FiPieChart, FiFileText, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <span className="sidebar__seal" aria-hidden="true">
          <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" /><text x="20" y="26">$</text></svg>
        </span>
        <span>Ledger</span>
        <button className="sidebar__close" onClick={onClose} aria-label="Fechar menu"><FiX /></button>
      </div>

      <nav className="sidebar__nav">
        <span className="sidebar__label">Visão Geral</span>
        <NavLink to="/" end className="sidebar__item" onClick={onClose}><FiGrid /> Painel</NavLink>
        <NavLink to="/transacoes" className="sidebar__item" onClick={onClose}><FiRepeat /> Transações</NavLink>
        <NavLink to="/orcamentos" className="sidebar__item" onClick={onClose}><FiPieChart /> Orçamentos</NavLink>
        <NavLink to="/relatorios" className="sidebar__item" onClick={onClose}><FiFileText /> Relatórios</NavLink>

        <span className="sidebar__label">Conta</span>
        <NavLink to="/configuracoes" className="sidebar__item" onClick={onClose}><FiSettings /> Configurações</NavLink>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__company">{user?.company || 'Sua Empresa'}</div>
        <button className="sidebar__logout" onClick={logout}><FiLogOut /> Sair</button>
      </div>
    </aside>
  );
};

export default Sidebar;
