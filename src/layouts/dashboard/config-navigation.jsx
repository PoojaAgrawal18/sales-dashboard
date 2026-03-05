import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardRoundedIcon sx={{ fontSize: 22 }} />,
  },
  {
    title: 'Deals',
    path: '/dashboard',
    icon: <HandshakeRoundedIcon sx={{ fontSize: 22 }} />,
  },
  {
    title: 'Pipeline',
    path: '/dashboard',
    icon: <AccountTreeRoundedIcon sx={{ fontSize: 22 }} />,
  },
  {
    title: 'Reports',
    path: '/dashboard',
    icon: <AssessmentRoundedIcon sx={{ fontSize: 22 }} />,
  },
];

export default navConfig;
