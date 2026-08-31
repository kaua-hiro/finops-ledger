import React from 'react';
import { FiPrinter } from 'react-icons/fi';
import { transactions, budgets, CATEGORIES, computeSummary, formatBRL } from '../data/financeData.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../assets/styles/Relatorios.css';

const Relatorios = () => {
  const { user } = useAuth();
  const { income, expense, balance } = computeSummary();

  return (
    <div className="relatorio">
      <div className="relatorio__controls no-print">
        <p className="page-subtitle">Resumo consolidado do período, pronto para impressão ou PDF.</p>
        <button className="btn btn-primary" onClick={() => window.print()}><FiPrinter /> Imprimir / Exportar PDF</button>
      </div>

      <div className="relatorio__sheet panel">
        <header className="relatorio__head">
          <h2>Relatório Financeiro — Ledger</h2>
          <p>Gerado por {user?.name || 'Convidado'} · {new Date().toLocaleDateString('pt-BR')}</p>
        </header>

        <section className="relatorio__section">
          <h3>Resumo do período</h3>
          <div className="relatorio__stats">
            <div><span>Receitas</span><strong className="figures">{formatBRL(income)}</strong></div>
            <div><span>Despesas</span><strong className="figures">{formatBRL(expense)}</strong></div>
            <div><span>Saldo consolidado</span><strong className="figures">{formatBRL(balance)}</strong></div>
          </div>
        </section>

        <section className="relatorio__section">
          <h3>Orçado x Realizado</h3>
          <table className="relatorio__table">
            <thead>
              <tr><th>Categoria</th><th>Orçado</th><th>Gasto</th><th>Diferença</th></tr>
            </thead>
            <tbody>
              {budgets.map(b => (
                <tr key={b.category}>
                  <td>{CATEGORIES[b.category].label}</td>
                  <td className="figures">{formatBRL(b.allocated)}</td>
                  <td className="figures">{formatBRL(b.spent)}</td>
                  <td className={`figures ${b.spent > b.allocated ? 'is-over' : ''}`}>{formatBRL(b.allocated - b.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="relatorio__section">
          <h3>Transações do período</h3>
          <table className="relatorio__table">
            <thead>
              <tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th></tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td className="figures">{t.date.split('-').reverse().join('/')}</td>
                  <td>{t.description}</td>
                  <td>{CATEGORIES[t.category].label}</td>
                  <td className={`figures ${t.type === 'credit' ? 'is-credit' : 'is-debit'}`}>
                    {t.type === 'credit' ? '+' : '−'} {formatBRL(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="relatorio__foot">
          <p>Ledger © {new Date().getFullYear()} — Relatório gerado automaticamente.</p>
        </footer>
      </div>
    </div>
  );
};

export default Relatorios;
