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
import MultiplyGroup from "./pages/MultiplyGroup/MultiplyGroup";
import NumberRemember from "./pages/NumberRemember/NumberRemember";
import OralTest from "./pages/OralTest/OralTest";
import DivisionLayout from "./pages/Division/Divisionjs";
import Anxiety from "./pages/Anxiety/Anxiety";
import NumberGuess from "./pages/NumberGuess/NumberGuess";
import School from "./pages/School/School";
import SchoolAdminPanel from "./pages/School/SchoolAdminPanel";
import SupervisorManagementPanel from "./pages/School/SupervisorManagementPanel";
import StudentManagementPanel from "./pages/School/StudentManagementPanel";
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
            <Route
              path="testselection/greater-smaller-test"
              element={<NumberComparison />}
            />
            <Route
              path="studentselections"
              element={<StudentTestSelection />}
            />
            <Route
              path="testselection/multiplication-test"
              element={<MultiplyGroup />}
            />
            <Route
              path="testselection/number-remember"
              element={<NumberRemember />}
            />
            <Route path="testselection/oral-test" element={<OralTest />} />
            <Route
              path="testselection/division-test"
              element={<DivisionLayout />}
            />
            <Route path="testselection/assessment-test" element={<Anxiety />} />
            <Route
              path="testselection/distance-estimation-test"
              element={<NumberGuess />}
            />
            <Route path="dashboard/testselection/school" element={<School />} />
            <Route
              path="dashboard/testselection/school/manage"
              element={<SchoolAdminPanel />}
            />
            <Route
              path="dashboard/testselection/school/supervisor-management-panel"
              element={<SupervisorManagementPanel />}
            />
            <Route
              path="dashboard/testselection/school/student-management-panel"
              element={<StudentManagementPanel />}
            />
            <Route
              path="dashboard/studentselections"
              element={<StudentTestSelection />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
