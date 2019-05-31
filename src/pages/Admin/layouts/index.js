import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React from 'react'
import Branch from '../Branch'
import Goods from '../Goods'

import {Route, Link} from 'react-router-dom'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class AdminLayout extends React.Component{

    render() {

        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">丰肯</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />管理</span>}>
                                <Menu.Item key="branch"><Link to='/admin/branch'>品牌</Link></Menu.Item>
                                <Menu.Item key="goods"><Link to='/admin/goods'>商品</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <Route exact key='1' path='/admin/branch' component={Branch} />
                            <Route exact key='2' path='/admin/goods' component={Goods} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }

}