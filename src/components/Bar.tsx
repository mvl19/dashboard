import { Group } from "@visx/group"
import { SeriesPoint } from "@visx/shape/lib/types"
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale"
import { BarStackHorizontal } from "@visx/shape"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { bar } from "../data"
import { Tooltip, defaultStyles, useTooltip } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import { SalmonAqua } from "../themes/colors"

interface ToolTipData {
    data: SeriesPoint<Datum>,
    index: number,
    height: number,
    width: number,
    x: number,
    y: number,
    color: string,
}

interface HorizontalBarProps {
    width: number,
    height: number,
    margin: {top: number, right: number, left: number, bottom: number},
    events?: boolean,
    background: string,
    scale?: string [],
    yLabel?: string,
    keys?: string [],
    data: Datum
}

interface Datum {
    [i: number]: never,
    [k: string]: any,
}

type Data = Datum[]

const defaultColor = '#a44afe'
const defaultBackground = '#eaedff'

const defaultMargin = { 
    top: 40, 
    left: 50, 
    right: 40, 
    bottom: 100 
}

const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color:'white',
}

let tooltipTimeout: number

export default function HorizontalBar({
    width,
    height,
    events=false,
    margin=defaultMargin,
    background=defaultBackground,
    scale=SalmonAqua,
    yLabel='date',
    data
    }: HorizontalBarProps & WithTooltipProvidedProps<ToolTipData>) {
    const { tooltipOpen, tooltipLeft=0, tooltipTop=0, tooltipData, hideTooltip, showTooltip } = useTooltip<ToolTipData>();
    const keys = Object.keys(data[0]).filter(d=> d!== yLabel)

    const dataTotal = data.reduce((allTotal, date) => {
        const totalUsage = keys.reduce((daily, k) => {
            daily += Number(date[k])
            return daily
        }, 0)
        allTotal.push(totalUsage)
        return allTotal
    }, [] as number[])
    
    const accessor = (d: Data) => d[yLabel]
    const yScale = scaleBand<string>({
        domain: data.map(accessor),
        padding: 0.2,
    })
    const xScale = scaleLinear<number>({
        domain: [0, Math.max(...dataTotal)]
    })
    const colorScale = scaleOrdinal({
        domain:keys,
        range: scale,
    })
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom
    yScale.rangeRound([yMax, 0])
    xScale.rangeRound([0, xMax])
    if (width < 10) return null
    return (
        <div>
            <svg width={width} height={height}>
                <rect width={width} height={height} fill={background} rx={14} />
                <Group top={margin.top} left={margin.left}>
                    <BarStackHorizontal
                    data={data}
                    keys={Object.keys(data[0]).filter(d => d!== yLabel)}
                    height={yMax}
                    y={accessor}
                    xScale={xScale}
                    yScale={yScale}
                    color={colorScale}>
                        {(barStacks) =>
                        barStacks.map((barStack) =>
                        barStack.bars.map((bar) => (
                            <rect
                            key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                            onMouseLeave={() => {
                                tooltipTimeout = window.setTimeout(() => {
                                  hideTooltip();
                                }, 300);
                              }}
                            onMouseMove={()=>{
                                if (tooltipTimeout) clearTimeout(tooltipTimeout)
                                const top = bar.y + margin.top
                                const left = bar.x + bar.width + margin.left
                                showTooltip({
                                    tooltipData: bar,
                                    tooltipTop: top,
                                    tooltipLeft: left,
                                  })
                            }}
                                />
                            )),
                            )
                        }
                    </BarStackHorizontal>
                    <AxisLeft
                    hideAxisLine
                    hideTicks
                    scale={yScale}
                    stroke={defaultColor}
                    tickStroke={defaultColor}
                    tickLabelProps={{
                        fill: defaultColor,
                        fontSize: 7,
                        textAnchor: 'end',
                        dy: '0.33em',
                      }}
                    />
                    <AxisBottom 
                    top={yMax}
                    scale={xScale}
                    stroke={defaultColor}
                    tickStroke={defaultColor}
                    tickLabelProps={{
                        fill: defaultColor,
                        fontSize: 11,
                        textAnchor: 'middle',
                      }}
                    />
                </Group>
            </svg>
            {tooltipOpen && tooltipData && (
          <Tooltip top={height + tooltipTop} left={tooltipLeft} style={tooltipStyles}>
            <div style={{ color: colorScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.bar.data[tooltipData.key]}%</div>
            <div>
              <small>{accessor(tooltipData.bar.data)}</small>
            </div>
          </Tooltip>
        )}
        </div>
    )
}