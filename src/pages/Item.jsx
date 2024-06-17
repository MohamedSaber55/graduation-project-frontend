import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneItem } from "../store/slices/itemSlice";
import moment from "moment";
import Loading from "./Loading";
import { CiLink } from "react-icons/ci";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { getItemComments } from "../store/slices/itemComments";
const Item = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.items)
    const itemCommentsState = useSelector(state => state.itemComments)
    const authState = useSelector(state => state.user)
    const item = state.item
    useEffect(() => {
        dispatch(getOneItem({ id: itemId, token: authState.token }))
        dispatch(getItemComments(itemId))
    }, [authState.token, dispatch, itemId])
    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            {item ? <>
                <div className="container py-5">
                    <div className="top-page bg-white dark:bg-dark rounded-lg p-4 flex justify-between items-center mb-5">
                        <button onClick={() => navigate(-1)} className="text-main border rounded-full border-main hover:bg-main hover:text-white duration-300"><MdKeyboardArrowLeft size={32} /></button>
                        <h2 className="text-2xl font-semibold text-brown dark:text-main">Item Details</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="item bg-white dark:bg-dark space-y-4 text-center p-4 rounded-lg">
                            <div className="image rounded-lg overflow-hidden flex justify-center">
                                <img src={"http://localhost:5097/Resources/" + item.image} alt={item.itemName} className="max-h-80 object-contain w-full rounded-lg" />
                            </div>
                        </div>
                        <div className="item bg-white dark:bg-dark flex items- p-4 rounded-lg">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">{item.itemName}</h2>
                                <p className="text-lg font-medium flex gap-4"><span className="text-main">Phone:</span><span>{item.phoneNumber}</span></p>
                                <p className="text-lg font-medium flex gap-4"><span className="text-main">Location:</span><span>{item.location}</span></p>
                                <p className="text-lg font-medium flex gap-4"><span className="text-main">Since:</span><span>{moment(item.dateTime, "YYYY-MM-DDTHH:mm:ss").fromNow()}</span></p>
                                <p className="text-lg font-medium flex gap-4"><span className="text-main">Status:</span><span>{item.status == 0 ? "Missed" : "Founded"}</span></p>
                                <p className="text-lg font-medium flex gap-4"><span className="text-main">ID:</span><span>{item.uniqNumber}</span></p>
                                <p className="text-lg font-medium flex gap-4"><span className="text-main">Communication Link:</span><span>{<a href={item.communicationLink} target="_blank" rel="noreferrer" className="text-semibold flex  items-center gap-1"><CiLink size={24} /> Click here</a> || "No communication link"}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-dark rounded-lg p-4 mt-5">
                        <h3 className="text-main text-2xl font-semibold mb-2">More Details</h3>
                        <p className="text-base leading-loose ">{item.otherDetails || "No more details."}</p>
                    </div>
                    <div className="bg-white dark:bg-dark rounded-lg p-4 mt-5">
                        <h3 className="text-main text-2xl font-semibold mb-2">Comments</h3>
                        <CommentList comments={itemCommentsState.comments} />
                    </div>
                    <div className="bg-white dark:bg-dark rounded-lg p-4 mt-5">
                        <h3 className="text-main text-2xl font-semibold mb-2">Add Comment</h3>
                        <CommentForm type={"item"} userId={authState.userId} itemId={itemId} />
                    </div>
                </div></> : <Loading />}
        </div>
    );
}

export default Item;
