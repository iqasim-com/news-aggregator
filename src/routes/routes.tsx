// src/appRoutes.ts
import {Navigate} from "react-router-dom";
import Login from "../pages/public/login.tsx";
import Dashboard from "../pages/secure/dashboard.tsx";
import Search from "../pages/secure/search.tsx";

/**
 * An array of route configuration objects used for navigation in the application.
 * Each object defines a specific path and the corresponding component to render.
 *
 * Properties:
 * - `path`: The URL path for the specified route.
 * - `element`: The React component to be rendered for the given route.
 */
const routes: any[] = [
  {path: "/", element: <Navigate to="/login" replace/>},
  {path: "/login", element: <Login/>},
  {path: "/dashboard", element: <Dashboard/>},
  {path: "/search", element: <Search/>}
];

export default routes;
