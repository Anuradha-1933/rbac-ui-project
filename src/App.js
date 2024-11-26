import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserManagement from "./Components/UserManagement";
import RoleManagement from "./Components/RoleManagement";
const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center">RBAC UI</h1>
        <div className="d-flex justify-content-center mb-3">
          <Link to="/" className="btn btn-primary mx-2">
            User Management
          </Link>
          <Link to="/roles" className="btn btn-secondary mx-2">
            Role Management
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

