# Ledger

Painel de gestão financeira profissional: fluxo de caixa, transações, orçamentos por categoria e relatórios prontos para exportação.

**Demo:** https://finops-ledger.vercel.app/ (login: qualquer usuário e senha)

## Identidade visual

O ponto de partida foi o vocabulário visual do próprio dinheiro impresso: linhas de guilhoché, selos circulares gravados e algarismos tabulares — não mais um dashboard azul genérico. O cartão de saldo na tela inicial é a peça de assinatura: um selo dourado sobre um fundo verde-tinta com textura de guilhoché, reaproveitado no ícone do app e na tela de login.

- **Tipografia:** Spectral (display, serifada) + Public Sans (corpo) + Roboto Mono (todos os valores monetários, sempre tabulares)
- **Paleta:** tinta (`#16241C`), verde-nota (`#1F6E43`), dourado (`#B9974A`), papel (`#F7F5EC`)
- **Relatórios:** tela dedicada com folha de estilo de impressão própria (`@media print`), pronta para virar PDF

## Stack

React + Vite (sem TypeScript), roteamento com `react-router-dom`, CSS próprio por página (sem framework de utilitários). Dados mockados no cliente — sem backend.

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  components/layout/    # Sidebar, Header, Layout
  components/dashboard/ # StatCard, LedgerTable, CashFlowChart
  components/common/    # ProtectedRoute
  context/               # AuthContext (mock, localStorage)
  data/financeData.js   # transações, orçamentos, contas a pagar mockados
  pages/                 # Login, Dashboard, Transações, Orçamentos, Relatórios, Configurações
```
