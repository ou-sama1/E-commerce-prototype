import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import { SkeletonTheme } from 'react-loading-skeleton';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0" >
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </SkeletonTheme>
    </Provider>
  </React.StrictMode>,
)
