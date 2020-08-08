import React from 'react';
import './SearchBar.scss'

const SearchBar = (props) => {
  const {searchTerm, setSearchTerm, onKeyUp} = props;

	return(
    <div className="card card-sm">
      <div className="row no-gutters align-items-center">
        <div className="col">
          <input
          type="search"
          placeholder="Add to list"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyUp={e => {
            if(e.key === 'Enter'){
              onKeyUp(searchTerm)
            }
          }}/>
        </div>
        <div className="col-auto">
          <button className="btn btn-lg btn-success" onClick={e => onKeyUp(searchTerm)}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;