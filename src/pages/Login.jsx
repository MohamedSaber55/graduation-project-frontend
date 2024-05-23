import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { TbLoader } from 'react-icons/tb'
import { motion } from "framer-motion"
import { login } from '../store/slices/authSlice'

const Login = () => {
    const [passType, setPassType] = useState(true)
    const dispatch = useDispatch()
    const state = useSelector(state => state.user)

    const validationSchema = object({
        email: string().email().required(),
        password: string().matches(/^(?=.*[A-Za-z])(?=.*\d)*([@$!%*#?&])*[A-Za-z\d@$!%*#?&.]{6,32}$/, "password have to be 6 : 32 character and can contain special characters").required(),
    });

    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            dispatch(login(values))
        }
    })

    if (state.token) return <Navigate to="/" replace={true} />

    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <div className="grid grid-cols-2 w-full h-full overflow-hidden gap-5 bg-white dark:bg-dark text-dark dark:text-light">
                <motion.form
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={loginFormik.handleSubmit} className=" col-span-2 sm:col-span-1 flex flex-col justify-center gap-y-5 gap-4 px-5 w-11/12 m-auto">
                    <h1 className="text-4xl text-main font-bold mb-5 text-center">Login</h1>
                    {/* {state.loginError && <div className='text-warning p-2'>{state.loginError}</div>} */}
                    <label htmlFor="email" className='text-xl font-medium'>Email</label>
                    <input onBlur={loginFormik.handleBlur}
                        value={loginFormik.values.email}
                        onChange={loginFormik.handleChange} name='email' type="email" id='email' className="py-3  border-b border-black dark:border-light outline-none bg-transparent" placeholder="Email address" />
                    {loginFormik.errors.email && loginFormik.touched.email ?
                        <div className=" py-1 text-warning">{loginFormik.errors.email}</div>
                        : ""
                    }
                    <label htmlFor="password" className='text-xl font-medium mt-5'>Password</label>
                    <div className="w-full relative ">
                        <input onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.password}
                            onChange={loginFormik.handleChange} id='password' name='password' type={passType ? "password" : "text"} className="w-full py-3  border-b border-black dark:border-light outline-none bg-transparent" placeholder="Enter your password" />
                        <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                    </div>
                    {loginFormik.errors.password && loginFormik.touched.password ?
                        <div className=" py-1 text-warning">{loginFormik.errors.password}</div> : ""}
                    <Link to="/forgetpass" className="text-main text-sm mb-4 hover:text-dark dark:hover:text-light text-right">Forgot your password?</Link>
                    <button disabled={loginFormik.isValid && loginFormik.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-gradient-to-l to-second from-main hover:from-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Login"}</button>
                    {state.error && <div className='text-warning p-2'>{state.error.message}</div>}
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
                    className="col-span-1 rounded-l-[150px] bg-main hidden md:flex flex-col justify-center items-center text-white gap-5 py-10 px-5">
                    <h1 className="text-4xl lg:text-5xl font-bold m-0 text-center">Hello, Friend!</h1>
                    <p className="text-base lg:text-xl my-5 text-center">Register with  your personal details <br /> to use all of site features</p>
                    <Link to="/signup" className="p-2 lg:p-3 border rounded-3xl w-36 lg:w-48 text-center text-sm border-white uppercase  hover:scale-90 duration-300" id="signUp">Sign Up</Link>
                </motion.div>
            </div>
        </div>
    )
}

export default Login