import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mixed, object, ref, string } from 'yup';
import { useFormik } from 'formik';
import { TbLoader } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { register } from '../store/slices/authSlice';
import { IoCloudUploadOutline } from 'react-icons/io5';

const Register = () => {
    const [passType, setPassType] = useState(true);
    const state = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);

    const validationSchema = object({
        firstName: string().required('First name is required'),
        lastName: string().required('Last name is required'),
        email: string().email('Invalid email address').required('Email is required'),
        password: string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,32}$/, 'Password must be 6 to 32 characters long and can contain special characters').required('Password is required'),
        confirmPassword: string().oneOf([ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        imageFile: mixed().optional(),
    });

    const registerFormik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            imageFile: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(register(values));
            if (register.fulfilled.match(result)) {
                return <Navigate to="/signin" replace={true} />;
            }
        }
    });

    const handleChange = (event) => {
        const { name, files } = event.target;

        if (name === 'imageFile' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                registerFormik.setFieldValue('imageFile', files[0]);
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
                registerFormik.setFieldValue('imageFile', files[0]);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    // if (state.message === "Email verification has been sent to your email successfully. Please verify it!") {
    //     return <Navigate to="/signin" replace={true} />;
    // }

    if (state.token) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className='flex justify-center items-center flex-col min-h-screen'>
            <div className="grid grid-cols-2 w-full min-h-screen overflow-hidden gap-5 bg-white dark:bg-dark text-dark dark:text-light">
                <motion.form
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={registerFormik.handleSubmit}
                    className="col-span-2 md:col-span-1 flex flex-col justify-center gap-y-5 gap-4 px-5 w-11/12 m-auto"
                >
                    <div className="text-center mb-5">
                        <h1 className="text-3xl text-main font-bold mb-2">Create Your Account</h1>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Please, enter your personal details below.</p>
                    </div>
                    {state.error && <div className='text-sm text-warning text-center'>{state.error}</div>}
                    <div className="image">
                        <div className="item space-y-2">
                            <div className="uploadImage mb-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                                <label htmlFor="fileInput" className="cursor-pointer block w-full h-64 border rounded-md overflow-hidden bg-white dark:bg-dark border-main">
                                    {imagePreview ? (
                                        <div className="text-gray-600 flex items-center justify-center h-64 text-center">
                                            <img
                                                src={imagePreview}
                                                alt="Uploaded Image"
                                                className="object-cover aspect-video w-fit h-full"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-gray-600 flex items-center justify-center h-64 text-center">
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
                    <p className='font-medium text-base'>Enter your name</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="f-name">
                            <input
                                onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.firstName}
                                onChange={registerFormik.handleChange}
                                name='firstName'
                                type="text"
                                id='firstName'
                                className="w-full py-3 border-b border-black dark:border-light outline-none bg-transparent"
                                placeholder="First Name"
                            />
                            {registerFormik.errors.firstName && registerFormik.touched.firstName ? (
                                <div className="py-1 text-warning">{registerFormik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <div className="l-name">
                            <input
                                onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.lastName}
                                onChange={registerFormik.handleChange}
                                name='lastName'
                                type="text"
                                id='lastName'
                                className="w-full py-3 border-b border-black dark:border-light outline-none bg-transparent"
                                placeholder="Last Name"
                            />
                            {registerFormik.errors.lastName && registerFormik.touched.lastName ? (
                                <div className="py-1 text-warning">{registerFormik.errors.lastName}</div>
                            ) : null}
                        </div>
                    </div>
                    <p className='font-medium text-base pt-4'>Enter your email</p>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                        <div className="email">
                            <input
                                onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.email}
                                onChange={registerFormik.handleChange}
                                name='email'
                                type="email"
                                id='email'
                                className="w-full py-3 border-b border-black dark:border-light outline-none bg-transparent"
                                placeholder="Email"
                            />
                            {registerFormik.errors.email && registerFormik.touched.email ? (
                                <div className="py-1 text-warning">{registerFormik.errors.email}</div>
                            ) : null}
                        </div>
                    </div>
                    <p className='font-medium text-base pt-4'>Enter your Password</p>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                        <div className="pass">
                            <div className="w-full relative">
                                <input
                                    onBlur={registerFormik.handleBlur}
                                    value={registerFormik.values.password}
                                    onChange={registerFormik.handleChange}
                                    id='password'
                                    name='password'
                                    type={passType ? "password" : "text"}
                                    className="w-full py-3 border-b border-black dark:border-light outline-none bg-transparent"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type='button'
                                    className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main'
                                    onClick={() => setPassType(!passType)}
                                >
                                    {passType ? <BsEye /> : <BsEyeSlash />}
                                </button>
                            </div>
                            {registerFormik.errors.password && registerFormik.touched.password ? (
                                <div className="py-1 text-warning">{registerFormik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="c-pass">
                            <div className="w-full relative">
                                <input
                                    onBlur={registerFormik.handleBlur}
                                    value={registerFormik.values.confirmPassword}
                                    onChange={registerFormik.handleChange}
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type={passType ? "password" : "text"}
                                    className="w-full py-3 border-b border-black dark:border-light outline-none bg-transparent"
                                    placeholder="Confirm password"
                                />
                                <button
                                    type='button'
                                    className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main'
                                    onClick={() => setPassType(!passType)}
                                >
                                    {passType ? <BsEye /> : <BsEyeSlash />}
                                </button>
                            </div>
                            {registerFormik.errors.confirmPassword && registerFormik.touched.confirmPassword ? (
                                <div className="py-1 text-warning">{registerFormik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                    </div>
                    <button
                        disabled={!registerFormik.isValid || !registerFormik.dirty || state.loading}
                        type='submit'
                        className={`p-3 w-56 m-auto text-sm bg-gradient-to-l to-second from-main hover:from-transparent text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center ${state.loading && 'cursor-not-allowed'}`}
                    >
                        {state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Sign Up"}
                    </button>
                    <div className='text-center'>
                        <p>Already have an account? <Link className='text-main' to="/signin">Sign in</Link></p>
                    </div>
                </motion.form>
                <motion.div
                    initial={{ x: 500, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="col-span-1 rounded-l-[150px] bg-main hidden lg:flex flex-col justify-center items-center gap-5 text-white py-10 px-5"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold m-0 text-center">Welcome Back!</h1>
                    <p className="text-base lg:text-xl my-5 text-center">To keep connecting with us please login with your personal info</p>
                    <Link to="/signin" className="p-2 lg:p-3 border rounded-3xl w-36 lg:w-48 text-center text-sm border-white uppercase hover:scale-90 duration-300" id="signUp">Sign In</Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;