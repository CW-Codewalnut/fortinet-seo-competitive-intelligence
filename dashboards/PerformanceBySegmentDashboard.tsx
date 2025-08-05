
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Card from '../components/Card';
import {
    currentTrafficBySegment,
    previousTrafficBySegment,
} from '../data/data';
import { SegmentData } from '../types';

const PLATFORM_COLORS: { [key: string]: string } = {
  Fortinet: '#dc2626',
  Cisco: '#2563eb',
  Paloalto: '#16a34a',
  Crowdstrike: '#9333ea',
  Checkpoint: '#f97316',
};

const platforms = ['Checkpoint', 'Cisco', 'Crowdstrike', 'Fortinet', 'Paloalto'];

const calculatePercentageChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? Infinity : 0;
    return ((current - previous) / previous) * 100;
};

const formatNumber = (num: number) => num.toLocaleString('en-US');

const ChangeCell: React.FC<{ change: number }> = ({ change }) => {
    if (change === Infinity) {
        return <span className="text-green-600 font-semibold">New</span>
    }
    const isPositive = change > 0;
    const isNegative = change < 0;
    const color = isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500';

    return (
        <span className={`${color} font-semibold`}>
            {isPositive && '▲ '}
            {isNegative && '▼ '}
            {Math.abs(change).toFixed(1)}%
        </span>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg text-sm">
                <p className="font-bold text-gray-800">{label}</p>
                 {payload.map((pld: any) => (
                    <div key={pld.dataKey} style={{ color: pld.color }}>
                        {pld.name}: {pld.value.toFixed(1)}%
                    </div>
                ))}
            </div>
        );
    }
    return null;
};


const PerformanceBySegmentDashboard: React.FC = () => {

    const performanceData = currentTrafficBySegment.map(currentRow => {
        const segment = currentRow.segment;
        const previousRow = previousTrafficBySegment.find(p => p.segment === segment);
        if (!previousRow) return null;

        const platformData = platforms.reduce((acc, platform) => {
            const current = currentRow[platform as keyof SegmentData] as number;
            const previous = previousRow[platform as keyof SegmentData] as number;
            acc[platform] = {
                current,
                previous,
                change: calculatePercentageChange(current, previous)
            };
            return acc;
        }, {} as { [key: string]: { current: number; previous: number; change: number } });
        
        return { segment, ...platformData };
    }).filter((item): item is NonNullable<typeof item> => item !== null);

    const marketShareData = currentTrafficBySegment.map(currentRow => {
        const segment = currentRow.segment;
        const totalTrafficInSegment = platforms.reduce((sum, p) => sum + (currentRow[p as keyof SegmentData] as number), 0);
    
        const platformShares = platforms.reduce((acc, platform) => {
            const traffic = currentRow[platform as keyof SegmentData] as number;
            acc[platform] = totalTrafficInSegment > 0 ? (traffic / totalTrafficInSegment) * 100 : 0;
            return acc;
        }, {} as { [key: string]: number });
        
        return { name: segment, ...platformShares };
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <Card 
                title="Organic Traffic Market Share by Segment" 
                description="This chart visualizes each competitor's percentage share of the total organic traffic within each key segment."
                className="lg:col-span-3"
            >
                <div style={{ height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={marketShareData}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" hide={true} domain={[0, 100]} />
                            <YAxis 
                                type="category" 
                                dataKey="name"
                                width={180} 
                                tick={{ fontSize: 12, fill: '#4b5563' }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                            <Legend wrapperStyle={{paddingTop: "20px"}}/>
                            {platforms.map(p => (
                                <Bar key={p} dataKey={p} stackId="a" name={p} fill={PLATFORM_COLORS[p]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card
                title="Segment Performance Breakdown"
                description="Change in organic traffic over the 6-month period for each competitor across all segments."
                className="lg:col-span-3"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3">Segment</th>
                                {platforms.map(p => (
                                    <th scope="col" colSpan={3} className="px-4 py-3 text-center border-l" key={p} style={{backgroundColor: `${PLATFORM_COLORS[p]}20`}}>
                                        {p}
                                    </th>
                                ))}
                            </tr>
                            <tr className="text-xs text-gray-500 bg-gray-50">
                                <th></th>
                                {platforms.map(p => (
                                    <React.Fragment key={p}>
                                        <th className="px-2 py-2 font-medium text-right border-l" style={{backgroundColor: `${PLATFORM_COLORS[p]}20`}}>Current</th>
                                        <th className="px-2 py-2 font-medium text-right" style={{backgroundColor: `${PLATFORM_COLORS[p]}20`}}>Previous</th>
                                        <th className="px-2 py-2 font-medium text-right" style={{backgroundColor: `${PLATFORM_COLORS[p]}20`}}>% Change</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                           {performanceData.map(data => (
                               <tr key={data.segment} className="bg-white border-b">
                                   <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{data.segment}</td>
                                   {platforms.map(p => (
                                       <React.Fragment key={p}>
                                           <td className="px-2 py-3 text-right border-l font-medium text-gray-700" style={{backgroundColor: `${PLATFORM_COLORS[p]}10`}}>{formatNumber(data[p].current)}</td>
                                           <td className="px-2 py-3 text-right text-gray-500" style={{backgroundColor: `${PLATFORM_COLORS[p]}10`}}>{formatNumber(data[p].previous)}</td>
                                           <td className="px-2 py-3 text-right" style={{backgroundColor: `${PLATFORM_COLORS[p]}10`}}><ChangeCell change={data[p].change} /></td>
                                       </React.Fragment>
                                   ))}
                               </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card 
                title="Strategic Insights from Segment Analysis"
                className="lg:col-span-3"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-800 mb-2">Fortinet's Informational Content Bleed</h4>
                        <p className="text-red-700">Fortinet's most significant vulnerability is in the <strong>Informational + Non Branded</strong> segment, showing a massive traffic drop of over <strong>36k</strong>. This indicates a weakening grip on top-of-funnel, non-branded educational content, a critical area for attracting new users. Core topic pages may be outdated or losing rank to more comprehensive competitor content.</p>
                    </div>
                     <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-800 mb-2">Crowdstrike's Brand Moat</h4>
                        <p className="text-purple-700">Crowdstrike exhibits exceptional strength in the <strong>Informational + Branded</strong> segment, with a traffic gain of over <strong>33k</strong>. Their brand is a powerful magnet for traffic, suggesting high brand recognition and trust. Competitors struggle to siphon off users already looking for Crowdstrike-specific information.</p>
                    </div>
                     <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-bold text-blue-800 mb-2">Cisco's Commercial Capture</h4>
                        <p className="text-blue-700">Cisco is the undisputed leader in the <strong>Commercial + Non branded</strong> segment, with a traffic increase of over <strong>10k</strong>. This demonstrates a strong ability to capture users with high purchase intent who are searching for solutions without a specific brand in mind, effectively converting problem-aware searchers into potential leads.</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PerformanceBySegmentDashboard;
