import React, { useState, useEffect } from "react";
import api from "../api/axios"; // Adjust the import path as needed
import "../styles/TimeTracker.css";

const TimeTracker = () => {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [breakStartTime, setBreakStartTime] = useState("");
    const [breakEndTime, setBreakEndTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");
    const [isTiming, setIsTiming] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalHours, setTotalHours] = useState("");

    useEffect(() => {
        let timer;
        if (isTiming) {
            timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isTiming]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const calculateTotalHours = () => {
        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const breakStart = breakStartTime ? new Date(`${date}T${breakStartTime}`) : null;
        const breakEnd = breakEndTime ? new Date(`${date}T${breakEndTime}`) : null;

        let total = (end - start) / 1000; // total seconds

        if (breakStart && breakEnd) {
            total -= (breakEnd - breakStart) / 1000;
        }

        setTotalHours(formatTime(total));
    };

    const handlePunchIn = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/attendances/punch-in', {
                attendance_date: date,
                start_time: startTime,
            });

            if (response.status === 200) {
                setMessage("Punched in successfully!");
                setIsTiming(true);
                setElapsedTime(0);
            } else {
                setMessage("Failed to punch in.");
            }
        } catch (error) {
            console.error("Error punching in:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    const handlePunchOut = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/attendances/punch-out', {
                attendance_date: date,
                end_time: endTime,
                break_start_time: breakStartTime,
                break_end_time: breakEndTime,
            });

            if (response.status === 200) {
                setMessage("Punched out successfully!");
                setIsTiming(false);
                calculateTotalHours();
            } else {
                setMessage("Failed to punch out.");
            }
        } catch (error) {
            console.error("Error punching out:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    const handleStartBreak = () => {
        setBreakStartTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        setIsBreak(true);
    };

    const handleEndBreak = () => {
        setBreakEndTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        setIsBreak(false);
    };

    return (
        <div className="time-tracker">
            <h2>Time Tracker</h2>
            <div className="timer">
                <h3>Elapsed Time: {formatTime(elapsedTime)}</h3>
                <h3>Total Hours: {totalHours}</h3>
            </div>
            <form onSubmit={handlePunchIn} className="time-tracker-form">
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="time"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Punch In</button>
            </form>

            <div className="break-controls">
                <button onClick={handleStartBreak} className="btn btn-warning" disabled={isBreak}>Start Break</button>
                <button onClick={handleEndBreak} className="btn btn-warning" disabled={!isBreak}>End Break</button>
            </div>

            <form onSubmit={handlePunchOut} className="time-tracker-form">
                <div className="form-group">
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        type="time"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        disabled={!isTiming}
                    />
                </div>
                <button type="submit" className="btn btn-secondary" disabled={!isTiming}>Punch Out</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default TimeTracker;
