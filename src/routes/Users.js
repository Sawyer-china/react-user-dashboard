import React, { Component } from 'react'
import { connect } from 'dva'

import styles from './Users.less'

import MainLayout from '../components/MainLayout/MainLayout'
import UsersComponent from '../components/Users/Users'

class Users extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        const { location } = this.props
        return (
            <div className={styles.normal}>
                <UsersComponent />
            </div>
        )
    }
}

Users.propTypes = {}

export default connect()(Users)
