/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useState } from 'react';
import { Pie, Cell, PieChart, ResponsiveContainer } from 'recharts';

import { Box, Paper, Divider, Typography } from '@mui/material';

const data = [
  { name: 'Total Collection', value: 7500 },
  { name: 'Non Covered Services & BTP', value: 3200 },
];

const COLORS = ['#1689FF', '#9BDAFF'];

export default function AllowedAmountBreakdown() {
  const [hoveredData, setHoveredData] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const chartContainerRef = useRef(null);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const getColorByName = (name) => {
    const index = data.findIndex((item) => item.name === name);
    return index !== -1 ? COLORS[index % COLORS.length] : '#292929';
  };

  const handleMouseMove = (e) => {
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (_, index) => {
    setHoveredData(data[index]);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
    setShowTooltip(false);
  };

  const CenterLabel = () => {
    const centerData = hoveredData || {
      name: 'Total',
      value: totalValue,
    };

    const displayColor = hoveredData ? getColorByName(hoveredData.name) : '#292929';

    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          mt: 0,
          zIndex: 10,
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '700',
            color: displayColor,
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {centerData.name}
        </Typography>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#292929',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          ${centerData.value.toLocaleString()}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '401px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: '100%',
          height: '374px',
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography sx={{ color: '#333', fontSize: '16px', fontWeight: 700, mb: 2, ml: 2 }}>
          Breakdown of Allowed Amount
        </Typography>
        <Divider sx={{ color: '#E5E5EF' }} />
        <Box 
          ref={chartContainerRef}
          onMouseMove={handleMouseMove}
          sx={{ flexGrow: 1, width: '100%', height: 0, position: 'relative' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="55%"
                startAngle={235}
                endAngle={-55}
                innerRadius="75%"
                outerRadius="90%"
                paddingAngle={5}
                dataKey="value"
                cornerRadius={10}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <CenterLabel />
          {showTooltip && hoveredData && (
            <Box
              sx={{
                position: 'absolute',
                left: mousePosition.x + 15,
                top: mousePosition.y - 20,
                backgroundColor: '#1E1B39',
                padding: '5px 10px',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                pointerEvents: 'none',
                zIndex: 1000,
                whiteSpace: 'nowrap',
              }}
            >
              <Typography sx={{ fontSize: '14px', fontWeight: 600 , color:'#FFFFFF'}}>
                {hoveredData.value.toLocaleString()}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2, mb: 1 }}>
          {data.map((entry, index) => (
            <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: COLORS[index],
                }}
              />
              <Typography sx={{ fontSize: '12px', color: '#292929' }}>{entry.name}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}