import React, { useMemo, useState } from 'react';
import { FiSearch, FiDownload } from 'react-icons/fi';
import { transactions, CATEGORIES, formatBRL } from '../data/financeData.js';
import LedgerTable from '../components/dashboard/LedgerTable.jsx';
import '../assets/styles/Transacoes.css';

const Transacoes = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return transactions.filter(t => {
      const matchesTerm = !term || t.description.toLowerCase().includes(term);
      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
      return matchesTerm && matchesType && matchesCategory;
    });
  }, [search, typeFilter, categoryFilter]);

  const totals = useMemo(() => {
    const credit = filtered.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
    const debit = filtered.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
    return { credit, debit, net: credit - debit };
  }, [filtered]);

  const handleExport = () => {
    const header = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor'];
    const rows = filtered.map(t => [t.date, t.description, CATEGORIES[t.category]?.label, t.type === 'credit' ? 'Crédito' : 'Débito', t.amount]);
    const csv = [header, ...rows]
      .map(row => row.map(f => `"${String(f ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ledger-transacoes-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="transacoes">
      <p className="page-subtitle">Todas as movimentações da conta, com busca, filtro e exportação.</p>

      <div className="transacoes__summary">
        <div><span>Créditos</span><strong className="figures is-credit">{formatBRL(totals.credit)}</strong></div>
        <div><span>Débitos</span><strong className="figures is-debit">{formatBRL(totals.debit)}</strong></div>
        <div><span>Resultado</span><strong className="figures">{formatBRL(totals.net)}</strong></div>
      </div>

      <div className="transacoes__toolbar">
        <div className="transacoes__search">
          <FiSearch />
          <input type="text" placeholder="Buscar por descrição..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">Todos os tipos</option>
          <option value="credit">Créditos</option>
          <option value="debit">Débitos</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">Todas as categorias</option>
          {Object.entries(CATEGORIES).map(([key, c]) => (
            <option key={key} value={key}>{c.label}</option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={handleExport}><FiDownload /> Exportar CSV</button>
      </div>

      <div className="panel">
        <LedgerTable rows={filtered} />
      </div>
    </div>
  );
};

export default Transacoes;
