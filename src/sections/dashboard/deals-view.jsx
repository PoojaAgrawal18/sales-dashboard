import React, { useState } from 'react';

// ----------------------------------------------------------------------
// Dummy data
// ----------------------------------------------------------------------

const DEALS = [
  { id: 1, company: 'Acme Corp', value: 45000, stage: 'Negotiation', rep: 'Jane Smith', closeDate: 'Mar 15, 2026', probability: 75 },
  { id: 2, company: 'TechStart Inc', value: 32000, stage: 'Proposal', rep: 'John Doe', closeDate: 'Mar 22, 2026', probability: 50 },
  { id: 3, company: 'Global Solutions', value: 78000, stage: 'Closed Won', rep: 'Jane Smith', closeDate: 'Mar 10, 2026', probability: 100 },
  { id: 4, company: 'NextGen Labs', value: 28500, stage: 'Qualified', rep: 'Mike Johnson', closeDate: 'Apr 5, 2026', probability: 25 },
  { id: 5, company: 'DataFlow LLC', value: 52000, stage: 'Proposal', rep: 'Sarah Lee', closeDate: 'Mar 28, 2026', probability: 60 },
  { id: 6, company: 'CloudNine Systems', value: 91000, stage: 'Closed Won', rep: 'John Doe', closeDate: 'Mar 8, 2026', probability: 100 },
  { id: 7, company: 'Vertex Industries', value: 18500, stage: 'Qualified', rep: 'Sarah Lee', closeDate: 'Apr 12, 2026', probability: 20 },
  { id: 8, company: 'Nexus Partners', value: 67000, stage: 'Negotiation', rep: 'Mike Johnson', closeDate: 'Mar 18, 2026', probability: 80 },
  { id: 9, company: 'Apex Dynamics', value: 34000, stage: 'Closed Lost', rep: 'Jane Smith', closeDate: 'Feb 28, 2026', probability: 0 },
  { id: 10, company: 'Summit Ventures', value: 125000, stage: 'Proposal', rep: 'John Doe', closeDate: 'Apr 20, 2026', probability: 40 },
];

const STAGE_COLORS = {
  Negotiation: { bg: 'rgba(251,191,36,0.15)', text: '#fbbf24' },
  Proposal: { bg: 'rgba(96,165,250,0.15)', text: '#60a5fa' },
  'Closed Won': { bg: 'rgba(167,139,250,0.15)', text: '#a78bfa' },
  Qualified: { bg: 'rgba(52,211,153,0.15)', text: '#34d399' },
  'Closed Lost': { bg: 'rgba(248,113,113,0.15)', text: '#f87171' },
};

const PAGE_STYLES = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0f2e 0%, #0f1a3e 40%, #0d1433 70%, #0a0c22 100%)',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: '28px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  orbs: [
    { top: -120, left: -80, w: 400, h: 400, color: 'rgba(99,102,241,0.18)' },
    { top: 200, right: -100, w: 350, h: 350, color: 'rgba(56,189,248,0.12)' },
    { bottom: -80, left: '40%', w: 300, h: 300, color: 'rgba(167,139,250,0.1)' },
  ],
  card: {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 18,
  },
};

// ----------------------------------------------------------------------

export default function DealsView() {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [hoveredRow, setHoveredRow] = useState(null);

  const filtered = DEALS.filter((d) => {
    const matchSearch = !search || d.company.toLowerCase().includes(search.toLowerCase()) || d.rep.toLowerCase().includes(search.toLowerCase());
    const matchStage = stageFilter === 'all' || d.stage === stageFilter;
    return matchSearch && matchStage;
  });

  const stages = ['all', ...Object.keys(STAGE_COLORS)];

  return (
    <div style={PAGE_STYLES.wrapper}>
      {/* Ambient orbs */}
      <div style={{ position: 'fixed', top: -120, left: -80, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${PAGE_STYLES.orbs[0].color} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 200, right: -100, width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${PAGE_STYLES.orbs[1].color} 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -80, left: '40%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${PAGE_STYLES.orbs[2].color} 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#60a5fa', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>
              ◈ Deals
            </div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
              All Deals
            </h1>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>{filtered.length} deals · Manage opportunities</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search company or rep..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '10px 16px',
                color: '#e2e8f0',
                fontSize: 13,
                width: 220,
                outline: 'none',
              }}
            />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '10px 16px',
                color: '#e2e8f0',
                fontSize: 13,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {stages.map((s) => (
                <option key={s} value={s} style={{ background: '#0f1a3e', color: '#e2e8f0' }}>
                  {s === 'all' ? 'All stages' : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table card */}
        <div style={{ ...PAGE_STYLES.card, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>Deals list</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>Total value: ${filtered.reduce((s, d) => s + d.value, 0).toLocaleString()}</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Company', 'Value', 'Stage', 'Rep', 'Close date', 'Probability'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '12px 24px',
                        textAlign: h === 'Value' || h === 'Probability' ? 'right' : 'left',
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: hoveredRow === row.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <td style={{ padding: '14px 24px', color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{row.company}</td>
                    <td style={{ padding: '14px 24px', color: '#38bdf8', fontSize: 13, fontWeight: 700, textAlign: 'right' }}>
                      ${row.value.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 24px' }}>
                      <span
                        style={{
                          background: STAGE_COLORS[row.stage]?.bg || 'rgba(255,255,255,0.08)',
                          color: STAGE_COLORS[row.stage]?.text || '#94a3b8',
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {row.stage}
                      </span>
                    </td>
                    <td style={{ padding: '14px 24px', color: '#94a3b8', fontSize: 13 }}>{row.rep}</td>
                    <td style={{ padding: '14px 24px', color: '#64748b', fontSize: 13 }}>{row.closeDate}</td>
                    <td style={{ padding: '14px 24px', color: '#94a3b8', fontSize: 13, textAlign: 'right', fontWeight: 600 }}>
                      {row.probability}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div style={{ padding: 48, textAlign: 'center', color: '#64748b', fontSize: 14 }}>No deals match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
