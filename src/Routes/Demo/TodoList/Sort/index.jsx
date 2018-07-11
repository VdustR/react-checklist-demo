import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import urlUtility from 'Src/Utilities/urlUtility';
import router from 'Src/router';
import style from './style.less';

class Sort extends Component {
  static propTypes = {
    query: () => {},
  }
  static defaultProps = {
    query: {},
  }
  get orderIconClassName() {
    const {
      query,
    } = this.props;
    const {
      order,
    } = query;
    const asc = order === 'asc';
    return classnames(style.order, asc && style.asc);
  }
  changeHandler = (event) => {
    const {
      query,
    } = this.props;
    const { value: orderBy } = event.target;
    let order = 'desc';
    if (orderBy === 'content') {
      order = 'asc';
    }
    const urLSearchParams = new URLSearchParams({
      ...query,
      order,
      orderBy,
    });
    if (orderBy === 'updatedTime') {
      urLSearchParams.delete('orderBy');
    }
    if (order === 'desc') {
      urLSearchParams.delete('order');
    }
    urLSearchParams.delete('page');
    const search = `?${urLSearchParams.toString()}`;
    router.push(search);
  }
  reverseOrder = () => {
    const {
      query,
    } = this.props;
    const wasAsc = query && query.order === 'asc';
    const isAsc = !wasAsc;
    const order = isAsc ? 'asc' : 'desc';
    const urLSearchParams = new URLSearchParams({
      ...query,
      order,
    });
    if (order === 'desc') {
      urLSearchParams.delete('order');
    }
    urLSearchParams.delete('page');
    const search = `?${urLSearchParams.toString()}`;
    router.push(search);
  }
  render() {
    const { query } = this.props;
    const {
      orderBy = 'updatedTime',
    } = query;
    return (
      <div className={style.sort}>
        <div className={style.label}>Order by:</div>
        <Select
          value={orderBy}
          onChange={this.changeHandler}
        >
          <MenuItem value="content">Content</MenuItem>
          <MenuItem value="createdTime">Created Time</MenuItem>
          <MenuItem value="updatedTime">Updated Time</MenuItem>
        </Select>
        <IconButton classes={{ root: style['order-button'] }} onClick={this.reverseOrder}>
          <ArrowUpwardIcon className={this.orderIconClassName} />
        </IconButton>
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

export default connect(mapStateToProps)(Sort);
