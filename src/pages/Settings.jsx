import { useState } from 'react';
// import avatar from "./../assets/avatar.png";
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../store/slices/themeSlice';

const Settings = () => {
    const [name, setName] = useState('Mohamed Saber');
    const [email, setEmail] = useState('mohamed.saber.7753@gmail.com');
    // const theme = useSelector((state) => state.theme.theme);
    // const dispatch = useDispatch();

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // Normally, you would update the profile via an API call here.
        alert('Profile updated!');
    };

    // const handleThemeChange = (selectedTheme) => {
    //     if (selectedTheme !== theme) {
    //         dispatch(toggleTheme());
    //     }
    // };

    return (
        <div className="settings bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen transition-colors duration-500 p-5">
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold mb-5">Settings</h1>

                <form onSubmit={handleProfileUpdate} className="bg-white dark:bg-dark p-5 rounded-md shadow-md mb-5">
                    <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-main text-white rounded-md">Update Profile</button>
                </form>

                {/* <div className="bg-white dark:bg-dark p-5 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Select Theme</h2>
                    <div className="flex justify- space-x-4">
                        <button
                            className={`px-4 py-2 rounded-md ${theme === 'light' ? 'bg-main text-white' : 'bg-gray-300 dark:bg-gray-700 text-dark dark:text-light'}`}
                            onClick={() => handleThemeChange('light')}
                        >
                            Light Theme
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-main text-white' : 'bg-gray-300 dark:bg-gray-700 text-dark dark:text-light'}`}
                            onClick={() => handleThemeChange('dark')}
                        >
                            Dark Theme
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Settings;
