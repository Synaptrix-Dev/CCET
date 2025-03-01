import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ! importing components
import Header from "./components/Header";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Test from "./pages/Test";
import Home from "./pages/Home";
import StudentTestSelection from "./pages/StudentTestSelection";
import TestSelect from "./pages/TestSelect";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute Component={Layout} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="test" element={<Test />} />
            <Route path="testselection" element={<TestSelect />} />
            <Route
              path="studentselections"
              element={<StudentTestSelection />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// comented