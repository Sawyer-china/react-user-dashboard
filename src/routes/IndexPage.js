import React from 'react'
import { connect } from 'dva'

import MainLayout from '../components/MainLayout/MainLayout'

import styles from './IndexPage.css'

class IndexPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            a: 12
        }
    }
    render() {
        const { location } = this.props
        return (
            <MainLayout location={location}>
                <div className={styles.normal}>
                    <h1 className={styles.title}>Yay! Welcome to dva!</h1>
                    <div className={styles.welcome} />
                    <ul className={styles.list}>
                        <li>
                            To get started, edit <code>src/index.js</code> and
                            save to reload.fadsfas 
                        </li>
                        <li>
                            <a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">
                                Getting Started
                            </a>
                        </li>
                    </ul>
                </div>
            </MainLayout>
        )
    }
}

IndexPage.propTypes = {}

function mapState() {
    return {
        a: 'teswt'
    }
}

export default connect(mapState)(IndexPage)
