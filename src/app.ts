/* eslint-disable @typescript-eslint/no-var-requires */
import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';
import './global.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError: (err) => {
    console.log('err', err);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
const models = ['user'];
models.forEach((item) => app.model(require(`./models/${item}.ts`).default));

// 4. Router
//@ts-ignore
app.router(require('./router/index.tsx').default);

// 5. Start
app.start('#sites');
