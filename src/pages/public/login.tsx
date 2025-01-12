
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../mockDb/mockData.json";
import InputComponent from "../../components/input/inputComponent.tsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      navigate("/dashboard", { state: { user } });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center flex-direction-column">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <InputComponent
            label={<label>Email:</label>}
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <InputComponent
            label={<label>Password:</label>}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/*TODO: Create component*/}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
