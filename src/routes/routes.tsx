// src/appRoutes.ts
import {Navigate} from "react-router-dom";
import Login from "../pages/public/login.tsx";
import Dashboard from "../pages/secure/dashboard.tsx";
import Search from "../pages/secure/search.tsx";


const routes: any[] = [
  {path: "/", element: <Navigate to="/login" replace/>},
  {path: "/login", element: <Login/>},
  {path: "/dashboard", element: <Dashboard/>},
  {path: "/search", element: <Search/>}
];

export default routes;
