import { describe, it } from 'vitest'
import Navbar from '../components/Navbar'
import { render, screen } from '@testing-library/react'

describe('Dashboard', ()=>{
    it('minimize container', ()=> {
        render(<Navbar func={()=>{return }} />)
        screen.debug()
    })
})