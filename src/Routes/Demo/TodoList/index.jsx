import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import chance from 'Src/Utilities/chanceUtility';
import urlUtility from 'Src/Utilities/urlUtility';
import router from 'Src/router';
import Loader from './Loader';
import style from './style.less';

const debounceDelay = 300;

const genKey = () => chance.hash();

class TodoList extends Component {
  static propTypes = {
    search: PropTypes.string.isRequired,
    query: () => {},
  }
  static defaultProps = {
    query: {},
  }
  constructor(props) {
    super(props);
    const {
      query,
    } = props;
    this.state = {
      focused: false,
      val: query.q || '',
      key: genKey(),
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.reGenKey();
    }
    if (prevState.val !== this.state.val) {
      this.pushSearch();
    }
  }
  get addable() {
    const {
      val,
    } = this.state;
    return val.length > 0 && val === val.trim();
  }
  get fieldClassName() {
    const {
      focused,
    } = this.state;
    return classnames(
      style.field,
      focused && style.focus,
    );
  }
  reGenKey = () => this.setState({ key: genKey() })
  pushSearch = debounce(() => {
    const {
      val,
    } = this.state;
    const {
      query,
    } = this.props;
    const urLSearchParams = new URLSearchParams({
      ...query,
      q: val,
      page: 1,
    });
    const search = `?${urLSearchParams.toString()}`;
    router.push(search);
  }, debounceDelay);
  valChangeHandler = (event) => {
    this.setState({ val: event.target.value.replace(/^\s/, '') });
  }
  field = React.createRef()
  clickFieldHandler = () => {
    /* eslint-disable react/no-find-dom-node */
    findDOMNode(this.field.current).querySelector('input').focus();
    /* eslint-enable */
  }
  addButtonHandler = (event) => {
    event.stopPropagation();
    console.log('addButtonHandler', event);
  }
  fieldFocusHandler = () => this.setState({ focused: true })
  fieldBlurHandler = () => this.setState({ focused: false })
  render() {
    const {
      val,
      key,
    } = this.state;
    return (
      <div className={style.app}>
        <div className={style.inner}>
          <h1 className={style.title}>React Checklist Demo</h1>
          <Paper className={this.fieldClassName} onClick={this.clickFieldHandler}>
            <TextField
              value={val}
              onChange={this.valChangeHandler}
              onFocus={this.fieldFocusHandler}
              onBlur={this.fieldBlurHandler}
              placeholder="Please insert content"
              margin="normal"
              fullWidth
              innerRef={this.field}
            />
            <IconButton
              classes={{
                root: style.add,
              }}
              aria-label="Add"
              disabled={!this.addable}
              onClick={this.addButtonHandler}
            >
              <AddIcon />
            </IconButton>
          </Paper>
          <Loader query={val} key={key} onRefresh={this.reGenKey} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state.router.location;
  const query = urlUtility.searchStrToObj(search);

  return {
    search,
    query,
  };
};

export default connect(mapStateToProps)(TodoList);
