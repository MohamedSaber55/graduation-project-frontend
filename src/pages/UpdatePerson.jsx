/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { mixed, object, string } from "yup";
import Select from "react-select";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import moment from "moment";
import Loading from "./Loading";
import { getOnePerson, updatePerson } from "../store/slices/personsSlice";

const UpdatePerson = () => {
    const params = useParams()
    const { personId } = params
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const theme = useSelector((state) => state.theme.theme);
    const authSlice = useSelector((state) => state.user);
    const state = useSelector((state) => state.persons);
    const person = state.person ? state.person : {}
    const dispatch = useDispatch()
    const [isFormReady, setIsFormReady] = useState(false);


    const validationSchema = object({
        personName: string().min(2).optional("Name is optional"),
        phoneNumber: string().optional("Phone number is optional"),
        status: string().optional("Status is optional"),
        location: string().optional("Location is optional"),
        dateTime: string().optional("Date is optional"),
        communicationLink: string().url("Invalid URL").optional("Communication link is optional"),
        otherDetails: string().optional("Description is optional"),
        gender: string().optional("Gender is optional"),
        imageFile: mixed().optional("Image is optional"),
        age: string().optional("Age is optional"),
    });

    // Status options
    const statusOptions = [
        { value: '0', label: 'Lost' },
        { value: '1', label: 'Found' },
    ];
    // Formik setup
    const addPostFormik = useFormik({
        initialValues: {
            personName: person?.personName,
            phoneNumber: person?.phoneNumber,
            status: person?.status,
            location: person?.location,
            dateTime: person?.dateTime,
            communicationLink: person?.communicationLink,
            otherDetails: person?.otherDetails,
            gender: person?.gender,
            imageFile: "",
            age: person?.age,
            id: personId
        },
        // validationSchema,
        onSubmit: (values) => {
            // Filter out empty values
            const filteredValues = Object.fromEntries(
                Object.entries(values).filter(([, value]) => value !== "")
            );
            dispatch(updatePerson({ body: filteredValues, token: authSlice.token, personId, userId: authSlice.userId }))
                .then(() => navigate('/persons'));
        }
    });
    const handleChange = (event) => {
        const { name, files } = event.target;

        if (name === 'imageFile' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                addPostFormik.setFieldValue('imageFile', files[0]);
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
                addPostFormik.setFieldValue('imageFile', files[0]);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    // Custom styles for React Select
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            padding: "6px 2px",
            borderRadius: "6px",
            backgroundColor: theme === "dark" ? "#1f293700" : "#f3f4f600",
            color: theme === "dark" ? "#fff" : "#000",
            outline: "none",
            boxShadow: state.isFocused ? `0 0 0 1px ${theme === "dark" ? "#E1752C" : "#E1752C"}` : "0 0 0 1px #E1752C",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: theme === "dark" ? "#fff" : "#000",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? (theme === "dark" ? "#4a5568" : "#edf2f7") : "transparent",
            color: theme === "dark" ? "#fff" : "#000",
            "&:hover": {
                backgroundColor: theme === "dark" ? "#2d3748" : "#cbd5e0",
            },
        }),
    };

    useEffect(() => {
        dispatch(getOnePerson({ token: authSlice.token, id: personId })).then(() => {
            setIsFormReady(true);
        });
    }, [authSlice.token, dispatch, personId]);

    // Define gender options
    const genderOptions = [
        { value: '0', label: 'Male' },
        { value: '1', label: 'Female' },
    ];
    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            <div className="container py-5">
                {isFormReady ? <form onSubmit={addPostFormik.handleSubmit}>
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
                    <div className="another-inputs bg-white dark:bg-dark py-8 px-5 rounded-md mt-5 space-y-8">
                        <>
                            <div className="grid md:grid-cols-1 gap-8">
                                <div className="item space-y-3">
                                    <label htmlFor="personName" className="text-main text-lg font-semibold">Name:</label>
                                    <input
                                        type="text"
                                        name="personName"
                                        id="personName"
                                        className="p-3 rounded-lg border border-main w-full bg-transparent block"
                                        placeholder="Name"
                                        onChange={addPostFormik.handleChange}
                                        value={addPostFormik.values.personName}
                                    />
                                    {addPostFormik.errors.personName && addPostFormik.touched.personName && (
                                        <div className="text-red-600">{addPostFormik.errors.personName}</div>
                                    )}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="item space-y-3">
                                    <label htmlFor="phoneNumber" className="text-main text-lg font-semibold">Phone Number:</label>
                                    <PhoneInput
                                        country={'eg'}
                                        value={addPostFormik.values.phoneNumber}
                                        onChange={phone => addPostFormik.setFieldValue('phoneNumber', phone)}
                                        onBlur={() => addPostFormik.setFieldTouched('phoneNumber', true)}
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
                                                backgroundColor: theme === "darks" ? "#2d3748" : "#cbd5e0",
                                                color: "#000",
                                            },
                                        }}
                                    />
                                    {addPostFormik.errors.phoneNumber && addPostFormik.touched.phoneNumber && (
                                        <div className="text-red-600">{addPostFormik.errors.phoneNumber}</div>
                                    )}
                                </div>
                                <div className="item space-y-3">
                                    <label htmlFor="location" className="text-main text-lg font-semibold">Location:</label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        className="p-3 rounded-lg border border-main w-full bg-transparent block"
                                        placeholder="Location"
                                        onChange={addPostFormik.handleChange}
                                        value={addPostFormik.values.location}
                                    />
                                    {addPostFormik.errors.location && addPostFormik.touched.location && (
                                        <div className="text-red-600">{addPostFormik.errors.location}</div>
                                    )}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="item space-y-3">
                                    <label htmlFor="dateTime" className="text-main text-lg font-semibold">Date:</label>
                                    <DatePicker
                                        selected={addPostFormik.values.dateTime}
                                        onChange={date => {
                                            const formattedDate = date ? moment(date).format('YYYY-MM-DD') : ''; // or null
                                            addPostFormik.setFieldValue('dateTime', formattedDate);
                                        }} dateFormat="yyyy-MM-dd"
                                        placeholderText="Date"
                                        isClearable
                                        className="p-3 rounded-lg border border-main bg-transparent block w-full"
                                    />
                                    {addPostFormik.errors.dateTime && addPostFormik.touched.dateTime && (
                                        <div className="text-red-600">{addPostFormik.errors.dateTime}</div>
                                    )}
                                </div>
                                <div className="item space-y-3">
                                    <label htmlFor="age" className="text-main text-lg font-semibold">Age:</label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={150}
                                        name="age"
                                        id="age"
                                        className="p-3 rounded-lg border border-main w-full bg-transparent block"
                                        placeholder="Age"
                                        onChange={addPostFormik.handleChange}
                                        value={addPostFormik.values.age}
                                    />
                                    {addPostFormik.errors.age && addPostFormik.touched.age && (
                                        <div className="text-red-600">{addPostFormik.errors.age}</div>
                                    )}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="item space-y-3">
                                    <label htmlFor="status" className="text-main text-lg font-semibold">Status:</label>
                                    <Select
                                        styles={customStyles}
                                        options={statusOptions}
                                        placeholder="Select Status"
                                        onChange={(option) => addPostFormik.setFieldValue('status', option.value)}
                                    />
                                    {addPostFormik.errors.status && addPostFormik.touched.status && (
                                        <div className="text-red-600">{addPostFormik.errors.status}</div>
                                    )}
                                </div>
                                <div className="item space-y-3">
                                    <label htmlFor="gender" className="text-main text-lg font-semibold">Gender:</label>
                                    <Select
                                        id="gender"
                                        name="gender"
                                        styles={customStyles}
                                        options={genderOptions}
                                        placeholder="Select Gender"
                                        onChange={(option) => addPostFormik.setFieldValue('gender', option.value)}
                                        onBlur={() => addPostFormik.setFieldTouched('gender', true)}
                                    />
                                    {addPostFormik.errors.gender && addPostFormik.touched.gender && (
                                        <div className="text-red-600">{addPostFormik.errors.gender}</div>
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="submit button bg-white dark:bg-dark py-4 px-5 rounded-md mt-5 flex justify-center">
                        <button type="submit" className="bg-main text-lg py-2 px-8 text-white dark:hover:text-light hover:text-dark hover:bg-transparent border border-main rounded-lg duration-150">
                            Update this post
                        </button>
                    </div>
                </form> : <Loading />}
            </div>
        </div>
    )
}

export default UpdatePerson