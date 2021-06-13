import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              placeholder="rechercher un produit"
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Rechercher</button>
          </form>

    </form>
  );
}
