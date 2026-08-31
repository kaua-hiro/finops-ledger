import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiTrendingDown, FiPieChart, FiClock } from 'react-icons/fi';
import { transactions, cashFlow, upcomingBills, computeSummary, formatBRL } from '../data/financeData.js';
import StatCard from '../components/dashboard/StatCard.jsx';
import CashFlowChart from '../components/dashboard/CashFlowChart.jsx';
import LedgerTable from '../components/dashboard/LedgerTable.jsx';
import '../assets/styles/Dashboard.css';

const formatDueDate = (iso) => {
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
};

const Dashboard = () => {
  const { income, expense, balance } = computeSummary();
  const recent = transactions.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="balance-seal panel">
        <div className="balance-seal__ring" aria-hidden="true">
          <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" /><circle cx="60" cy="60" r="44" /></svg>
        </div>
        <div className="balance-seal__body">
          <span className="balance-seal__label">Saldo consolidado</span>
          <span className="balance-seal__value figures">{formatBRL(balance)}</span>
          <span className="balance-seal__note">Atualizado agora · todas as contas</span>
        </div>
      </div>

      <div className="stats-row">
        <StatCard label="Receitas do mês" value={income} delta={12} tone="up" icon={<FiTrendingUp />} />
        <StatCard label="Despesas do mês" value={expense} delta={-4} tone="down" icon={<FiTrendingDown />} />
        <StatCard label="Resultado líquido" value={income - expense} delta={9} tone="up" icon={<FiPieChart />} />
      </div>

      <div className="dashboard__grid">
        <div className="panel chart-panel">
          <div className="panel__head">
            <h3>Fluxo de caixa</h3>
            <p>Entradas e saídas nos últimos 6 meses (R$ mil)</p>
          </div>
          <CashFlowChart data={cashFlow} />
          <div className="chart-legend">
            <span><i className="dot dot--income" /> Entradas</span>
            <span><i className="dot dot--expense" /> Saídas</span>
          </div>
        </div>

        <div className="panel bills-panel">
          <div className="panel__head">
            <h3><FiClock /> Próximos vencimentos</h3>
          </div>
          <ul className="bills-list">
            {upcomingBills.map(bill => (
              <li key={bill.id}>
                <div>
                  <p className="bills-list__name">{bill.name}</p>
                  <p className="bills-list__due">Vence em {formatDueDate(bill.dueDate)}</p>
                </div>
                <span className="figures bills-list__amount">{formatBRL(bill.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head panel__head--row">
          <h3>Movimentações recentes</h3>
          <Link to="/transacoes" className="panel__link">Ver todas</Link>
        </div>
        <LedgerTable rows={recent} />
      </div>
    </div>
  );
};

export default Dashboard;
