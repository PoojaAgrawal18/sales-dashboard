import { useState } from 'react';

import { Box, Paper, Divider, Container, Typography } from '@mui/material';

import DirtyClaimsView from './dirty-claims';
import FirstRatioCount from './first-pass-ratio-count';
import FirstRatioAmount from './first-pass-ratio-amount';

export default function FirstPassView() {
  const [activeTab, setActiveTab] = useState('dirtyClaims');

  const tabs = [
    { 
      id: 'dirtyClaims', 
      title: 'Details of dirty claim\nfixed by Capline', 
      component: <DirtyClaimsView /> 
    },
    { 
      id: 'ratioAmount', 
      title: 'First Pass Ratio \n (Amount)', 
      component: <FirstRatioAmount /> 
    },
    { 
      id: 'ratioCount', 
      title: 'First Pass Ratio\n (Count)', 
      component: <FirstRatioCount /> 
    },
  ];

  const currentComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <>
      <Container maxWidth="xxl" sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', gap: 0.3, flexWrap: 'nowrap' }}>
          {tabs.map((tab) => (
            <Paper
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                bgcolor: activeTab === tab.id ? '#0D477A' : '#C4EAFF',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 2,
                borderBottomLeftRadius: 2,
                border: activeTab === tab.id ? 'none' : '1px solid #BBDEFB',
                width: '213px',
                height: 57,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  color: activeTab === tab.id ? 'white' : '#292929',
                  textAlign: 'center',
                  fontSize: '16px',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-line',
                }}
              >
                {tab.title}
              </Typography>
            </Paper>
          ))}
        </Box>
        <Divider sx={{border:'1px solid #B5B5BE'}}/>
      </Container>

      <Box sx={{ mt: 2 }}>
        {currentComponent}
      </Box>
    </>
  );
}