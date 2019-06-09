import React from 'react';
import { Table } from 'antd';
import axios from '../../../common/axios-core';
import './index.css';
import UpdateBranch from './update';
import CreateBranch from './create'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

class Branch extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {};
  }

  getList = () => {
    axios.get('/branch/list').then((data) => {
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
        title: '品牌',
        dataIndex: 'branchName',
        key: 'branchName',
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
            <UpdateBranch record={record} getList={this.getList}/>
             {/* <Divider type="vertical" />
            <DeleteBranch record={{id:record.id}} getList={this.getList}/> */}
          </span>
        ),
      },
    ];    

    return (
        <div>
            <CreateBranch getList={this.getList}/>
            <Table columns={columns} dataSource={this.state.data} rowKey={record => record.id} pagination={false}/>
        </div>
      
    );
  }
}

const Temp = connect()(withRouter(Branch));

export default () => (<Temp />);