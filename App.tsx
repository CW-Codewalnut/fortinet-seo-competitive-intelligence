
import React, { useState } from 'react';
import OverviewDashboard from './dashboards/OverviewDashboard';
import CompetitorComparisonDashboard from './dashboards/CompetitorComparisonDashboard';
import KeywordIntelligenceDashboard from './dashboards/KeywordIntelligenceDashboard';
import RankingTrendsDashboard from './dashboards/RankingTrendsDashboard';
import ContentOpportunityDashboard from './dashboards/ContentOpportunityDashboard';
import PerformanceBySegmentDashboard from './dashboards/PerformanceBySegmentDashboard';
import { FortinetLogo } from './components/Icons';

const TABS = [
  "Overview",
  "Competitor Comparison",
  "Keyword Intelligence",
  "Performance by Segment",
  "Content Opportunities",
  "Ranking Trends",
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewDashboard />;
      case "Competitor Comparison":
        return <CompetitorComparisonDashboard />;
      case "Keyword Intelligence":
        return <KeywordIntelligenceDashboard />;
      case "Performance by Segment":
        return <PerformanceBySegmentDashboard />;
      case "Content Opportunities":
        return <ContentOpportunityDashboard />;
      case "Ranking Trends":
        return <RankingTrendsDashboard />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <FortinetLogo className="h-8 w-8 text-red-600" />
              <h1 className="text-xl font-bold text-gray-800">SEO Competitive Intelligence</h1>
            </div>
          </div>
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out
                  ${
                    activeTab === tab
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-sm text-center text-gray-600 mb-6 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <strong>Data Comparison Period:</strong> January vs. July (6-month interval). All "change" metrics reflect this period.
        </div>
        {renderContent()}
      </main>

      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Fortinet | SEO Competitive Intelligence</p>
      </footer>
    </div>
  );
};

export default App;