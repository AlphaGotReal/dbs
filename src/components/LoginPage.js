import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/LoginPage.css'; // Import CSS file for styling
import HomeButton from './Home';

function LoginPage({ setAuthAtRoot }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [success, setSuccess] = useState(-1);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ "username": username, "password": password })
    }).then(response => response.json())
    .then(data => {
      setSuccess(data.successStatus);
      let details = {"username": username, "client_id": data.client_id};
    });
  };

  return (
    <>
      <HomeButton></HomeButton>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p> {/* Link to RegisterPage */}
        {(success === 0) ? <p>Invalid username.</p> : null}
        {(success === 2) ? <p>Incorrect password.</p> : null}
      </div>

    </>
  );
}

export default LoginPage;
