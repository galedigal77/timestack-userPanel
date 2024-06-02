import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../styles/Leave.css';

const Leave = () => {
    const [leaveBalances, setLeaveBalances] = useState({
        annualLeave: 0,
        sickLeave: 0,
        personalLeave: 0,
        maternityLeave: 0,
    });
    const [leaveRequest, setLeaveRequest] = useState({
        type: 'annualLeave',
        startDate: '',
        endDate: '',
        reason: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLeaveBalances = async () => {
            try {
                const response = await axios.get('/leave-balances');
                setLeaveBalances(response.data);
            } catch (error) {
                console.error('Error fetching leave balances:', error);
            }
        };

        fetchLeaveBalances();
    }, []);

    const handleChange = (e) => {
        setLeaveRequest({
            ...leaveRequest,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/leave-request', leaveRequest);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error requesting leave:', error);
            setMessage('An error occurred while requesting leave. Please try again.');
        }
    };

    return (
        <div className="leave-container">
            <h2>Leave Balances</h2>
            <table className="leave-balances-table">
                <tbody>
                    <tr>
                        <td>Annual Leave:</td>
                        <td>{leaveBalances.annualLeave} days</td>
                    </tr>
                    <tr>
                        <td>Sick Leave:</td>
                        <td>{leaveBalances.sickLeave} days</td>
                    </tr>
                    <tr>
                        <td>Personal Leave:</td>
                        <td>{leaveBalances.personalLeave} days</td>
                    </tr>
                    <tr>
                        <td>Maternity Leave:</td>
                        <td>{leaveBalances.maternityLeave} days</td>
                    </tr>
                </tbody>
            </table>

            <h2>Request Leave</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="leave-request-form">
                <div className="form-group">
                    <label htmlFor="type">Leave Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={leaveRequest.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="annualLeave">Annual Leave</option>
                        <option value="sickLeave">Sick Leave</option>
                        <option value="personalLeave">Personal Leave</option>
                        <option value="maternityLeave">Maternity Leave</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={leaveRequest.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={leaveRequest.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason:</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={leaveRequest.reason}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Request Leave</button>
            </form>
        </div>
    );
};

export default Leave;
