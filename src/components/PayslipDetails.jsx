import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import '../styles/PayslipDetails.css';

const PayslipDetails = () => {
    const { id } = useParams();
    const [payslip, setPayslip] = useState(null);

    useEffect(() => {
        const fetchPayslipDetails = async () => {
            try {
                const response = await api.get(`/payslips/${id}`);
                setPayslip(response.data);
            } catch (error) {
                console.error('Error fetching payslip details:', error);
            }
        };

        fetchPayslipDetails();
    }, [id]);

    if (!payslip) {
        return <div>Loading...</div>;
    }

    return (
        <div className="payslip-details-container">
            <h2>Payslip Details</h2>
            <table>
                <tbody>
                    <tr>
                        <td>ID Number:</td>
                        <td>{payslip.idNumber}</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>{payslip.name}</td>
                    </tr>
                    <tr>
                        <td>Base Rate:</td>
                        <td>{payslip.baseRate}</td>
                    </tr>
                    <tr>
                        <td>Base Hours:</td>
                        <td>{payslip.baseHours}</td>
                    </tr>
                    <tr>
                        <td>Pay Frequency:</td>
                        <td>{payslip.payFrequency}</td>
                    </tr>
                    <tr>
                        <td>Period of Payment:</td>
                        <td>{payslip.periodOfPayment}</td>
                    </tr>
                    <tr>
                        <td>Paid on Date:</td>
                        <td>{payslip.paidOnDate}</td>
                    </tr>
                    <tr>
                        <td>Weeks in Pay:</td>
                        <td>{payslip.weeksInPay}</td>
                    </tr>
                    <tr>
                        <td>Job Title:</td>
                        <td>{payslip.jobTitle}</td>
                    </tr>
                    <tr>
                        <td>Taxable Gross:</td>
                        <td>{payslip.taxableGross}</td>
                    </tr>
                    <tr>
                        <td>Tax:</td>
                        <td>{payslip.tax}</td>
                    </tr>
                    <tr>
                        <td>Net:</td>
                        <td>{payslip.net}</td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td>{payslip.description}</td>
                    </tr>
                    <tr>
                        <td>Hours/Units:</td>
                        <td>{payslip.hoursUnits}</td>
                    </tr>
                    <tr>
                        <td>Rate:</td>
                        <td>{payslip.rate}</td>
                    </tr>
                    <tr>
                        <td>Amount:</td>
                        <td>{payslip.amount}</td>
                    </tr>
                    <tr>
                        <td>YTD Amount:</td>
                        <td>{payslip.ytdAmount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PayslipDetails;
