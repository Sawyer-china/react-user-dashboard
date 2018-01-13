import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'

// import IndexPage from './routes/IndexPage'
// import Users from './routes/Users'

function RouterConfig({ history, app }) {
    const IndexPage = dynamic({
        app,
        component: () => import('./routes/IndexPage')
    })
    const Users = dynamic({
        app,
        models: () => [
            import('./models/users')
        ],
        component: () => import('./routes/Users')
    })
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/users" component={Users} />
            </Switch>
        </Router>
    )
}

export default RouterConfig
