/* eslint-disable no-return-assign */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Pie, Line, Area, Cell, XAxis, YAxis, Tooltip,
  PieChart, ComposedChart, ResponsiveContainer,
} from 'recharts';

const REVENUE_TREND = [
  { month: 'Oct', value: 42000 },
  { month: 'Nov', value: 48500 },
  { month: 'Dec', value: 51000 },
  { month: 'Jan', value: 47200 },
  { month: 'Feb', value: 53800 },
  { month: 'Mar', value: 61500 },
];

const PIPELINE_BY_STAGE = [
  { name: 'Qualified', value: 124000, color: '#34d399' },
  { name: 'Proposal', value: 89000, color: '#60a5fa' },
  { name: 'Negotiation', value: 67000, color: '#fbbf24' },
  { name: 'Closed Won', value: 185000, color: '#a78bfa' },
  { name: 'Closed Lost', value: 21000, color: '#f87171' },
];

const TOP_DEALS = [
  { id: 1, company: 'Acme Corp', value: 45000, stage: 'Negotiation', rep: 'Jane Smith', closeDate: 'Mar 15' },
  { id: 2, company: 'TechStart Inc', value: 32000, stage: 'Proposal', rep: 'John Doe', closeDate: 'Mar 22' },
  { id: 3, company: 'Global Solutions', value: 78000, stage: 'Closed Won', rep: 'Jane Smith', closeDate: 'Mar 10' },
  { id: 4, company: 'NextGen Labs', value: 28500, stage: 'Qualified', rep: 'Mike Johnson', closeDate: 'Apr 5' },
  { id: 5, company: 'DataFlow LLC', value: 52000, stage: 'Proposal', rep: 'Sarah Lee', closeDate: 'Mar 28' },
];

const KPI_CARDS = [
  { title: 'Revenue (MTD)', value: '$61.5k', sub: '+12.4% vs last month', trend: 'up', color: '#38bdf8', accent: 'rgba(56,189,248,0.15)', sparkData: [40, 45, 48, 52, 55, 61] },
  { title: 'Pipeline Value', value: '$496k', sub: '23 active opportunities', trend: 'up', color: '#a78bfa', accent: 'rgba(167,139,250,0.15)', sparkData: [350, 380, 410, 440, 470, 496] },
  { title: 'Deals Won', value: '18', sub: 'This quarter', trend: 'up', color: '#34d399', accent: 'rgba(52,211,153,0.15)', sparkData: [4, 7, 10, 13, 15, 18] },
  { title: 'Win Rate', value: '34%', sub: '+3% vs last quarter', trend: 'up', color: '#fbbf24', accent: 'rgba(251,191,36,0.15)', sparkData: [28, 29, 31, 32, 33, 34] },
];

const STAGE_COLORS = {
  'Negotiation': { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24' },
  'Proposal': { bg: 'rgba(96,165,250,0.15)', text: '#60a5fa' },
  'Closed Won': { bg: 'rgba(167,139,250,0.15)', text: '#a78bfa' },
  'Qualified': { bg: 'rgba(52,211,153,0.15)', text: '#34d399' },
  'Closed Lost': { bg: 'rgba(248,113,113,0.15)', text: '#f87171' },
};

function MiniSparkline({ data, color }) {

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 90; const h = 36; const pts = data.length;
  const points = data.map((v, i) => {
    const x = (i / (pts - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = `0,${h} ${  data.map((v, i) => {
    const x = (i / (pts - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(' ')  } ${w},${h}`;

  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#sg-${color.replace('#','')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = (i / (pts - 1)) * w;
        const y = h - ((v - min) / range) * (h - 6) - 3;
        return i === pts - 1 ? <circle key={i} cx={x} cy={y} r={3} fill={color} /> : null;
      })}
    </svg>
  );
}

MiniSparkline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15,20,40,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 10,
        padding: '8px 14px',
        color: '#e2e8f0',
        fontSize: 13,
      }}>
        <div style={{ color: '#94a3b8', marginBottom: 2 }}>{label}</div>
        <div style={{ fontWeight: 700, color: '#38bdf8' }}>${(payload[0].value / 1000).toFixed(1)}k</div>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number })),
  label: PropTypes.string,
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
};

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15,20,40,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 10,
        padding: '8px 14px',
        color: '#e2e8f0',
        fontSize: 13,
      }}>
        <div style={{ color: '#94a3b8', marginBottom: 2 }}>{payload[0].name}</div>
        <div style={{ fontWeight: 700, color: payload[0].payload.color }}>${(payload[0].value / 1000).toFixed(1)}k</div>
      </div>
    );
  }
  return null;
};

PieTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      payload: PropTypes.shape({ color: PropTypes.string }),
    })
  ),
};

PieTooltip.defaultProps = {
  active: false,
  payload: [],
};

export default function SalesDashboard() {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f2e 0%, #0f1a3e 40%, #0d1433 70%, #0a0c22 100%)',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: '28px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient orbs */}
      <div style={{ position: 'fixed', top: -120, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 200, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -80, left: '40%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#60a5fa', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>
              ◈ Sales Intelligence
            </div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
              Sales Dashboard
            </h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>March 2026 · Real-time overview</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '8px 16px',
            color: '#94a3b8',
            fontSize: 13,
          }}>
            <span style={{ color: '#34d399', marginRight: 6 }}>●</span>Live
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
          {KPI_CARDS.map((kpi) => (
            <div key={kpi.title} style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 18,
              padding: '20px 22px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${kpi.color}55`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
            >
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 20, right: 20, height: 2, background: `linear-gradient(90deg, transparent, ${kpi.color}, transparent)`, borderRadius: 2 }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at top right, ${kpi.accent} 0%, transparent 60%)`, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                    {kpi.title}
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1 }}>
                    {kpi.value}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, gap: 4 }}>
                    <span style={{ fontSize: 13, color: '#34d399' }}>↑</span>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{kpi.sub}</span>
                  </div>
                </div>
                <div style={{ marginLeft: 8, marginTop: 4 }}>
                  <MiniSparkline data={kpi.sparkData} color={kpi.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 20 }}>

          {/* Revenue Trend */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 18,
            padding: '22px 24px',
          }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>Revenue Trend</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>Monthly revenue performance</div>
            </div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={REVENUE_TREND} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#475569', fontFamily: 'DM Sans, sans-serif' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#475569', fontFamily: 'DM Sans, sans-serif' }} tickFormatter={v => `$${v/1000}k`} domain={[30000, 70000]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="none" fill="url(#revGrad)" />
                  <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2.5} dot={{ fill: '#0a0f2e', stroke: '#38bdf8', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#38bdf8' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pipeline Pie */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 18,
            padding: '22px 24px',
          }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>Pipeline by Stage</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>Total: $486k</div>
            </div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={PIPELINE_BY_STAGE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={38} paddingAngle={3}>
                    {PIPELINE_BY_STAGE.map((entry, i) => (
                      <Cell key={i} fill={entry.color} opacity={0.9} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 8 }}>
              {PIPELINE_BY_STAGE.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#64748b' }}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Deals Table */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 18,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>Top Deals</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>Leading opportunities by value</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Company', 'Value', 'Stage', 'Rep', 'Close Date'].map(h => (
                  <th key={h} style={{ padding: '12px 24px', textAlign: h === 'Value' ? 'right' : 'left', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_DEALS.map((row) => (
                <tr key={row.id}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: hoveredRow === row.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                    transition: 'background 0.15s',
                  }}>
                  <td style={{ padding: '14px 24px', color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{row.company}</td>
                  <td style={{ padding: '14px 24px', color: '#38bdf8', fontSize: 13, fontWeight: 700, textAlign: 'right' }}>${row.value.toLocaleString()}</td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{
                      background: STAGE_COLORS[row.stage]?.bg || 'rgba(255,255,255,0.08)',
                      color: STAGE_COLORS[row.stage]?.text || '#94a3b8',
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}>{row.stage}</span>
                  </td>
                  <td style={{ padding: '14px 24px', color: '#94a3b8', fontSize: 13 }}>{row.rep}</td>
                  <td style={{ padding: '14px 24px', color: '#64748b', fontSize: 13 }}>{row.closeDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}