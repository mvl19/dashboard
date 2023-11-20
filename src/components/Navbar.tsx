import { RiseOutlined, MenuOutlined } from '@ant-design/icons'
export default function Navbar() {
    const WHITE_COLOR: string = '#FCFCFC'
    return (
        <div className="flex justify-center align-center sticky top-0 z-20">
            <div className="w-[100%] h-auto max-h-[72px] bg-[#0588F0] flex justify-start gap-[16px] items-center p-[24px] sticky top-0 z-20 shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
                <MenuOutlined style={{color: WHITE_COLOR}} />
                <RiseOutlined style={{color: WHITE_COLOR}} />
                <span className="text-[#f8fafc]">Dashboard Admin</span>
            </div>
        </div>
    )
}