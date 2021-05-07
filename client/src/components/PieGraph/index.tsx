import React from 'react'
import { PieChart, Pie, Tooltip, Sector, Cell, ResponsiveContainer } from 'recharts'

export type LineGraphProps = {
  dataPoints: any
}

const PieGraph = ({ dataPoints }: LineGraphProps) => {
  const data = [
    { name: 'direct', value: dataPoints.direct },
    { name: 'indirect', value: dataPoints.indirect },
  ]
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          innerRadius={30}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieGraph
