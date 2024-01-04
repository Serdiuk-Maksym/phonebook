import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, onChange }) => {
  const handleChange = event => {
    onChange(event.target.value);
  };

  const filterValue = filter || '';

  return (
    <div className={css.filter}>
      <label className={css.label}>
        Find contact by Name
        <input
          className={css.input}
          type="text"
          name="filter"
          value={filterValue}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
