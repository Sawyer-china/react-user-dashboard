import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import qs from 'qs'

class Header extends Component {
    // constructor(props) {
    //     super(props)
    // }
    menuClick = ({ item, key, keyPath }) => {
        if(key !== '/users') return
        this.props.dispatch(
            routerRedux.push({
                pathname: key,
                search: qs.stringify({ page: 1 })
            })
        )
    }
    render() {
        const { location } = this.props
        return (
            <Menu
                selectedKeys={[location.pathname]}
                mode="horizontal"
                theme="dark"
                onClick={this.menuClick}
            >
                <Menu.Item key="/users">
                    <Icon type="bars" />Users
                    {/* <Link to="/users">
                        <Icon type="bars" />Users
                    </Link> */}
                </Menu.Item>
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home" />Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="/404">
                    <Link to="/page-you-dont-know">
                        <Icon type="frown-circle" />404
                    </Link>
                </Menu.Item>
                <Menu.Item key="/antd">
                    <a href="https://github.com/dvajs/dva">dva</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default connect()(Header)