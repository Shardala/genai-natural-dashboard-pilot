'use client';

/* eslint-disable */

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { noChartAsk } from '@/app/consts';

export default function ChartRenderer() {
  const [chart, setChart] = useState<any | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('chart');
    if (saved) setChart(JSON.parse(saved));
  }, []);

  if (!chart) return (
    <p className="text-gray-500">
      {noChartAsk}
    </p>
  );

  return (
    <div className="w-full h-96 bg-[#212121] shadow p-4 rounded-lg mt-[2rem] border border-deactive text-[#ccc]">
      <h2 className="text-lg font-bold mb-4 text-[#b4ffc2] uppercase">
        {chart.title}
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <div>
          {chart.chartType === 'line' && (
            <LineChart data={JSON.parse(chart.data)} width={800} height={300}>
              <XAxis dataKey={chart.xKey} stroke="#aaaaaa" />
              <YAxis stroke="#aaaaaa" />
              <Tooltip
                contentStyle={{ backgroundColor: '#333' }}
                itemStyle={{ color: '#4ca' }}
                cursor={{ fill: "#333333" }}
              />
              <Legend />
              <Line type="monotone" dataKey={chart.yKey} stroke="#4ca" />
            </LineChart>
          )}
          {chart.chartType === 'bar' && (
            <BarChart data={JSON.parse(chart.data)} width={800} height={300}>
              <CartesianGrid strokeOpacity={0.4} strokeDasharray="3 3" />
              <XAxis dataKey={chart.xKey} stroke="#aaaaaa" />
              <YAxis stroke="#aaaaaa" />
              <Tooltip
                contentStyle={{ backgroundColor: '#333' }}
                itemStyle={{ color: '#4ca' }}
                cursor={{ fill: "#333333" }}
              />
              <Legend />
              <Bar dataKey={chart.yKey} fill="#4ca" barSize={60} />
            </BarChart>
          )}
          {chart.chartType === 'pie' && (
            <PieChart width={800} height={300}>
              <Pie data={JSON.parse(chart.data)} dataKey={chart.yKey} nameKey={chart.xKey} outerRadius={100}>
                {JSON.parse(chart.data).map((_: any, idx: number) => (
                  <Cell key={idx} fill={['#0088FE','#00C49F','#FFBB28','#FF8042'][idx % 4]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#333' }}
                itemStyle={{ color: '#4ca' }}
                cursor={{ fill: "#333333" }}
              />
              <Legend />
            </PieChart>
          )}
        </div>
      </ResponsiveContainer>
    </div>
  );
}
