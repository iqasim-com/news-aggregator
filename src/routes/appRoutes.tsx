import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Login from "../pages/public/login.tsx";
import Dashboard from "../pages/secure/dashboard.tsx";
import Navbar from "../components/navbar/navbar.tsx";
import Search from "../pages/secure/search.tsx";
import {useUser} from "../context/context.tsx";

const AppContent = () => {
  const user = useUser();

  return (
    <>
      {user?.user !== null && <Navbar/>}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AppContent/>
    </Router>
  );
};

export default AppRouter;