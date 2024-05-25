import { useNavigate, useParams } from "react-router-dom";
import { data } from "./../data/data.json"; // Assuming item data is stored in itemData.json
import { MdKeyboardArrowLeft } from "react-icons/md";
import itemImage from "./../assets/item.png"; // Placeholder image or actual image

const Item = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const item = data.find(item => item.id === parseInt(itemId));

    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            <div className="container py-5">
                <div className="top-page bg-white dark:bg-dark rounded-lg p-4 flex justify-between items-center mb-5">
                    <button onClick={() => navigate(-1)} className="text-main border rounded-full border-main hover:bg-main hover:text-white duration-300"><MdKeyboardArrowLeft size={32} /></button>
                    <h2 className="text-2xl font-semibold text-brown dark:text-main">Item Details</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="item bg-white dark:bg-dark space-y-4 text-center p-4 rounded-lg">
                        <div className="image rounded-lg overflow-hidden flex justify-center">
                            <img src={itemImage || item.image} alt={item.name} className="max-h-80 object-contain w-full rounded-lg" />
                        </div>
                        <h2 className="text-2xl font-semibold">{item.name}</h2>
                    </div>
                    <div className="item bg-white dark:bg-dark flex items-center p-4 rounded-lg">
                        <div className="space-y-4">
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Price:</span><span>{item.price}</span></p>
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Category:</span><span>{item.category}</span></p>
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Brand:</span><span>{item.brand}</span></p>
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">Stock:</span><span>{item.stock}</span></p>
                            <p className="text-xl font-semibold flex gap-4"><span className="text-main">SKU:</span><span>{item.sku}</span></p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-dark rounded-lg p-4 mt-5">
                    <h3 className="text-main text-2xl font-semibold mb-2">Description</h3>
                    <p className="text-base leading-loose ">{item.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Item;
