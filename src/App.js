import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import Card from "./components/Card";
import HomeButton from "./components/Home";
import "./style/App.css"

import React, { useState, useEffect } from 'react';

function App() {

  const [searchQuery, setSearchQuery] = useState('');  
  const [cards, setCards] = useState({"data": []});
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    fetch("/process/query", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ "query": query })
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      setCards(data); 
    });
  }

  // const [data, setData] = useState({});
  // useEffect(() => {
  //   fetch("/throw/info").then((res) =>
  //     res.json().then((data) => {
  //       // console.log(data);
  //       setData(data);
  //     })
  //   );
  // }, []);

  // let cards = [
  //   { imageUrl: "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
  //     title: "title1",
  //     description: "description1",
  //     category: "category1" },
  //   { imageUrl: "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
  //     title: "title2",
  //     description: "description2",
  //     category: "category2" },
  //   { imageUrl: "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
  //     title: "title3",
  //     description: "description3",
  //     category: "category3" }
  // ];

  return (
    <>
      <div className="app-container">
        <HomeButton></HomeButton>
        <SearchBar onSearchQueryChange={handleSearchQueryChange} />
        <Login/>
      </div>
      <br/>
      <div className="card-container">
        {cards.data.length > 0 ? (
          cards.data.map((card) => (
            <>
              <Card
                imageUrl={card.imageUrl}
                title={card.title}
                description={card.description}
                category={card.category}
              />
              {/* <br/> */}
            </>
          ))
        ) : (
          <p>No cards found.</p>
        )}
      </div>
      <div className="debug">
        {/* <h5>{ console.log("data: ", data) }</h5> */}
      </div>
    </>
  );

}

export default App;

