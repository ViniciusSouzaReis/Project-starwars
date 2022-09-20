import React from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StartWarsContext';

function Provider({ children }) {
  return (
    <div>
      <StarWarsContext.Provider>
        {children}
      </StarWarsContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
