import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Loader from './Loader';
import style from './style.less';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
    };
  }
  get addable() {
    const {
      val,
    } = this.state;
    return val.length > 0 && val === val.trim();
  }
  valChangeHandler = event => this.setState({ val: event.target.value.replace(/^\s/, '') })
  render() {
    const { val } = this.state;
    return (
      <div className={style.app}>
        <div className={style.inner}>
          <h1 className={style.title}>React Checklist Demo</h1>
          <Paper className={style.field}>
            <TextField
              value={val}
              onChange={this.valChangeHandler}
              placeholder="Please insert content"
              margin="normal"
              fullWidth
            />
            <IconButton
              classes={{
                root: style.add,
              }}
              aria-label="Add"
              disabled={!this.addable}
            >
              <AddIcon />
            </IconButton>
          </Paper>
          <Loader query={val} />
        </div>
      </div>
    );
  }
}

export default TodoList;
