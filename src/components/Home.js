import { Link } from "react-router-dom";

function HomeButton() {
  return (
    <Link to="/" className="home-button">
      Home
    </Link>
  );
}

export default HomeButton;