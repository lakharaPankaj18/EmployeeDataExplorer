import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Details from "./pages/Details";
import PhotoResult from "./pages/PhotoResult";
import List from "./pages/List";
import SalaryChart from "./pages/SalaryChart";
import EmployeeMap from "./pages/EmployeeMap";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/photo-result" element={<PhotoResult />} />
        <Route path="/chart" element={<SalaryChart />} />
        <Route path="/map" element={<EmployeeMap />} />
      </Routes>
    </Router>
  );
};

export default App;
