import React from 'react';
import { formatBRL } from '../../data/financeData.js';

const StatCard = ({ label, value, delta, tone = 'neutral', icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        {icon && <span className={`stat-card__icon stat-card__icon--${tone}`}>{icon}</span>}
      </div>
      <div className="stat-card__value figures">{formatBRL(value)}</div>
      {delta != null && (
        <div className={`stat-card__delta ${delta >= 0 ? 'is-up' : 'is-down'}`}>
          {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}% vs mês anterior
        </div>
      )}
    </div>
  );
};

export default StatCard;
