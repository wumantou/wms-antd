import React from 'react';
import { Table, Modal, Button, Icon } from 'antd';
import axios from '../../../../common/axios-core';
import moment from 'moment'

class OperatorTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const postData = {productId: this.props.record.id}
    axios.post('/operate/list', postData).then((data) => {
      const respData = data.data;
      if (respData.status === 0) {
        this.setState({ data: respData.data });
      }
    });
  }

  render() {

    const columns = [
      {
        title: '用户',
        dataIndex: 'wmsUserVO.loginName',
        key: 'userName',
      },
      {
        title: '数量',
        render: (text, record) => {
          const iconType = record.operate === '1' ? 'arrow-up' : 'arrow-down'
          return(
            <div>
              <Icon type={iconType} /> {record.count}
            </div>
          )
        },
        key: 'count',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作时间',
        dataIndex: 'operateTime',
        key: 'operateTime',
        render: operateTime => (
          <span>
            {moment(operateTime).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        )
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={this.state.data} rowKey={record => record.id} pagination={false} />
      </div>
    );
  }
}

export default class Operate extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          操作记录
        </Button>
        <Modal
          title={this.props.record.productName}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <OperatorTable {...this.props}/>
        </Modal>
      </div>
    );
  }
}