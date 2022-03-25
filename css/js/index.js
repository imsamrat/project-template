import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Create a client
export const queryClient = new QueryClient()
React.icons = icons
// Sentry.init({
//   dsn: "https://7fd4de9d72424f42bc31e030d37ebc52@o480551.ingest.sentry.io/5534780",
//   integrations: [
//     new Integrations.BrowserTracing(),
//   ],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });
ReactDOM.render(
  // Provide the client to your App
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
      { process.env.NODE_ENV === 'development' &&
        <ReactQueryDevtools/>
      }
    </Provider>
  </QueryClientProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
