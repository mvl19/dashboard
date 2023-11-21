import { RiseOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import { useState } from 'react'
import { MenuProps, Space, message } from 'antd'
interface Dropdown {
  label: string,
  key: number
}
export default function Navbar() {
    const WHITE_COLOR = '#FCFCFC'
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
      const onClick: MenuProps['onClick'] = ({ key }) => {
        setItem(items[key])
      };
    return (
        <div className="flex justify-center align-center sticky top-0 z-20 ">
            <div className="w-[100vw] h-auto max-h-[72px] bg-[#0588F0] flex justify-between gap-[16px] items-center p-[24px] sticky top-0 z-20 shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-[6px]">
                    <MenuFoldOutlined style={{color: WHITE_COLOR}} />
                    <RiseOutlined style={{color: WHITE_COLOR}} />
                    <span className="text-[#f8fafc]">Dashboard Admin</span>
                </div>
                <div className="h-auto max-h-[72px] flex justify-end gap-10px items-center gap-[16px] text-[#f8fafc]">
                    <Dropdown menu={{items, onClick}}>
                        <a className="hover:text-[#f8fafc]" onClick={(e)=>e.preventDefault()}>
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