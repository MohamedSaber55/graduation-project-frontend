import { useFormik } from "formik"
import { useState } from "react"
import { MdKeyboardArrowLeft } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { mixed, object, string } from "yup"
import { IoCloudUploadOutline } from "react-icons/io5";
const AddPost = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    // const state = useSelector(state => state.posts)
    const validationSchema = object({
        name: string().min(2).required(),
        status: string().required(),
        category: string().required(),
        location: string().required(),
        date: string().required(),
        communicationLink: string().url().required(),
        description: string().required(),
        image: mixed().required(),
    })
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
    const addPostFormik = useFormik({
        initialValues: {
            name: "",
            status: "",
            category: "",
            location: "",
            date: "",
            communicationLink: "",
            description: "",
            image: null,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    })
    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            <div className="container py-5">
                <div className="top-page bg-white dark:bg-dark rounded-lg p-4 flex justify-between items-center mb-5">
                    <button onClick={() => navigate(-1)} className="text-main  border rounded-full border-main hover:bg-main hover:text-white duration-300"><MdKeyboardArrowLeft size={32} /></button>
                    <h2 className="text-2xl font-semibold text-brown dark:text-main">Add Post</h2>
                </div>
                <form>
                    <div className="image">
                        <div className="item space-y-2">
                            <div className="uploadImage mb-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                                <label htmlFor="fileInput" className="cursor-pointer block w-full h-64 border border-dashed border-gray rounded-md overflow-hidden bg-white dark:bg-dark border-main">
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
                                            <div className=" flex flex-col items-center gap-2">
                                                <IoCloudUploadOutline className="text-main" size={48} />
                                                <p className="text-lg font-semibold">Drag & drop your image here or Browse</p>
                                                <span className="bg-main mt-3 text-lg py-2 px-4 text-white dark:hover:text-light text- hover:text-dark hover:bg-transparent border border-main rounded-xl duration-150">Upload Image</span>
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
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="item space-y-3">
                                <label htmlFor="name" className="text-main text-lg font-semibold">Name:</label>
                                <input type="text" name="name" id="name" className="p-3 rounded-lg border border-main w-full bg-transparent block" placeholder="Name" />
                            </div>
                            <div className="item space-y-3">
                                <label htmlFor="location" className="text-main text-lg font-semibold">Location:</label>
                                <input type="text" name="location" id="location" className="p-3 rounded-lg border border-main w-full bg-transparent block" placeholder="Location" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="item space-y-3">
                                <label htmlFor="name" className="text-main text-lg font-semibold">Name:</label>
                                <input type="text" name="name" id="name" className="p-3 rounded-lg border border-main w-full bg-transparent block" placeholder="Name" />
                            </div>
                            <div className="item space-y-3">
                                <label htmlFor="location" className="text-main text-lg font-semibold">Location:</label>
                                <input type="text" name="location" id="location" className="p-3 rounded-lg border border-main w-full bg-transparent block" placeholder="Location" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="item space-y-3">
                                <label htmlFor="name" className="text-main text-lg font-semibold">Name:</label>
                                <input type="text" name="name" id="name" className="p-3 rounded-lg border border-main w-full bg-transparent block" placeholder="Name" />
                            </div>
                            <div className="item space-y-3">
                                <label htmlFor="location" className="text-main text-lg font-semibold">Location:</label>
                                <input type="text" name="location" id="location" className="p-3 rounded-lg border border-main w-full bg-transparent block" placeholder="Location" />
                            </div>
                        </div>
                    </div>
                    <div className="text-area bg-white dark:bg-dark py-8 px-5 rounded-md mt-5 space-y-3">
                        <label htmlFor="description" className="text-main text-lg font-semibold">Description:</label>
                        <textarea name="description" id="description" className="p-3 rounded-lg border border-main w-full bg-transparent block" placeholder="Description" cols="30" rows="10"></textarea>
                    </div>
                    <div className="submit button bg-white dark:bg-dark py-4 px-5 rounded-md mt-5 flex justify-center">
                        <button type="submit" className="bg-main text-lg py-2 px-8 text-white dark:hover:text-light text- hover:text-dark hover:bg-transparent border border-main rounded-lg duration-150">Share this post</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddPost