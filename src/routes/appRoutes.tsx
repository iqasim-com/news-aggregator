// src/AppContent.tsx
import { Routes, Route } from "react-router-dom";
import routes from "./routes.tsx";
import Navbar from "../components/navbar/navbar.tsx";
import {useUser} from "../context/context.tsx";
import {ReactElement} from "react"; // Import the route configuration

const AppContent = () => {
  const { user } = useUser()!;

  console.log('routes', user)

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
