import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../styles/DashboardContent.css';

// Register the required components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardContent = () => {
    const barData = {
        labels: ['Mon, May 6', 'Tue, May 7', 'Wed, May 8', 'Thu, May 9', 'Fri, May 10'],
        datasets: [
            {
                label: 'Web Development',
                backgroundColor: '#42A5F5',
                data: [10, 20, 30, 40, 50],
            },
            {
                label: 'Administrative Task',
                backgroundColor: '#66BB6A',
                data: [5, 15, 25, 35, 45],
            },
            {
                label: 'Planning & Design',
                backgroundColor: '#FFA726',
                data: [15, 25, 35, 45, 55],
            },
        ],
    };

    const doughnutData = {
        labels: ['Web Development', 'Administrative Task', 'Planning & Design'],
        datasets: [
            {
                data: [38, 33, 22],
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
                hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
            },
        ],
    };

    return (
        <div className="dashboard-content">
            {/* <div className="header">
                <h1>Dashboard</h1>
            </div> */}
            <div className="content">
                <div className="chart-container">
                    <div className="bar-chart">
                        <Bar data={barData} />
                    </div>
                    <div className="doughnut-chart">
                        <Doughnut data={doughnutData} />
                    </div>
                </div>
                <div className="info-cards">
                    <div className="info-card">
                        <h3>Goals and Rewards</h3>
                        <p>
                            <span className="highlight">30 Days</span>
                            <br />
                            Time until you reach your goal.
                        </p>
                    </div>
                    <div className="info-card">
                        <h3>Shift Availability</h3>
                        <button>Check Now</button>
                    </div>
                    <div className="info-card">
                        <h3>Training & Development</h3>
                        <button>Enroll</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
