import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import Card from "./components/Card";
import "./style/App.css"

const Cursor = require("./backend/Cursor");

import React, { useState } from 'react';

function App() {

  const [searchQuery, setSearchQuery] = useState('');  
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  }

  let cards = [
    { imageUrl: "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
      title: "title1",
      description: "description1",
      category: "category1"},
    { imageUrl: "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
      title: "title2",
      description: "description2",
      category: "category2"},
    { imageUrl: "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
      title: "title3",
      description: "description3",
      category: "category3"}
  ];

  return (
    <>
      <div className="app-container">
        <SearchBar onSearchQueryChange={handleSearchQueryChange} />
        <Login/>
      </div>
      <br/>
      <div className="card-container">
        {cards.length > 0 ? (
          cards.map((card) => (
            (card.title.match(searchQuery) !== null) ? 
              <>
                <Card
                  imageUrl={card.imageUrl}
                  title={card.title}
                  description={card.description}
                  category={card.category}
                />
                {/* <br/> */}
              </>
            : null
          ))
        ) : (
          <p>No cards found.</p>
        )}
      </div>
    </>
  );

}

export default App;

