import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './style.less';

const Loading = () => (
  <div className={style.loading}>
    <CircularProgress size={50} />
  </div>
);

export default Loading;
