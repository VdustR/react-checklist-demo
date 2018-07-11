
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import router from 'Src/router';
import urlUtility from 'Src/Utilities/urlUtility';
import style from './style.less';

const debounceDelay = 300;

class Field extends Component {
  static propTypes = {
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
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      val: valBefore = '',
    } = prevState;
    const {
      val: valAfter = '',
    } = this.state;
    const {
      query: queryBefore = {},
    } = prevProps;
    const {
      query: queryAfter = {},
    } = this.props;
    if (valBefore !== valAfter) {
      this.pushSearch();
    }
    const qBefore = queryBefore.q || '';
    const qAfter = queryAfter.q || '';
    if (qBefore !== qAfter) {
      this.fetchFromUrl();
    }
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
  fetchFromUrl = () => {
    const {
      query = {},
    } = this.props;
    const {
      val = '',
    } = this.state;
    const nextVal = query.q || '';
    if (val !== nextVal) {
      this.setState({ val: query.q || '' });
    }
  }
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
    });
    if ((query.q || '') === (val || '')) {
      return;
    }
    urLSearchParams.delete('page');
    if (!val) {
      urLSearchParams.delete('q');
    }
    const search = `?${urLSearchParams.toString()}`;
    router.push(search);
  }, debounceDelay);
  render() {
    const {
      val,
    } = this.state;
    return (
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

export default connect(mapStateToProps)(Field);
