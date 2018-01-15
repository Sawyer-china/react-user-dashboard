// user api
import * as usersService from '../services/users'
// 引入 node 模块
// import url from 'url'
// import qs from 'qs'

export default {
    namespace: 'users',
    state: {
        list: [],
        total: 0,
        page: 0
    },
    reducers: {
        /**
         * test
         * @param {*} state 
         * @param {*} param1 
         */
        save(state, { payload: { data: list, total, page } }) {
            return { ...state, list, total, page }
        },
        search(state) {
            return { ...state }
        }
    },
    effects: {
        *fetch({ payload: { page } }, { call, put }) {
            const { data, headers } = yield call(usersService.fetch, { page })
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: headers['x-total-count'],
                    page: parseInt(page, 10)
                }
            })
        },
        *create({ payload: values }, { call, put }) {
            yield call(usersService.create, values)
        },
        *patch({ payload: { id, values } }, { call, put }) {
            yield call(usersService.patch, { id, values })
            yield put({ type: 'reload' })
        },
        *remove({ payload: { id } }, { call, put }) {
            yield call(usersService.remove, { id })
            yield put({ type: 'reload' })
        },
        *reload(action, { put, select }) {
            const page = yield select(state => state.users.page)
            yield put({ type: 'fetch', payload: { page } })
        }
    },
    subscriptions: {
        // setup({ dispatch }, done) {
        //     done('错了错了')
        // throw new Error('Whoops!')
        // }
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search }) => {
                // const { query } = url.parse(search)
                // const oPath = qs.parse(query)
                // if (pathname === '/users') {
                //     console.log('/users')
                //     console.log(oPath)
                //     dispatch({ type: 'fetch', payload: oPath })
                // }
            })
        }
    }
}
