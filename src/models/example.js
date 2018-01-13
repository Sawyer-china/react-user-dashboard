import pathToRegexp from 'path-to-regexp'
export default {
    namespace: 'example',
    state: {
        c: 'test'
    },
    subscriptions: {
        setup({ dispatch, history, keyboard }) {
            // eslint-disable-line
            history.listen(({ pathname }) => {
                const match = pathToRegexp('/category').exec(pathname)
                console.log(match)
                if(match){
                    const userId = match[1]
                    console.log(userId)
                }
                if (pathname === '/') {
                    console.log('fsadfasadsf123')
                }
                if (pathname === '/category') {
                    console.log('category')
                }
            })
        }
    },

    effects: {
        *save({ payload, state1 }, { call, put }) {
            // eslint-disable-line
            console.log('fetch')
            yield put({ type: 'reducersSave', payload, state1 })
        }
    },

    reducers: {
        reducersSave(state, action) {
            // console.log(action)
            // state = action
            state.c = action.state1.a
            console.log(state)
            return { ...state, ...action.payload }
        }
    }
}
