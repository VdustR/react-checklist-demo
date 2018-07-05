import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ApiDocument from './ApiDocument';
import Demo from './Demo';

const theme = createMuiTheme();

const continuousClickTimes = 20;
const continuousClickTimeout = 2000;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demo: true,
      counter: 0,
    };
  }
  componentDidMount() {
    document.addEventListener('click', this.clickHandler);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.counter !== this.state.counter) {
      this.counterUpdateHandler(prevState.counter, this.state.counter);
    }
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.clickHandler);
    this.clearTimer();
  }
  clickHandler = () => {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  }
  counterUpdateHandler = (before, after) => {
    if (after > 0 && after < continuousClickTimes) {
      this.startTimer();
    } else if (after === continuousClickTimes) {
      this.setState({ counter: 0, demo: true });
      this.clearTimer();
      document.removeEventListener('click', this.clickHandler);
    }
  }
  timer = null
  startTimer = () => {
    this.clearTimer();
    this.timer = setTimeout(() => this.setState({ counter: 0 }), continuousClickTimeout);
  }
  clearTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  render() {
    const {
      demo,
    } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {
          demo ? <Demo /> : <ApiDocument />
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
