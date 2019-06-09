import { Modal, Button } from 'antd';
import React from "react";
import axios from '../../../common/axios-core'

export default class DeleteGoods extends React.Component {
  state = {
    ModalText: '确定删除此商品？',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });

    axios.post('/product/delete', {id:this.props.recordId}).then((data) => {
      const respData = data.data;
      if (respData.status === 0) {
        this.props.getList();
      }
    })

    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          删除
        </Button>
        <Modal
          title="删除"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}