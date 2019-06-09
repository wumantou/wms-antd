import { Modal, Button, Form, Input } from 'antd';
import React from 'react';
import axios from '../../../../common/axios-core'

const FormItem = Form.Item;

class CreateForm extends React.Component {

  componentDidMount() {
    this.props.form.setFieldsValue({ productName: this.props.record.productName });
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
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} className="form-item">
        <FormItem label="商品名">
          {getFieldDecorator('productName', {
            rules: [{ required: true, message: 'Please input productName!' }],
          })(
            <Input disabled="true"/>
          )}
        </FormItem>
        <FormItem label="出库数量">
          {getFieldDecorator('reduceStock', {
            rules: [{ required: true, message: 'Please input count!' }],
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

export default class ReducrStock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      ...this.props.record,
    };
  }

  changeRecore = (record) => {
    const postData = {id: this.props.record.id ,...record}
    axios.post('/product/stock/reduce', postData).then((data) => {
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
    const ModalComponent = Form.create()(CreateForm);
    const ModalText = <ModalComponent record={this.props.record} changeRecore={this.changeRecore} onRef={this.onRef}/>;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          出库
        </Button>
        <Modal
          title='出库'
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
