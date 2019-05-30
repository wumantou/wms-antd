import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, {lazy} from 'react'
import Branch from '../Branch'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class AdminLayout extends React.Component{

  constructor(props) {
    super(props);
    this.state = {component: lazy(() => import(`../Branch`))};
  }

  handleClick = (componentName) => {

    console.log('=====================handleClick')
    console.log(Branch)
    console.log(lazy(() => import(`../Branch`)))

    this.setState({component: lazy(() => import(`../${componentName}`))})

  }

    render() {

        //const Page = lazy(() => import(`../${this.state.component}`))
        const Page = lazy(() => import(`../Branch`));

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
                                <Menu.Item key="1" onClick={() => this.handleClick('Branch')}><div>品牌</div></Menu.Item>
                                <Menu.Item key="2" onClick={() => this.handleClick('Goods')}>商品</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <Page />
                            
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }

}