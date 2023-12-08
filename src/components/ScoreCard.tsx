import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

const data = [
    {
        name: 'ace',
        uv: 1,
        fill: '#ffffff'
      },
      {
        name: '60%',
        uv: 0.6,
        fill: '#8884d8',
      }
]

export default function ScoreCard()  {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="0%"
                outerRadius="80%"
                barSize={10}
                data={data}
                startAngle={90}
                endAngle={-270}
            >
                <RadialBar 
                    dataKey="uv"
                />
            </RadialBarChart>
        </ResponsiveContainer>
    )
}