import React from 'react'
import * as dvaRouter from 'dva/router'
import { Route, Switch, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './routes/App'

const { ConnectedRouter } = routerRedux

// import IndexPage from './routes/IndexPage'
// import Users from './routes/Users'

console.log(dvaRouter)
function RouterConfig({ history, app }) {
    const IndexPage = dynamic({
        app,
        component: () => import('./routes/IndexPage')
    })
    const Users = dynamic({
        app,
        models: () => [import('./models/users')],
        component: () => import('./routes/Users')
    })
    return (
        <ConnectedRouter history={history}>
            {/* <Provider store={store}> */}
                <App>
                    <Switch>
                        {/* <Route exact path="/" render={() => <Redirect to="/" />}> */}
                        <Route path="/" exact component={IndexPage} />
                        <Route path="/users" exact component={Users} />
                        <Route
                            path="*"
                            render={() => <Redirect to="users" />}
                        />
                        {/* </Route> */}
                    </Switch>
                </App>
            {/* </Provider> */}
        </ConnectedRouter>
    )
}

export default RouterConfig
