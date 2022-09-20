import React, { useContext } from 'react';
import FormSearch from '../components/FormSearch';
import StarWarsContext from '../context/StartWarsContext';

function Table() {
  const { filteredData } = useContext(StarWarsContext);

  const titleTable = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'URL',
  ];

  return (
    <div>
      <FormSearch />
      <table>
        <thead>
          <tr>
            { titleTable.map((title, index) => (
              <th key={ index }>{ title }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((info, index) => (
            <tr key={ index }>
              <td>{info.name}</td>
              <td>{info.rotation_period}</td>
              <td>{info.orbital_period}</td>
              <td>{info.diameter}</td>
              <td>{info.climate}</td>
              <td>{info.gravity}</td>
              <td>{info.terrain}</td>
              <td>{info.surface_water}</td>
              <td>{info.population}</td>
              <td>{info.films}</td>
              <td>{info.created}</td>
              <td>{info.edited}</td>
              <td>{info.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
