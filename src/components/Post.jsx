import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Post = ({ data, type, last }) => {
    return (
        <Link className="bg-light dark:bg-dark-light block rounded-md overflow-hidden relative" to={`/${type}/${data.id}`}>
            <div className="img-box">
                <img src={"http://localhost:5097/Resources/" + data.image} className="w-full aspect-square object-cover" alt={data.itemName || data.personName} />
            </div>
            <div className="data-body flex flex-col gap-1 p-3">
                <span className="text-lg text-warning font-semibold">{data.status === 0 ? "Missed" : "Founded"}</span>
                {/* <span className="text-lg font-semibold">{data.category}</span> */}
                <h5 className="text-xl font-bold">{data.itemName || data.personName || "Name"}</h5>
            </div>
            <div className="bg-gray-300 dark:bg-gray-700 p-3">
                <p>Since: {moment(data.dateTime, "YYYY-MM-DDTHH:mm:ss").fromNow()}</p>
            </div>
            {last &&
                <Link to={type == "item" ? "/items" : "/persons"} className="absolute bg-gray-300 dark:bg-gray-700 inset-0 group">
                    <div className="flex justify-center items-center h-full w-full">
                        <p className='font-semibold uppercase text-lg tracking-wide group-hover:text-main duration-200'>
                        {type == "item" ? "Show All Items" : "Show All Persons"}
                        </p>
                    </div>
                </Link>
            }
        </Link>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        status: PropTypes.number,
        itemName: PropTypes.string,
        personName: PropTypes.string,
        dateTime: PropTypes.string,
    }).isRequired,
    type: PropTypes.string.isRequired,
    last: PropTypes.bool
};

export default Post;

