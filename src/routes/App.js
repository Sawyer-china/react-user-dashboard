import React, { Component } from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import MainLayout from '../components/MainLayout/MainLayout'

let lastHref

class App extends Component {
    render() {
        let { loading, children, location } = this.props
        const { href } = window.location
        if (lastHref !== href) {
            NProgress.start()
            if (!loading.global) {
                NProgress.done()
                lastHref = href
            }
        }
        return (
            <MainLayout location={location}>
                {children}
            </MainLayout>
        )
    }
}

App.propTypes = {}

export default withRouter(
    connect(({ app, loading }) => ({
        app,
        loading
    }))(App)
)
