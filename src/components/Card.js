import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../style/Card.css";

function StarRating({ rating }) {

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star">&#9734;</span>);
    }
  }
  return <div className="star-rating">{stars}</div>;
}

function Card({ auth, property_id, imageUrl, title, description, address, city, state, zip, category, rating, features, price, agent, size, prop_status, transaction_made}) {

  const [trancsactionMade, setTransactionMade] = useState(transaction_made);
  const [transactionSuccess, setTransactionSuccess] = useState(-1);

  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  }
  const handleMouseLeave = () => {
    setHover(false);
  }

  const handleButtonClick = () => {
    if (auth.logged) {
      fetch("/transaction", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"property_id": property_id, "auth": auth})
      }).then(response => response.json())
      .then(data => {
        setTransactionSuccess(data.successStatus);
      });
      setTransactionMade(true);
    }else {
      navigate("/login");
    }
  };

  return (
    <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={imageUrl} className="card-image"/>
      <div className="card-details">

        {
          (!hover) ? 
            <>
              <h2 className="card-title">{title}</h2>
              <p className="card-description">{description}</p>
              <p className="card-address">Address: {address}, {city}, {state}</p>
              <p className="card-zip-code">ZIP CODE: {zip}</p>
              <span className="card-category">Category: {category}</span>
              <div className="card-rating"><StarRating rating={rating}/> </div>
            </>
          :
            <>
              <p className="card-status">Status: {(prop_status? "available": "reserved")}</p>
              <p className="card-features">Features: {features} </p>
              <p className="card-agent">Agent: {agent} </p>
              <p className="card-size">Size: {size} acres</p>
              {
                (trancsactionMade) ?
                  <button className="card-bought">
                    BOUGHT
                  </button>
                :
                  <button className="card-buy" onClick={handleButtonClick}>
                    Rs. {price}
                  </button>
              }
            </>
        }

      </div>
    </div>
  );
}

export default Card;

