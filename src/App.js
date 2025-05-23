import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login"; 
import FirstLevel from "./components/FirstLevel";
import ThirdLevel from "./components/ThirdLevel";
import Module_1_first from './components/module_1_first/module_1_first';
import Camera from "./components/camera";
import "./App.css"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/firstlevel" element={<FirstLevel />} />
        <Route path="/Thirdlevel" element={<ThirdLevel />} />
        <Route path="/Module_1_first" element={<Module_1_first />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </Router>
  );
};

export default App;