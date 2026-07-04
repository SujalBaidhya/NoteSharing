import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import AuthPage from './Components/AuthPage';


import Home from './Pages/Home';
import Hire from './Pages/Hire';
import Blog from './Pages/Blog';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Upload from './Pages/Upload';
import Notes from './Pages/Notes'
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100">
        <Header />

        <main className="pt-20 px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hire" element={<Hire />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;