import React from 'react';
import Paper from '@material-ui/core/Paper';
import style from './style.less';

const TodoList = () => (
  <div className={style.app}>
    <div className={style.inner}>
      <h1 className={style.title}>React Checklist Demo</h1>
      <Paper className={style.content}>123</Paper>
    </div>
  </div>
);

export default TodoList;
