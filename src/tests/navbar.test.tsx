import { describe, it, vi } from 'vitest'
import Navbar from '../components/Navbar'
import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

describe('Navbar rendering tests', ()=>{
    it('minimize container', ()=> {
        render(<Navbar func={()=>{vi.fn() }} />)
        screen.debug()
    })

    it('menu dropdown click', async ()=>{
        const user = userEvent.setup()
        render(<Navbar func={()=>{vi.fn()}} />)
        const button = screen.getByTestId('dropdown-menu')
        await user.click(button)
    })
})