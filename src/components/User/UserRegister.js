import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { register, clear } from './../../actions/UserAction';
import { tips } from './../../util.js'; 
import * as styles from './UserRegister.css';
const FormItem = Form.Item;
class UserRegister extends React.Component {
  state = {
    confirmDirty: false,
  };
  componentWillReceiveProps(nextProps) {
    const { userRedu } = nextProps;
    const { dispatch, history } = this.props;
    let datas = {};
    datas.userRedu = userRedu;
    datas.dispatch = dispatch;
    datas.clear = clear;
    datas.history = history;
    tips.alertMessage.call(datas);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        register(dispatch, values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState((prevState, props) => ({
      confirmDirty: this.state.confirmDirty || !!value
    }));
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两个密码输入不一致！');
    } else {
      callback();
    }
  };
  validateToNextName = (rule, value , callback) => {
    const form = this.props.form;
    const namePattern = /^\d/;
    if(value) {
      if(namePattern.test(value)) {
        callback('用户名不能以数字开头，应为字符串或中文组成');
      } else {
        callback();
      }
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    const passWordPattern = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
    if(value) {
      if(!passWordPattern.test(value)) {
        callback('密码应为6-20位，由大小写字母及数字组成');
      } else {
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ 
              required: true,
              message: '请输入用户名!',
              whitespace: true
            }, {
              validator: this.validateToNextName,
            }],
          })(
            <Input placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <div>
              <Input type="password" placeholder="请输入密码" />
            </div>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" placeholder="请确认密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(UserRegister);
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(WrappedRegistrationForm);