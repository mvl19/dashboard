import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import { Layout, Menu, Button } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardFilled
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

function App() {
  const [collapse, setCollapse] = useState(false)

  return (
    <div className='w-screen max-w-[100%] h-screen max-h-[100%] flex justify-center'>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapse} className='h-screen'>
          <Menu
            theme = 'dark'
            mode='inline'
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <DashboardFilled/>,
                label: 'Dashboard'
              },
              {
                key: '2',
                icon: <DashboardFilled/>,
                label: 'E-Commerce'
              }
            ]}

            className='pt-[20px] flex flex-col gap-1 text-left h-[100%]'
          />
        </Sider>
        <Layout>
          <Header className='px-5 flex justify-start items-center bg-white z-20 shadow-[0_1px_10px_rgba(0,0,0,0.1)]'>
            <Button
              type='text'
              icon={
                collapse? 
                <MenuUnfoldOutlined className='fill-white'/> 
                : 
                <MenuFoldOutlined className='stroke-white'/>
              }
              onClick={() => setCollapse(!collapse)}
              className='stroke-white'
            />
          </Header>
          <Content className='overflow-scroll'>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
            </Routes>   
          </Content>   
        </Layout>
      </Layout>
    </div>
  )
}

export default App
