import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/RegisterPage.css'; // Import CSS file for styling
import HomeButton from './Home';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [success, setSuccess] = useState(-1);

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("/register", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ "username": username, "email": email, "password": password })
    }).then(response => response.json())
    .then(data => {
      setSuccess(data.successStatus);
    });
  };

  return (
    <>
      <HomeButton></HomeButton>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit">Register</button>
        </form>
        <Link to="/login">Back to Login</Link> {/* Link to RegisterPage */}
        {(success !== 0) ? null : <p>Email already in use.</p>}
      </div>
    </>
  );
}

export default RegisterPage;
