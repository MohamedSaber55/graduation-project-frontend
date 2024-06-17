import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { mixed, object, string } from 'yup';
import { toggleTheme } from '../store/slices/themeSlice';
import { getUserById, updateProfile } from '../store/slices/authSlice';

const userId = localStorage.getItem("trackerUserId");

const Settings = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isFormReady, setIsFormReady] = useState(false);
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const state = useSelector((state) => state.user);
    const token = state.token;
    const user = state.user;

    useEffect(() => {
        dispatch(getUserById({ token: state.token, userId: state.userId })).then(() => {
            setIsFormReady(true);
        });
    }, [dispatch, state.token, state.userId]);

    const changeTheme = () => {
        dispatch(toggleTheme());
    };

    const validationSchema = object({
        firstName: string().optional(),
        lastName: string().optional(),
        imageFile: mixed().optional(),
    });

    const updateProfileFormik = useFormik({
        initialValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            imageFile: null,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const filteredValues = Object.fromEntries(
                Object.entries(values).filter(([, value]) => value !== "")
            );
            dispatch(updateProfile({ body: filteredValues, token, userId }));
        },
    });

    const handleChange = (event) => {
        const { name, files } = event.target;

        if (name === 'imageFile' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                updateProfileFormik.setFieldValue('imageFile', files[0]);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const { files } = event.dataTransfer;

        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                updateProfileFormik.setFieldValue('imageFile', files[0]);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <div className="settings bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen transition-colors p-5">
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold mb-5">Settings</h1>
                {!isFormReady ? (
                    <div>Loading...</div>
                ) : (
                    <form onSubmit={updateProfileFormik.handleSubmit} className="bg-white dark:bg-dark p-5 rounded-md shadow-md mb-5">
                        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name='firstName'
                                    placeholder='First Name'
                                    value={updateProfileFormik.values.firstName}
                                    onChange={updateProfileFormik.handleChange}
                                    onBlur={updateProfileFormik.handleBlur}
                                    className="w-full px-3 py-2 border rounded-md bg-transparent border-main"
                                    required
                                />
                            </div>
                            <div className="">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name='lastName'
                                    placeholder='Last Name'
                                    value={updateProfileFormik.values.lastName}
                                    onChange={updateProfileFormik.handleChange}
                                    onBlur={updateProfileFormik.handleBlur}
                                    className="w-full px-3 py-2 border rounded-md bg-transparent border-main"
                                    required
                                />
                            </div>
                        </div>
                        <div className="image">
                            <div className="item space-y-2">
                                <div className="uploadImage mb-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                                    <label htmlFor="fileInput" className="cursor-pointer block w-full h-48 border rounded-md overflow-hidden bg-white dark:bg-dark border-main">
                                        {imagePreview ? (
                                            <div className="text-gray-600 flex items-center justify-center h-48 text-center">
                                                <img
                                                    src={imagePreview}
                                                    alt="Uploaded Image"
                                                    className="object-cover aspect-square rounded-full w-fit h-full"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-gray-600 flex items-center justify-center h-48 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <IoCloudUploadOutline className="text-main" size={48} />
                                                    <p className="text-lg font-semibold">Drag & drop your image here or Browse</p>
                                                    <span className="bg-main mt-3 text-lg py-2 px-4 text-white dark:hover:text-light hover:text-dark hover:bg-transparent border border-main rounded-xl duration-150">Upload Image</span>
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                    <input
                                        type="file"
                                        name="imageFile"
                                        id="fileInput"
                                        className="hidden"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-main text-white rounded-md">{state.loading ? "Loading..." : "Update Profile"}</button>
                    </form>
                )}
                <div className="theme bg-white dark:bg-dark p-5 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Select Theme</h2>
                    <div className="flex gap-4">
                        <button onClick={changeTheme} className={`px-4 py-2 ${theme === "light" ? "bg-main text-white" : "dark:bg-dark-light bg-light"} shadow rounded-md`}>Light Mode</button>
                        <button onClick={changeTheme} className={`px-4 py-2 ${theme === "dark" ? "bg-main text-white" : "dark:bg-dark-light bg-light"} shadow rounded-md`}>Dark Mode</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
