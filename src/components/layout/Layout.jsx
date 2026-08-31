import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const TITLES = {
  '/': 'Painel Financeiro',
  '/transacoes': 'Transações',
  '/orcamentos': 'Orçamentos',
  '/relatorios': 'Relatórios',
  '/configuracoes': 'Configurações',
};

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const title = TITLES[location.pathname] || 'Ledger';

  return (
    <div className="layout">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {isOpen && <div className="layout__overlay" onClick={() => setIsOpen(false)} />}
      <div className="layout__main">
        <Header onMenuClick={() => setIsOpen(true)} title={title} />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
