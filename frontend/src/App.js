import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext"; // Use AuthContext (not AuthProvider)

import Login from "./pages/Auth/Login";
import Homepage from "./pages/Mainpages/Home/Homepage";
import FileListLS from "./pages/Mainpages/Files/ICT Laboratory Schedule/fileList";
import FileListMMR from "./pages/Mainpages/Files/Monthly Maintenance Report/fileList";

import "bootstrap/dist/css/bootstrap.min.css";
import bgBottomImage from "./assets/Backgrounds/bgBottom.svg";
import bgTopImage from "./assets/Backgrounds/bgTop.svg";

import "./App.css";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  if (user === null) return null; // Wait until user is fetched
  return user ? element : <Navigate to="/" />;
};

function App() {
  return (
    <div className="App">
      <img className="image_bgTop" src={bgTopImage} alt="Background-image" />
      <img
        className="image_bgBottom"
        src={bgBottomImage}
        alt="Background-image"
      />

      <Routes>
        <Route path="/home" element={<PrivateRoute element={<Homepage />} />} />
        <Route path="/filelistLS" element={<FileListLS />} />
        <Route path="/filelistMMR" element={<FileListMMR />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
