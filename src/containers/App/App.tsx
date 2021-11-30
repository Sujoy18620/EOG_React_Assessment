import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as UqrlProvider } from 'urql';
import PageTitle from '../../components/Title';
import { apiClient } from '../../services/api';
import createStore from '../../store';
import createTheme from "../../styles/theme";
import ChartContainer from '../ChartContainer';
import useStyles from './App.styles';

const store = createStore();
const theme = createTheme();

const App = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider store={store}>
        <UqrlProvider value={apiClient}>
          <Box className={classes.wrapper}>
            <PageTitle />
            <ChartContainer />
            <ToastContainer />
          </Box>
        </UqrlProvider>
      </StoreProvider>
    </MuiThemeProvider>
  );
}

export default App;
