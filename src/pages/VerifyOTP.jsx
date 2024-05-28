import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { TbLoader } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { verifyOTP } from '../store/slices/authSlice';

const VerifyOTP = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    const validationSchema = object({
        otp: string().required('OTP is required'),
        email: string().email().required('Email is required'),
    });

    const verifyOTPFormik = useFormik({
        initialValues: {
            otp: "",
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            dispatch(verifyOTP(values));
        }
    });
    if (state.message == "Valid") return <Navigate to="/resetPass" replace={true} />

    return (
        <div className='flex justify-center items-center flex-col h-screen overflow-y-auto'>
            <div className="grid md:grid-cols-2 w-full h-full overflow-hidden gap-5 bg-white dark:bg-dark text-dark dark:text-light">
                <motion.form
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={verifyOTPFormik.handleSubmit} className="flex flex-col justify-center gap-y-8 gap-4 px-5 w-11/12 m-auto">
                    <h1 className="text-4xl text-main font-bold mb-5 text-center">Verify OTP</h1>
                    <div className="item space-y-1">
                        <label htmlFor="otp" className='text-lg font-medium'>OTP</label>
                        <input onBlur={verifyOTPFormik.handleBlur}
                            value={verifyOTPFormik.values.otp}
                            onChange={verifyOTPFormik.handleChange} name='otp' type="text" id='otp'
                            className="py-3 block w-full border-b border-black dark:border-light outline-none bg-transparent" placeholder="Enter OTP" />
                        {verifyOTPFormik.errors.otp && verifyOTPFormik.touched.otp ?
                            <div className=" py-1 text-warning">{verifyOTPFormik.errors.otp}</div>
                            : ""
                        }
                    </div>
                    <div className="item space-y-1">
                        <label htmlFor="email" className='text-lg font-medium'>Email</label>
                        <input onBlur={verifyOTPFormik.handleBlur}
                            value={verifyOTPFormik.values.email}
                            onChange={verifyOTPFormik.handleChange} name='email' type="email" id='email' className="py-3 w-full block border-b border-black dark:border-light outline-none bg-transparent" placeholder="Enter Email" />
                        {verifyOTPFormik.errors.email && verifyOTPFormik.touched.email ?
                            <div className=" py-1 text-warning">{verifyOTPFormik.errors.email}</div>
                            : ""
                        }
                    </div>
                    <button disabled={verifyOTPFormik.isValid && verifyOTPFormik.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-gradient-to-l to-second from-main hover:from-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Send"}</button>
                    {state.error && <div className='text-warning text-sm text-center p-2'>{state.error}</div>}
                    {state.success && <div className='text-success p-2'>{state.success.message}</div>}
                </motion.form>
                <motion.div
                    initial={{ x: 500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="rounded-l-[150px] bg-main flex-col justify-center items-center text-white gap-5 py-10 px-5 rounded-r-lg hidden md:flex">
                    <h1 className="text-4xl lg:text-5xl font-bold m-0 text-center">Forgot Your Password?</h1>
                    <p className="text-base lg:text-xl my-5 text-center">Enter your email and OTP that you have receive to reset your password.</p>
                    <Link to="/signin" className="p-2 lg:p-3 border rounded-3xl w-36 lg:w-48 text-center text-sm border-white uppercase hover:scale-90 duration-300">Back to Sign In</Link>
                </motion.div>
            </div>
        </div>
    )
}

export default VerifyOTP;