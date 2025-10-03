import { useState } from 'react';

import { Box, Paper, Divider, Container, Typography } from '@mui/material';

import EobPending from './eob-pending';
import InfoSubmission from './info-submission';
import InfoResubmission from './info-resubmission';
import PostingConfirmation from './posting-confirmation';

// ----------------------------------------------------------------------

export default function InfoRequiredView() {
 const [activeTab, setActiveTab] = useState('InfoResubmission');

const tabs = [
  { 
    id: 'InfoResubmission', 
    title: <>Information Required <br /> from you for Resubmission</>, 
    component: <InfoResubmission /> 
  },
  { 
    id: 'InfoSubmission', 
    title: <>Information Required <br /> from you for Initial Submission</>, 
    component: <InfoSubmission /> 
  },
  { 
    id: 'EobPending', 
    title: <>Missing EOB to Post the <br /> Pending Claim</>, 
    component: <EobPending /> 
  },
  { 
    id: 'PostingConfirmation', 
    title: <>Posting Confirmation <br /> from Office</>, 
    component: <PostingConfirmation /> 
  },
];



  const currentComponent = tabs.find(tab => tab.id === activeTab)?.component;
console.log("Tabs count:", tabs.length);

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
                  fontSize: '12px',
                  lineHeight: 1.4,
    whiteSpace: 'normal',   // ✅ allow wrapping instead of forcing new line
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
