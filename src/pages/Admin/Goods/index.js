import { Table, Row, Col } from 'antd';
import React from 'react'
import axios from '../../../common/axios-core';
import CreateGoods from './create'
import UpdateGoods from './update'


class Goods extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {};
  }

  getList = () => {
    axios.post('http://127.0.0.1:8081/product/page', {}).then((data) => {
        const respData = data.data;
        console.log(respData)
        if(respData.status === 0) {
          this.setState({data: respData.data.content});
        }
    });
 }
  componentDidMount() {
    this.getList();
  }

  render() {

    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '商品名',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '数量',
        dataIndex: 'productCount',
        key: 'productCount',
      },
      {
        title: '品牌',
        dataIndex: 'wmsBranchVO.branchName',
        key: 'branchName',
      },
      {
        title: '颜色',
        dataIndex: 'color',
        key: 'color',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Row>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <UpdateGoods record={record} getList={this.getList}/>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <UpdateGoods record={record} getList={this.getList}/>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                Col
              </Col>
            </Row>
            
          </span>
        ),
      },
    ];
    return (
      <div>
        <CreateGoods getList={this.getList}/>
        <Table columns={columns} dataSource={this.state.data} rowKey={record => record.id}/>
      </div>
    )
  }

}

export default Goods;
