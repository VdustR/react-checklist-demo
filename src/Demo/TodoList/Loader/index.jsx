import util from 'util';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TaskModel from 'Src/Model/Task';
import Loading from './Loading';
import Error from './Error';
import Success from './Success';
import style from './style.less';

const states = {
  LOADING: Symbol('loading'),
  ERROR: Symbol('error'),
  SUCCESS: Symbol('success'),
};

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      result: [],
      total: 0,
      status: states.LOADING,
    };
  }
  componentDidMount() {
    this.fetch().catch((e) => {
      this.setState({
        error: util.inspect(e),
        status: states.ERROR,
      });
    });
  }
  async fetch() {
    const response = await TaskModel.query();
    if (response.error) {
      this.setState({
        error: response.error,
        status: states.ERROR,
      });
    } else {
      this.setState({
        result: response.result,
        total: response.total,
        status: states.SUCCESS,
      });
    }
  }
  render() {
    const {
      status,
      error,
      result,
      total,
    } = this.state;
    let content = null;
    switch (status) {
      case states.LOADING:
        content = <Loading />;
        break;
      case states.ERROR:
        content = <Error error={error} />;
        break;
      case states.SUCCESS:
        content = <Success result={result} total={total} />;
        break;
      default:
        throw new Error(`unknown status: ${util.inspect(status)}`);
    }

    return (
      <Paper className={style.loader}>
        {content}
      </Paper>
    );
  }
}

export default Result;
