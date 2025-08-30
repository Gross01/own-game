import ReactDOM from 'react-dom/client';
import React from 'react'
import App from './components/app/App'
import { Provider } from 'react-redux';
import { store } from './services/store';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);


root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
