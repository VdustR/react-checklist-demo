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
    update,
    remove,
    check,
    unCheck,
  } = props;
  let content = <Empty />;
  if (total > 1) {
    content = (
      <Fragment>
        {
          result.map(task => (
            <TaskListItem
              key={task.id}
              task={task}
              update={update}
              remove={remove}
              check={check}
              unCheck={unCheck}
            />
          ))
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
    result: PropTypes.arrayOf(PropTypes.instanceOf(Task).isRequired).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired,
  unCheck: PropTypes.func.isRequired,
};

export default Success;
