import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function Edit() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [actor, setActor] = useState('');
    const { id: movieId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/movie/${movieId}`)
            .then(res => {
                const movie = res.data;
                setId(movie.director_id);
                setName(movie.movie_name);
                setActor(movie.lead_actor);
            })
            .catch(err => console.log(err));
    }, [movieId]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:5000/edit/${movieId}`, { director_id: id, movie_name: name, lead_actor: actor })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">Edit Movie</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="id">ID</label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        placeholder="Enter ID"
                                        className="form-control"
                                        value={id}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Movie Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter Movie Name"
                                        className="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="actor">Actor</label>
                                    <input
                                        type="text"
                                        id="actor"
                                        name="actor"
                                        placeholder="Enter Actor"
                                        className="form-control"
                                        value={actor}
                                        onChange={e => setActor(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
