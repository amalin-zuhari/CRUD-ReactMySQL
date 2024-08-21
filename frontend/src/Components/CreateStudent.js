import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [marks, setMarks] = useState("");
    const [grade, setGrade] = useState("");
    const [city, setCity] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        axios
          .post("http://localhost:5001/create", { name, email, marks, grade, city })
          .then((res) => {
            console.log(res);
            alert("Student created successfully!");
            navigate("/"); // Navigate to the homepage after successful submission
          })
          .catch((err) => {
            console.error(err);
            alert("Failed to create student. Please try again.");
          });
      }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white p-3 rounded-3'>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center' style={{ color: "#0d6efd" }}>Add New Student</h3>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="marks" className="form-label">Marks</label>
                        <input
                            type="number"
                            className="form-control"
                            id="marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="grade" className="form-label">Grade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="grade"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;
