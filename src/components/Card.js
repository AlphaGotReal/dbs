import "../style/Card.css";

function Card({ imageUrl, title, description, category }) {
  return (
    <div className="card">
      <img src={imageUrl} className="card-image"/>
      <div className="card-details">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <span className="card-category">Category: {category}</span>
      </div>
    </div>
  );
}

export default Card;

