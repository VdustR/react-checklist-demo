import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ApiDocument from './ApiDocument';
import Demo from './Demo';

const theme = createMuiTheme();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demo: false,
    };
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
