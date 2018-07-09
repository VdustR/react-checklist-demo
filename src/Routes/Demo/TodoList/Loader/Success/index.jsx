import util from 'util';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Task from 'Src/Model/Task';
import Pagination from './Pagination';
import style from './style.less';

const pageSize = 10;

const Success = (props) => {
  const {
    data: {
      result,
      total,
    },
  } = props;
  let pageMax = Math.ceil(total / pageSize);
  if (pageMax === 0) {
    pageMax = 1;
  }
  return (
    <div className={style.success}>
      {util.inspect(result)};
      { pageMax > 1 && (
        <Fragment>
          <Divider />
          <Pagination pageMax={pageMax} />
        </Fragment>
      )}
    </div>
  );
};

Success.propTypes = {
  data: PropTypes.shape({
    result: PropTypes.arrayOf((props, propName, componentName) => {
      const prop = props[propName];
      if (!(prop instanceof Task)) {
        throw new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed. prop: ${util.inspect(prop)}`);
      }
    }).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default Success;
