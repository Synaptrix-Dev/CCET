import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ! importing components
import Header from "./components/Header";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import StudentTestSelection from "./pages/StudentTestSelection";
import TestSelect from "./pages/TestSelect";
import AdditionContainer from "./pages/Addition/AdditionContainer";
import SubtractionGroup from "./pages/Subtraction/SubtractionGroup";
import NumberComparison from "./pages/NumberComparison/NumberComparison";

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
            <Route path="testselection" element={<TestSelect />} />
            <Route
              path="testselection/addition-test"
              element={<AdditionContainer />}
            />
            <Route
              path="testselection/subtraction-test"
              element={<SubtractionGroup />}
            />
            <Route
              path="studentselections"
              element={<StudentTestSelection />}
            />
            <Route path="testselection/greater-smaller-test" element={<NumberComparison />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
