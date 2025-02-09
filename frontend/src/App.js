import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
