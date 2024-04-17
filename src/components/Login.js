import "../style/Login.css";
import { Outlet, Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="login">
        <Link to="/login" className="login-button">
          Login / Sign Up
        </Link>
      </div>
    </>
  );
}

export default Login;
