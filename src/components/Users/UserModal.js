import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

class UserEditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    showModalHandler = e => {
        if (e) e.stopPropagation()
        this.setState({
            visible: true
        })
    }

    hideModalHandler = e => {
        if (e) e.stopPropagation()
        this.setState({
            visible: false
        })
    }

    okHandler = e => {
        if (e) e.stopPropagation()
        const { onOk, record: { id } } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk({ id, values })
                this.hideModalHandler()
            }
        })
    }

    render() {
        const { children } = this.props
        const { getFieldDecorator } = this.props.form
        const { name, email, website } = this.props.record
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        }
        return (
            <span>
                <span onClick={this.showModalHandler}>
                    {children}
                    <Modal
                        title="Edit User"
                        visible={this.state.visible}
                        onOk={this.okHandler}
                        onCancel={this.hideModalHandler}
                    >
                        <Form layout="horizontal" onSubmit={this.okHandler}>
                            <FormItem {...formItemLayout} label="Name">
                                {getFieldDecorator('name', {
                                    initialValue: name,
                                    rules: [
                                        { required: true, message: '姓名不能为空' }
                                    ]
                                })(<Input placeholder="input name text" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="Email">
                                {getFieldDecorator('email', {
                                    initialValue: email,
                                    rules: [
                                        { required: true, message: '邮箱不能为空' }
                                    ]
                                })(<Input placeholder="input email text" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="Website">
                                {getFieldDecorator('website', {
                                    initialValue: website,
                                    rules: [
                                        { required: true, message: '地址不能为空' }
                                    ]
                                })(<Input placeholder="input website text" />)}
                            </FormItem>
                        </Form>
                    </Modal>
                </span>
            </span>
        )
    }
}

export default Form.create()(UserEditModal)
