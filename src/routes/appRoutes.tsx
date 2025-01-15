// src/AppContent.tsx
import { Routes, Route } from "react-router-dom";
import routes from "./routes.tsx";
import Navbar from "../components/navbar/navbar.tsx";
import {useUser} from "../context/context.tsx";
import {ReactElement} from "react"; // Import the route configuration

/**
 * AppContent component renders the main application content.
 *
 * It utilizes the user context to determine if a user is logged in,
 * and conditionally displays the navigation bar (Navbar) based on the user's
 * logged-in status. The component dynamically maps and renders routes
 * based on an array of route configurations.
 *
 * This component is dependent on global routing setup and user context.
 */
const AppContent = () => {
  const { user } = useUser()!;

  return (
    <>
      {user?.isLoggedIn && <Navbar />}
      {/* Dynamically map the routes */}
      <Routes>
        {routes.map(({ path, element }: {path: string, element: ReactElement}, index: number) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
};

export default AppContent;
