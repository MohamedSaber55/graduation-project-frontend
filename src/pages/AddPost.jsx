import { useFormik } from "formik";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { mixed, object, string } from "yup";
import { useSelector } from "react-redux";
import Select from "react-select"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddPost = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [postType, setPostType] = useState("person"); // State to track post type
    const theme = useSelector((state) => state.theme.theme);

    const validationSchemaPerson = object({
        name: string().min(2).required(),
        status: string().required(),
        category: string().required(),
        location: string().required(),
        date: string().required(),
        communicationLink: string().url().required(),
        description: string().required(),
        image: mixed().required(),
        age: string().required(),
    });

    const validationSchemaItem = object({
        title: string().min(2).required(),
        status: string().required(),
        location: string().required(),
        date: string().required(),
        communicationLink: string().url().required(),
        description: string().required(),
        image: mixed().required(),
    });

    const validationSchema = postType === "item" ? validationSchemaItem : validationSchemaPerson;

    const handleChange = (event) => {
        const { name, files } = event.target;

        if (name === 'image' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                addPostFormik.setFieldValue('image', files[0]); // Set formik value
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
                addPostFormik.setFieldValue('image', files[0]);
            };
            reader.readAsDataURL(files[0]);
        }
    };
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
    const statusOptions = [
        { value: 'lost', label: 'Lost' },
        { value: 'found', label: 'Found' },
    ];

    const addPostFormik = useFormik({
        initialValues: postType === "item" ? {
            title: "",
            status: "",
            location: "",
            date: "",
            communicationLink: "",
            description: "",
            image: null,
        } : {
            name: "",
            status: "",
            location: "",
            date: "",
            communicationLink: "",
            description: "",
            image: null,
            age: ""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            <div className="container py-5">
                <div className="top-page bg-white dark:bg-dark rounded-lg p-4 flex justify-between items-center mb-5">
                    <button onClick={() => navigate(-1)} className="text-main border rounded-full border-main hover:bg-main hover:text-white duration-300"><MdKeyboardArrowLeft size={32} /></button>
                    <h2 className="text-2xl font-semibold text-brown dark:text-main">Add Post</h2>
                </div>
                <div className="flex justify-center mb-5">
                    <button
                        className={`px-4 py-2 rounded-l-lg ${postType === "person" ? "bg-main text-white" : "bg-white dark:bg-dark text-main border border-main"}`}
                        onClick={() => setPostType("person")}
                    >
                        Person
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-lg ${postType === "item" ? "bg-main text-white" : "bg-white dark:bg-dark text-main border border-main"}`}
                        onClick={() => setPostType("item")}
                    >
                        Item
                    </button>
                </div>
                <form onSubmit={addPostFormik.handleSubmit}>
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
                                    name="image"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="another-inputs bg-white dark:bg-dark py-8 px-5 rounded-md mt-5 space-y-8">
                        {postType === "person" ? (
                            <>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="item space-y-3">
                                        <label htmlFor="name" className="text-main text-lg font-semibold">Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="p-3 rounded-lg border border-main w-full bg-transparent block"
                                            placeholder="Name"
                                            onChange={addPostFormik.handleChange}
                                            value={addPostFormik.values.name}
                                        />
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
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="item space-y-3 ">
                                        <label htmlFor="date" className="text-main text-lg font-semibold block">Date:</label>
                                        <DatePicker
                                            selected={addPostFormik.values.date}
                                            onChange={date => addPostFormik.setFieldValue('date', date)}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="Date"
                                            isClearable
                                            className="p-3 rounded-lg border border-main bg-transparent block w-full"
                                        />
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
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="item space-y-3">
                                        <label htmlFor="title" className="text-main text-lg font-semibold">Title:</label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="p-3 rounded-lg border border-main w-full bg-transparent block"
                                            placeholder="Title"
                                            onChange={addPostFormik.handleChange}
                                            value={addPostFormik.values.title}
                                        />
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
                                    </div>
                                    <div className="item space-y-3 ">
                                        <label htmlFor="date" className="text-main text-lg font-semibold block">Date:</label>
                                        <DatePicker
                                            selected={addPostFormik.values.date}
                                            onChange={date => addPostFormik.setFieldValue('date', date)}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="Date"
                                            isClearable
                                            className="p-3 rounded-lg border border-main bg-transparent block w-full"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="another-inputs bg-white dark:bg-dark py-8 px-5 rounded-md mt-5 space-y-8">
                        <div className="item space-y-3">
                            <label htmlFor="communicationLink" className="text-main text-lg font-semibold">Communication Link:</label>
                            <input
                                type="url"
                                name="communicationLink"
                                id="communicationLink"
                                className="p-3 rounded-lg border border-main w-full bg-transparent block"
                                placeholder="Communication Link"
                                onChange={addPostFormik.handleChange}
                                value={addPostFormik.values.communicationLink}
                            />
                        </div>
                    </div>
                    <div className="text-area bg-white dark:bg-dark py-8 px-5 rounded-md mt-5 space-y-3">
                        <label htmlFor="description" className="text-main text-lg font-semibold">Description:</label>
                        <textarea
                            name="description"
                            id="description"
                            className="p-3 rounded-lg border border-main w-full bg-transparent block"
                            placeholder="Description"
                            cols="30"
                            rows="10"
                            onChange={addPostFormik.handleChange}
                            value={addPostFormik.values.description}
                        ></textarea>
                    </div>
                    <div className="submit button bg-white dark:bg-dark py-4 px-5 rounded-md mt-5 flex justify-center">
                        <button type="submit" className="bg-main text-lg py-2 px-8 text-white dark:hover:text-light hover:text-dark hover:bg-transparent border border-main rounded-lg duration-150">
                            Share this post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;