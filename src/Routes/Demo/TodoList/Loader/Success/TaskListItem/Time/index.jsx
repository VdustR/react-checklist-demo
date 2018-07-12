import format from 'date-fns/format';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import getLang from 'Src/Lang';
import Task from 'Src/Model/Task';
import urlUtility from 'Src/Utilities/urlUtility';
import style from './style.less';

const Time = (props) => {
  const {
    expanded,
    task,
    query,
  } = props;
  const {
    orderBy,
  } = query;
  const {
    createdTime,
    updatedTime,
  } = task;
  const orderedByCreatedTime = orderBy === 'createdTime';
  const createdTimeString = format(createdTime, 'yyyy-MM-dd kk:mm:ss');
  const updatedTimeString = format(updatedTime, 'yyyy-MM-dd kk:mm:ss');
  if (expanded) {
    return (
      <div className={classnames(style.time, style.expanded)}>
        <div className={style.label}>{getLang('time', 'created')}</div>
        <div className={style.value}>{createdTimeString}</div>
        <div className={style.label}>{getLang('time', 'updated')}</div>
        <div className={style.value}>{updatedTimeString}</div>
      </div>
    );
  }
  return (
    <div className={style.time}>{
      orderedByCreatedTime
      ? createdTimeString
      : updatedTimeString
    }
    </div>
  );
};

Time.propTypes = {
  expanded: PropTypes.bool.isRequired,
  task: PropTypes.instanceOf(Task).isRequired,
  query: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => {
  const { search } = state.router.location;
  const query = urlUtility.searchStrToObj(search);

  return {
    query,
  };
};

export default connect(mapStateToProps)(Time);
