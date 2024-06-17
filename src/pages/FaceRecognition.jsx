import { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faceRecognition } from "../store/slices/ai";

const FaceRecognition = () => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { personsData, loading } = useSelector((state) => state.ai);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImagePreview(URL.createObjectURL(file));
    };
    useEffect(() => {
        if (personsData) {
            navigate(`/search/persons/${personsData}`);
        }
    }, [personsData, navigate]);
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(faceRecognition({ file }));
    };


    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            <div className="container py-5">
                <div className="top-page bg-white dark:bg-dark rounded-lg p-4 flex justify-between items-center mb-5">
                    <button onClick={() => navigate(-1)} className="text-main border rounded-full border-main hover:bg-main hover:text-white duration-300">
                        <MdKeyboardArrowLeft size={32} />
                    </button>
                    <h2 className="text-2xl font-semibold text-brown dark:text-main">Face Recognition</h2>
                </div>
                <form onSubmit={handleSubmit}>
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
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="another-inputs bg-white dark:bg-dark py-8 px-5 rounded-md mt-5 space-y-8">
                        <div className="text-area bg-white dark:bg-dark py-8 px-5 rounded-md mt-5 space-y-3">
                            <label htmlFor="result" className="text-main text-lg font-semibold">Result:</label>
                            <textarea
                                id="result"
                                className="p-3 rounded-lg border border-main w-full bg-transparent block"
                                placeholder="Result will be displayed here..."
                                value={loading ? 'Loading...' : error ? error : data}
                                readOnly
                                rows="5"
                            ></textarea>
                        </div>
                    </div> */}
                    <div className="submit button bg-white dark:bg-dark py-4 px-5 rounded-md mt-5 flex justify-center">
                        <button type="submit" className="bg-main text-lg py-2 px-8 text-white dark:hover:text-light hover:text-dark hover:bg-transparent border border-main rounded-lg duration-150" disabled={loading}>
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FaceRecognition;
