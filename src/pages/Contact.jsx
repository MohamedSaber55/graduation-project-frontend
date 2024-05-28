import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { useFormik } from "formik";
import { TbLoader } from "react-icons/tb";
import { motion } from "framer-motion";
import contactPhoto from "./../assets/contact.jpg";
import PhoneInput from "react-phone-input-2";
import { addComplain } from "../store/slices/complainSlice";
const Contact = () => {
    const state = useSelector((state) => state.complain);
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch()
    const validationSchema = object({
        firstName: string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name is required'),
        lastName: string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required'),
        email: string()
            .email('Invalid email address')
            .matches(/@(gmail|yahoo|outlook)\.com$/, 'Email must be from Gmail or Yahoo or Outlook')
            .required('Email is required'),
        phoneNumber: string()
            .required('Phone number is required'),
        complainText: string()
            .max(200, 'Message must be less than 200 characters')
            .required('Message is required'),
    });

    const contactForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            complainText: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            dispatch(addComplain(values))
            resetForm()
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
                                <label htmlFor="firstName" className=" font-bold">
                                    First name
                                </label>
                                <input
                                    onBlur={contactForm.handleBlur}
                                    value={contactForm.values.firstName}
                                    onChange={contactForm.handleChange}
                                    name="firstName"
                                    type="text"
                                    id="firstName"
                                    className="w-full py-3 mt-3 border-main rounded-md px-3 border bg-transparent"
                                    placeholder="First Name"
                                />
                                {contactForm.errors.firstName &&
                                    contactForm.touched.firstName ? (
                                    <div className=" py-1 text-warning">
                                        {contactForm.errors.firstName}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="lastName">
                                <label htmlFor="lastName" className=" font-bold">
                                    Last name
                                </label>
                                <input
                                    onBlur={contactForm.handleBlur}
                                    value={contactForm.values.lastName}
                                    onChange={contactForm.handleChange}
                                    name="lastName"
                                    type="text"
                                    id="lastName"
                                    className="w-full py-3 mt-3 border-main rounded-md px-3 border bg-transparent"
                                    placeholder="Last Name"
                                />
                                {contactForm.errors.lastName && contactForm.touched.lastName ? (
                                    <div className=" py-1 text-warning">
                                        {contactForm.errors.lastName}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div className="email">
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
                        </div>
                        <div className="item space-y-3">
                            <label htmlFor="phoneNumber" className="font-bold">Phone Number:</label>
                            <PhoneInput
                                country={'eg'}
                                value={contactForm.values.phoneNumber}
                                onChange={phone => contactForm.setFieldValue('phoneNumber', phone)}
                                onBlur={() => contactForm.setFieldTouched('phoneNumber', true)}
                                inputProps={{
                                    name: 'phoneNumber',
                                    required: true,
                                    autoFocus: false,
                                    className: "p-3 ps-12 rounded-lg border border-main w-full bg-transparent block"
                                }}
                                inputStyle={{
                                    backgroundColor: theme === "dark" ? "#1f293700" : "#f3f4f600",
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderRadius: "6px",
                                    outline: "none",
                                    boxShadow: state => state.isFocused ? `0 0 0 1px ${theme === "dark" ? "#E1752C" : "#E1752C"}` : "0 0 0 1px #E1752C"
                                }}
                                dropdownStyle={{
                                    backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
                                }}
                                optionStyle={{
                                    backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
                                    color: theme === "dark" ? "#000" : "#000",
                                    "&:hover": {
                                        backgroundColor: theme === "dark" ? "#2d3748" : "#cbd5e0",
                                        color: "#000",
                                    },
                                }}
                            />
                            {contactForm.errors.phoneNumber && contactForm.touched.phoneNumber && (
                                <div className="text-red-600">{contactForm.errors.phoneNumber}</div>
                            )}
                        </div>

                        <div className="message">
                            <label htmlFor="complainText" className=" font-bold">
                                Complain
                            </label>
                            <textarea
                                onBlur={contactForm.handleBlur}
                                value={contactForm.values.complainText}
                                onChange={contactForm.handleChange}
                                cols="10"
                                rows="7"
                                name="complainText"
                                type="text"
                                id="complainText"
                                className="w-full py-3 mt-3  border-main rounded-md px-3 border bg-transparent"
                                placeholder="leave us a complainText"
                            />
                            {contactForm.errors.complainText && contactForm.touched.complainText ? (
                                <div className=" py-1 text-warning">
                                    {contactForm.errors.complainText}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                        <button
                            disabled={
                                contactForm.isValid && contactForm.dirty
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
