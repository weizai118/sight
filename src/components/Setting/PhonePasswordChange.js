import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import LayoutHead from './../Layout/LayoutHead.js';
import { passwordChangeA, clear } from './../../actions/SettingAction';
import { tips } from './../../util.js';
import { getAvatarA } from './../../actions/SettingAction.js';
import * as styles from './PhonePasswordChange.css';
const FormItem = Form.Item;
class PhonePasswordChange extends Component {
  state = {
    confirmDirty: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    getAvatarA(dispatch);
  }
  componentWillReceiveProps(nextProps) {
    const { settingRedu } = nextProps;
    const { dispatch, history } = this.props;
    let datas = {};
    datas.userRedu = settingRedu;
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
        passwordChangeA(dispatch, values);
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
    const { history, settingRedu } = this.props;
    const { userName, avatar } = settingRedu;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="personal">
        <LayoutHead
          userName={userName}
          avatar={avatar}
          history={history}
        />
        <Form onSubmit={this.handleSubmit} className="passwordchange-login-form">
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '新密码',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <div>
                <Input type="password" placeholder="新密码" />
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请再次输入新密码!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" placeholder="请再次输入新密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">修改</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(PhonePasswordChange);
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(WrappedRegistrationForm);