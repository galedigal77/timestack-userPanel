import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Card from './Card';
import Sidebar from './Sidebar';
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
import '../styles/Dashboard.css';

const Dashboard = ({ title, userCount, leaveBalanceCount }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderActiveMenu = () => {
    switch (activeMenu) {
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
        return (
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <Link to="/backend/users">
                <Card
                  borderClass="border-left-primary"
                  textClass="text-primary"
                  title="User"
                  value={userCount}
                  iconClass="fas fa-user"
                  iconColor="text-gray-300"
                />
              </Link>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <Link to="#" onClick={() => setActiveMenu('leave')}>
                <Card
                  borderClass="border-left-danger"
                  textClass="text-danger"
                  title="Leave Balance"
                  value={leaveBalanceCount}
                  iconClass="fas fa-user"
                  iconColor="text-danger"
                />
              </Link>
            </div>
          </div>
        );
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
            <Route path="/payslipdetails/:id" element={<PayslipDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
