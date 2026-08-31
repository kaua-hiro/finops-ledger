import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import '../assets/styles/Configuracoes.css';

const PREFS = [
  { key: 'dueAlerts', title: 'Alertas de vencimento', desc: 'Avisar 3 dias antes de cada conta a pagar.', defaultOn: true },
  { key: 'monthlyReport', title: 'Relatório mensal automático', desc: 'Enviar o fechamento do mês por e-mail.', defaultOn: true },
  { key: 'budgetAlert', title: 'Alerta de orçamento estourado', desc: 'Notificar quando uma categoria passar do orçado.', defaultOn: false },
];

const Configuracoes = () => {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(PREFS.map(p => [p.key, p.defaultOn]))
  );

  const toggle = (key) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="config">
      <p className="page-subtitle">Dados da conta e preferências de notificação.</p>

      <div className="config__grid">
        <div className="panel config__card">
          <h3>Perfil</h3>
          <div className="config__field">
            <label>Nome</label>
            <input type="text" defaultValue={user?.name || ''} />
          </div>
          <div className="config__field">
            <label>Empresa</label>
            <input type="text" defaultValue={user?.company || ''} />
          </div>
          <div className="config__field">
            <label>E-mail financeiro</label>
            <input type="email" placeholder="financeiro@suaempresa.com" />
          </div>
          <button className="btn btn-primary">Salvar alterações</button>
        </div>

        <div className="panel config__card">
          <h3>Preferências</h3>
          {PREFS.map(p => (
            <div className="config__pref" key={p.key}>
              <div>
                <p className="config__pref-title">{p.title}</p>
                <p className="config__pref-desc">{p.desc}</p>
              </div>
              <button
                type="button"
                className={`config__toggle ${prefs[p.key] ? 'is-on' : ''}`}
                aria-pressed={prefs[p.key]}
                onClick={() => toggle(p.key)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
