
import React from 'react';
import Card from '../components/Card';
import { contentGaps } from '../data/data';

const PLATFORM_COLORS: { [key: string]: string } = {
  Fortinet: '#dc2626',
  Cisco: '#2563eb',
  Paloalto: '#16a34a',
  Crowdstrike: '#9333ea',
  Checkpoint: '#f97316',
};

const ContentOpportunityDashboard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 gap-6">
            <Card 
                title="Content Gaps"
                description="These keywords represent opportunities where competitors are gaining traffic for terms Fortinet currently doesn't rank for."
            >
                <div className="overflow-x-auto max-h-[500px]">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3">Opportunity Keyword</th>
                                <th scope="col" className="px-6 py-3">Top Competitor</th>
                                <th scope="col" className="px-6 py-3 text-right">Competitor Position</th>
                                <th scope="col" className="px-6 py-3 text-right">Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contentGaps.map((gap, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{gap.keyword}</td>
                                    <td className="px-6 py-4 font-semibold" style={{ color: PLATFORM_COLORS[gap.platform] }}>{gap.platform}</td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-800">{gap.position < 1 ? '1' : Math.round(gap.position)}</td>
                                    <td className="px-6 py-4 text-right font-medium text-blue-600">{gap.volume.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ContentOpportunityDashboard;