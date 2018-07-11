import util from 'util';
import format from 'date-fns/format';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import getLang from 'Src/Lang';
import Task from 'Src/Model/Task';
import urlUtility from 'Src/Utilities/urlUtility';
import style from './style.less';

class Time extends Component {
  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    task: (props, propName, componentName) => {
      const prop = props[propName];
      if (!(prop instanceof Task)) {
        throw new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed. prop: ${util.inspect(prop)}`);
      }
    },
    query: () => {},
  }
  static defaultProps = {
    task: null,
    query: {},
  }
  render() {
    const {
      expanded,
      task,
      query,
    } = this.props;
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
  }
}

const mapStateToProps = (state) => {
  const { search } = state.router.location;
  const query = urlUtility.searchStrToObj(search);

  return {
    query,
  };
};

export default connect(mapStateToProps)(Time);
