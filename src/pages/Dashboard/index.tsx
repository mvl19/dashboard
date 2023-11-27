import LineChart from "../../components/Line"
import { salaryData, spendingData } from "../../data"

export default function Dashboard() {

    return (
        <div className="flex justify-center">
            <div className="w-[100%] h-screen max-h-[100%] flex flex-col items-center bg-white p-[24px]">
                <LineChart data={[spendingData, salaryData]}/>
                <div className="text-black">
                </div>
            </div>
        </div>
    )
}