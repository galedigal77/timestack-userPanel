import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Card from './Card';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import ProfileIcon from './ProfileIcon';
import TimeTracker from './TimeTracker';
import Timesheet from './Timesheet';
import PayslipList from './PayslipList';
import PayslipDetails from './PayslipDetails';
import Leave from './Leave';
import Goals from './Goals';
import ManageShift from './ManageShift';
import Help from './Help';
import AdminAccess from './AdminAccess';
import Profile from './Profile';
import '../styles/Dashboard.css';

const Dashboard = ({ title, userCount, leaveBalanceCount }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderActiveMenu = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'time-tracker':
        return <TimeTracker />;
      case 'timesheet':
        return <Timesheet />;
      case 'payslip':
        return <PayslipList />;
      case 'leave':
        return <Leave />;
      case 'goals':
        return <Goals />;
      case 'manage-shift':
        return <ManageShift />;
      case 'help':
        return <Help />;
      case 'admin-access':
        return <AdminAccess />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveMenu={setActiveMenu} />
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">{title}</h1>
            <ProfileIcon />
          </div>
          <Routes>
            <Route path="/" element={renderActiveMenu()} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payslip-details/:id" element={<PayslipDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
