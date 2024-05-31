import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // Adjust the import path as needed
import '../styles/Timesheet.css';

const initialRows = [
    {
        project: '',
        hours: Array(7).fill(0), // Array representing hours for each day of the week
    },
];

const Timesheet = () => {
    const [rows, setRows] = useState(initialRows);
    const [week, setWeek] = useState('');
    const [weekRange, setWeekRange] = useState('');

    useEffect(() => {
        if (week) {
            const year = week.slice(0, 4);
            const weekNumber = week.slice(6);

            const getDateOfISOWeek = (week, year) => {
                const simple = new Date(year, 0, 1 + (week - 1) * 7);
                const dow = simple.getDay();
                const ISOWeekStart = simple;
                if (dow <= 4) ISOWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
                else ISOWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
                return ISOWeekStart;
            };

            const startOfWeek = getDateOfISOWeek(parseInt(weekNumber), parseInt(year));
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            const formattedStart = startOfWeek.toLocaleDateString('en-GB');
            const formattedEnd = endOfWeek.toLocaleDateString('en-GB');

            setWeekRange(`${formattedStart} - ${formattedEnd}`);
        }
    }, [week]);

    const handleChange = (rowIndex, dayIndex, value) => {
        const newRows = [...rows];
        newRows[rowIndex].hours[dayIndex] = parseFloat(value) || 0;
        setRows(newRows);
        saveTimesheet(newRows);
    };

    const saveTimesheet = async (data) => {
        try {
            await api.post('/timesheet', { week, rows: data });
            console.log('Timesheet saved');
        } catch (error) {
            console.error('Error saving timesheet:', error);
        }
    };

    const addRow = () => {
        setRows([...rows, { project: '', hours: Array(7).fill(0) }]);
    };

    const removeRow = (index) => {
        const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
        setRows(newRows);
        saveTimesheet(newRows);
    };

    return (
        <div className="timesheet-container">
            <h2>Timesheet</h2>
            <div>
                <label htmlFor="week-picker">Week: </label>
                <input
                    id="week-picker"
                    type="week"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                />
                {weekRange && <div>Week Range: {weekRange}</div>}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Projects</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <input
                                    type="text"
                                    value={row.project}
                                    onChange={(e) => {
                                        const newRows = [...rows];
                                        newRows[rowIndex].project = e.target.value;
                                        setRows(newRows);
                                        saveTimesheet(newRows);
                                    }}
                                />
                            </td>
                            {row.hours.map((hour, dayIndex) => (
                                <td key={dayIndex}>
                                    <input
                                        type="number"
                                        min="0"
                                        max="24"
                                        step="0.1"
                                        value={hour}
                                        onChange={(e) => handleChange(rowIndex, dayIndex, e.target.value)}
                                    />
                                </td>
                            ))}
                            <td>
                                {row.hours.reduce((total, hour) => total + hour, 0).toFixed(2)}
                            </td>
                            <td>
                                <button onClick={() => removeRow(rowIndex)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addRow}>Add new row</button>
        </div>
    );
};

export default Timesheet;
