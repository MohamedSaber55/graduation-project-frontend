import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Loading from "./Loading";
import { CiLink } from "react-icons/ci";
import { getOnePerson } from "../store/slices/personsSlice";
import moment from "moment";

const Person = () => {
    const { personId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.persons);
    console.log(state);
    const person = state.person;

    useEffect(() => {
        dispatch(getOnePerson(personId));
    }, [dispatch, personId]);

    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen">
            {person ? (
                <div className="container py-5">
                    <div className="top-page bg-white dark:bg-dark rounded-lg p-4 flex justify-between items-center mb-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-main border rounded-full border-main hover:bg-main hover:text-white duration-300"
                        >
                            <MdKeyboardArrowLeft size={32} />
                        </button>
                        <h2 className="text-2xl font-semibold text-brown dark:text-main">Person Details</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="item bg-white dark:bg-dark space-y-4 text-center p-4 rounded-lg">
                            <div className="image rounded-lg overflow-hidden flex justify-center">
                                <img
                                    src={"http://localhost:5097/Resources/" + person.image}
                                    alt={person.personName}
                                    className="max-h-80 object-contain w-full rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="item bg-white dark:bg-dark flex items-center p-4 rounded-lg">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">{person.personName}</h2>
                                <p className="text-lg font-medium flex gap-4">
                                    <span className="text-main">Age:</span>
                                    <span>{person.age}</span>
                                </p>
                                <p className="text-lg font-medium flex gap-4">
                                    <span className="text-main">Phone:</span>
                                    <a href={`tel:${person.phoneNumber}`} className="hover:underline">{person.phoneNumber}</a>
                                </p>
                                <p className="text-lg font-medium flex gap-4">
                                    <span className="text-main">Gender:</span>
                                    <span>{person.gender == 0 ? "Male" : "Female"}</span>
                                </p>
                                <p className="text-lg font-medium flex gap-4">
                                    <span className="text-main">Location:</span>
                                    <span>{person.location}</span>
                                </p>
                                <p className="text-lg font-medium flex gap-4">
                                    <span className="text-main">Since:</span>
                                    <span>{moment(person.dateTime, "YYYY-MM-DDTHH:mm:ss").fromNow()}</span>
                                </p>
                                <p className="text-lg font-medium flex gap-4">
                                    <span className="text-main">Status:</span>
                                    <span>{person.status == 0 ? "Missed" : "Found"}</span>
                                </p>
                                <p className="text-lg font-medium flex gap-4 ">
                                    <span className="text-main">Communication Link:</span>
                                    <span>
                                        {person.communicationLink ? (
                                            <a
                                                href={person.communicationLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-semibold flex items-center gap-1 hover:underline"
                                            >
                                                <CiLink size={24} /> Click here
                                            </a>
                                        ) : (
                                            "No communication link"
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-dark rounded-lg p-4 mt-5">
                        <h3 className="text-main text-2xl font-semibold mb-2">More Details</h3>
                        <p className="text-base leading-loose ">{person.otherDetails || "No more details."}</p>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Person;