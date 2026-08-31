import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../assets/styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setIsSubmitting(true);
    setTimeout(() => {
      login(username);
      navigate('/');
    }, 500);
  };

  return (
    <div className="login">
      <div className="login__panel">
        <div className="login__seal" aria-hidden="true">
          <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" /><circle cx="30" cy="30" r="20" /><text x="30" y="39">$</text></svg>
        </div>
        <h1>Ledger</h1>
        <p className="login__tag">Gestão financeira, com registro de cada movimento.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuário</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="seu.usuario" required />

          <label htmlFor="password">Senha</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />

          <button type="submit" className="btn btn-primary login__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar no painel'}
          </button>
        </form>
        <p className="login__hint">Ambiente de demonstração — qualquer usuário e senha funcionam.</p>
      </div>
    </div>
  );
};

export default Login;
