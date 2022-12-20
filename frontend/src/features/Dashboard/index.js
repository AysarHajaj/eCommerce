import React from 'react';
import ShopIcon from '@mui/icons-material/LocalGroceryStore';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import CircleIcon from '@mui/icons-material/Circle';
import DashboardSummary from './components/DashboardSummary';
import DashboardTable from './components/DashboardTable';

function Dashboard() {
  return (
    <section className="dashboard-container">
      <DashboardSummary
        summary={[
          {
            name: 'Total Order',
            icon: <ShopIcon />,
            value: 20,
          },
          {
            name: 'Total Pending Order',
            icon: <ShopIcon />,
            value: 13,
          },
          {
            name: 'Total Declined Order',
            icon: <ShopIcon />,
            value: 0,
          },
          {
            name: 'Total Complete Order',
            icon: <ShopIcon />,
            value: 6,
          },
          {
            name: 'Total Earning',
            icon: <VerifiedIcon />,
            value: 0,
            currency: '$',
          },
          {
            name: 'Total Pending Earning',
            icon: <VerifiedIcon />,
            value: 7,
            currency: '$',
          },
          {
            name: 'This month Earning',
            icon: <VerifiedIcon />,
            value: 600,
            currency: '$',
          },
          {
            name: 'This Year Earning',
            icon: <VerifiedIcon />,
            value: 5000,
            currency: '$',
          },
          {
            name: 'Today Product Sale',
            icon: <CircleIcon />,
            value: 100,
          },
          {
            name: 'This Month Product Sale',
            icon: <CircleIcon />,
            value: 152,
          },
          {
            name: 'This Year Product Sale',
            icon: <CircleIcon />,
            value: 1546,
          },
          {
            name: 'Total Product Sale',
            icon: <CircleIcon />,
            value: 8545,
          },
          {
            name: 'Total Product Report',
            icon: <PersonIcon />,
            value: 5,
          },
          {
            name: 'Total Product Review',
            icon: <PersonIcon />,
            value: 2,
          },
          {
            name: 'Total Seller',
            icon: <PersonIcon />,
            value: 27,
          },
          {
            name: 'Total User',
            icon: <PersonIcon />,
            value: 27,
          },
        ]}
        currency="$"
      />
      <DashboardTable />
    </section>
  );
}

export default Dashboard;
