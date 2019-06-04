import React from 'react';
import { Table, Button, Divider } from 'antd';
import axios from '../../../common/axios-core';
import './index.css';
//import UpdateBranch from './update';
//import CreateBranch from './create'

export default class Branch extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {};
  }

  getList = () => {
    axios.get('http://127.0.0.1:8081/goods/list').then((data) => {
        const respData = data.data;
        if(respData.status === 0) {
          this.setState({data: respData.data});
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
        title: '商品数量',
        dataIndex: 'productCount',
        key: 'productCount',
      },
      {
        title: '品牌名',
        dataIndex: 'branchName',
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
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          //render: (text, record) => (
          <span>
            <Button />
             <Divider type="vertical" />
          </span>
        ),
      },
    ];    

    return (
        <div>\
            <Table columns={columns} dataSource={this.state.data} rowKey={record => record.id}/>
        </div>
      
    );
  }
};