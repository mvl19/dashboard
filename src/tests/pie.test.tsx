import { describe, vi, it, expect } from "vitest"
import PieChart from "../components/Pie"
import { screen, render, fireEvent, waitFor } from "@testing-library/react"

const data = [
    {letter:'a', frequency:3},
    {letter:'b', frequency:4}
]

describe('It should render pie chart', ()=>{
    it('pie chart render', async ()=>{
        render(<PieChart width={100} height={100} dataset={data} labels="letter" accessor="frequency"/>)
        screen.debug()
    })
    
})