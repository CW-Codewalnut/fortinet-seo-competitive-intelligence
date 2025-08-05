
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Card from '../components/Card';
import { ArrowUpRightIcon, ArrowDownRightIcon } from '../components/Icons';
import {
    totalOrganicTraffic,
    trafficChange,
    topTrafficGainers,
    topTrafficLosers,
    topPositionGainers,
    topPositionLosers,
    currentTrafficBySegment,
    volumeBySegment,
    trafficChangeBySegment
} from '../data/data';
import { SegmentData } from '../types';

const PLATFORM_COLORS: { [key: string]: string } = {
  Fortinet: '#dc2626',
  Cisco: '#2563eb',
  Paloalto: '#16a34a',
  Crowdstrike: '#9333ea',
  Checkpoint: '#f97316',
};

const SEGMENT_COLORS: { [key: string]: string } = {
  'Informational + Branded': '#60a5fa',
  'Informational + Non Branded': '#2563eb',
  'Commercial + Branded': '#fcd34d',
  'Commercial + Non branded': '#f97316',
  'Transactional + Branded': '#86efac',
  'Transactional + Non branded': '#16a34a',
  'Navigational + Branded': '#d1d5db',
  'Navigational + Non branded': '#4b5563',
};

const formatNumber = (num: number) => num.toLocaleString('en-US');
const formatK = (num: number) => num > 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();

const ChangePill: React.FC<{ value: number; isPosition?: boolean }> = ({ value, isPosition = false }) => {
    const isPositive = isPosition ? value > 0 : value > 0;
    const isNegative = isPosition ? value < 0 : value < 0;

    if (value === 0) {
        return <span className="text-gray-500">-</span>;
    }
    
    return (
        <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'}`}>
            {isPositive && <ArrowUpRightIcon className="h-4 w-4 mr-1" />}
            {isNegative && <ArrowDownRightIcon className="h-4 w-4 mr-1" />}
            {value.toFixed(isPosition ? 0 : 2)}{isPosition ? '' : '%'}
        </span>
    );
};

const TrafficChangePill: React.FC<{ value: number; isPositionChange?: boolean }> = ({ value, isPositionChange = false }) => {
    const goodChange = isPositionChange ? value > 0 : value > 0;
    const badChange = isPositionChange ? value < 0 : value < 0;
    
    return (
        <span className={`flex items-center text-sm font-semibold ${goodChange ? 'text-green-600' : 'text-red-600'}`}>
            {goodChange ? '▲' : '▼'} {Math.abs(value).toLocaleString()} {isPositionChange ? ' ranks' : ''}
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
                        {pld.name}: {formatNumber(pld.value)}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const OverviewDashboard: React.FC = () => {
    const [compositionView, setCompositionView] = useState<'traffic' | 'volume'>('traffic');
    
    const sortedTrafficData = [...totalOrganicTraffic].sort((a, b) => b.current - a.current);
    
    const trafficChartData = totalOrganicTraffic.map(d => ({
        name: d.platform,
        Current: d.current,
        Previous: d.previous
    })).sort((a,b) => b.Current - a.Current);

    const platforms = ['Checkpoint', 'Cisco', 'Crowdstrike', 'Fortinet', 'Paloalto'] as const;
    type Platform = typeof platforms[number];
    
    const sourceData = compositionView === 'traffic' ? currentTrafficBySegment : volumeBySegment;

    const compositionData = platforms.map(platform => {
        const platformData: { platform: string; [key: string]: any } = { platform };
        sourceData.forEach(segmentData => {
            platformData[segmentData.segment] = segmentData[platform as Platform];
        });
        return platformData;
    });

    const allChanges = trafficChangeBySegment.flatMap(row => 
        platforms.map(p => row[p as Platform])
    );
    const maxChange = Math.max(...allChanges);
    const minChange = Math.min(...allChanges);

    const getHeatmapColor = (value: number): string => {
        if (value > maxChange * 0.66) return 'bg-green-600 text-white font-bold';
        if (value > maxChange * 0.33) return 'bg-green-400 text-green-900';
        if (value > 0) return 'bg-green-200 text-green-800';
        
        if (value < minChange * 0.66) return 'bg-red-600 text-white font-bold';
        if (value < minChange * 0.33) return 'bg-red-400 text-red-900';
        if (value < 0) return 'bg-red-200 text-red-800';
        
        return 'bg-gray-100 text-gray-800';
    };


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Traffic Overview Cards */}
            {sortedTrafficData.map(trafficItem => {
                 const changeItem = trafficChange.find(c => c.platform === trafficItem.platform);
                 if (!changeItem) return null;
                 return (
                    <Card key={trafficItem.platform} title={trafficItem.platform} className={`${trafficItem.platform === 'Fortinet' ? 'ring-2 ring-red-500' : ''}`} titleClassName='text-base'>
                        <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold text-gray-800">
                                {formatK(trafficItem.current)}
                                <p className="text-xs font-normal text-gray-500">Organic Traffic</p>
                            </div>
                            <ChangePill value={changeItem.change} />
                        </div>
                    </Card>
                )
            })}

            {/* Total Organic Traffic Chart */}
            <Card 
                title="Total Organic Traffic (Current vs. Previous)" 
                description="A comparison of total organic traffic from January (Previous) to July (Current)."
                className="sm:col-span-2 lg:col-span-3 xl:col-span-5">
                 <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trafficChartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: '#4b5563' }}/>
                            <YAxis tickFormatter={formatK} tick={{ fill: '#4b5563' }}/>
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                            <Legend />
                            <Bar dataKey="Previous" fill="#a5b4fc" name="Previous Traffic" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Current" fill="#4f46e5" name="Current Traffic" radius={[4, 4, 0, 0]} >
                                {trafficChartData.map(entry => (
                                    <Cell key={`cell-${entry.name}`} fill={PLATFORM_COLORS[entry.name]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Keyword Performance Lists */}
            <Card title="Top 5 Traffic Gainers" className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <ul className="space-y-3">
                    {topTrafficGainers.map((item, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                            <div className={`font-medium ${item.platform === 'Fortinet' ? 'text-red-600' : 'text-gray-700'}`}>
                                {item.keyword} <span className="text-gray-500 text-xs">({item.platform})</span>
                            </div>
                            <TrafficChangePill value={item.change} />
                        </li>
                    ))}
                </ul>
            </Card>
            <Card title="Top 5 Traffic Losers" className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <ul className="space-y-3">
                    {topTrafficLosers.map((item, index) => (
                         <li key={index} className="flex justify-between items-center text-sm">
                             <div className={`font-medium ${item.platform === 'Fortinet' ? 'text-red-600' : 'text-gray-700'}`}>
                                 {item.keyword} <span className="text-gray-500 text-xs">({item.platform})</span>
                             </div>
                             <TrafficChangePill value={item.change} />
                         </li>
                    ))}
                </ul>
            </Card>
             <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1 grid grid-cols-1 gap-6">
                <Card title="Top Position Gainers">
                    <ul className="space-y-3">
                        {topPositionGainers.slice(0,3).map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm">
                                <div className={`font-medium truncate pr-2 ${item.platform === 'Fortinet' ? 'text-red-600' : 'text-gray-700'}`}>
                                    {item.keyword}
                                </div>
                                <TrafficChangePill value={item.change} isPositionChange />
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card title="Top Position Losers">
                    <ul className="space-y-3">
                        {topPositionLosers.slice(0,3).map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm">
                                <div className={`font-medium truncate pr-2 ${item.platform === 'Fortinet' ? 'text-red-600' : 'text-gray-700'}`}>
                                    {item.keyword}
                                </div>
                                <TrafficChangePill value={item.change} isPositionChange/>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

             {/* Traffic & Volume Composition by Segment */}
            <Card 
                title="Traffic & Volume Composition by Segment" 
                description="This chart breaks down each competitor's traffic or search volume by user intent and brand recognition."
                className="sm:col-span-2 lg:col-span-3 xl:col-span-5">
                <div className="flex justify-end mb-4">
                    <div className="inline-flex rounded-md shadow-sm">
                        <button onClick={() => setCompositionView('traffic')} className={`px-4 py-2 text-sm font-medium ${compositionView === 'traffic' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-200 rounded-l-lg focus:z-10 focus:ring-2 focus:ring-red-500`}>
                            Organic Traffic
                        </button>
                        <button onClick={() => setCompositionView('volume')} className={`px-4 py-2 text-sm font-medium ${compositionView === 'volume' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-r border-gray-200 rounded-r-md focus:z-10 focus:ring-2 focus:ring-red-500`}>
                            Search Volume
                        </button>
                    </div>
                </div>
                <div style={{ height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={compositionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="platform" tick={{ fill: '#4b5563' }} />
                            <YAxis tickFormatter={formatK} tick={{ fill: '#4b5563' }} />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} />
                            <Legend wrapperStyle={{fontSize: "12px", paddingTop: "20px"}}/>
                            {Object.entries(SEGMENT_COLORS).map(([segment, color]) => (
                                <Bar key={segment} dataKey={segment} stackId="a" fill={color} name={segment} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Organic Traffic Change by Segment (Heatmap) */}
            <Card 
                title="Organic Traffic Change by Segment" 
                description="This heatmap shows the absolute traffic gains (green) and losses (red) for each segment over the 6-month period."
                className="sm:col-span-2 lg:col-span-3 xl:col-span-5">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 border-collapse">
                        <thead>
                            <tr className="bg-gray-50">
                                <th scope="col" className="px-6 py-3 text-xs text-gray-700 uppercase">Segment</th>
                                {platforms.map(p => (
                                    <th key={p} scope="col" className={`px-6 py-3 text-xs text-white uppercase text-center`} style={{backgroundColor: PLATFORM_COLORS[p]}}>
                                        {p}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {trafficChangeBySegment.map(row => (
                                <tr key={row.segment} className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{row.segment}</td>
                                    {platforms.map(p => (
                                        <td key={p} className={`px-6 py-4 text-center font-medium ${getHeatmapColor(row[p as Platform])}`}>
                                            {row[p as Platform].toLocaleString()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

        </div>
    );
};

export default OverviewDashboard;