import React, { Component } from 'react'
import { connect } from 'dva'

import styles from './Users.less'

import UsersComponent from '../components/Users/Users'

class Users extends Component {
    render() {
        return (
            <div className={styles.normal}>
                <UsersComponent />
            </div>
        )
    }
}

Users.propTypes = {}

export default connect()(Users)
