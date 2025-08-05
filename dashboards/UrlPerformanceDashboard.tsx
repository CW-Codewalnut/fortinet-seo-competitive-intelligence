
import React from 'react';
import Card from '../components/Card';
import { topLandingPagesByTraffic, topLandingPagesTrafficChange, rankingKeywordsPerTopPage, urlChangesCount, urlChangesSample } from '../data/data';

const ChangePill: React.FC<{ value: number }> = ({ value }) => {
    const isPositive = value > 0;
    const isNegative = value < 0;

    if (value === 0) return <span className="text-gray-500">-</span>;

    return (
        <span className={`font-semibold text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(value).toLocaleString()}
        </span>
    );
};

const UrlPerformanceDashboard: React.FC = () => {
    
    const isFortinetUrl = (url: string) => url.includes('fortinet.com');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Top 5 Landing Pages by Organic Traffic" className="lg:col-span-2">
                <ul className="space-y-4">
                    {topLandingPagesByTraffic.map((page, index) => (
                        <li key={index} className={`p-3 rounded-lg ${isFortinetUrl(page.url) ? 'bg-red-50' : 'bg-gray-50'}`}>
                            <div className="flex justify-between items-center">
                                <a href={page.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate pr-4">{page.url}</a>
                                <span className="font-bold text-gray-800 whitespace-nowrap">{page.traffic.toLocaleString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
            
            <Card title="Ranking Keywords per Top Page">
                <ul className="space-y-4">
                    {rankingKeywordsPerTopPage.map((page, index) => (
                        <li key={index} className={`p-3 rounded-lg ${isFortinetUrl(page.url) ? 'bg-red-50' : 'bg-gray-50'}`}>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-700 truncate pr-4">{page.url.replace('https://www.','').replace('https://','').split('/')[0]}/...</p>
                                <span className="font-bold text-gray-800 whitespace-nowrap">{page.count} Keywords</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card title="Traffic Change per Top 5 Landing Pages" className="lg:col-span-3">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Landing Page</th>
                                <th scope="col" className="px-6 py-3 text-right">Current Traffic</th>
                                <th scope="col" className="px-6 py-3 text-right">Previous Traffic</th>
                                <th scope="col" className="px-6 py-3 text-right">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topLandingPagesTrafficChange.map((page, index) => (
                                <tr key={index} className={`bg-white border-b ${isFortinetUrl(page.url) ? 'bg-red-50' : ''}`}>
                                    <td className="px-6 py-4 font-medium text-gray-900"><a href={page.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{page.url}</a></td>
                                    <td className="px-6 py-4 text-right font-semibold">{page.currentTraffic.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-gray-600">{page.previousTraffic.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right"><ChangePill value={page.trafficChange} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            
            <Card title="URL Changes" className="lg:col-span-3">
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg mb-4">
                    <div className="text-4xl font-bold text-blue-600">{urlChangesCount}</div>
                    <div className="ml-4 text-gray-600">Total URL Changes Detected</div>
                </div>
                <h4 className="font-semibold text-md text-gray-700 mb-2">Sample Changes (Fortinet)</h4>
                <div className="overflow-x-auto">
                     <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Keyword</th>
                                <th scope="col" className="px-6 py-3">Previous URL</th>
                                <th scope="col" className="px-6 py-3">Current URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urlChangesSample.map((change, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900">{change.keyword}</td>
                                    <td className="px-6 py-4 text-red-600 truncate max-w-xs">{change.previousUrl}</td>
                                    <td className="px-6 py-4 text-green-600 truncate max-w-xs">{change.currentUrl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default UrlPerformanceDashboard;
