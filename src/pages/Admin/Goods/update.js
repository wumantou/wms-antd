import { Modal, Button, Form, Input, Select } from 'antd';
import React from 'react';
import './index.css';
import axios from '../../../common/axios-core'

const FormItem = Form.Item;
const { Option } = Select;

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {branchData:[]};
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8081/branch/list').then((data) => {
        const respData = data.data;
        if(respData.status === 0) {
          this.setState({branchData: respData.data});
        }
    });
    this.props.form.setFieldsValue({...this.props.record});
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
        <FormItem label="品牌"> 
          {getFieldDecorator('branchId', {
            rules: [{ required: true, message: 'Please choose branch!' }],
          })(
            <Select
            placeholder="Select a branch"
            defaultValue={this.props.record.branchId}
          >
            {
              this.state.branchData.map((record) => {
                  return <Option value={record.id}>{record.branchName}</Option>
              })
            }
          </Select>
          )}
        </FormItem>
        <FormItem label="商品名">
          {getFieldDecorator('productName', {
            rules: [{ required: true, message: 'Please input productName!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="颜色">
          {getFieldDecorator('color', {
            rules: [{ required: true, message: 'Please inputcolor' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="价格">
          {getFieldDecorator('price', {
            rules: [{ required: true, message: 'Please input price' }],
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
    axios.post('http://127.0.0.1:8081/product/update', postData).then((data) => {
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
        <Button type="primary" onClick={this.showModal}>
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