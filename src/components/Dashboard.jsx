import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Sidebar from "./Sidebar";
import "../styles/Dashboard.css";

const Dashboard = ({ title, userCount, leaveBalanceCount }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">{title}</h1>
          </div>

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
              <Link to="/leave">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
