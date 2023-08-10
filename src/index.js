import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './redux/store';




const theme = createTheme({
//  i want only white background and also handle responsiveness
  // palette: {
  //   primary: {
  //     main: '#fff',
  //   },
  //   secondary: {
  //     main: '#fff',
  //   },
  // },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);


