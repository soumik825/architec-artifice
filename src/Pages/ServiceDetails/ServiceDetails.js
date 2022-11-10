import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServiceDetails = () => {
    const { user } = useContext(AuthContext);
    const service = useLoaderData();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/reviews?id=${service._id}`)

            .then(res => res.json())
            .then(data => setReviews(data));
    }, [service?._id]);



    const handleComment = event => {
        event.preventDefault();
        const form = event.target;
        const comment = form.comment.value;
        const rating = form.rating.value;
        const review = {
            service: service._id,
            serviceName: service.title,
            email: user.email,
            comment,
            photo: user.photoURL,
            rating
        }
        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert("Comment Posted");

                    if (data.insertedId.length > 0) {
                        const newRev = review;
                        console.log(newRev);
                        const allrev = reviews;

                        const totalreview = [newRev, ...allrev];
                        console.log(totalreview);
                        setReviews(totalreview);
                        form.reset();

                    }



                }
            })
            .catch(err => console.error(err));
    }
    return (
        <div>
            <h1 className='text-5xl text-center mb-10'>  ServiceDetails</h1>



            <div className="card  bg-base-100 shadow-xl">
                <figure><img style={{ height: '80%', width: '80%' }} className="rounded-lg" src={service.img} alt="Album" /></figure>
                <div className="card-body">
                    <div className="lg:flex md:flex justify-around">
                        <h2 className="card-title text-3xl">{service.title}</h2>
                        <h2 className="card-title badge badge-error p-5 text-2xl"> Rating:{service.rating}</h2>
                    </div>

                    <div className="card-actions lg:flex md:flex justify-around">
                        <p>Click the button to listen on Spotiwhy app.</p>
                        <button className="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>




            <br />
            <br />
            <br />
            <br />
            <h1 className='text-center text-3xl'>{service.title} Service Review</h1>
            <div className=" border-solid rounded m-5 border-2 border-sky-500">
                <div className="p-10">
                    <h1>All Comment{reviews.length}</h1>

                    {
                        reviews.map(r => <div key={r._id}>
                            <img alt='' style={{ height: '40px', width: '40px' }} className='rounded-full' src={r.photo}></img>
                            <p>Comment : {r.comment}</p>
                            <p>RAting : {r.rating}</p>
                        </div>)
                    }
                </div>

                <div className="flex  bg-white-800 ">

                    <div className="w-full p-10 bg-gray pt-4 rounded shadow-lg">
                        <div className="flex ml-3 mb-5">
                            <div className="mr-3">
                                {
                                    user?.photoURL ? <img title={user?.displayName} alt='' style={{ height: '40px', width: '40px' }} className='rounded-full' src={user?.photoURL}></img>
                                        :
                                        <FontAwesomeIcon className='rounded-full' style={{ height: '40px', width: '40px', borderRadius: '50px' }} icon={faCircleUser} />
                                }
                            </div>
                            <div>
                                <h1 className="font-semibold">{user ? user?.displayName : <>User</>}</h1>
                                <p className="text-xs text-gray-500">Post A Comment</p>
                            </div>

                        </div>

                        {
                            user ? <form onSubmit={handleComment} className="mt-3 p-3 w-full">
                                <input rows="3" name='comment' className="border border-sky-500  p-2 mb-3 rounded w-1/2 h-20" placeholder="Write your Comment..." type="text" required /> <br />

                                <label>Choose a Rating:</label>
                                <br />
                                <select id="cars" className='border border-sky-500 rounded w-1/5 h-10 ' name="rating">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>

                                <div>
                                    <input value='Submit' type='submit' className="px-4 mt-5 py-1 text-center bg-gray-800 text-white rounded font-light hover:bg-gray-700" />
                                </div>

                            </form> :
                                <div className=''>
                                    <input rows="3" className="border  border-sky-500 mb-5 p-2 rounded w-1/2 h-20" placeholder="Write your Comment..." type="text" /> <br />
                                    <label>Choose a Rating:</label>
                                    <br />
                                    <select id="cars" className='border border-sky-500 mb-5 rounded w-1/5 h-10 ' name="rating">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <br />
                                    <Link to='/login' className="px-4 mt-10 p-3  py-1 text-center bg-gray-800 text-white rounded font-light hover:bg-gray-700"> Need To Login </Link></div>
                        }
                    </div>
                </div>
            </div>











        </div>
    );
};

export default ServiceDetails;