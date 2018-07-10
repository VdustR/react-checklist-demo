import React from 'react';
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import style from './style.less';

const PageButton = (props) => {
  const {
    number,
    active,
    onClick,
  } = props;
  const clickHandler = (...args) => {
    if (onClick) {
      onClick(...args);
    }
  };
  const classes = {
    root: style['page-button'],
    disabled: style.active,
  };
  return (
    <IconButton classes={classes} onClick={clickHandler} disabled={active}>{number}</IconButton>
  );
};

PageButton.propTypes = {
  number: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

PageButton.defaultProps = {
  onClick: null,
};

export default PageButton;
