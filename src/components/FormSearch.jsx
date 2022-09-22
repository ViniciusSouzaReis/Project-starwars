import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StartWarsContext';

function FormSearch() {
  const { createFilterText,
    filterText, setFilterText,
    filterValues, setFilteredData, data,
    newFilterValues } = useContext(StarWarsContext);
  const { filterByName: { name } } = filterText;

  const [columnArray, setColumnArray] = useState([
    'orbital_period',
    'population',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [object, setObject] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const operatorArray = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target }) => {
    setObject((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClick = () => {
    setFilterText({
      ...filterText,
      filterByNumericValues: [
        ...filterText.filterByNumericValues,
        {
          column: object.column,
          comparison: object.comparison,
          value: object.value,
        },
      ],
    });
    setColumnArray(columnArray.filter((e) => e !== object.column));
    filterValues(object);
  };

  const removeFilter = (column) => {
    setColumnArray((prevState) => [...prevState, column]);
    const newFilter = filterText.filterByNumericValues.filter((e) => e.column !== column);
    console.log(newFilter);
    setFilterText({
      ...filterText,
      filterByNumericValues: newFilter,
    });
    newFilterValues(newFilter);
  };

  const removeAllFilters = () => {
    setFilterText({
      ...filterText,
      filterByNumericValues: [],
    });
    setFilteredData(data);
  };

  return (
    <div>
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
        <label htmlFor="column">
          Column
          <select
            name="column"
            data-testid="column-filter"
            value={ object.column }
            onChange={ handleChange }
          >
            {columnArray.map((item, index) => (
              <option value={ item } key={ index } name={ item }>{ item }</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          Operator
          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ handleChange }
            value={ object.comparison }
          >
            {operatorArray.map((item, index) => (
              <option value={ item } key={ index } name={ item }>{ item }</option>
            ))}
          </select>
        </label>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          value={ object.value }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          FILTER
        </button>
      </div>
      <ul>
        {(filterText.filterByNumericValues.length > 0) && <h3>Active Filters</h3>}
        {filterText.filterByNumericValues.map((filters) => (
          <li key={ filters.column } data-testid="filter">
            { filters.column }
            { filters.comparison }
            { filters.value }
            <button
              type="button"
              onClick={ () => removeFilter(filters.column) }
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {(filterText.filterByNumericValues.length > 0) && (
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remove all filters
        </button>
      )}
    </div>
  );
}

export default FormSearch;
