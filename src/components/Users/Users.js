// react
import React, { Component } from 'react'
// dva
import { connect } from 'dva'
// antd
import { Table, Button, Popconfirm, Pagination } from 'antd'
import UserModal from './UserModal'
import styles from './Users.css'

import { PAGE_SIZE } from '../../constants'

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
    pageChangeHandler = page => {
        this.props.dispatch({ type: 'users/fetch', payload: { page } })
    }
    componentDidMount() {
        const { dispatch, list } = this.props
        if (list.length <= 0) {
            dispatch({ type: 'users/fetch', payload: { page: 1 } })
        }
    }
    render() {
        const { list: dataSource, loading, total, page: current } = this.props
        // const { list: dataSource, loading, total } = this.props
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
                        pagination={false}
                    />
                    <Pagination
                        className="ant-table-pagination"
                        total={total}
                        current={current}
                        pageSize={PAGE_SIZE}
                        onChange={this.pageChangeHandler}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // 得到modal中的state)
    const { list, total, page } = state.users
    return {
        loading: state.loading.models.users,
        list,
        total: parseInt(total, 10),
        page
    }
}

export default connect(mapStateToProps)(Users)
