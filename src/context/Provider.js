import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StartWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState({
    filterByName: {
      name: '',
    } });

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const result = await fetch(endpoint).then((response) => response.json());
      const getArray = await result.results;
      setData(getArray.filter((e) => delete e.residents));
    };
    getPlanets();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const caseSensitive = useCallback((param) => {
    const filter = filterText.filterByName.name;
    const filterPlanet = param.name.toLowerCase();
    return (filterPlanet.includes(filter) ? param : '');
  }, [filterText.filterByName.name]);

  useEffect(() => {
    const filteredObjects = Object.values(data).filter((e) => caseSensitive(e));
    setFilteredData(filteredObjects);
  }, [data, filterText.filterByName, caseSensitive]);

  const createFilterText = ({ target }) => {
    setFilterText({
      ...filterText,
      filterByName: {
        name: target.value,
      },
    });
  };

  const contextValue = {
    data,
    filterText,
    createFilterText,
    filteredData,
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
