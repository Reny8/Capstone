import "./SearchBar.css"
import React from 'react';
const SearchBar = (props) => {
    return ( 
        <div className="search-bar">
            <input className="search" placeholder="Search..."/>
            <button className="button">SEARCH</button>
        </div>
     );
}
 
export default SearchBar;