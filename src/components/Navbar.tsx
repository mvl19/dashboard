import { RiseOutlined, MenuFoldOutlined, DownOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, MenuProps, Space, Button, Input } from 'antd'
import { useEffect, useState } from 'react'

interface Dropdown {
  label: string,
  key: string,
  type: string,
}

interface Collapsible {
  func: (collapse: boolean) => void
}

enum Colors {
  WHITE_COLOR = '#fcfcfc',
  TEXT_COLOR = '#f8fafc',
  BLUE_COLOR = '#0588f0',
}

export default function Navbar(props: Collapsible) {
  
    const items: MenuProps['items'] = [
        {
          label: 'Placeholder 1',
          key: '0',
        },
        {
          label:'Placeholder 2',
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: 'Placeholder 3',
          key: '3',
        },
      ];
      const [item, setItem] = useState<Dropdown[]>(items[3])
      const onClick: MenuProps['onClick'] = ({ key }): void => {
        setItem(items[key])
      };
      const [collapse, setCollapse] = useState(false)
      useEffect(() => {
        props.func(collapse)
      }, [collapse, props])

    return (
        <div className="flex justify-center align-center sticky top-0 z-20 ">
            <div className={'w-[100vw] h-auto max-h-[72px] bg-[#0588f0] flex justify-between gap-[16px] items-center p-[24px] sticky top-0 z-20 shadow-[0_1px_10px_rgba(0,0,0,0.5)]'}>
                <div className="flex items-center gap-[6px]">
                  <Button
                    type='text'
                    icon={
                      collapse? 
                      <MenuUnfoldOutlined style={{color: Colors.WHITE_COLOR}} /> 
                      : 
                      <MenuFoldOutlined style={{color: Colors.WHITE_COLOR}} />
                    }
                    onClick={() => setCollapse(!collapse)}
                  />
                    <RiseOutlined style={{color: Colors.WHITE_COLOR}} />
                    <span className={"text-[#f8fafc]"}>Dashboard Admin</span>
                </div>
                <div className="flex justify-start items-center">
                  <Input placeholder="Search..." prefix={<SearchOutlined />} />
                </div>
                <div className={`h-auto max-h-[72px] flex justify-end gap-10px items-center gap-[16px] text-[${Colors.TEXT_COLOR}]`}>
                    <Dropdown menu={{items, onClick}}>
                        <a className={'hover:text-[#f8fafc]'} onClick={(e)=>e.preventDefault()}>
                          <Space>
                            {item.label}
                            <DownOutlined />
                          </Space>
                        </a>
                    </Dropdown>
                    <Avatar style={{backgroundColor:'#f56a00'}}>
                        R
                    </Avatar>
                </div>
            </div>
            
        </div>
    )
}
