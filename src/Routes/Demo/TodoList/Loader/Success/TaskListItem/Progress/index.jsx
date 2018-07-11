import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import style from './style.less';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={style.progress}>
        <LinearProgress />
      </div>
    );
  }
}

export default Progress;
