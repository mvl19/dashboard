import { AreaClosed, Line, Bar } from "@visx/shape"
import { scaleTime, scaleLinear, scaleBand } from "@visx/scale"
import { AxisBottom } from "@visx/axis"
import { curveMonotoneX } from '@visx/curve'
import { Tooltip, TooltipWithBounds, useTooltip, defaultStyles } from '@visx/tooltip'
import { LinearGradient } from "@visx/gradient"
import { GridRows, GridColumns } from "@visx/grid"
import { salaryData } from "../data"
import { localPoint } from "@visx/event"
import { useMemo, useCallback } from "react"
import { max, extent, bisector } from '@visx/vendor/d3-array'

const background = '#3b6978'
const background2 = '#204051'
const accentColor = '#edffea';
const accentColorDark = '#75daad';
const tooltipStyles = {
    ...defaultStyles,
    background,
    border: '1px solid white',
    color: 'white',
}
interface Datum {
    [i: number]: never,
    [k: string]: any,
}
type Data = Datum[]

interface AreaProps {
    width: number, 
    height: number,
    margin?: {
        top: number,
        left: number,
        right: number,
        bottom: number,
    },
    data: Data,
    xAxisEnabled: boolean,
}

const defaultMargin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
}

export default function AreaChart({
    width,
    height,
    margin=defaultMargin,
    data=salaryData,
    xAxisEnabled=true
    }: AreaProps ) {
    const { hideTooltip, tooltipLeft=0, tooltipTop=0, tooltipData, showTooltip } = useTooltip<Datum>()
    const xAccessor = (d: Data) => new Date(d.x)
    const yAccessor = (d: Data) => d.y
    const bisect = bisector((d: Data) => new Date(d.x)).left

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = useMemo(
        () => scaleTime(
            {range: [margin.left, innerWidth + margin.left],
            domain: extent(data, xAccessor),
        }), [innerWidth, margin.left],
    )
    
    const valueScale = useMemo(
        () => scaleLinear({
            range: [innerHeight + margin.top, margin.top],
            domain: [0, (max(data, yAccessor) || 0) + innerHeight / 3],
            nice: true,
        }), [margin.top, innerHeight]
    )

    const xAxisScale = useMemo(
      () => scaleBand({
        range: [margin.left, innerWidth + margin.left],
        domain: data.map((d: Datum) => new Date(d.x).toLocaleDateString())
      }),[innerWidth, margin.left]
    )

    const handleTooltip = useCallback(
        (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
          const { x } = localPoint(event) || { x: 0 }
          const x0 = xScale.invert(x)
          const index = bisect(data, x0, 1)
          const d0 = data[index - 1]
          const d1 = data[index]
          let d = d0
          if (d1 && xAccessor(d1)) {
            d = x0.valueOf() - xAccessor(d0).valueOf() > xAccessor(d1).valueOf() - x0.valueOf() ? d1 : d0
          }
          showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: valueScale(yAccessor(d)),
          });
        },
        [showTooltip, valueScale, xScale],
      )

    if (width < 10) return null
    return (
        <div>
            <svg width={width} height={height}>
                <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill="url(#area-background-gradient)"
                rx={14} 
                />
                <LinearGradient id="area-background-gradient" from={background} to={background2} />
                <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
                <GridRows
                    left={margin.left}
                    scale={valueScale}
                    width={innerWidth}
                    strokeDasharray="1,3"
                    stroke={accentColor}
                    strokeOpacity={0}
                    pointerEvents={"none"}
                />
                <GridColumns 
                    top={margin.top}
                    scale={xScale}
                    height={innerHeight}
                    strokeDasharray="1,3"
                    stroke={accentColor}
                    strokeOpacity={0.2}
                    pointerEvents={"none"}
                />
                <AreaClosed 
                    data={data}
                    x={(d) => xScale(xAccessor(d)) ?? 0}
                    y={(d) => valueScale(yAccessor(d)) ?? 0}
                    yScale={valueScale}
                    strokeWidth={1}
                    stroke="url(#area-gradient)"
                    fill="url(#area-gradient)"
                    curve={curveMonotoneX}
                />
                <Bar
                    x={margin.left}
                    y={margin.top}
                    width={innerWidth}
                    height={innerHeight}
                    fill="transparent"
                    rx={14}
                    onTouchStart={handleTooltip}
                    onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={() => hideTooltip()}
                />
                {tooltipData && (
                    <g>
                    <Line
                        from={{ x: tooltipLeft, y: margin.top }}
                        to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                        stroke={accentColorDark}
                        strokeWidth={2}
                        pointerEvents="none"
                        strokeDasharray="5,2"
                    />
                    <circle
                        cx={tooltipLeft}
                        cy={tooltipTop + 1}
                        r={4}
                        fill="black"
                        fillOpacity={0.1}
                        stroke="black"
                        strokeOpacity={0.1}
                        strokeWidth={2}
                        pointerEvents="none"
                    />
                    <circle
                        cx={tooltipLeft}
                        cy={tooltipTop}
                        r={4}
                        fill={accentColorDark}
                        stroke="white"
                        strokeWidth={2}
                        pointerEvents="none"
                    />
                    </g>
                )}
                {xAxisEnabled ? <AxisBottom
                hideAxisLine
                hideTicks
                tickLabelProps={{
                  fill: '#ffffff',
                  fontSize: 7,
                  textAnchor: 'end',
                  dy: '0.33em',
                }}
                scale={xAxisScale}
                /> : <></>}
            </svg>
            {tooltipData && (
              <div>
                <TooltipWithBounds
                  key={Math.random()}
                  top={tooltipTop - 12}
                  left={tooltipLeft + 12}
                  style={tooltipStyles}
                >
                  {`$${yAccessor(tooltipData)}`}
                </TooltipWithBounds>
                <Tooltip
                  top={innerHeight}
                  left={tooltipLeft}
                  style={{
                    ...defaultStyles,
                    minWidth: 72,
                    textAlign: 'center',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {xAccessor(tooltipData).toLocaleDateString()}
                </Tooltip>
              </div>
            )}
        </div>
    )
}