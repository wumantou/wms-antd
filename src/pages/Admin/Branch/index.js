import React from "react"
import { Table, Divider } from "antd"
import axios from '../../../common/axios-core'

class Branch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    async componentWillMount() {
        //axios.post('http://127.0.0.1:8081/user/login', {loginName:'admin', password:'123456'}).then((data) => {
        axios.get('http://127.0.0.1:8081/branch/list').then((data) => {

            const respData = data.data;

            console.log(respData)
            if(respData.status === 0) {
                console.log("================success" + respData.data)
                this.setState({data: respData.data})
            }
        })
    }

    render() {

        const columns = [
            {
                title: "id",
                dataIndex: "id",
                key: "id",
            },
            {
                title: "品牌",
                dataIndex: "branchName",
                key: "branchName",
            },
            {
                title: "备注",
                dataIndex: "remark",
                key: "remark",
            },
            {
                title: "Action",
                key: "action",
                render: (text, record) => (
                    <span>
                        <a href="branch/update">修改</a>
                        <Divider type="vertical" />
                        <a href="branch/delete">删除</a>
                    </span>
                ),
            },
        ]
        

        const {data} = this.state;
    

        return (
            <Table columns={columns} dataSource={data} rowKey={record => record.id}/>
        )
    }
}

export default Branch