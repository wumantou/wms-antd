import { Modal, Button, Form, Input } from 'antd';
import React from 'react';
import './update.css';
import axios from '../../../common/axios-core'

const FormItem = Form.Item;

class UpdateForm extends React.Component {

  componentDidMount() {
    this.props.form.setFieldsValue({branchName:this.props.record.branchName, remark:this.props.record.remark});
    this.props.onRef(this)
  }

  handleUpdate = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
      this.props.changeRecore(values);
      }
  });
  }
    
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form className="login-form" >
        <FormItem label="品牌名">
          {getFieldDecorator('branchName', {
            rules: [{ required: true, message: 'Please input branchName!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="备注">
          {getFieldDecorator('remark', {
            rules: [{ required: true, message: 'Please input your remark!' }],
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    );
  }
}

class UpdateBranch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      ...this.props.record,
    };
  }

  changeRecore = (record) => {
    const postData = {id:this.props.record.id, ...record}
    axios.post('http://127.0.0.1:8081/branch/update', postData).then((data) => {
            const respData = data.data;
            if(respData.status === 0) {
                this.props.getList();
            }
        })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onRef = (ref) => {
    this.child = ref
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    this.child.handleUpdate();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const ModalComponent = Form.create()(UpdateForm);
    const ModalText = <ModalComponent record={this.props.record} changeRecore={this.changeRecore} onRef={this.onRef}/>;
    return (
      <div>
        <Button type="primary" onClick={this.showModal} className="update-button">
          修改
        </Button>
        <Modal
          title='修改'
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <component>{ModalText}</component>
        </Modal>
      </div>
    );
  }
}

export default UpdateBranch;