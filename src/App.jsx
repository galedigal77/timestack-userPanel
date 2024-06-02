import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import VerifyEmail from "./components/VerifyEmail";
import Profile from './components/Profile';
import Logout from './components/Logout';

const App = () => {
  const title = "Dashboard";
  const userCount = 1234;
  const leaveBalanceCount = 56;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            title={title}
            userCount={userCount}
            leaveBalanceCount={leaveBalanceCount}
          />
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default App;
