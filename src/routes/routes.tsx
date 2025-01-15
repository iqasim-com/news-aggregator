// src/appRoutes.ts
import {Navigate} from "react-router-dom";
import Login from "../pages/public/login.tsx";
import Dashboard from "../pages/secure/dashboard.tsx";
import Search from "../pages/secure/search.tsx";
import {DEFAULT_CONFIG} from "../config/config.ts";

/**
 * An array of route configuration objects used for navigation in the application.
 * Each object defines a specific path and the corresponding component to render.
 *
 * Properties:
 * - `path`: The URL path for the specified route.
 * - `element`: The React component to be rendered for the given route.
 */
const routes: any[] = [
  {path: "/", element: <Navigate to={DEFAULT_CONFIG.ui.routes.login} replace/>},
  {path: DEFAULT_CONFIG.ui.routes.login, element: <Login/>},
  {path: DEFAULT_CONFIG.ui.routes.home, element: <Dashboard/>},
  {path: DEFAULT_CONFIG.ui.routes.search, element: <Search/>}
];

export default routes;
