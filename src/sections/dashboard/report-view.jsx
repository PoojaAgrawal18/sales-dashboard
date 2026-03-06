import React from 'react';
import PropTypes from 'prop-types';
import {
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  PieChart,
  ResponsiveContainer,
} from 'recharts';

// ----------------------------------------------------------------------
// Dummy report data
// ----------------------------------------------------------------------

const REVENUE_BY_REP = [
  { name: 'Jane Smith', revenue: 142000, deals: 12, color: '#38bdf8' },
  { name: 'John Doe', revenue: 189000, deals: 14, color: '#a78bfa' },
  { name: 'Mike Johnson', revenue: 118500, deals: 9, color: '#34d399' },
  { name: 'Sarah Lee', revenue: 96500, deals: 11, color: '#fbbf24' },
];

const PIPELINE_BY_STAGE = [
  { name: 'Qualified', value: 89000, color: '#34d399' },
  { name: 'Proposal', value: 247000, color: '#60a5fa' },
  { name: 'Negotiation', value: 167000, color: '#fbbf24' },
  { name: 'Closed Won', value: 213000, color: '#a78bfa' },
  { name: 'Closed Lost', value: 56000, color: '#f87171' },
];

const WIN_RATE_BY_QUARTER = [
  { quarter: 'Q1 \'25', rate: 28 },
  { quarter: 'Q2 \'25', rate: 31 },
  { quarter: 'Q3 \'25', rate: 29 },
  { quarter: 'Q4 \'25', rate: 32 },
  { quarter: 'Q1 \'26', rate: 34 },
];

const REPORT_SUMMARY = [
  { label: 'Total revenue (YTD)', value: '$636k', change: '+18%' },
  { label: 'Pipeline value', value: '$772k', change: '+12%' },
  { label: 'Deals closed', value: '46', change: '+8' },
  { label: 'Avg. deal size', value: '$13.8k', change: '+5%' },
];

const PAGE_STYLES = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0f2e 0%, #0f1a3e 40%, #0d1433 70%, #0a0c22 100%)',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: '28px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 18,
    padding: '22px 24px',
  },
};

// ----------------------------------------------------------------------

function BarTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div
        style={{
          background: 'rgba(15,20,40,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10,
          padding: '10px 14px',
          color: '#e2e8f0',
          fontSize: 13,
        }}
      >
        <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>{label}</div>
        <div style={{ color: '#38bdf8', fontWeight: 700 }}>${(p.revenue / 1000).toFixed(0)}k revenue</div>
        <div style={{ color: '#94a3b8', fontSize: 12 }}>{p.deals} deals</div>
      </div>
    );
  }
  return null;
}

BarTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        name: PropTypes.string,
        revenue: PropTypes.number,
        deals: PropTypes.number,
      }),
    })
  ),
  label: PropTypes.string,
};

BarTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
};

function PieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div
        style={{
          background: 'rgba(15,20,40,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10,
          padding: '8px 14px',
          color: '#e2e8f0',
          fontSize: 13,
        }}
      >
        <div style={{ color: '#94a3b8', marginBottom: 2 }}>{p.name}</div>
        <div style={{ fontWeight: 700, color: p.color }}>${(p.value / 1000).toFixed(0)}k</div>
      </div>
    );
  }
  return null;
}

PieTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
        color: PropTypes.string,
      }),
    })
  ),
};

PieTooltip.defaultProps = {
  active: false,
  payload: [],
};

// ----------------------------------------------------------------------

export default function ReportView() {
  return (
    <div style={PAGE_STYLES.wrapper}>
      <div style={{ position: 'fixed', top: -120, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 200, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -80, left: '40%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#60a5fa', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>
            ◈ Reports
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
            Sales Reports
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>Q1 2026 · Performance & pipeline analytics</p>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {REPORT_SUMMARY.map((item, i) => (
            <div
              key={item.label}
              style={{
                ...PAGE_STYLES.card,
                borderTop: `2px solid ${['#38bdf8', '#a78bfa', '#34d399', '#fbbf24'][i]}40`,
              }}
            >
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>{item.value}</div>
              <div style={{ fontSize: 12, color: '#34d399', marginTop: 4 }}>{item.change} vs prior</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 24 }}>
          {/* Revenue by rep */}
          <div style={PAGE_STYLES.card}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>Revenue by rep</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>Year to date closed revenue</div>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_BY_REP} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#475569' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#475569' }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                    {REVENUE_BY_REP.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pipeline by stage */}
          <div style={PAGE_STYLES.card}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>Pipeline by stage</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>Total: $772k</div>
            </div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIPELINE_BY_STAGE}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={78}
                    innerRadius={40}
                    paddingAngle={3}
                  >
                    {PIPELINE_BY_STAGE.map((entry, i) => (
                      <Cell key={entry.name} fill={entry.color} opacity={0.9} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 4 }}>
              {PIPELINE_BY_STAGE.map((s) => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#64748b' }}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Win rate trend */}
        <div style={PAGE_STYLES.card}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>Win rate trend</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>Quarter over quarter</div>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WIN_RATE_BY_QUARTER} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#475569' }} domain={[0, 40]} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload && payload.length ? (
                      <div
                        style={{
                          background: 'rgba(15,20,40,0.85)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: 10,
                          padding: '8px 14px',
                          color: '#e2e8f0',
                          fontSize: 13,
                        }}
                      >
                        <div style={{ color: '#94a3b8', marginBottom: 2 }}>{label}</div>
                        <div style={{ fontWeight: 700, color: '#34d399' }}>{payload[0].value}% win rate</div>
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="rate" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
