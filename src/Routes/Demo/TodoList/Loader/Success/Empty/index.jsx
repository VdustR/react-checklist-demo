import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import getLang from 'Src/Lang';
import style from './style.less';

const Empty = () => (
  <div className={style.empty}>
    <ErrorIcon className={style.icon} />
    { getLang('list', 'empty') }
  </div>
);

export default Empty;
