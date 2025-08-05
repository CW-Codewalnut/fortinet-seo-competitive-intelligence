

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Card from '../components/Card';
import { 
    topKeywordsByTrafficValue,
    strikingDistanceOpportunities,
    topGainedKeywordsByTrafficImpact,
    topLostKeywordsByTrafficImpact,
    organicTrafficByIntent
} from '../data/data';
import { KeywordTrafficImpact } from '../types';

const PLATFORM_COLORS: { [key: string]: string } = {
  Fortinet: '#dc2626',
  Cisco: '#2563eb',
  Paloalto: '#16a34a',
  Crowdstrike: '#9333ea',
  Checkpoint: '#f97316',
};

const INTENT_COLORS: { [key: string]: string } = {
    informational: '#3b82f6', // blue-500
    navigational: '#6b7280',  // gray-500
    transactional: '#16a34a', // green-600
};

const formatCurrency = (value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const formatNumber = (num: number) => num.toLocaleString('en-US');
const formatK = (num: number) => num > 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();

const TrafficImpactList: React.FC<{ title: string; data: KeywordTrafficImpact[]; positive: boolean }> = ({ title, data, positive }) => (
    <div>
        <h4 className={`text-md font-semibold mb-3 ${positive ? 'text-green-700' : 'text-red-700'}`}>{title}</h4>
        <ul className="space-y-3">
            {data.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                    <div>
                        <div className={`font-medium ${item.platform === 'Fortinet' ? 'text-red-600' : 'text-gray-800'}`}>{item.keyword}</div>
                        <div className="text-xs text-gray-500">{item.platform}</div>
                    </div>
                    <div className="text-right">
                        <div className={`font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
                           {positive ? '▲' : '▼'} {formatNumber(Math.abs(item.trafficChange))}
                        </div>
                        <div className="text-xs text-gray-500">now {formatNumber(item.currentTraffic)}</div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const IntentTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg text-sm">
                <p className="font-bold text-gray-800">{label}</p>
                 {payload.map((pld: any) => (
                    <div key={pld.dataKey} style={{ color: pld.color }}>
                        <span className="capitalize">{pld.name}</span>: {formatNumber(pld.value)}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const KeywordIntelligenceDashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card 
                title="Top Keywords by Estimated Traffic Value"
                description="Keywords generating the most value, calculated by multiplying organic traffic by its equivalent CPC cost."
                className="lg:col-span-3"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Keyword</th>
                                <th scope="col" className="px-6 py-3">Platform</th>
                                <th scope="col" className="px-6 py-3 text-right">Organic Traffic</th>
                                <th scope="col" className="px-6 py-3 text-right">CPC</th>
                                <th scope="col" className="px-6 py-3 text-right">Estimated Traffic Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topKeywordsByTrafficValue.map((item, index) => (
                                <tr key={index} className={`bg-white border-b ${item.platform === 'Fortinet' ? 'bg-red-50' : ''}`}>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.keyword}</td>
                                    <td className="px-6 py-4 font-semibold" style={{color: PLATFORM_COLORS[item.platform]}}>{item.platform}</td>
                                    <td className="px-6 py-4 text-right font-medium text-gray-800">{formatNumber(item.currentTraffic)}</td>
                                    <td className="px-6 py-4 text-right font-medium text-gray-600">{formatCurrency(item.cpc)}</td>
                                    <td className="px-6 py-4 text-right font-bold text-blue-600">{formatCurrency(item.estimatedValue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card
                title="'Striking Distance' Opportunities (Positions 4-20)"
                description="High-volume keywords where you rank on the first or second page, offering strong potential for quick traffic gains with optimization."
                className="lg:col-span-2"
            >
                 <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3">Keyword</th>
                                <th scope="col" className="px-6 py-3">Platform</th>
                                <th scope="col" className="px-6 py-3 text-right">Volume</th>
                                <th scope="col" className="px-6 py-3 text-right">Difficulty (KD)</th>
                                <th scope="col" className="px-6 py-3 text-right">Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {strikingDistanceOpportunities.map((item, index) => (
                                <tr key={index} className={`bg-white border-b ${item.platform === 'Fortinet' ? 'bg-red-50' : ''}`}>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.keyword}</td>
                                    <td className="px-6 py-4 font-semibold" style={{color: PLATFORM_COLORS[item.platform]}}>{item.platform}</td>
                                    <td className="px-6 py-4 text-right font-medium text-gray-800">{item.volume.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            item.kd < 20 ? 'bg-green-100 text-green-800' : 
                                            item.kd < 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                        }`}>{item.kd}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-800">{item.currentPosition}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

             <Card
                title="Organic Traffic Distribution by Intent"
                description="How each competitor's organic traffic is distributed across different user intents."
             >
                <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={organicTrafficByIntent} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" tickFormatter={formatK} tick={{ fill: '#4b5563' }} />
                            <YAxis dataKey="platform" type="category" width={80} tick={{ fill: '#4b5563' }}/>
                            <Tooltip content={<IntentTooltip />} cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                            <Legend wrapperStyle={{paddingTop: "20px"}}/>
                            <Bar dataKey="informational" stackId="a" fill={INTENT_COLORS.informational} name="Informational" />
                            <Bar dataKey="transactional" stackId="a" fill={INTENT_COLORS.transactional} name="Transactional" />
                            <Bar dataKey="navigational" stackId="a" fill={INTENT_COLORS.navigational} name="Navigational" radius={[0, 4, 4, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
             </Card>

            <Card title="Keywords with Major Traffic Impact" className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <TrafficImpactList title="Top 5 Traffic Gainers" data={topGainedKeywordsByTrafficImpact} positive={true} />
                    <TrafficImpactList title="Top 5 Traffic Losers" data={topLostKeywordsByTrafficImpact} positive={false} />
                </div>
            </Card>
        </div>
    );
};

export default KeywordIntelligenceDashboard;