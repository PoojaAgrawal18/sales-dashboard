import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icon/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('Component'),
  },
  {
    title: 'Collection Ratio',
    path: '/collection',
    icon: icon('User'),
  },
  {
    title: 'Month on month AR Pendency',
    path: '/ar',
    icon: icon('User'),
    multiLine: true,
  },
  {
    title: 'Monthly Collection/Production/AR/Adjustment/BTP',
    path: '/monthly-collection',
    icon: icon('User'),
    multiLine: true,

  },
  {
    title: 'First Pass Ratio Report',
    path: '/first-pass',
    icon: icon('User'),
  },
  {
    title: 'Info Required Dashboard',
    path: '/info-required',
    icon: icon('User'),
  },
];

export default navConfig;