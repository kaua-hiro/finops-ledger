import React from 'react';
import { CATEGORIES, formatBRL } from '../../data/financeData.js';

const formatDate = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

const LedgerTable = ({ rows, compact = false }) => {
  return (
    <div className="ledger-table__wrap">
      <table className="ledger-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            {!compact && <th>Categoria</th>}
            <th className="ledger-table__amount-head">Valor</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => {
            const cat = CATEGORIES[t.category];
            return (
              <tr key={t.id}>
                <td className="figures ledger-table__date">{formatDate(t.date)}</td>
                <td>{t.description}</td>
                {!compact && (
                  <td>
                    <span className="ledger-table__tag" style={{ color: cat?.color }}>{cat?.label}</span>
                  </td>
                )}
                <td className={`figures ledger-table__amount ${t.type === 'credit' ? 'is-credit' : 'is-debit'}`}>
                  {t.type === 'credit' ? '+' : '−'} {formatBRL(t.amount)}
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={compact ? 3 : 4} className="ledger-table__empty">Nenhuma transação encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LedgerTable;
