
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import Card from '../components/Card';
import { trafficLeaderboard, averageKeywordPosition, commonKeywordsCount, uniqueKeywordsCount, positionSuperiority, serpFeatureBreakdown } from '../data/data';
import { SerpFeatureBreakdownData } from '../types';


const PLATFORM_COLORS: { [key: string]: string } = {
  Fortinet: '#dc2626',
  Cisco: '#2563eb',
  Paloalto: '#16a34a',
  Crowdstrike: '#9333ea',
  Checkpoint: '#f97316',
};

const SERP_FEATURE_COLORS: { [key: string]: string } = {
  'Sitelinks': '#1f77b4',
  'Video preview': '#ff7f0e',
  'People also ask': '#2ca02c',
  'Thumbnail': '#d62728',
  'Top stories': '#9467bd',
  'Knowledge panel': '#8c564b',
  'AI Overview': '#e377c2',
  'Discussions and forums': '#7f7f7f',
  'Shopping': '#bcbd22',
  'Knowledge card': '#17becf',
  'Paid sitelinks': '#aec7e8',
  'Bottom ads': '#ffbb78',
  'Top ads': '#98df8a',
  'Shopping Ads': '#ff9896',
  'Local pack': '#c5b0d5',
  'Featured snippet': '#c49c94',
  'Videos': '#f7b6d2',
  'Local teaser': '#c7c7c7',
};

const formatK = (num: number) => num > 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg text-sm">
                <p className="font-bold text-gray-800">{label}</p>
                 {payload.map((pld: any) => (
                    <div key={pld.dataKey} style={{ color: pld.color }}>
                        {pld.name}: {pld.name === 'Position' ? pld.value.toFixed(2) : formatK(pld.value)}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const StackedTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const reversedPayload = [...payload].reverse();
        return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg text-sm">
                <p className="font-bold text-gray-800">{label}</p>
                {reversedPayload.map((pld: any) => (
                    <div key={pld.dataKey} style={{ color: pld.color }}>
                        {pld.name}: {formatK(pld.value)}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="text-xs text-center -mx-2 mt-4" style={{lineHeight: 1.7}}>
      {
        payload.map((entry: any, index: number) => (
          <span key={`item-${index}`} className="inline-flex items-center mx-2">
            <span className="w-2.5 h-2.5 mr-1.5 rounded-sm" style={{backgroundColor: entry.color}}></span>
            {entry.value}
          </span>
        ))
      }
    </div>
  );
};


const CompetitorComparisonDashboard: React.FC = () => {

    // Process SERP data to group small features into "Other"
    const THRESHOLD = 20;
    const processedSerpData = serpFeatureBreakdown.map(competitorData => {
        const newCompetitorData: { [key: string]: string | number } = { platform: competitorData.platform };
        let otherValue = 0;

        Object.entries(competitorData).forEach(([key, value]) => {
            if (key === 'platform' || typeof value !== 'number') return;
            
            if (value < THRESHOLD) {
                otherValue += value;
            } else {
                newCompetitorData[key] = value;
            }
        });

        if (otherValue > 0) {
            newCompetitorData['Other'] = otherValue;
        }
        
        return newCompetitorData;
    });

    const allProcessedFeatures = new Set<string>();
    processedSerpData.forEach(d => {
        Object.keys(d).forEach(key => {
            if (key !== 'platform') {
                allProcessedFeatures.add(key);
            }
        });
    });

    const SERP_FEATURES_TO_DISPLAY = Object.keys(SERP_FEATURE_COLORS).filter(f => allProcessedFeatures.has(f));
    if (allProcessedFeatures.has('Other')) {
        SERP_FEATURES_TO_DISPLAY.push('Other');
    }

    const SERP_FEATURE_COLORS_PROCESSED = {
        ...SERP_FEATURE_COLORS,
        'Other': '#9ca3af' // gray-400
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <Card title="Traffic Leaderboard" className="lg:col-span-3">
                <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trafficLeaderboard} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="platform" tick={{ fill: '#4b5563' }} />
                            <YAxis tickFormatter={formatK} tick={{ fill: '#4b5563' }} />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                            <Bar dataKey="value" name="Traffic" radius={[4, 4, 0, 0]}>
                                {trafficLeaderboard.map((entry) => (
                                    <Cell key={`cell-${entry.platform}`} fill={PLATFORM_COLORS[entry.platform]} className={entry.platform === 'Fortinet' ? 'stroke-2 stroke-black' : ''}/>
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card title="Average Keyword Position" className="lg:col-span-1">
                 <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={averageKeywordPosition} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" tick={{ fill: '#4b5563' }} />
                            <YAxis dataKey="platform" type="category" width={80} tick={{ fill: '#4b5563' }}/>
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                            <Bar dataKey="position" name="Position" radius={[0, 4, 4, 0]}>
                                {averageKeywordPosition.map((entry) => (
                                    <Cell key={`cell-${entry.platform}`} fill={PLATFORM_COLORS[entry.platform]} className={entry.platform === 'Fortinet' ? 'stroke-2 stroke-black' : ''}/>
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card title="Keyword Overlap" className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-gray-800">{commonKeywordsCount}</div>
                    <div className="text-sm text-gray-600">Common Keywords</div>
                </div>
                {Object.entries(uniqueKeywordsCount).map(([platform, count]) => (
                     <div key={platform} className={`p-4 rounded-lg text-center text-white ${platform === 'Fortinet' ? 'bg-red-500' : 'bg-gray-700'}`} style={{backgroundColor: platform !== 'Fortinet' ? PLATFORM_COLORS[platform] : ''}}>
                        <div className="text-3xl font-bold">{count}</div>
                        <div className="text-sm opacity-90">Unique to {platform}</div>
                    </div>
                ))}
            </Card>

            <Card 
                title="SERP Feature Breakdown by Competitor"
                description="A detailed view of SERP features. Features with fewer than 20 occurrences for a competitor are grouped into 'Other'."
                className="lg:col-span-2"
            >
                <div style={{ height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={processedSerpData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="platform" tick={{ fill: '#4b5563', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#4b5563' }} tickFormatter={formatK} />
                            <Tooltip content={<StackedTooltip />} cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}/>
                            <Legend content={<CustomLegend />} />
                            {SERP_FEATURES_TO_DISPLAY.map((feature) => (
                                <Bar key={feature} dataKey={feature} stackId="a" name={feature} fill={SERP_FEATURE_COLORS_PROCESSED[feature]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            
            <Card 
                title="Strategic SEO Actions for Fortinet"
                description="Actionable insights based on competitive keyword analysis."
                className="lg:col-span-1"
            >
                <div className="space-y-6 h-full flex flex-col justify-center">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-red-200">
                            <svg className="h-3.5 w-3.5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Defend Commercial Keywords</h4>
                            <p className="text-gray-600 text-sm mt-1">You are #1 for "cybersecurity" but are losing to competitors on high-value variants like "cyber security services". Create dedicated pages for these terms to capture users ready to buy.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-red-200">
                           <svg className="h-3.5 w-3.5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Establish Authority on Core Products</h4>
                            <p className="text-gray-600 text-sm mt-1">Competitors are the top result for fundamental terms like "hardware firewalls". Analyze their winning content and enhance your pages to become the go-to authority.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-red-200">
                             <svg className="h-3.5 w-3.5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Capture Threat-Aware Traffic</h4>
                            <p className="text-gray-600 text-sm mt-1">Crowdstrike is winning problem-focused searches like "keylogger download". Create expert content targeting specific cyber threats to intercept users seeking immediate help.</p>
                        </div>
                    </div>
                </div>
            </Card>

            <Card 
                title="Who Ranks Highest on Shared Keywords?" 
                description="For keywords where multiple competitors rank, this table shows which platform holds the highest position."
                className="lg:col-span-3"
            >
                <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3">Keyword</th>
                                <th scope="col" className="px-6 py-3">Top Platform</th>
                                <th scope="col" className="px-6 py-3">Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {positionSuperiority.map((item, index) => (
                                <tr key={index} className={`bg-white border-b ${item.platform === 'Fortinet' ? 'bg-red-50' : ''}`}>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.keyword}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold" style={{color: PLATFORM_COLORS[item.platform]}}>{item.platform}</span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-800">{item.position}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

        </div>
    );
};

export default CompetitorComparisonDashboard;
