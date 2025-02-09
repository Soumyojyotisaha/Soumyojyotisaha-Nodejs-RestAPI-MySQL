import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Fixed import

function Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => { // Fixed function name
    try {
      await axios.delete(`http://localhost:8081/student/${id}`);
      window.location.reload(); // Fixed 'windows' to 'window'
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success mb-3">Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>
                  <Link to={`update/${data.ID}`} className="btn btn-primary">Update</Link>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(data.ID)}>Delete</button> {/* Fixed function call */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
