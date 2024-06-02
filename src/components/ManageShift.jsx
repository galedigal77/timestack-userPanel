import React, { useState, useEffect } from 'react';
import '../styles/ManageShift.css';

const sampleEmployeeShifts = [
    {
        id: 1,
        date: '2024-06-03',
        startTime: '09:00',
        endTime: '17:00',
    },
    {
        id: 2,
        date: '2024-06-04',
        startTime: '10:00',
        endTime: '18:00',
    },
];

const sampleOpenShifts = [
    {
        id: 3,
        date: '2024-06-05',
        startTime: '09:00',
        endTime: '17:00',
    },
    {
        id: 4,
        date: '2024-06-06',
        startTime: '10:00',
        endTime: '18:00',
    },
];

const ManageShift = () => {
    const [employeeShifts, setEmployeeShifts] = useState(sampleEmployeeShifts);
    const [openShifts, setOpenShifts] = useState(sampleOpenShifts);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Uncomment and use these lines to fetch data from the backend
        /*
        const fetchShifts = async () => {
          try {
            const employeeResponse = await axios.get('/employee-shifts');
            setEmployeeShifts(employeeResponse.data);
            
            const openResponse = await axios.get('/open-shifts');
            setOpenShifts(openResponse.data);
          } catch (error) {
            console.error('Error fetching shifts:', error);
          }
        };
    
        fetchShifts();
        */
    }, []);

    const handlePickup = (shiftId) => {
        setMessage(`Successfully picked up the shift with ID: ${shiftId}`);
        // Uncomment and use this part to send a pickup request to the backend
        /*
        try {
          const response = await axios.post(`/shifts/${shiftId}/pickup`);
          setMessage(response.data.message);
        } catch (error) {
          console.error('Error picking up shift:', error);
          setMessage('An error occurred while picking up the shift. Please try again.');
        }
        */
    };

    return (
        <div className="manage-shift-container">
            <h2>My Shifts</h2>
            {message && <p className="message">{message}</p>}
            <div className="shifts-list">
                {employeeShifts.map((shift) => (
                    <div key={shift.id} className="shift-item">
                        <h3>{shift.date}</h3>
                        <p>Time: {shift.startTime} - {shift.endTime}</p>
                    </div>
                ))}
            </div>

            <h2>Open Shifts</h2>
            <div className="shifts-list">
                {openShifts.map((shift) => (
                    <div key={shift.id} className="shift-item">
                        <h3>{shift.date}</h3>
                        <p>Time: {shift.startTime} - {shift.endTime}</p>
                        <button onClick={() => handlePickup(shift.id)}>Pick Up</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageShift;
