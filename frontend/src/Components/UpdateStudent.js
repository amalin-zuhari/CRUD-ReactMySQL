import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [marks, setMarks] = useState("");
    const [grade, setGrade] = useState("");
    const [city, setCity] = useState("");
    const [originalData, setOriginalData] = useState({}); // State to store original data
    const { id } = useParams(); // Destructure id from useParams
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing student data
        axios.get(`http://localhost:5001/student/${id}`)
            .then(res => {
                const student = res.data;
                setOriginalData(student); // Store the original data
                setName(student.name || "");
                setEmail(student.email || "");
                setMarks(student.marks || "");
                setGrade(student.grade || "");
                setCity(student.city || "");
            })
            .catch(err => {
                console.error(err);
                
            });
    }, [id]);
    

    function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Prepare updateData object with only changed fields
        const updateData = {};
        if (name !== originalData.name) updateData.name = name;
        if (email !== originalData.email) updateData.email = email;
        if (marks !== originalData.marks) updateData.marks = marks;
        if (grade !== originalData.grade) updateData.grade = grade;
        if (city !== originalData.city) updateData.city = city;

        if (Object.keys(updateData).length === 0) {
            alert("No changes detected.");
            return; // Exit if no changes are made
        }

        axios.put(`http://localhost:5001/update/${id}`, updateData)
            .then((res) => {
                console.log(res);
                alert("Student updated successfully!");
                navigate("/"); // Navigate to the homepage after successful submission
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to update student. Please try again.");
            });
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white p-3 rounded-3'>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center' style={{ color: "#0d6efd" }}>Update Student</h2>
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

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;
