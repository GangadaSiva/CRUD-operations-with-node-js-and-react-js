import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Create() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [actor, setActor] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/create', { id, name, actor })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="container mt-5 ">
            <div className="row justify-content-center ">
                <div className="col-md-6 ">
                    <div className="card shadow-sm ">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">Create New Entry</h2>
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
                                        onChange={e => setId(e.target.value)}
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

export default Create;
