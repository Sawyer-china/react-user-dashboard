// react
import React, { Component } from 'react'
// node
// import qs from 'qs'
// dva
import { connect } from 'dva'
// import { RouterRedux } from 'dva/router'
// antd
import { Table, Button, Popconfirm } from 'antd'
import UserModal from './UserModal'
import styles from './Users.css'

class Users extends Component {
    // constructor(props) {
    //     super(props)
    // }
    createHandler = ({ values }) => {
        this.props.dispatch({
            type: 'users/create',
            payload: values
        })
    }
    editHandler = ({ id, values }) => {
        this.props.dispatch({
            type: 'users/patch',
            payload: { id, values }
        })
    }
    deleteHandler = ({ id }) => {
        console.log(id)
        this.props.dispatch({
            type: 'users/remove',
            payload: { id }
        })
    }
    componentDidMount() {
        const { dispatch, list } = this.props
        if (list.length <= 0) {
            dispatch({ type: 'users/fetch', payload: {} })
        }
    }
    render() {
        // const { list: dataSource, loading, total, page: current } = this.props
        const { list: dataSource, loading } = this.props
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: text =>
                    <a href="">
                        {text}
                    </a>
            },
            {
                title: 'Email',
                dataIndex: 'email'
            },
            {
                title: 'Website',
                dataIndex: 'website'
            },
            {
                title: 'Username',
                dataIndex: 'username'
            },
            {
                title: 'Operation',
                key: 'operation',
                render: (text, record) =>
                    <span className={styles.operation}>
                        <UserModal record={record} onOk={this.editHandler}>
                            <a>Edit</a>
                        </UserModal>
                        <Popconfirm
                            title="Confirm to delete?"
                            onConfirm={this.deleteHandler.bind(null, {
                                id: record.id
                            })}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </span>
            }
        ]
        return (
            <div className={styles.normal}>
                <div>
                    <div className={styles.create}>
                        <UserModal record={{}} onOk={this.createHandler}>
                            <Button type="primary">Create User</Button>
                        </UserModal>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                        rowKey={record => record.id}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // 得到modal中的state)
    // console.log(state.users)
    const { list, total, page } = state.users
    return {
        loading: state.loading.models.users,
        list,
        total,
        page
    }
}

export default connect(mapStateToProps)(Users)
