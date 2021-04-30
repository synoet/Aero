import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export type LineGraphProps = {
  dataPoints: any
  dataKey: string
  labelKey: string
}

const LineGraph = ({ dataPoints, dataKey, labelKey }: LineGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={dataPoints}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={labelKey} />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="#6137FE" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineGraph
