import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StartWarsContext';

function FormSearch() {
  const { createFilterText,
    filterText, setFilterText,
    filterValues } = useContext(StarWarsContext);
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
  );
}

export default FormSearch;
