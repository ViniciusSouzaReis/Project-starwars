import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StartWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const result = await fetch(endpoint).then((response) => response.json());
      setData(result.results);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const filterName = filterText.filterByName.name;
    const dataFiltered = data.filter((e) => e.name.includes(filterName));
    setFilteredData(dataFiltered);
  }, [data, filterText.filterByName]);

  const createFilterText = ({ target }) => {
    setFilterText({
      ...filterText,
      filterByName: {
        name: target.value,
      },
    });
  };

  const filterValues = (object) => {
    const getValues = [object];
    let filteredPlanets = filteredData;
    getValues.forEach(({ column, comparison, value }) => {
      filteredPlanets = filteredPlanets.filter((e) => {
        if (comparison === 'maior que') {
          return Number(e[column]) > value;
        }
        if (comparison === 'menor que') {
          return Number(e[column]) < value;
        }
        if (comparison === 'igual a') {
          return Number(e[column]) === Number(value);
        }
        return 'a';
      });
    });
    setFilteredData(filteredPlanets);
    console.log(getValues[0].column);
  };

  const contextValue = {
    data,
    filterText,
    createFilterText,
    filteredData,
    setFilterText,
    filterValues,
  };

  return (
    <div>
      <StarWarsContext.Provider value={ contextValue }>
        {children}
      </StarWarsContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
