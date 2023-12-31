import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import { Layout, Menu, ConfigProvider } from 'antd'
import {
  DashboardFilled, CalendarOutlined, FundOutlined
} from '@ant-design/icons'
import DisplayTable from './components/Table'
import { bar } from './data'
import { Error404, Error500 } from './pages/Routes/ErrorPage'
import CalendarChart from './components/Calendar'
import StatCard from './components/StatCard'
import { Link } from 'react-router-dom'

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
                  label: <Link to="/">{'Dashboard'}</Link>
                },
                {
                  key: '2',
                  icon: <DashboardFilled/>,
                  label: 'E-Commerce'
                },
                {
                  key: '3',
                  icon: <CalendarOutlined />,
                  label: <Link to="calendar">{'Calendar'}</Link>
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
              <Route path='/' element={<Dashboard/>} />
              <Route path='table' element={<DisplayTable darkMode={false} dataset={bar}/>} />
              <Route path='calendar' element={<CalendarChart />} />
              <Route path='card' element={<StatCard />} />
              <Route path='*' element={<Error500 />} />
            </Routes>   
          </Content>   
        </Layout>
      </Layout>
    </div>
  )
}

export default App
