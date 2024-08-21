import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/delete/${id}`);
      setStudents(students.filter((task3) => task3.id !== id)); // Update state without reloading the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-70 bg-white p-5 rounded-3">
        <Link to="/create" className="btn btn-success w-100 mb-3">
          Add New Student
        </Link>
        {students.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.marks}</td>
                  <td>{student.grade}</td>
                  <td>{student.city}</td>
                  <td>
                    <Link
                      to={`/update/${student.id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-danger ms-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students found.</p> // Fallback if there are no students
        )}
      </div>
    </div>
  );
}

export default Student;
