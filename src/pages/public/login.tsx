import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../mockDb/mockData.json";
import { useUser } from "../../context/context";
import {DEFAULT_CONFIG} from "../../config/config.ts";
import Toast from "../../components/toasts/toast.tsx";

const Login = () => {
  const { setUser } = useUser()!; // Use context to set the user globally
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [configError, setConfigError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Validate configurations on component mount
  useEffect(() => {
    const checkConfig = () => {
      const {
        news: { baseUrl: newsBaseUrl, apiKey: newsApiKey },
        guardian: { baseUrl: guardianBaseUrl, apiKey: guardianApiKey },
        nyt: { baseUrl: nytBaseUrl, apiKey: nytApiKey },
      } = DEFAULT_CONFIG;

      if (!newsBaseUrl || !newsApiKey || !guardianBaseUrl || !guardianApiKey || !nytBaseUrl || !nytApiKey) {
        setConfigError(
          "Some application configurations are missing. Please check API keys and base URLs in the configuration."
        );
      }
    };

    checkConfig();
  }, []);

  /**
   * The `handleLogin` function is an event handler for managing user login operations.
   * It prevents the default event behavior and validates user credentials.
   */
  const handleLogin = (e: any) => {
    e.preventDefault();

    if (configError) {
      setError("Cannot log in due to improper configuration."); // Block login if config is invalid
      return;
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const updatedUser = {
        ...user,
        isLoggedIn: true,
      };
      localStorage.setItem(`user${user.id}`, JSON.stringify(updatedUser));
      setUser(updatedUser); // Update the context
      navigate("/home", { state: { user } });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <div className="col-4 col-md-4">
        <h2 className="mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className={`btn w-100 ${configError && 'mb-4'}`}>
            Login
          </button>

          {/* Configuration error message */}
          {configError && <Toast message={configError} className="text-danger" />}
        </form>
      </div>
    </div>
  );
};

export default Login;
