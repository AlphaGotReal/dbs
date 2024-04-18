import { Link } from "react-router-dom";
import homeImage from "../icons/home.png";

function HomeButton() {
  return (
    <Link to="/" className="home-button">
      <img src={homeImage} alt="Home" style={{ maxWidth: "40px", maxHeight: "40px" }} />
    </Link>
  );
}

export default HomeButton;