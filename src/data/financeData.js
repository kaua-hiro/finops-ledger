export const CATEGORIES = {
  vendas: { label: 'Vendas', color: '#1F6E43' },
  servicos: { label: 'Serviços', color: '#3E8E68' },
  folha: { label: 'Folha de Pagamento', color: '#B23A3A' },
  fornecedores: { label: 'Fornecedores', color: '#C97A4A' },
  marketing: { label: 'Marketing', color: '#8A6FB0' },
  infraestrutura: { label: 'Infraestrutura', color: '#4A7FB0' },
  impostos: { label: 'Impostos', color: '#7C8B81' },
};

export const transactions = [
  { id: 1, date: '2026-08-28', description: 'Recebimento — Cliente Aurora Ltda.', category: 'vendas', type: 'credit', amount: 18400 },
  { id: 2, date: '2026-08-27', description: 'Assinatura — AWS Cloud', category: 'infraestrutura', type: 'debit', amount: 2140 },
  { id: 3, date: '2026-08-26', description: 'Folha de pagamento — Agosto', category: 'folha', type: 'debit', amount: 34200 },
  { id: 4, date: '2026-08-24', description: 'Recebimento — Consultoria Nexora', category: 'servicos', type: 'credit', amount: 9800 },
  { id: 5, date: '2026-08-22', description: 'Fornecedor — Gráfica Central', category: 'fornecedores', type: 'debit', amount: 1260 },
  { id: 6, date: '2026-08-20', description: 'Campanha — Google Ads', category: 'marketing', type: 'debit', amount: 3800 },
  { id: 7, date: '2026-08-18', description: 'Recebimento — Contrato Zenith Corp', category: 'vendas', type: 'credit', amount: 27600 },
  { id: 8, date: '2026-08-15', description: 'DAS — Simples Nacional', category: 'impostos', type: 'debit', amount: 5480 },
  { id: 9, date: '2026-08-12', description: 'Assinatura — Ferramentas SaaS', category: 'infraestrutura', type: 'debit', amount: 980 },
  { id: 10, date: '2026-08-09', description: 'Recebimento — Manutenção mensal', category: 'servicos', type: 'credit', amount: 6200 },
  { id: 11, date: '2026-08-06', description: 'Fornecedor — Materiais de escritório', category: 'fornecedores', type: 'debit', amount: 640 },
  { id: 12, date: '2026-08-03', description: 'Recebimento — Cliente Vetta Sistemas', category: 'vendas', type: 'credit', amount: 14300 },
];

export const budgets = [
  { category: 'folha', allocated: 36000, spent: 34200 },
  { category: 'marketing', allocated: 5000, spent: 3800 },
  { category: 'infraestrutura', allocated: 4000, spent: 3120 },
  { category: 'fornecedores', allocated: 3000, spent: 1900 },
  { category: 'impostos', allocated: 6000, spent: 5480 },
];

export const upcomingBills = [
  { id: 1, name: 'Aluguel — Escritório', dueDate: '2026-09-05', amount: 8200, status: 'pending' },
  { id: 2, name: 'Fatura — Provedor de Internet', dueDate: '2026-09-08', amount: 420, status: 'pending' },
  { id: 3, name: 'Assinatura — Suite de Design', dueDate: '2026-09-10', amount: 890, status: 'scheduled' },
  { id: 4, name: 'Manutenção — Frota', dueDate: '2026-09-14', amount: 1650, status: 'pending' },
];

// Fluxo de caixa dos últimos 6 meses (entradas x saídas, em milhares)
export const cashFlow = [
  { month: 'Mar', income: 62, expense: 48 },
  { month: 'Abr', income: 58, expense: 51 },
  { month: 'Mai', income: 71, expense: 54 },
  { month: 'Jun', income: 65, expense: 57 },
  { month: 'Jul', income: 78, expense: 52 },
  { month: 'Ago', income: 76, expense: 49 },
];

export function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function computeSummary() {
  const income = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
  const balance = 184320 + income - expense;
  return { income, expense, balance, net: income - expense };
}
