import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StartWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const result = await fetch(endpoint).then((response) => response.json());
      const getArray = await result.results;
      setData(getArray.filter((e) => delete e.residents));
    };
    getPlanets();
  }, []);

  const contextValue = {
    data,
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
