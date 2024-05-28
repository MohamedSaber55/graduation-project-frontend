import { useNavigate, useParams } from "react-router-dom";
import { data } from "./../data/data.json"
import { MdKeyboardArrowLeft } from "react-icons/md";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import postImage from "./../assets/item.png"

const Post = () => {
    const { postId } = useParams()
    const navigate = useNavigate();
    const post = data.find(item => item.id === parseInt(postId));

    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            <div className="container py-5">
                <div className="top-page bg-white dark:bg-dark  rounded-lg p-4 flex justify-between items-center mb-5">
                    <button onClick={() => navigate(-1)} className="text-main  border rounded-full border-main hover:bg-main hover:text-white duration-300"><MdKeyboardArrowLeft size={32} /></button>
                    <h2 className="text-2xl font-semibold text-brown dark:text-main">Details</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="item bg-white dark:bg-dark space-y-4 text-center p-4 rounded-lg">
                        <div className="image rounded-lg overflow-hidden flex justify-center">
                            <img src={postImage || post.image} alt={post.name} className="max-h-80 object-contain  w-full rounded-lg" />
                        </div>
                        <h2 className="text-2xl font-semibold">{post.name}</h2>
                    </div>
                    <div className="item bg-white dark:bg-dark flex items-center  p-4 rounded-lg">
                        <div className="space-y-4">
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Date:</span><span>{post.date}</span></p>
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Status:</span><span>{post.status}</span></p>
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Category:</span><span>{post.category}</span></p>
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Country:</span><span>{post.country}</span></p>
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Address:</span><span>{post.address}</span></p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-dark rounded-lg p-4 mt-5">
                    <h3 className="text-main text-2xl font-semibold mb-2">Description</h3>
                    <p className="text-base leading-loose ">{post.desc}</p>
                </div>
                <div className="grid md:grid-cols-2  gap-4">
                    <Comments postId={postId} commentsPerPage={3} />
                    <AddComment />
                </div>
            </div>
        </div>
    )
}

export default Post