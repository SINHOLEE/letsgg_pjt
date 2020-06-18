import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
// cookie 관련
import { CookiesProvider } from 'react-cookie';

// mob x 관련
import { Provider } from 'mobx-react'; // 1. Mobx 에서 사용하는 Provider
import RootStore from 'stores'; // 2. 스토어를 불러오고

const root = new RootStore(); // 3. 루트 스토어 생성

ReactGA.initialize('UA-168124019-1');
ReactGA.pageview(window.location.pathname + window.location.search);


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Yeon Sung',
      'cursive',
    ].join(','),
  },
});
ReactDOM.render(
  // 4. Provider에 props로 넣어줌
  <CookiesProvider>
    <Provider {...root}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
