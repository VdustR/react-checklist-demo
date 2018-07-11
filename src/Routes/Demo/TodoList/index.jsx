import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import chance from 'Src/Utilities/chanceUtility';
import Loader from './Loader';
import Sort from './Sort';
import Filter from './Filter';
import Field from './Field';
import style from './style.less';

const genKey = () => chance.hash();
class TodoList extends Component {
  static propTypes = {
    search: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      key: genKey(),
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.reGenKey();
    }
  }
  get addable() {
    const {
      val,
    } = this.state;
    return val.length > 0 && val === val.trim();
  }
  reGenKey = () => this.setState({ key: genKey() })
  render() {
    const {
      val,
      key,
    } = this.state;
    return (
      <div className={style.app}>
        <div className={style.inner}>
          <h1 className={style.title}>React Checklist Demo</h1>
          <Field />
          <div className={style.filter}>
            <Paper className={style.paper}>
              <Filter />
              { !val && <Sort /> }
            </Paper>
          </div>
          <Loader className={style.loader} query={val} key={key} onRefresh={this.reGenKey} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state.router.location;

  return {
    search,
  };
};

export default connect(mapStateToProps)(TodoList);
