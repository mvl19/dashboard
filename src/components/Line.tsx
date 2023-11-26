import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart'

interface DataPoints {
    x: string,
    y: number,
}

interface LineProps {
    height? : number,
    numTicks? : number,
    data: DataPoints[][],
}

export default function LineChart(props: LineProps) {
  const accessors = {
    xAccessor: (d: DataPoints) => d.x,
    yAccessor: (d: DataPoints) => d.y,
  };

  return (
    <XYChart height={props.height} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} numTicks={props.numTicks} />
      {props.data.map((point, index)=><AnimatedLineSeries key={index} dataKey={"Line " + (index+1)} data={point} {...accessors} /> )}
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {', '}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  )
}

LineChart.defaultProps = {
    height : 300,
    numTicks : 4,
}