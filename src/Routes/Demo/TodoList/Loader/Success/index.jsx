import util from 'util';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Divider from '@material-ui/core/Divider';
import Task from 'Src/Model/Task';
import Pagination from './Pagination';
import Empty from './Empty';
import TaskListItem from './TaskListItem';
import style from './style.less';

const Success = (props) => {
  const {
    data: {
      result,
      total,
    },
  } = props;
  let content = <Empty />;
  if (total > 1) {
    content = (
      <Fragment>
        {
          result.map(task => <TaskListItem key={task.id} task={task} />)
        }
        <Divider />
        <Pagination total={total} />
      </Fragment>
    );
  }
  return (
    <div className={classnames(style.success, total > 1 && style['has-items'])}>
      { content }
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
