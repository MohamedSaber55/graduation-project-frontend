/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

const Settings = () => {
    const [firstName, setFirstName] = useState('Mohamed');
    const [lastName, setLastName] = useState('Saber');
    const [email] = useState('mohamed.saber.7753@gmail.com');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        if (password === '') {
            alert('Please enter your password to update your profile.');
            return;
        }
        // Normally, you would update the profile via an API call here.
        alert('Profile updated!');
    };

    const handlePictureChange = (file) => {
        const img = new Image();
        img.onload = () => {
            if (img.width === img.height) {
                setProfilePicture(URL.createObjectURL(file));
            } else {
                alert('Only square images are allowed.');
            }
        };
        img.src = URL.createObjectURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handlePictureChange(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handlePictureChange(file);
        }
    };

    return (
        <div className="settings bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen transition-colors duration-500 p-5">
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold mb-5">Settings</h1>

                <form onSubmit={handleProfileUpdate} className="bg-white dark:bg-dark p-5 rounded-md shadow-md mb-5">
                    <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-transparent border-main"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-transparent border-main"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            className="w-full px-3 py-2 border rounded-md border-main bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-transparent border-main"
                            required
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-main text-white rounded-md">Update Profile</button>
                </form>

                <div className="bg-white dark:bg-dark p-5 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Upload Profile Picture</h2>
                    <div
                        className={`border-dashed border-2 p-4 rounded-md text-center ${dragOver ? 'border-blue-500' : 'border-gray-400'}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="profilePictureInput"
                        />
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                        ) : (
                            <label htmlFor="profilePictureInput" className="cursor-pointer">
                                Drag 'n' drop a square profile picture here, or click to select one
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
