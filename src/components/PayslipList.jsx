import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import '../styles/PayslipList.css';

const samplePayslips = [
    {
        id: 1,
        idNumber: '137163',
        name: 'N Shakya',
        periodOfPayment: '08/04/24 - 21/04/24',
        paidOnDate: '24/04/24',
        netPay: '$1,732.87',
    },
    {
        id: 1,
        idNumber: '137163',
        name: 'N Shakya',
        periodOfPayment: '22/04/24 - 05/05/24',
        paidOnDate: '08/05/24',
        netPay: '$1,800.00',
    },
    {
        id: 1,
        idNumber: '137163',
        name: 'N Shakya',
        periodOfPayment: '06/05/24 - 19/05/24',
        paidOnDate: '22/05/24',
        netPay: '$1,650.00',
    },
];

const PayslipList = () => {
    const [payslips, setPayslips] = useState(samplePayslips);

    // useEffect(() => {
    //     const fetchPayslips = async () => {
    //         try {
    //             const response = await api.get('/payslips'); 
    //             setPayslips(response.data);
    //         } catch (error) {
    //             console.error('Error fetching payslips:', error);
    //         }
    //     };

    //     fetchPayslips();
    // }, []);

    return (
        <div className="payslip-list-container">
            <h2>Payslips</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Number</th>
                        <th>Name</th>
                        <th>Period of Payment</th>
                        <th>Paid on Date</th>
                        <th>Net Pay</th>
                    </tr>
                </thead>
                <tbody>
                    {payslips.map(payslip => (
                        <tr key={payslip.id}>
                            <td>
                                <Link to={`/payslip-details/${payslip.id}`}>{payslip.idNumber}</Link>
                            </td>
                            <td>{payslip.name}</td>
                            <td>{payslip.periodOfPayment}</td>
                            <td>{payslip.paidOnDate}</td>
                            <td>{payslip.netPay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayslipList;
