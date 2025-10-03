/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useState } from 'react';
import { Pie, Cell, PieChart, ResponsiveContainer } from 'recharts';

import { Box, Paper, useTheme, Typography, useMediaQuery } from '@mui/material';

const VariableRadiusPieChart = ({ chart }) => {
  const [hoveredData, setHoveredData] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const chartContainerRef = useRef(null);

  const { series = [] } = chart || {};

  const NAME_TO_COLOR = {
    '0-29': '#0077B6',
    '30-59': '#03045E',
    '60-89': '#00B4D8',
    '90+': '#0AA5DC',
  };

  const COLORS = ['#0077B6', '#03045E', '#00B4D8', '#0AA5DC'];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Simplified data processing - just use the data as-is
  const processedData = series.map((item, index) => ({
    claims: item.label || `Category ${index + 1}`,
    value: item.value || 0,
    category: index,
  }));

  const filteredData = processedData.filter((item) => item.value > 0);

  if (filteredData.length === 0) {
    return <Typography>No data available to display</Typography>;
  }

  const maxValue = Math.max(...processedData.map((d) => d.value));
  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);

  const getColorByClaims = (claims) => {
    // Try exact match first
    if (NAME_TO_COLOR[claims]) return NAME_TO_COLOR[claims];
    
    // Try case-insensitive match
    const matchedKey = Object.keys(NAME_TO_COLOR).find(
      (key) => key.toLowerCase() === claims.toLowerCase()
    );
    if (matchedKey) return NAME_TO_COLOR[matchedKey];
    
    // Fall back to color array by index
    const index = filteredData.findIndex((item) => item.claims === claims);
    return COLORS[index % COLORS.length];
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

  const handlePieEnter = (data) => {
    setHoveredData(data);
    setShowTooltip(true);
  };

  const handlePieLeave = () => {
    setHoveredData(null);
    setShowTooltip(false);
  };

  const renderVariableRadiusPieChart = () => {
    let startAngle = 0;
    const baseRadiusPercent = isSmallScreen ? 30 : 35;
    const maxExtraPercent = isSmallScreen ? 15 : 40;

    return filteredData.map((item, index) => {
      const angleValue = (item.value / totalValue) * 360;
      const endAngle = startAngle + angleValue;
      const valueScale = maxValue === 0 ? 0.5 : item.value / maxValue;
      const radius = baseRadiusPercent + valueScale * maxExtraPercent;
      const color = getColorByClaims(item.claims);

      const pieSegment = (
        <Pie
          key={`pie-${index}`}
          data={[item]}
          cx="50%"
          cy="50%"
          width="100%"
          height="100%"
          innerRadius={isSmallScreen ? '12%' : '38%'}
          outerRadius={`${radius}%`}
          startAngle={startAngle}
          endAngle={endAngle}
          paddingAngle={isSmallScreen ? 1 : 2}
          dataKey="value"
          nameKey="claims"
          cornerRadius={isSmallScreen ? 0 : 3}
          stroke="none"
          onMouseEnter={() => handlePieEnter(item)}
          onMouseLeave={handlePieLeave}
        >
          <Cell fill={color} />
        </Pie>
      );

      startAngle = endAngle;
      return pieSegment;
    });
  };

  const StatusDisplay = () => (
    <Box
      sx={{
        mt: 2.25,
        ml: 2.5,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ m: 0, fontSize: '13px', fontWeight: '400' }}>
        AR Distribution by <br />
        Age Group
      </Typography>
    </Box>
  );

  const CenterLabel = () => {
    const centerData = hoveredData || {
      claims: 'Total',
      value: totalValue,
    };

    const displayColor = hoveredData ? getColorByClaims(hoveredData.claims) : '#292929';

    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          mt: -3,
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
          {centerData.claims}
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

  const Legend = () => {
    const legendItems = [
      { label: '0-29', color: '#0077B6' },
      { label: '30-59', color: '#03045E' },
      { label: '60-89', color: '#00B4D8' },
      { label: '90+', color: '#0AA5DC' },
    ];

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2.5,
          pb: 2,
          pt: 1,
          mt: 'auto',
        }}
      >
        {legendItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: item.color,
              }}
            />
            <Typography sx={{ fontSize: '12px', fontWeight: '200', color: '#292929' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '287px',
        minHeight: '287px',
        mr: 0,
        p: 0,
        borderRadius: 1,
        height: '100%',
        maxHeight: '287px',
        position: 'relative',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #C4C4C4',
      }}
    >
      <StatusDisplay />
      <Box
        ref={chartContainerRef}
        onMouseMove={handleMouseMove}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          gap: 0,
          flex: 1,
          p: 0,
          mt: -2,
          position: 'relative',
        }}
      >
        <CenterLabel />
        <Box
          sx={{
            width: { xs: '100%', sm: '250px', md: '280px' },
            height: { xs: '220px', sm: '250px', md: '320px' },
            ml: 0,
            mr: 0,
            p: 0,
            borderRadius: 0,
            mt: { xs: 0, md: -7 },
            alignSelf: { xs: 'center', md: 'flex-start' },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {renderVariableRadiusPieChart()}
            </PieChart>
          </ResponsiveContainer>
        </Box>
        {showTooltip && hoveredData && (
          <Box
            sx={{
              position: 'absolute',
              left: mousePosition.x + 15,
              top: mousePosition.y - 35,
              width: '84px',
              height: '71px',
              bgcolor: '#37375C',
              borderRadius: '4px',
              p: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              pointerEvents: 'none',
              zIndex: 1000,
            }}
          >
            <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 500, mt: 0.5 }}>
              Claims
            </Typography>
            <Box sx={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 400 }}>
              {hoveredData.claims}
            </Box>
            <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 500 }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                {hoveredData.value.toLocaleString()}
              </Box>
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: -7 }}>
        <Legend />
      </Box>
    </Paper>
  );
};

export default () => {
  const testData = {
    series: [
      { label: '0-29', value: 6000 },
      { label: '30-59', value: 7000 },
      { label: '60-89', value: 8000 },
      { label: '90+', value: 5000 },
    ],
  };

  return <VariableRadiusPieChart chart={testData} />;
};