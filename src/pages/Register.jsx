import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { useFormik } from 'formik'
// import { Register } from '../../Redux/slices/authSlice'
import { TbLoader } from 'react-icons/tb'
import { motion } from "framer-motion"

const Register = () => {
    const [passType, setPassType] = useState(true)
    // const dispatch = useDispatch()
    const state = useSelector(state => state.user)

    const validationSchema = object({
        email: string().email().required(),
        password: string().matches(/^(?=.*[A-Za-z])(?=.*\d)*([@$!%*#?&])*[A-Za-z\d@$!%*#?&.]{6,32}$/, "password have to be 6 : 32 character and can contain special characters").required(),
    });

    const registerFormik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            country: "",
            city: "",
            gender: "",
            password: "",
            cPass: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            // dispatch(Register(values))
            // dispatch(getAllPosts())
        }
    })

    if (state.token) return <Navigate to="/" replace={true} />

    return (
        <div className='flex justify-center items-center flex-col min-h-screen'>
            <div className="grid grid-cols-2 w-full min-h-screen overflow-hidden gap-5 bg-white dark:bg-dark text-dark dark:text-light">
                <motion.form
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={registerFormik.handleSubmit} className="col-span-2 lg:col-span-1 flex flex-col justify-center gap-y-4 p-10 w-full m-auto ">
                    <div className="text-center mb-5">
                        <h1 className="text-3xl text-main font-bold mb-2">Create Your Account</h1>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Please, Enter your personal details blow.</p>
                    </div>
                    {state.RegisterError && <div className='text-warning p-2'>{state.RegisterError}</div>}
                    <p className='font-medium text-base'>Enter your name</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="f-name">
                            <input onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.first_name}
                                onChange={registerFormik.handleChange} name='first_name' type="text" id='first_name' className="w-full py-3  border-b border-black dark:border-light outline-none bg-transparent" placeholder="First Name" />
                            {registerFormik.errors.first_name && registerFormik.touched.first_name ?
                                <div className=" py-1 text-warning">{registerFormik.errors.first_name}</div>
                                : ""
                            }
                        </div>
                        <div className="l-name">
                            <input onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.last_name}
                                onChange={registerFormik.handleChange} name='last_name' type="text" id='last_name' className="w-full py-3  border-b border-black dark:border-light outline-none bg-transparent" placeholder="Last Name" />
                            {registerFormik.errors.last_name && registerFormik.touched.last_name ?
                                <div className=" py-1 text-warning">{registerFormik.errors.last_name}</div>
                                : ""
                            }
                        </div>
                    </div>
                    <p className='font-medium text-base pt-4' >Enter your email & phone</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="email">
                            <input onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.email}
                                onChange={registerFormik.handleChange} name='email' type="email" id='email' className="w-full py-3  border-b border-black dark:border-light outline-none bg-transparent" placeholder="Email" />
                            {registerFormik.errors.email && registerFormik.touched.email ?
                                <div className=" py-1 text-warning">{registerFormik.errors.email}</div>
                                : ""
                            }
                        </div>
                        <div className="phone">
                            <input onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.phone}
                                onChange={registerFormik.handleChange} name='phone' type="text" id='phone' className="w-full py-3  border-b border-black  dark:border-light outline-none bg-transparent" placeholder="Phone" />
                            {registerFormik.errors.phone && registerFormik.touched.phone ?
                                <div className=" py-1 text-warning">{registerFormik.errors.phone}</div>
                                : ""
                            }
                        </div>
                    </div>
                    <p className='font-medium text-base pt-4' >Enter your address</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="country">
                            <input onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.country}
                                onChange={registerFormik.handleChange} name='country' type="text" id='country' className="w-full py-3  border-b border-black  dark:border-light outline-none bg-transparent" placeholder="Country" />
                            {registerFormik.errors.country && registerFormik.touched.country ?
                                <div className=" py-1 text-warning">{registerFormik.errors.country}</div>
                                : ""
                            }
                        </div>
                        <div className="phone">
                            <input onBlur={registerFormik.handleBlur}
                                value={registerFormik.values.city}
                                onChange={registerFormik.handleChange} name='city' type="text" id='city' className="w-full py-3  border-b border-black  dark:border-light outline-none bg-transparent" placeholder="City" />
                            {registerFormik.errors.city && registerFormik.touched.city ?
                                <div className=" py-1 text-warning">{registerFormik.errors.city}</div>
                                : ""
                            }
                        </div>
                    </div>
                    <p className='font-medium text-base pt-4' >Enter your Password</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="pass">
                            <div className="w-full relative ">
                                <input onBlur={registerFormik.handleBlur}
                                    value={registerFormik.values.password}
                                    onChange={registerFormik.handleChange} id='password' name='password' type={passType ? "password" : "text"} className="w-full py-3  border-b border-black  dark:border-light outline-none bg-transparent" placeholder="Enter your password" />
                                <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                            </div>
                            {registerFormik.errors.password && registerFormik.touched.password ?
                                <div className=" py-1 text-warning">{registerFormik.errors.password}</div> : ""}
                        </div>
                        <div className="c-pass">
                            <div className="w-full relative ">
                                <input onBlur={registerFormik.handleBlur}
                                    value={registerFormik.values.cPass}
                                    onChange={registerFormik.handleChange} id='cPass' name='cPass' type={passType ? "password" : "text"} className="w-full py-3  border-b border-black  dark:border-light outline-none bg-transparent" placeholder="Enter your cPass" />
                                <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                            </div>
                            {registerFormik.errors.cPass && registerFormik.touched.cPass ?
                                <div className=" py-1 text-warning">{registerFormik.errors.cPass}</div> : ""}
                        </div>
                    </div>
                    <div className="gender w-full flex gap-4 my-4 items-center">
                        <p className='font-medium text-base mr-6'>Select your gender</p>
                        <div className="col-span-1 flex gap-2">
                            <input name="gender" value="male" onChange={registerFormik.handleChange} type="radio" id="male-input" className="select-none" />
                            <label htmlFor="male-input" className="select-none">Male</label>
                        </div>
                        <div className="col-span-1 flex gap-2">
                            <input name="gender" value="female" onChange={registerFormik.handleChange} type="radio" id="female-input" className="select-none" />
                            <label htmlFor="male-input" className="select-none">Female</label>
                        </div>
                        {registerFormik.errors.gender && registerFormik.touched.gender ?
                            <div className=" py-1 text-warning">{registerFormik.errors.gender}</div>
                            : ""
                        }
                    </div>
                    <button disabled={registerFormik.isValid && registerFormik.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-gradient-to-l to-second from-main hover:from-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Sign Up"}</button>
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
                    className="col-span-1 rounded-l-[150px] bg-main hidden lg:flex flex-col justify-center items-center gap-5 text-white py-10 px-5">
                    <h1 className="text-4xl lg:text-5xl font-bold m-0 text-center">Welcome Back!</h1>
                    <p className="text-base lg:text-xl my-5 text-center">To keep connecting with us  please <br />
                        login with your personnal info</p>
                    <Link to="/signin" className="p-2 lg:p-3 border rounded-3xl w-36 lg:w-48 text-center text-sm border-white uppercase  hover:scale-90 duration-300" id="signUp">Sign In</Link>
                </motion.div>
            </div>
        </div>
    )
}

export default Register