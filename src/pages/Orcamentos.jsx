import React from 'react';
import { budgets, CATEGORIES, formatBRL } from '../data/financeData.js';
import '../assets/styles/Orcamentos.css';

const Orcamentos = () => {
  return (
    <div className="orcamentos">
      <p className="page-subtitle">Quanto foi orçado e quanto já foi gasto, categoria por categoria.</p>

      <div className="budget-grid">
        {budgets.map(b => {
          const cat = CATEGORIES[b.category];
          const pct = Math.min(100, Math.round((b.spent / b.allocated) * 100));
          const isOver = b.spent > b.allocated;
          return (
            <div key={b.category} className="budget-card panel">
              <div className="budget-card__head">
                <span className="budget-card__dot" style={{ background: cat.color }} />
                <h3>{cat.label}</h3>
              </div>
              <div className="budget-card__figures figures">
                <span>{formatBRL(b.spent)}</span>
                <span className="budget-card__of">de {formatBRL(b.allocated)}</span>
              </div>
              <div className="budget-card__bar">
                <div
                  className={`budget-card__fill ${isOver ? 'is-over' : ''}`}
                  style={{ width: `${pct}%`, background: isOver ? undefined : cat.color }}
                />
              </div>
              <span className={`budget-card__pct ${isOver ? 'is-over' : ''}`}>{pct}% utilizado{isOver ? ' — acima do orçado' : ''}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orcamentos;
