import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from 'Src/store';
import history from 'Src/history';
import Routes from 'Src/Routes';

const theme = createMuiTheme();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default App;
