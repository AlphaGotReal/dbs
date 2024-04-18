import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import Card from "./components/Card";
import HomeButton from "./components/Home";
import "./style/App.css"

import React, { useState, useEffect } from 'react';
import AdSlider from "./components/AdSlider";

function App({ auth }) {

  const [searchQuery, setSearchQuery] = useState('');  
  const [cards, setCards] = useState({"data": []});
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    fetch("/process/query", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ "query": query , "auth": auth})
    }).then(response => response.json())
    .then(data => {
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
        { (!auth.logged) ? <Login></Login> : <p>You're logged in.</p>}
      </div>
      <br/>
      <div className="main-container">

        <div className="card-container">
          {cards.data.length > 0 ? (
            cards.data.map((card) => (
              <>
                <Card
                  auth={auth}
                  property_id={card.property_id}
                  imageUrl={card.imageUrl}
                  title={card.title}
                  description={card.description}
                  address={card.address}
                  city={card.city}
                  state={card.state}
                  zip={card.zip}
                  category={card.category}
                  rating={card.rating}
                  features={card.features}
                  agent={card.agent}
                  size={card.size}
                  price={card.price}
                  prop_status={card.prop_status}
                  transaction_made={card.transaction_made}
                />
                {/* <br/> */}
              </>
            ))
          ) : (
            <p>No cards found.</p>
          )}
        </div>

        <div className="ad-container">
          <AdSlider></AdSlider>
        </div>

      </div>
      <div className="debug">
        {/* <h5>{ console.log(auth)} </h5> */}
      </div>
    </>
  );

}

export default App;

