import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { object, ref, string } from 'yup';
import { useFormik } from 'formik';
import { TbLoader } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { resetPassword } from '../store/slices/authSlice';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const ResetPassword = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    console.log(state);
    const [passType, setPassType] = useState(true)

    const validationSchema = object({
        password: string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
        confirmPassword: string()
            .oneOf([ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        email: string().email().required('Email is required'),
    });

    const resetPasswordFormik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            dispatch(resetPassword(values));
        }
    });
    if (state.message == "Password reset successfully.") {
        return <Navigate to={"/signin"} replace={true} />
    }

    return (
        <div className='flex justify-center items-center flex-col h-screen overflow-y-auto'>
            <div className="grid md:grid-cols-2 w-full h-full overflow-hidden gap-5 bg-white dark:bg-dark text-dark dark:text-light">
                <motion.form
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={resetPasswordFormik.handleSubmit} className="flex flex-col justify-center gap-y-8 gap-4 px-5 w-11/12 m-auto">
                    <h1 className="text-4xl text-main font-bold mb-5 text-center">Reset Password</h1>
                    <div className="item space-y-1">
                        <label htmlFor="email" className='text-lg font-medium'>Email</label>
                        <input onBlur={resetPasswordFormik.handleBlur}
                            value={resetPasswordFormik.values.email}
                            onChange={resetPasswordFormik.handleChange} name='email' type="email" id='email' className="py-3 w-full block border-b border-black dark:border-light outline-none bg-transparent" placeholder="Enter Email" />
                        {resetPasswordFormik.errors.email && resetPasswordFormik.touched.email ?
                            <div className=" py-1 text-warning">{resetPasswordFormik.errors.email}</div>
                            : ""
                        }
                    </div>
                    <div className="grid lg:grid-cols-1 gap-4">
                        <div className="item space-y-1">
                            <label htmlFor="password" className='text-xl font-medium mt-5'>Password</label>
                            <div className="w-full relative ">
                                <input onBlur={resetPasswordFormik.handleBlur}
                                    value={resetPasswordFormik.values.password}
                                    onChange={resetPasswordFormik.handleChange} id='password' name='password' type={passType ? "password" : "text"} className="w-full py-3  border-b border-black dark:border-light outline-none bg-transparent" placeholder="Enter your password" />
                                <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                            </div>
                            {resetPasswordFormik.errors.password && resetPasswordFormik.touched.password ?
                                <div className=" py-1 text-warning">{resetPasswordFormik.errors.password}</div> : ""}
                        </div>
                        <div className="item space-y-1">
                            <label htmlFor="confirmPassword" className='text-xl font-medium mt-5'>confirmPassword</label>
                            <div className="w-full relative ">
                                <input onBlur={resetPasswordFormik.handleBlur}
                                    value={resetPasswordFormik.values.confirmPassword}
                                    onChange={resetPasswordFormik.handleChange} id='confirmPassword' name='confirmPassword' type={passType ? "password" : "text"} className="w-full py-3  border-b border-black dark:border-light outline-none bg-transparent" placeholder="Confirm password" />
                                <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                            </div>
                            {resetPasswordFormik.errors.confirmPassword && resetPasswordFormik.touched.confirmPassword ?
                                <div className=" py-1 text-warning">{resetPasswordFormik.errors.confirmPassword}</div> : ""}
                        </div>
                    </div>
                    <button disabled={resetPasswordFormik.isValid && resetPasswordFormik.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-gradient-to-l to-second from-main hover:from-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Reset Password"}</button>
                    {state.error && <div className='text-warning p-2'>{state.error.message}</div>}
                    {/* {state.success && <div className='text-success p-2'>{state.success.message}</div>} */}
                </motion.form>
                <motion.div
                    initial={{ x: 500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="rounded-l-[150px] bg-main flex-col justify-center items-center text-white gap-5 py-10 px-5 rounded-r-lg hidden md:flex">
                    <h1 className="text-4xl lg:text-5xl font-bold m-0 text-center">Forgot Your Password?</h1>
                    <p className="text-base lg:text-xl my-5 text-center">Enter your email address below to receive instructions on how to reset your password.</p>
                    <Link to="/signin" className="p-2 lg:p-3 border rounded-3xl w-36 lg:w-48 text-center text-sm border-white uppercase hover:scale-90 duration-300">Back to Sign In</Link>
                </motion.div>
            </div>
        </div>
    )
}

export default ResetPassword;