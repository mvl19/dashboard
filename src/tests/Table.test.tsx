import DisplayTable from "../components/Table"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { bar } from "../data"

describe('Table test', ()=>{
    it('Should render a table', ()=>{
        render(<DisplayTable dataset={bar} />)
        screen.debug()
    })
})