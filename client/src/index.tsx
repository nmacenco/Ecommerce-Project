import React from 'react';
import ReactDOM from 'react-dom';
import "normalize.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import state from './redux/store/store';
import './Global.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={state}>
      <PayPalScriptProvider  deferLoading={true} options={{ "client-id": "sb" }}>
        <App />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
