import LandingPage from "./components/LandingPage";
import "antd/dist/reset.css";
import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          {" "}
          {/* Use Routes instead of Switch in React Router v6 */}
          <Route path="/" element={<LandingPage />} /> {/* Route for AuthPage */}
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="*" element={<h1>404 Not Found</h1>} />
          {/* Route for Dashboard */}
        </Routes>
      </div>
    </>
  );
}

export default App;
