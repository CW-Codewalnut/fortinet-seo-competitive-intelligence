
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Card from '../components/Card';
import { serpFeaturesDistribution, serpFeatureWinRate } from '../data/data';

const PLATFORM_COLORS: { [key: string]: string } = {
  Fortinet: '#dc2626',
  Cisco: '#2563eb',
  Paloalto: '#16a34a',
  Crowdstrike: '#9333ea',
  Checkpoint: '#f97316',
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg text-sm">
                <p className="font-bold text-gray-800">{label}</p>
                <p style={{ color: payload[0].fill }}>
                    {payload[0].name}: {payload[0].value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </p>
            </div>
        );
    }
    return null;
};

const SerpFeaturesDashboard: React.FC = () => {
    const sortedFeatures = [...serpFeaturesDistribution].sort((a, b) => b.value - a.value);
    const sortedWinRate = [...serpFeatureWinRate].sort((a,b) => b.value - a.value);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card title="Distribution of SERP Features" className="lg:col-span-3">
                 <div style={{ height: '500px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sortedFeatures} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" tick={{ fill: '#4b5563' }} />
                            <YAxis dataKey="name" type="category" width={150} tick={{ fill: '#4b5563', fontSize: 12 }} />
                            <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} />
                            <Bar dataKey="value" name="Count" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            <Card 
              title="Average SERP Features Owned per Keyword"
              description="The average number of SERP features each competitor owns for the keywords they rank for."
              className="lg:col-span-2">
                <div style={{ height: '500px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sortedWinRate} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="platform" tick={{ fill: '#4b5563' }} />
                            <YAxis tick={{ fill: '#4b5563' }} />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                            <Bar dataKey="value" name="Win Rate">
                                {sortedWinRate.map((entry) => (
                                    <Cell key={`cell-${entry.platform}`} fill={PLATFORM_COLORS[entry.platform]} className={entry.platform === 'Fortinet' ? 'stroke-2 stroke-gray-800' : ''}/>
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default SerpFeaturesDashboard;
