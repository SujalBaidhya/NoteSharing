import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Header from './Components/Header';
import AdminHeader from "./Components/AdminHeader";
import AuthPage from './Components/AuthPage';
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./Components/LoginForm";
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Upload from './Pages/Upload';
import Notes from './Pages/Notes';
import MyNotes from './Pages/MyNotes';
import ForgotPassword from './Pages/ForgotPass';
import NewPassword from './Pages/NewPassword';
import Otp from './Pages/Otp';
import Admin from "./Pages/admin/Admin";
import AdminNotes from "./Pages/admin/AdminNotes";
import AdminUsers from "./Pages/admin/AdminUsers";
function AppContent() {
  const location = useLocation();

  // curent page admin or not
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100">

      {isAdminPage?<AdminHeader />:<Header />}

      <main className="pt-20 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/my-notes" element={<MyNotes />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/newpassword" element={<NewPassword />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/notes" element={<AdminNotes />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </main>

    </div>
  );
}
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


export default App;