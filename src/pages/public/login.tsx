import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../mockDb/mockData.json";
import { useUser } from "../../context/context.tsx";

const Login = () => {
  const { setUser } = useUser()!; // Use context to set the user globally
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      const updatedUser = {
        ...user,
        isLoggedIn: true,
      };
      localStorage.setItem(`user${user.id}`, JSON.stringify(updatedUser));
      setUser(updatedUser); // Update the context
      navigate("/dashboard", { state: { user } });
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
          <button type="submit" className="btn w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
