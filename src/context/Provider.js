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
    const { column, comparison, value } = object;
    const filteredItems = filteredData.map((item) => {
      let chooseItem;
      switch (comparison) {
      case 'maior que':
        chooseItem = (Number(item[column]) > Number(value) ? item : null);
        break;
      case 'menor que':
        chooseItem = (Number(item[column]) < Number(value) ? item : null);
        break;
      default:
        chooseItem = (Number(item[column]) === Number(value) ? item : null);
      }
      return chooseItem;
    });

    const filteredPlanets = filteredItems.filter((e) => e !== null);
    setFilteredData(filteredPlanets);
  };
  // const filterValues = (object) => {
  //   const getValues = [object];
  //   let filteredPlanets = filteredData;
  //   getValues.forEach(({ column, comparison, value }) => {
  //     filteredPlanets = filteredPlanets.filter((e) => {
  //       if (comparison === 'maior que') {
  //         return Number(e[column]) > value;
  //       } if (comparison === 'menor que') {
  //         return Number(e[column]) < value;
  //       }
  //       return Number(e[column]) === Number(value);
  //     });
  //   });
  //   setFilteredData(filteredPlanets);
  // };

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
