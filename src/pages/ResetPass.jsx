import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { object, ref, string } from 'yup';
import { useFormik } from 'formik';
import { TbLoader } from 'react-icons/tb';
import { motion } from 'framer-motion';
// import { resetPassword } from '../store/slices/authSlice';

const ResetPassword = () => {
    // const dispatch = useDispatch();
    const state = useSelector(state => state.user);

    const validationSchema = object({
        otp: string().required('OTP is required'),
        newPassword: string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
        confirmPassword: string()
            .oneOf([ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        email: string().email().required('Email is required'),
    });

    const resetPasswordFormik = useFormik({
        initialValues: {
            otp: "",
            newPassword: "",
            confirmPassword: "",
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // dispatch(resetPassword(values));
        }
    });

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
                        <label htmlFor="otp" className='text-lg font-medium'>OTP</label>
                        <input onBlur={resetPasswordFormik.handleBlur}
                            value={resetPasswordFormik.values.otp}
                            onChange={resetPasswordFormik.handleChange} name='otp' type="text" id='otp'
                            className="py-3 block w-full border-b border-black dark:border-light outline-none bg-transparent" placeholder="Enter OTP" />
                        {resetPasswordFormik.errors.otp && resetPasswordFormik.touched.otp ?
                            <div className=" py-1 text-warning">{resetPasswordFormik.errors.otp}</div>
                            : ""
                        }
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4">
                        <div className="item space-y-1">
                            <label htmlFor="newPassword" className='text-lg font-medium'>New Password</label>
                            <input onBlur={resetPasswordFormik.handleBlur}
                                value={resetPasswordFormik.values.newPassword}
                                onChange={resetPasswordFormik.handleChange} name='newPassword' type="password" id='newPassword' className="py-3 w-full block border-b border-black dark:border-light outline-none bg-transparent" placeholder="Enter New Password" />
                            {resetPasswordFormik.errors.newPassword && resetPasswordFormik.touched.newPassword ?
                                <div className=" py-1 text-warning">{resetPasswordFormik.errors.newPassword}</div>
                                : ""
                            }
                        </div>
                        <div className="item space-y-1">
                            <label htmlFor="confirmPassword" className='text-lg font-medium'>Confirm Password</label>
                            <input onBlur={resetPasswordFormik.handleBlur}
                                value={resetPasswordFormik.values.confirmPassword}
                                onChange={resetPasswordFormik.handleChange} name='confirmPassword' type="password" id='confirmPassword' className="py-3 w-full block border-b border-black dark:border-light outline-none bg-transparent" placeholder="Confirm New Password" />
                            {resetPasswordFormik.errors.confirmPassword && resetPasswordFormik.touched.confirmPassword ?
                                <div className=" py-1 text-warning">{resetPasswordFormik.errors.confirmPassword}</div>
                                : ""
                            }
                        </div>
                    </div>
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
                    <button disabled={resetPasswordFormik.isValid && resetPasswordFormik.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-gradient-to-l to-second from-main hover:from-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Reset Password"}</button>
                    {state.error && <div className='text-warning p-2'>{state.error.message}</div>}
                    {state.success && <div className='text-success p-2'>{state.success.message}</div>}
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