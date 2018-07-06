import util from 'util';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import RefreshIcon from '@material-ui/icons/Refresh';
import getLang from 'Src/Lang';
import style from './style.less';

const { inspect } = util;

const Error = (props) => {
  const {
    error,
    onRefresh,
  } = props;
  let errorMessage = '';
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.code === '') {
    errorMessage = getLang('apiError', error.code);
  } else {
    throw new Error(`unknown error format: ${inspect(error)}`);
  }
  const warningIconClassName = classnames(style.icon, style.warning);
  const refreshHandler = () => {
    if (onRefresh) {
      onRefresh();
    }
  };
  return (
    <Paper className={style.error}>
      <WarningIcon className={warningIconClassName} />
      <div className={style.message}>{ errorMessage }</div>
      { onRefresh && (
        <IconButton className={style.refresh}>
          <RefreshIcon className={style.icon} onClick={refreshHandler} />
        </IconButton>
      )}
    </Paper>
  );
};

Error.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      code: PropTypes.string,
    }),
  ]).isRequired,
  onRefresh: PropTypes.func,
};

Error.defaultProps = {
  onRefresh: null,
};

export default Error;
