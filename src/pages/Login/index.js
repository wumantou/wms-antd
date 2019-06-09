import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux'
import { login } from '../../actions/login'
import axios from '../../common/axios-core';
import './index.css'
import {withRouter} from 'react-router-dom';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    handleSubmit = async (e) => {
        e.preventDefault();

        let postData = {};

        this.props.form.validateFields((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            postData = {...values}
            }
        });

        await axios.post('/user/login', postData).then((data) => {
            const respData = data.data;

            console.log(respData)
            if(respData.status === 0) {
                console.log("login index.js  login success!")
                this.props.login(respData.data.loginName)
                this.props.history.push('/admin/branch');
            } else {
                message.info("账号或密码错误")
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    {getFieldDecorator('loginName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {/* {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="/">Forgot password</a> */}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(withRouter(NormalLoginForm));

const Temp = connect(
    state => {
        console.log(state)
        return state
    },
    dispatch => ({ login: (loginName) => dispatch(login(loginName))})
)(WrappedNormalLoginForm)

export default () => (
    <Temp />
    /*<DefaultLayout>
        <Temp />
    </DefaultLayout>*/
)