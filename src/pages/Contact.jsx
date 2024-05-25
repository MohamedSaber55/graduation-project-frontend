import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { useFormik } from "formik";
import { TbLoader } from "react-icons/tb";
import { motion } from "framer-motion";
import contactPhoto from "./../assets/contact.jpg";
import { addComplaint } from "../store/slices/complianSlice";
const Contact = () => {
    const state = useSelector((state) => state.complain);
    const dispatch = useDispatch()
    const validationSchema = object({
        first_name: string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name is required'),
        last_name: string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required'),
        // email: string()
        //     .email('Invalid email address')
        //     .matches(/@(gmail|yahoo|outlook)\.com$/, 'Email must be from Gmail or Yahoo or Outlook')
        //     .required('Email is required'),
        phone: string()
            .matches(/^(010|011|012|015)\d{8}$/, 'Phone number must be a valid Egyptian mobile number')
            .required('Phone number is required'),
        message: string()
            .max(200, 'Message must be less than 200 characters')
            .required('Message is required'),
    });

    const contactForm = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            // email: "",
            phone: "",
            message: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            dispatch(addComplaint(values))
        },
    });

    return (
        <div className="flex justify-center items-center flex-col min-h-screen bg-light dark:bg-dark-light text-dark dark:text-light">
            <div className="container py-5">
                <div className="grid grid-cols-2 w-full overflow-hidden gap-5">
                    <motion.form
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={contactForm.handleSubmit}
                        className="col-span-2 lg:col-span-1 space-y-3 pt-4"
                    >
                        <div className="text-start mb-3">
                            <h2 className="text-4xl  font-bold mb-2">Get in touch</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                our friendly team would love to hear from you.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="f-name">
                                <label htmlFor="first_name" className=" font-bold">
                                    First name
                                </label>
                                <input
                                    onBlur={contactForm.handleBlur}
                                    value={contactForm.values.first_name}
                                    onChange={contactForm.handleChange}
                                    name="first_name"
                                    type="text"
                                    id="first_name"
                                    className="w-full py-3 mt-3 border-main rounded-md px-3 border bg-transparent"
                                    placeholder="First Name"
                                />
                                {contactForm.errors.first_name &&
                                    contactForm.touched.first_name ? (
                                    <div className=" py-1 text-warning">
                                        {contactForm.errors.first_name}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="l-name">
                                <label htmlFor="l_name" className=" font-bold">
                                    Last name
                                </label>
                                <input
                                    onBlur={contactForm.handleBlur}
                                    value={contactForm.values.last_name}
                                    onChange={contactForm.handleChange}
                                    name="last_name"
                                    type="text"
                                    id="last_name"
                                    className="w-full py-3 mt-3 border-main rounded-md px-3 border bg-transparent"
                                    placeholder="Last Name"
                                />
                                {contactForm.errors.last_name && contactForm.touched.last_name ? (
                                    <div className=" py-1 text-warning">
                                        {contactForm.errors.last_name}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        {/* <div className="email">
                            <label htmlFor="email" className=" font-bold">
                                Email
                            </label>
                            <input
                                onBlur={contactForm.handleBlur}
                                value={contactForm.values.email}
                                onChange={contactForm.handleChange}
                                name="email"
                                type="email"
                                id="email"
                                className="w-full py-3 mt-3  border-main rounded-md px-3 border bg-transparent"
                                placeholder="Email"
                            />
                            {contactForm.errors.email && contactForm.touched.email ? (
                                <div className=" py-1 text-warning">
                                    {contactForm.errors.email}
                                </div>
                            ) : (
                                ""
                            )}
                        </div> */}
                        <div className="phone">
                            <label htmlFor="phone" className=" font-bold">
                                phone
                            </label>
                            <input
                                onBlur={contactForm.handleBlur}
                                value={contactForm.values.phone}
                                onChange={contactForm.handleChange}
                                name="phone"
                                type="text"
                                id="phone"
                                className="w-full py-3 mt-3  border-main rounded-md px-3  border bg-transparent"
                                placeholder="01** *** ****"
                            />
                            {contactForm.errors.phone && contactForm.touched.phone ? (
                                <div className=" py-1 text-warning">
                                    {contactForm.errors.phone}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="message">
                            <label htmlFor="message" className=" font-bold">
                                Message
                            </label>
                            <textarea
                                onBlur={contactForm.handleBlur}
                                value={contactForm.values.message}
                                onChange={contactForm.handleChange}
                                cols="10"
                                rows="7"
                                name="message"
                                type="text"
                                id="message"
                                className="w-full py-3 mt-3  border-main rounded-md px-3 border bg-transparent"
                                placeholder="leave us a message"
                            />
                            {contactForm.errors.message && contactForm.touched.message ? (
                                <div className=" py-1 text-warning">
                                    {contactForm.errors.message}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                        {/* <div className="col-span-1 flex gap-2">
                            <input
                                name="gender"
                                value=""
                                onChange={contactForm.handleChange}
                                type="checkbox"
                                id="-input"
                                className="select-none"
                            />
                            <label htmlFor="-input" className="select-none">
                                You agree to our friendly privacy policy.
                            </label>
                        </div> */}

                        <button
                            disabled={
                                contactForm.isValid && contactForm.dirty && !state.loading
                                    ? false
                                    : true
                            }
                            type="submit"
                            className={`p-3 w-full m-auto text-sm bg-gradient-to-l to-second from-main hover:from-transparent  text-white rounded-md border border-main uppercase font-medium hover:text-main duration-200 flex justify-center`}
                        >
                            {state.loading ? (
                                <>
                                    <TbLoader className="animate-spin mx-1" size={18} /> Loading...
                                </>
                            ) : (
                                "send Message"
                            )}
                        </button>
                    </motion.form>
                    <motion.div
                        initial={{
                            x: 500,
                            opacity: 0,
                        }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        viewport={{
                            once: true,
                        }}
                        className="col-span-1 hidden lg:block gap-5 text-white p-5"
                    >
                        <img src={contactPhoto} className=" w-full aspect-square rounded-md" alt="" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
