import React, { Component } from 'react'
import { connect } from 'dva'

import styles from './Users.css'

import MainLayout from '../components/MainLayout/MainLayout'
import UsersComponent from '../components/Users/Users'

class Users extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        const { location } = this.props
        return (
            <MainLayout location={location}>
                <div className={styles.normal}>
                    <UsersComponent />
                </div>
            </MainLayout>
        )
    }
}

Users.propTypes = {}

export default connect()(Users)
