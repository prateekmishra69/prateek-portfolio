'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface RadarDataProps {
  data: {
    subject: string;
    strength: number;
    fullMark: number;
  }[];
}

const SkillsRadarChart: React.FC<RadarDataProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500 }} 
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.9)', 
            borderColor: 'rgba(255,255,255,0.1)', 
            borderRadius: '12px',
            color: 'white'
          }}
          itemStyle={{ color: '#06b6d4' }}
          formatter={(value: number) => [`${value}% Relative Strength`, 'Proficiency']}
        />
        <Radar
          name="Strength"
          dataKey="strength"
          stroke="#06b6d4"
          strokeWidth={2}
          fill="url(#radarGradient)"
          fillOpacity={0.6}
        />
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#a855f7" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SkillsRadarChart;
