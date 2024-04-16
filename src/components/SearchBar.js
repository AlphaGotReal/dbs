import "../style/SearchBar.css";
import React, { useState } from 'react';

function SearchBar( { onSearchQueryChange } ) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = async (event) => {
    setSearchQuery(event.target.value);
    onSearchQueryChange(event.target.value); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Select Location"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default SearchBar;
