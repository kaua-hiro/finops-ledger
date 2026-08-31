import React from 'react';

const WIDTH = 640;
const HEIGHT = 220;
const PAD = 32;

const CashFlowChart = ({ data }) => {
  const max = Math.max(...data.map(d => Math.max(d.income, d.expense))) * 1.15;
  const stepX = (WIDTH - PAD * 2) / (data.length - 1);
  const scaleY = (v) => HEIGHT - PAD - (v / max) * (HEIGHT - PAD * 2);

  const toPath = (key) => data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${PAD + i * stepX} ${scaleY(d[key])}`)
    .join(' ');

  const toArea = (key) => `${toPath(key)} L ${PAD + (data.length - 1) * stepX} ${HEIGHT - PAD} L ${PAD} ${HEIGHT - PAD} Z`;

  return (
    <svg className="cashflow" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Fluxo de caixa dos últimos seis meses">
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={PAD} x2={WIDTH - PAD} y1={PAD + (i * (HEIGHT - PAD * 2)) / 3} y2={PAD + (i * (HEIGHT - PAD * 2)) / 3} className="cashflow__grid" />
      ))}

      <path d={toArea('income')} className="cashflow__area cashflow__area--income" />
      <path d={toArea('expense')} className="cashflow__area cashflow__area--expense" />
      <path d={toPath('income')} className="cashflow__line cashflow__line--income" />
      <path d={toPath('expense')} className="cashflow__line cashflow__line--expense" />

      {data.map((d, i) => (
        <g key={d.month}>
          <circle cx={PAD + i * stepX} cy={scaleY(d.income)} r="3.5" className="cashflow__dot cashflow__dot--income" />
          <circle cx={PAD + i * stepX} cy={scaleY(d.expense)} r="3.5" className="cashflow__dot cashflow__dot--expense" />
          <text x={PAD + i * stepX} y={HEIGHT - 8} className="cashflow__month">{d.month}</text>
        </g>
      ))}
    </svg>
  );
};

export default CashFlowChart;
