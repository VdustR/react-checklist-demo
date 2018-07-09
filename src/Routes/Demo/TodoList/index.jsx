import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import chance from 'Src/Utilities/chanceUtility';
import Loader from './Loader';
import style from './style.less';

const debounceDelay = 300;

const genKey = () => chance.hash();

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      val: '',
      key: genKey(),
    };
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
  reGenKey = debounce(() => this.setState({ key: genKey() }), debounceDelay)
  valChangeHandler = (event) => {
    this.setState({ val: event.target.value.replace(/^\s/, '') });
    this.reGenKey();
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

export default TodoList;
