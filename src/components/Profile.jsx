import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        address: '',
        location: '',
        gender: '',
        nationality: '',
        emergencyContact: '',
    });
    const [message, setMessage] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        Object.keys(profile).forEach((key) => {
            formData.append(key, profile[key]);
        });

        try {
            const response = await axios.post('/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('An error occurred while updating your profile. Please try again.');
        }
    };

    return (
        <div className="profile-container">
            <h2>Edit Profile</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="profile-photo">
                    <label>Profile photo</label>
                    <div className="profile-photo-upload">
                        {profileImage ? (
                            <img src={URL.createObjectURL(profileImage)} alt="Profile" />
                        ) : (
                            <div className="profile-photo-placeholder">No photo chosen</div>
                        )}
                        <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
                        <button type="button" onClick={() => setProfileImage(null)}>Remove</button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <select id="location" name="location" value={profile.location} onChange={handleChange}>
                        <option value="">-Select your country-</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="UK">UK</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={profile.nationality}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emergencyContact">Emergency Contact</label>
                    <input
                        type="tel"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={profile.emergencyContact}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-buttons">
                    <button type="button" className="cancel-button">Cancel</button>
                    <button type="submit" className="save-button">Save Profile</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
