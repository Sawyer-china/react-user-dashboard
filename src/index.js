import dva from 'dva'
import createHistory from 'history/createBrowserHistory'
// import createLogger from 'redux-logger'
import createLoading from 'dva-loading'
import { message } from 'antd'
import './index.css'

const ERROR_MSG_DURATION = 3

// const initialState = {
//     namespace: 'root',
//     state: {
//         test: 123
//     }
// }

// 1. Initialize
const app = dva({
    history: createHistory(),
    ...createLoading({ effects: true }),
    initialState: {
        '@@dva': {
            c: 123,
            b: 321
        }
    },
    onError(e, dispatch) {
        message.error(e.message, ERROR_MSG_DURATION)
    },
    onStateChange(state) {
        // console.log(state)
    }
})

// 2. Plugins
// app.use()

// 3. Model
// app.model({
//     namespace: 'cou221nt',
//     state: {
//         count: 123
//     }
// })
// app.model({
//     namespace: 'test',
//     state: {
//         test: 321
//     }
// })
// app.model(require('./models/users').default)

// console.log(app)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')

// const b = app._store.dispatch({
//     type: 'example/save',
//     state1: {
//         a: 1,
//         b: 2
//     },
//     payload: 1
// })

// console.log(app._store)
