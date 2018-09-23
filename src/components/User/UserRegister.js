import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { register, clear } from './../../actions/UserAction';
import { tips } from './../../util.js'; 
import * as styles from './UserRegister.css';
import VerificationCode from 'react-verificationcode-s';
const FormItem = Form.Item;
//<VerificationCode getNumbers={this.getNumbers.bind(this)} height="40" width="192" />
class UserRegister extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      formItems: ['phone|手机号|0', 'user|用户名|0', 'password|密码|0'],
    };
    this.numbers = [];
  }
  componentWillReceiveProps(nextProps) {
    const { userRedu } = nextProps;
    const { dispatch, history, page, handleCancel } = this.props;
    let datas = {};
    datas.userRedu = userRedu;
    datas.dispatch = dispatch;
    datas.clear = clear;
    datas.history = history;
    datas.page = page;
    datas.handleCancel = handleCancel;
    tips.alertMessage.call(datas);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        register(dispatch, values);
      }
    });
  }
  getNumbers(value) {
    this.numbers = value;
  }
  inputHanlder = (id, e) => {
    let value = e.target.value;
    let { formItems } = this.state;
    console.log(value);
    switch(id) {
      case 0:
        const phonePattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(!value) {
          formItems[0] = formItems[0].replace(/[0-9]/, 2);
          break;
        }
        if(phonePattern.test(value)) {
          formItems[0] = formItems[0].replace(/[0-9]/, 1);
        } else {
          formItems[0] = formItems[0].replace(/[0-9]/, 2);
        }
      break;
      case 1:
        const namePattern = /^\d/;
        if(!value) {
          formItems[1] = formItems[1].replace(/[0-9]/, 2);
          break;
        }
        if(!(namePattern.test(value))) {
          formItems[1] = formItems[1].replace(/[0-9]/, 1);
        } else {
          formItems[1] = formItems[1].replace(/[0-9]/, 2);
        }
      break;
    }
    this.setState(() => ({
      formItems
    }));
  }
  renderFormItem() {
    const { getFieldDecorator } = this.props.form;
    let formItemsArray = [];
    const { formItems } = this.state;
    formItemsArray = formItems.map((list, id) => {
      let validateStatus, hasFeedback;
      console.log(parseInt(list.split('|')[2]));
      if(parseInt(list.split('|')[2]) === 1) {
        hasFeedback = true;
        validateStatus = 'success';
      } else if(parseInt(list.split('|')[2]) === 2) {
        hasFeedback = true;
        validateStatus = 'error';
      }
      return (
        <FormItem key={id} hasFeedback validateStatus={validateStatus} >
          <Input type={list.split('|')[0]} placeholder={list.split('|')[1]} onInput={this.inputHanlder.bind(this, id)} />
        </FormItem>   
      )
    });
    return formItemsArray;
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2 className="register-title">注册视线，进入你的世界</h2>
        {this.renderFormItem()}
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(UserRegister);
function mapStateToProps(state, oWnprops) {
  return state;
}
export default connect(mapStateToProps)(WrappedRegistrationForm);