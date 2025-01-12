
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../mockDb/mockData.json";
import InputComponent from "../../components/input/inputComponent.tsx";
import {useUser} from "../../context/context.tsx";

const Login = () => {
  const { setUser } = useUser(); // Use context to set the user globally
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user); // Update the context
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
            placeholder="Email"
            name="email"
            type="email"
            inputClass="input-styles"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <InputComponent
            placeholder="********"
            name="password"
            type="password"
            inputClass="input-styles"
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
