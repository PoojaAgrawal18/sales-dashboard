import PropTypes from 'prop-types';
import React, { useState } from 'react';

// ----------------------------------------------------------------------
// Dummy data – deals by stage for kanban
// ----------------------------------------------------------------------

const PIPELINE_COLUMNS = [
  { id: 'qualified', title: 'Qualified', color: '#34d399' },
  { id: 'proposal', title: 'Proposal', color: '#60a5fa' },
  { id: 'negotiation', title: 'Negotiation', color: '#fbbf24' },
  { id: 'closed_won', title: 'Closed Won', color: '#a78bfa' },
  { id: 'closed_lost', title: 'Closed Lost', color: '#f87171' },
];

const DEALS_BY_STAGE = {
  qualified: [
    { id: 1, company: 'NextGen Labs', value: 28500, rep: 'Mike Johnson', closeDate: 'Apr 5' },
    { id: 2, company: 'Vertex Industries', value: 18500, rep: 'Sarah Lee', closeDate: 'Apr 12' },
    { id: 3, company: 'Horizon Tech', value: 42000, rep: 'John Doe', closeDate: 'Apr 18' },
  ],
  proposal: [
    { id: 4, company: 'TechStart Inc', value: 32000, rep: 'John Doe', closeDate: 'Mar 22' },
    { id: 5, company: 'DataFlow LLC', value: 52000, rep: 'Sarah Lee', closeDate: 'Mar 28' },
    { id: 6, company: 'Summit Ventures', value: 125000, rep: 'John Doe', closeDate: 'Apr 20' },
    { id: 7, company: 'Nova Systems', value: 38000, rep: 'Jane Smith', closeDate: 'Apr 8' },
  ],
  negotiation: [
    { id: 8, company: 'Acme Corp', value: 45000, rep: 'Jane Smith', closeDate: 'Mar 15' },
    { id: 9, company: 'Nexus Partners', value: 67000, rep: 'Mike Johnson', closeDate: 'Mar 18' },
    { id: 10, company: 'Prime Logic', value: 55000, rep: 'Sarah Lee', closeDate: 'Mar 25' },
  ],
  closed_won: [
    { id: 11, company: 'Global Solutions', value: 78000, rep: 'Jane Smith', closeDate: 'Mar 10' },
    { id: 12, company: 'CloudNine Systems', value: 91000, rep: 'John Doe', closeDate: 'Mar 8' },
    { id: 13, company: 'Apex Dynamics', value: 44000, rep: 'Mike Johnson', closeDate: 'Mar 5' },
  ],
  closed_lost: [
    { id: 14, company: 'Apex Dynamics', value: 34000, rep: 'Jane Smith', closeDate: 'Feb 28' },
    { id: 15, company: 'Beta Corp', value: 22000, rep: 'John Doe', closeDate: 'Feb 20' },
  ],
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
  card: {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 18,
  },
};

// ----------------------------------------------------------------------

function DealCard({ deal, columnColor }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 12,
        cursor: 'default',
        transition: 'background 0.15s, border-color 0.15s',
        borderLeft: `3px solid ${columnColor}`,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>{deal.company}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: '#38bdf8', marginBottom: 8 }}>${deal.value.toLocaleString()}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#64748b' }}>
        <span>{deal.rep}</span>
        <span>{deal.closeDate}</span>
      </div>
    </div>
  );
}

DealCard.propTypes = {
  deal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    rep: PropTypes.string.isRequired,
    closeDate: PropTypes.string.isRequired,
  }).isRequired,
  columnColor: PropTypes.string.isRequired,
};

export default function PipelineView() {
  return (
    <div style={PAGE_STYLES.wrapper}>
      <div style={{ position: 'fixed', top: -120, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 200, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -80, left: '40%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1600, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#60a5fa', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>
            ◈ Pipeline
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
            Sales Pipeline
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>
            {Object.values(DEALS_BY_STAGE).flat().length} deals across 5 stages
          </p>
        </div>

        {/* Kanban */}
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, minHeight: 520 }}>
          {PIPELINE_COLUMNS.map((col) => {
            const deals = DEALS_BY_STAGE[col.id] || [];
            const sum = deals.reduce((s, d) => s + d.value, 0);
            return (
              <div
                key={col.id}
                style={{
                  ...PAGE_STYLES.card,
                  minWidth: 280,
                  maxWidth: 280,
                  padding: '16px 0 16px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0,
                }}
              >
                <div style={{ paddingRight: 16, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{col.title}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>${(sum / 1000).toFixed(0)}k · {deals.length} deals</div>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }}>
                  {deals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} columnColor={col.color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
