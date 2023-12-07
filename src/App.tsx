import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import { Layout, Menu, ConfigProvider } from 'antd'
import {
  DashboardFilled, CalendarOutlined, FundOutlined
} from '@ant-design/icons'

const { Sider, Content } = Layout

function App() {
  const [collapse, setCollapse] = useState(false)
  const sideBarCollapse = (bool: boolean) => {
    setCollapse(bool)
  }

  return (
    <div className='w-screen max-w-[100%] h-screen max-h-[100%] flex justify-center'>
      <Layout>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemSelectedBg: '#15232E'
              }
            }
          }}
        >
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
                },
                {
                  key: '3',
                  icon: <CalendarOutlined />,
                  label: 'Calendar'
                },
                {
                  key: '4',
                  icon: <FundOutlined />,
                  label: 'Charts'
                }
              ]}

              className='bg-darkitem pt-[20px] flex flex-col gap-1 text-left h-[100%]'
            />
          </Sider>
        </ConfigProvider>
        <Layout>
          <Navbar func={sideBarCollapse}/>
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
