import { describe, expect, it } from "vitest"
import HorizontalBar from "../components/Bar"
import { ParentSize } from "@visx/responsive"
import PieChart from "../components/Pie"
import { screen, render, fireEvent, waitFor } from "@testing-library/react"


describe('Pie Chart implementation', ()=>{
    const data = [
        {letter:'a', frequency:3},
        {letter:'b', frequency:4}
    ]
    it('pie chart render', ()=>{
        render(<PieChart width={500} height={500} dataset={data} labels="letter" accessor="frequency"/>)
        screen.debug()
    })
    
})

describe('Bar Chart implementation', async ()=>{
    const data = [
        {date: '2023-01-01', a:3, b:4}
    ]
    it('Bar chart render', ()=>{
        const { container } = render(<HorizontalBar width={500} height={500} data={data}/>)
        const elements = container.querySelector('.visx-group')
        expect(elements?.children)
    })
})