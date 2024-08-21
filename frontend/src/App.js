import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Student from './Components/Student'
import CreateStudent from './Components/CreateStudent'
import UpdateStudent from './Components/UpdateStudent'


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App