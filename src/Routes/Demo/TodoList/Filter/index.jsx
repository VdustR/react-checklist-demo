import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import urlUtility from 'Src/Utilities/urlUtility';
import router from 'Src/router';
import style from './style.less';

class Filter extends Component {
  static propTypes = {
    query: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  }
  changeHandler = (event) => {
    const {
      query,
    } = this.props;
    const { value: checked } = event.target;
    const urLSearchParams = new URLSearchParams({
      ...query,
      checked,
    });
    if (!checked) {
      urLSearchParams.delete('checked');
    }
    urLSearchParams.delete('page');
    const search = `?${urLSearchParams.toString()}`;
    router.push(search);
  }
  render() {
    const { query } = this.props;
    const {
      checked = '',
    } = query;
    return (
      <div className={style.filter}>
        <div className={style.label}>Filter by</div>
        <Select
          value={checked}
          onChange={this.changeHandler}
          displayEmpty
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Checked</MenuItem>
          <MenuItem value="false">Unchecked</MenuItem>
        </Select>
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

export default connect(mapStateToProps)(Filter);
