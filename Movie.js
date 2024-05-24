import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';

function Movie() {
    const [movies, setMovies] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setMovies(res.data);
                } else {
                    console.error('Expected array but received:', res.data);
                    setMovies([]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/movie/${id}`)
            .then(res => {
                console.log(res.data);
                setMovies(movies.filter(movie => movie.director_id !== id));
                // Optionally navigate to the home page or refresh the data
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='bg-primary d-flex flex-row justify-content-center align-items-center vh-100'>
            <div className='bg-light rounded p-5'>
                <Link to="/create" className='btn btn-success mb-2'>Add +</Link>
                <table className='table'>
                    <thead className='p-3'>
                        <tr>
                            <th>Director ID</th>
                            <th>Movie Name</th>
                            <th>Actor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies ? (
                            movies.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.director_id}</td>
                                    <td>{data.movie_name}</td>
                                    <td>{data.lead_actor}</td>
                                    <td>
                                        <Link to={`/edit/${data.director_id}`} className='btn btn-primary ms-3'>Edit</Link>
                                        <button onClick={() => handleDelete(data.director_id)} className='btn btn-danger m-1'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Movie;
