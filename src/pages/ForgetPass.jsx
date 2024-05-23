// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { TbLoader } from 'react-icons/tb';
import { motion } from 'framer-motion';
// import { sendResetPasswordEmail } from '../store/slices/authSlice';

const ForgetPass = () => {
    // const dispatch = useDispatch();
    const state = useSelector(state => state.user);

    const validationSchema = object({
        email: string().email().required('Email is required'),
    });

    const forgetPasswordFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // dispatch(sendResetPasswordEmail(values.email));
        }
    });

    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <div className="grid md:grid-cols-2 w-full h-full overflow-hidden gap-5 bg-white dark:bg-dark text-dark dark:text-light">
                <motion.form
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={forgetPasswordFormik.handleSubmit} className="flex flex-col justify-center gap-y-5 gap-4 px-5 w-11/12 m-auto">
                    <h2 className="text-4xl text-main font-bold mb-5 text-center">Forget Password</h2>
                    <div className="item space-y-1">
                        <label htmlFor="email" className='text-xl font-medium'>Email</label>
                        <input onBlur={forgetPasswordFormik.handleBlur}
                            value={forgetPasswordFormik.values.email}
                            onChange={forgetPasswordFormik.handleChange} name='email' type="email" id='email' className="py-3 block w-full border-b border-black dark:border-light outline-none bg-transparent" placeholder="Email address" />
                        {forgetPasswordFormik.errors.email && forgetPasswordFormik.touched.email ?
                            <div className=" py-1 text-warning">{forgetPasswordFormik.errors.email}</div>
                            : ""
                        }
                    </div>
                    <button disabled={forgetPasswordFormik.isValid && forgetPasswordFormik.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-gradient-to-l to-second from-main hover:from-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Send Reset Email"}</button>
                    {state.error && <div className='text-warning p-2'>{state.error.message}</div>}
                    {state.success && <div className='text-success p-2'>{state.success.message}</div>}
                </motion.form>
                <motion.div
                    initial={{
                        x: 500,
                        opacity: 0
                    }}
                    whileInView={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="rounded-l-[150px] bg-main hidden md:flex flex-col justify-center items-center text-white gap-5 py-10 px-5">
                    <h2 className="text-4xl lg:text-5xl font-bold m-0 text-center">Forgot Your Password?</h2>
                    <p className="text-base lg:text-xl my-5 text-center">Enter your email address to receive OTP number</p>
                    <Link to="/signin" className="p-2 lg:p-3 border rounded-3xl w-36 lg:w-48 text-center text-sm border-white uppercase  hover:scale-90 duration-300" id="signIn">Sign in</Link>
                </motion.div>
            </div>
        </div>
    )
}

export default ForgetPass;
