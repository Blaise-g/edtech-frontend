// src/components/ProgressChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <Line type="monotone" dataKey="score" stroke="#8884d8" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
);

export default ProgressChart;
