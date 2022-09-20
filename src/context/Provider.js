import React, { useEffect, useState } from 'react';
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
