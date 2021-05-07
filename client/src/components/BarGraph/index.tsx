import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export type LineGraphProps = {
  dataPoints: any
  dataKey: string
  labelKey: string
}

const BarGraph = ({ dataPoints, dataKey, labelKey }: LineGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={dataPoints}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={labelKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarGraph
