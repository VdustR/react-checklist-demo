import util from 'util';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TaskModel from 'Src/Model/Task';
import urlUtility from 'Src/Utilities/urlUtility';
import Loading from './Loading';
import Error from './Error';
import Success from './Success';
import style from './style.less';

const states = {
  LOADING: Symbol('loading'),
  ERROR: Symbol('error'),
  SUCCESS: Symbol('success'),
};

class Loader extends Component {
  static propTypes = {
    onRefresh: PropTypes.func,
    className: PropTypes.string,
    query: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  }
  static defaultProps = {
    onRefresh: null,
    className: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: null,
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
    const { query } = this.props;
    const response = await TaskModel.query(query);
    if (response.error) {
      this.setState({
        error: response.error,
        status: states.ERROR,
      });
    } else {
      this.setState({
        data: response,
        status: states.SUCCESS,
      });
    }
  }
  render() {
    const {
      status,
      error,
      data,
    } = this.state;
    const {
      onRefresh,
      className,
    } = this.props;
    let content = null;
    switch (status) {
      case states.LOADING:
        content = <Loading />;
        break;
      case states.ERROR:
        content = <Error error={error} onRefresh={onRefresh} />;
        break;
      case states.SUCCESS:
        content = <Success data={data} />;
        break;
      default:
        throw new Error(`unknown status: ${util.inspect(status)}`);
    }

    return (
      <Paper className={classnames(className, style.loader)}>
        {content}
      </Paper>
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

export default connect(mapStateToProps)(Loader);
