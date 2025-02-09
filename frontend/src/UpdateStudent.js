import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams(); // Fixed missing import
    const navigate = useNavigate();

    // Fetch student data based on the ID when the component loads
    useEffect(() => {
        axios.get(`http://localhost:8081/${id}`)
            .then((res) => {
                setName(res.data.Name);
                setEmail(res.data.Email);
            })
            .catch((err) => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, { name, email }) // Fixed API URL
            .then((res) => {
                console.log(res);
                navigate('/'); // Redirect after successful update
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder='Enter Name' 
                            className="form-control" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder='Enter Email' 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;
