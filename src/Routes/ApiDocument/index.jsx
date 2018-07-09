import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import router from 'Src/router';
import apiMd from 'Src/api.md';
import style from './style.less';

const continuousClickTimes = 20;
const continuousClickTimeout = 2000;

class ApiDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      this.setState({ counter: 0 });
      router.push('/demo');
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
    return (
      <div className={style.api}>
        <ReactMarkdown source={apiMd} />
      </div>
    );
  }
}

export default ApiDocument;
