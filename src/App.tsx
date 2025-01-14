import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./routes/appRoutes.tsx";
import {UserProvider} from "./context/context.tsx";

const AppRouter = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  )
}

export default AppRouter;
