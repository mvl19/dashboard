import { bar } from "../data"
import { scaleOrdinal } from "@visx/scale"
import { GradientPurpleTeal } from "@visx/gradient"
import { Group } from "@visx/group"
import Pie from '@visx/shape/lib/shapes/Pie'
import { Text } from "@visx/text"
import { useState } from "react"

interface Browsers {
    date: string;
    'Google Chrome': string;
    'Internet Explorer': string;
    Firefox: string;
    Safari: string;
    'Microsoft Edge': string;
    Opera: string;
    Mozilla: string;
    'Other/Unknown': string;
}

type BrowserNames = keyof Browsers

interface BrowserUsage {
    label: BrowserNames,
    usage: number,
}

const browserNames = Object.keys(bar[0]).filter(b => b!=='date')
const browsers: BrowserUsage[] = browserNames.map((name) => ({
    label: name,
    usage: Number(bar[0][name]),
  }));

const defaultMargin = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20
}

interface PieProps {
    width: number,
    height: number,
    margin?: typeof defaultMargin,
    animate?: boolean,
    fontSize?: number,
    fill?:string,
    annotationFontSize:number,
}

export default function PieChart({
    width,
    height,
    margin=defaultMargin,
    fontSize=14,
    fill='#ffffff',
    annotationFontSize=14
}: PieProps) {
    const accessors = {
        usage: (d: BrowserUsage) => d.usage,
    }
    const getColors = scaleOrdinal({
        domain: browserNames,
        range: [
            'rgba(255,255,255,0.7)',
            'rgba(255,255,255,0.6)',
            'rgba(255,255,255,0.5)',
            'rgba(255,255,255,0.4)',
            'rgba(255,255,255,0.3)',
            'rgba(255,255,255,0.2)',
            'rgba(255,255,255,0.1)',
        ]
    })
    if (width < 10) return null
    const [active, setActive] = useState(null)
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const radius = Math.min(innerWidth, innerHeight) / 2
    const centerY = innerHeight / 2
    const centerX = innerWidth / 2
    const donutThickness = 50
    return (
        <div>
            <svg width={width} height={height}>
            <GradientPurpleTeal id="visx-pie" />
            <rect rx={14} width={width} height={height} fill="url('#visx-pie')" />
            <Group top={centerY + margin.top} left={centerX + margin.left}>
            <Pie
              data={browsers}
              pieValue={accessors.usage}
              outerRadius={radius}
              innerRadius={radius - donutThickness}
              cornerRadius={3}
              padAngle={0.005}
              >
                {(pie)=>{
                    return pie.arcs.map((arc, index) => {
                        const {label} = arc.data
                        const [centroidX, centroidY] = pie.path.centroid(arc)
                        const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1
                        const arcPath = pie.path(arc)
                        const arcFill = getColors(label)
                        return (
                            <g key={`arc-${label}-${index}`}>
                                <path d={arcPath} fill={arcFill}
                                onMouseEnter={() => setActive(arc.data)}
                                onMouseLeave={() => setActive(null)}
                                />
                                {hasSpaceForLabel && (
                                    <text
                                    x={centroidX}
                                    y={centroidY}
                                    dy=".33em"
                                    fill={fill}
                                    fontSize={fontSize}
                                    textAnchor="middle"
                                    pointerEvents={"none"}>
                                        {arc.data.label}
                                    </text>
                                )}
                            </g>
                        )
                    })
                }}
            </Pie>
            {active ? (
                <>
                <Text textAnchor="middle" fill="#ffffff" fontSize={annotationFontSize} dy={-10}>
                    {active.label + " " + active.usage + "%"}
                </Text>
                </>
            ): (
                <>
                </>
            )}
            </Group>
        </svg>
        </div>
    )
}