import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/Help.css';

const Help = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        question: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the backend API
            const response = await axios.post('/help', formData);
            setMessage('Your question has been submitted successfully!');
            setFormData({ name: '', email: '', question: '' });
        } catch (error) {
            console.error('Error submitting question:', error);
            setError('An error occurred while submitting your question. Please try again.');
        }
    };

    return (
        <div className="help-container">
            <h2>Help</h2>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="help-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <textarea
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Help;
