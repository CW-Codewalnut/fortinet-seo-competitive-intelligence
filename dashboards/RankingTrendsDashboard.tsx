
import React from 'react';
import Card from '../components/Card';
import { biggestClimbers, biggestDecliners } from '../data/data';
import { RankingTrend } from '../types';

const PLATFORM_COLORS: { [key: string]: string } = {
  Fortinet: '#dc2626',
  Cisco: '#2563eb',
  Paloalto: '#16a34a',
  Crowdstrike: '#9333ea',
  Checkpoint: '#f97316',
};

const TrendArrow: React.FC<{ change: number }> = ({ change }) => {
    if (change > 0) {
        return <span className="text-green-500 font-bold text-lg">▲</span>;
    }
    if (change < 0) {
        return <span className="text-red-500 font-bold text-lg">▼</span>;
    }
    return <span className="text-gray-500">-</span>;
};

const TrendsTable: React.FC<{ title: string; data: RankingTrend[]; positive: boolean }> = ({ title, data, positive }) => (
    <Card title={title}>
        <div className="overflow-x-auto max-h-[450px]">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                    <tr>
                        <th scope="col" className="px-4 py-3">Keyword</th>
                        <th scope="col" className="px-4 py-3">Platform</th>
                        <th scope="col" className="px-4 py-3 text-center">Change</th>
                        <th scope="col" className="px-4 py-3 text-center">Prev. Pos.</th>
                        <th scope="col" className="px-4 py-3 text-center">Curr. Pos.</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={`bg-white border-b ${item.platform === 'Fortinet' ? 'bg-red-50' : ''}`}>
                            <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">{item.keyword}</td>
                            <td className="px-4 py-4">
                                <span className="font-semibold" style={{ color: PLATFORM_COLORS[item.platform] }}>{item.platform}</span>
                            </td>
                            <td className={`px-4 py-4 text-center font-bold ${positive ? 'text-green-600' : 'text-red-600'}`}>
                                <div className="flex items-center justify-center">
                                    <TrendArrow change={item.change} />
                                    <span className="ml-1">{Math.abs(item.change)}</span>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-center text-gray-500">{item.previousPosition}</td>
                            <td className="px-4 py-4 text-center font-bold text-gray-800">{item.currentPosition}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);


const RankingTrendsDashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendsTable title="Top 10 Biggest Climbers" data={biggestClimbers} positive={true} />
            <TrendsTable title="Top 10 Biggest Decliners" data={biggestDecliners} positive={false} />
        </div>
    );
};

export default RankingTrendsDashboard;
