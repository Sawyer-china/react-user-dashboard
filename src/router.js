import React from 'react'
import { Router, Route, Switch, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './routes/App'

const { ConnectedRouter } = routerRedux

// import IndexPage from './routes/IndexPage'
// import Users from './routes/Users'

function RouterConfig({ history, app }) {
    console.log(app)
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
                <App>
                    <Switch>
                        {/* <Route exact path="/" render={() => <Redirect to="/" />}> */}
                        <Route key={0} path="/" exact  component={IndexPage} />
                        <Route key={2} path="/users" exact component={Users} />
                        <Route key={1} path="*"  render={() => <Redirect to="users" />} />
                        {/* </Route> */}
                    </Switch>
                </App>
        </ConnectedRouter>
    )
}

export default RouterConfig
