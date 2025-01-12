import AppRouter from "./routes/appRoutes.tsx";
import {UserProvider} from "./context/context.tsx";

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;