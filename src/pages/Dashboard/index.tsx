import LineChart from "../../components/Line"
import PieChart from "../../components/Pie"
import HorizontalBar from "../../components/Bar"
import { bar, salaryData, spendingData } from "../../data"
import { ParentSize } from "@visx/responsive"
import { letterFrequency } from "../../data"

export default function Dashboard() {

    return (
        <div className="flex justify-center">
            <div className="w-[100%] h-screen max-h-[100%] flex flex-col items-center bg-white p-[24px]">
                <ParentSize>
                    {({ width, height }) =><HorizontalBar width={width} height={height} />}
                </ParentSize>
                <ParentSize>
                    {({ width, height }) =><PieChart width={width} height={height} dataset={letterFrequency} accessor="frequency" labels="letter" />}
                </ParentSize>
                
                <div className="text-black">
                </div>
            </div>
        </div>
    )
}