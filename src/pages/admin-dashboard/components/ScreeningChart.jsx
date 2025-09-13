import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

import Button from '../../../components/ui/Button';

const ScreeningChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('14days');

  const screeningData = [
    { date: '01 Sep', screenings: 45, suspected: 3, referrals: 2 },
    { date: '02 Sep', screenings: 52, suspected: 4, referrals: 3 },
    { date: '03 Sep', screenings: 38, suspected: 2, referrals: 1 },
    { date: '04 Sep', screenings: 61, suspected: 5, referrals: 4 },
    { date: '05 Sep', screenings: 47, suspected: 3, referrals: 2 },
    { date: '06 Sep', screenings: 55, suspected: 4, referrals: 3 },
    { date: '07 Sep', screenings: 42, suspected: 2, referrals: 1 },
    { date: '08 Sep', screenings: 58, suspected: 6, referrals: 5 },
    { date: '09 Sep', screenings: 49, suspected: 3, referrals: 2 },
    { date: '10 Sep', screenings: 63, suspected: 4, referrals: 3 },
    { date: '11 Sep', screenings: 51, suspected: 5, referrals: 4 },
    { date: '12 Sep', screenings: 46, suspected: 2, referrals: 1 },
    { date: '13 Sep', screenings: 54, suspected: 4, referrals: 3 },
    { date: 'Today', screenings: 37, suspected: 3, referrals: 2 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 medical-shadow">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Screening Analytics</h3>
          <p className="text-sm text-muted-foreground">14-day screening trends and outcomes</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
              iconSize={16}
            >
              Line
            </Button>
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('bar')}
              iconName="BarChart3"
              iconSize={16}
            >
              Bar
            </Button>
          </div>
          
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus-medical"
          >
            <option value="7days">Last 7 days</option>
            <option value="14days">Last 14 days</option>
            <option value="30days">Last 30 days</option>
          </select>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={screeningData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="screenings" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                name="Total Screenings"
              />
              <Line 
                type="monotone" 
                dataKey="suspected" 
                stroke="var(--color-warning)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 3 }}
                name="Suspected Cases"
              />
              <Line 
                type="monotone" 
                dataKey="referrals" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                name="Referrals Made"
              />
            </LineChart>
          ) : (
            <BarChart data={screeningData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="screenings" fill="var(--color-primary)" name="Total Screenings" radius={[2, 2, 0, 0]} />
              <Bar dataKey="suspected" fill="var(--color-warning)" name="Suspected Cases" radius={[2, 2, 0, 0]} />
              <Bar dataKey="referrals" fill="var(--color-accent)" name="Referrals Made" radius={[2, 2, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Total Screenings</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-sm text-muted-foreground">Suspected Cases</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Referrals Made</span>
        </div>
      </div>
    </div>
  );
};

export default ScreeningChart;