import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const Pagination = (props) => {
  const {
    total,
  } = props;
  return (
    <div className={style.pagination}>
      { total }
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
};

export default Pagination;
