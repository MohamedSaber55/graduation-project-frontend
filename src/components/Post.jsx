import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Post = ({ data, type }) => {
    return (
        <Link className="bg-light dark:bg-dark-light block rounded-md overflow-hidden" to={`/${type}/${data.id}`}>
            <div className="img-box">
                <img src={"http://localhost:5097/Resources/" + data.image} className="w-full aspect-square object-cover" alt={data.itemName || data.personName} />
            </div>
            <div className="data-body flex flex-col gap-1 p-3">
                <span className="text-lg text-warning font-semibold">{data.status === 0 ? "Missed" : "Founded"}</span>
                {/* <span className="text-lg font-semibold">{data.category}</span> */}
                <h5 className="text-xl font-bold">{data.itemName || data.personName}</h5>
            </div>
            <div className="bg-gray-300 dark:bg-gray-700 p-3">
                <p>Since: {moment(data.dateTime, "YYYY-MM-DDTHH:mm:ss").fromNow()}</p>
            </div>
        </Link>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        itemName: PropTypes.string,
        personName: PropTypes.string,
        dateTime: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
};

export default Post;

