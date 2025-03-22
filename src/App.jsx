import "./App.css";
import LandingPage from "./components/LandingPage";
import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          {" "}
          {/* Use Routes instead of Switch in React Router v6 */}
          <Route path="/" element={<LandingPage />} /> {/* Route for AuthPage */}
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          {/* Route for Dashboard */}
        </Routes>
      </div>
    </>
  );
}

export default App;
