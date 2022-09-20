import React, { useContext } from 'react';
import StarWarsContext from '../context/StartWarsContext';

function FormSearch() {
  const { createFilterText, filterText } = useContext(StarWarsContext);
  const { filterByName: { name } } = filterText;

  return (
    <div>
      <label htmlFor="search-text">
        Filtre Planetas
        <input
          type="text"
          name="search-text"
          value={ name }
          onChange={ (event) => createFilterText(event) }
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default FormSearch;
