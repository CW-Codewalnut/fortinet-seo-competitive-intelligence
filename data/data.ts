
import type { 
    PlatformValue, 
    TrafficData, 
    TrafficChange, 
    KeywordChange, 
    PositionChange,
    BrandedTraffic,
    IntentSummary,
    AvgPosition,
    KeywordSuperiority,
    SerpFeatureCount,
    KeywordTrafficValue,
    StrikingDistanceKeyword,
    KeywordTrafficImpact,
    IntentTrafficDistribution,
    RankingTrend,
    SerpFeatureDistribution,
    TopLandingPage,
    LandingPageTrafficChange,
    RankingKeywordsPerPage,
    UrlChange,
    ContentGap,
    IntentMismatch,
    SegmentData,
    SerpFeatureBreakdownData
} from '../types';


// --- 1. Overview Dashboard ---
export const totalKeywordsTracked: PlatformValue[] = [
    { platform: 'Checkpoint', value: 160 },
    { platform: 'Cisco', value: 160 },
    { platform: 'Crowdstrike', value: 150 },
    { platform: 'Fortinet', value: 160 },
    { platform: 'Paloalto', value: 160 }
];

export const totalOrganicTraffic: TrafficData[] = [
    { platform: 'Checkpoint', current: 34402.0, previous: 41692.0 },
    { platform: 'Cisco', current: 110824.0, previous: 108883.0 },
    { platform: 'Crowdstrike', current: 299428.0, previous: 274766.0 },
    { platform: 'Fortinet', current: 106003.0, previous: 133995.0 },
    { platform: 'Paloalto', current: 26215.0, previous: 26292.0 }
];

export const trafficChange: TrafficChange[] = [
    { platform: 'Checkpoint', change: -17.485369 },
    { platform: 'Cisco', change: 1.782647 },
    { platform: 'Crowdstrike', change: 8.975637 },
    { platform: 'Fortinet', change: -20.890332 },
    { platform: 'Paloalto', change: -0.292865 }
];

export const topTrafficGainers: KeywordChange[] = [
    { platform: 'Crowdstrike', keyword: 'crowdstrike', change: 27349.0 },
    { platform: 'Cisco', keyword: 'nvme', change: 13100.0 },
    { platform: 'Cisco', keyword: 'ethernet', change: 9395.0 },
    { platform: 'Fortinet', keyword: 'https', change: 6190.0 },
    { platform: 'Fortinet', keyword: 'sase', change: 4350.0 }
];

export const topTrafficLosers: KeywordChange[] = [
    { platform: 'Fortinet', keyword: 'malware', change: -17566.0 },
    { platform: 'Fortinet', keyword: 'ddos', change: -13114.0 },
    { platform: 'Crowdstrike', keyword: 'edr', change: -9547.0 },
    { platform: 'Fortinet', keyword: 'tcp', change: -9082.0 },
    { platform: 'Checkpoint', keyword: 'checkpoint', change: -9040.0 }
];

export const topPositionGainers: PositionChange[] = [
    { platform: 'Fortinet', keyword: 'it security services', change: 92.0 },
    { platform: 'Paloalto', keyword: 'command | dashboard', change: 76.0 },
    { platform: 'Paloalto', keyword: 'panw stock', change: 68.0 },
    { platform: 'Fortinet', keyword: 'usb console cable', change: 54.0 },
    { platform: 'Fortinet', keyword: 'sso login', change: 51.0 }
];

export const topPositionLosers: PositionChange[] = [
    { platform: 'Crowdstrike', keyword: 'fdr login', change: -89.0 },
    { platform: 'Crowdstrike', keyword: 'antivirus free trial', change: -79.0 },
    { platform: 'Cisco', keyword: 'my case', change: -74.0 },
    { platform: 'Cisco', keyword: 'buy', change: -65.0 },
    { platform: 'Paloalto', keyword: 'networking jobs near me', change: -52.0 }
];

export const brandedVsNonBranded: BrandedTraffic[] = [
    { platform: 'Checkpoint', nonBranded: 16704.0, branded: 17698.0 },
    { platform: 'Cisco', nonBranded: 63947.0, branded: 46877.0 },
    { platform: 'Crowdstrike', nonBranded: 23233.0, branded: 276195.0 },
    { platform: 'Fortinet', nonBranded: 40917.0, branded: 65086.0 },
    { platform: 'Paloalto', nonBranded: 10982.0, branded: 15233.0 }
];

export const keywordIntentSummary: IntentSummary[] = [
    { platform: 'Checkpoint', informational: 116, commercial: 60, transactional: 42, navigational: 41 },
    { platform: 'Cisco', informational: 125, commercial: 79, transactional: 45, navigational: 41 },
    { platform: 'Crowdstrike', informational: 110, commercial: 64, transactional: 34, navigational: 45 },
    { platform: 'Fortinet', informational: 126, commercial: 80, transactional: 45, navigational: 46 },
    { platform: 'Paloalto', informational: 128, commercial: 64, transactional: 43, navigational: 43 }
];


// --- 2. Competitor Comparison Dashboard ---

export const trafficLeaderboard: PlatformValue[] = [
    { platform: 'Crowdstrike', value: 299428.0 },
    { platform: 'Cisco', value: 110824.0 },
    { platform: 'Fortinet', value: 106003.0 },
    { platform: 'Checkpoint', value: 34402.0 },
    { platform: 'Paloalto', value: 26215.0 }
];

export const averageKeywordPosition: AvgPosition[] = [
    { platform: 'Fortinet', position: 4.30 },
    { platform: 'Cisco', position: 4.45625 },
    { platform: 'Checkpoint', position: 6.28750 },
    { platform: 'Paloalto', position: 7.23125 },
    { platform: 'Crowdstrike', position: 8.24 }
].sort((a,b) => a.position - b.position);

export const commonKeywordsCount = 19;
export const uniqueKeywordsCount = {
    Fortinet: 148,
    Cisco: 156,
    Checkpoint: 148,
    Paloalto: 154,
    Crowdstrike: 139,
};

export const positionSuperiority: KeywordSuperiority[] = [
    { keyword: 'computer security service', platform: 'Fortinet', position: 10.0 },
    { keyword: 'cyber attack', platform: 'Fortinet', position: 6.0 },
    { keyword: 'cyber security services', platform: 'Checkpoint', position: 1.0 },
    { keyword: 'cyber security solutions', platform: 'Fortinet', position: 10.0 },
    { keyword: 'cybersecurity', platform: 'Fortinet', position: 1.0 },
    { keyword: 'cybersecurity services', platform: 'Checkpoint', position: 11.0 },
    { keyword: 'cybersecurity solutions', platform: 'Checkpoint', position: 13.0 },
    { keyword: 'data center colocation services', platform: 'Fortinet', position: 2.0 },
    { keyword: 'data security solutions', platform: 'Fortinet', position: 1.0 },
    { keyword: 'download key loggers', platform: 'Crowdstrike', position: 1.0 },
    { keyword: 'ethernet switch', platform: 'Cisco', position: 5.0 },
    { keyword: 'hardware firewalls', platform: 'Paloalto', position: 3.0 },
    { keyword: 'keylogger download', platform: 'Crowdstrike', position: 1.0 },
    { keyword: 'keylogger downloads', platform: 'Crowdstrike', position: 2.0 },
    { keyword: 'managed cyber security service', platform: 'Crowdstrike', position: 1.0 },
    { keyword: 'managed it security services', platform: 'Fortinet', position: 1.0 },
    { keyword: 'network security software', platform: 'Cisco', position: 6.0 },
    { keyword: 'partner portal v2', platform: 'Crowdstrike', position: 3.0 },
    { keyword: 'www.deep web.com login', platform: 'Crowdstrike', position: 10.0 }
];


export const serpFeatureOwnership: SerpFeatureCount[] = [
    { platform: 'Cisco', count: 734 },
    { platform: 'Fortinet', count: 671 },
    { platform: 'Paloalto', count: 587 },
    { platform: 'Crowdstrike', count: 509 },
    { platform: 'Checkpoint', count: 489 }
];

export const serpFeatureBreakdown: SerpFeatureBreakdownData[] = [
    { platform: 'Cisco', 'AI Overview': 28, 'Bottom ads': 5, 'Discussions and forums': 31, 'Featured snippet': 5, 'Knowledge card': 19, 'Knowledge panel': 45, 'Local pack': 2, 'Local teaser': 1, 'Paid sitelinks': 5, 'People also ask': 129, 'Shopping': 34, 'Shopping Ads': 11, 'Sitelinks': 143, 'Thumbnail': 87, 'Top ads': 3, 'Top stories': 42, 'Video preview': 144, 'Videos': 0 },
    { platform: 'Fortinet', 'AI Overview': 30, 'Bottom ads': 6, 'Discussions and forums': 33, 'Featured snippet': 3, 'Knowledge card': 23, 'Knowledge panel': 47, 'Local pack': 2, 'Local teaser': 0, 'Paid sitelinks': 10, 'People also ask': 116, 'Shopping': 24, 'Shopping Ads': 8, 'Sitelinks': 134, 'Thumbnail': 65, 'Top ads': 7, 'Top stories': 30, 'Video preview': 132, 'Videos': 1 },
    { platform: 'Paloalto', 'AI Overview': 24, 'Bottom ads': 9, 'Discussions and forums': 15, 'Featured snippet': 4, 'Knowledge card': 10, 'Knowledge panel': 24, 'Local pack': 3, 'Local teaser': 4, 'Paid sitelinks': 9, 'People also ask': 105, 'Shopping': 14, 'Shopping Ads': 1, 'Sitelinks': 133, 'Thumbnail': 64, 'Top ads': 7, 'Top stories': 33, 'Video preview': 127, 'Videos': 1 },
    { platform: 'Crowdstrike', 'AI Overview': 34, 'Bottom ads': 8, 'Discussions and forums': 24, 'Featured snippet': 2, 'Knowledge card': 0, 'Knowledge panel': 12, 'Local pack': 2, 'Local teaser': 0, 'Paid sitelinks': 8, 'People also ask': 100, 'Shopping': 3, 'Shopping Ads': 1, 'Sitelinks': 121, 'Thumbnail': 52, 'Top ads': 5, 'Top stories': 34, 'Video preview': 101, 'Videos': 2 },
    { platform: 'Checkpoint', 'AI Overview': 24, 'Bottom ads': 4, 'Discussions and forums': 14, 'Featured snippet': 0, 'Knowledge card': 2, 'Knowledge panel': 19, 'Local pack': 5, 'Local teaser': 0, 'Paid sitelinks': 5, 'People also ask': 87, 'Shopping': 15, 'Shopping Ads': 0, 'Sitelinks': 120, 'Thumbnail': 57, 'Top ads': 4, 'Top stories': 21, 'Video preview': 110, 'Videos': 2 }
];


// --- 3. Keyword Intelligence Dashboard ---
export const topKeywordsByTrafficValue: KeywordTrafficValue[] = [
    { keyword: 'crowdstrike', platform: 'Crowdstrike', currentTraffic: 249554.0, cpc: 6.88, estimatedValue: 1716931.52 },
    { keyword: 'medusa ransomware gang phishing campaigns', platform: 'Checkpoint', currentTraffic: 12532.0, cpc: 4.11, estimatedValue: 51506.52 },
    { keyword: 'managed detection and response', platform: 'Crowdstrike', currentTraffic: 1744.0, cpc: 26.57, estimatedValue: 46338.08 },
    { keyword: 'sase', platform: 'Fortinet', currentTraffic: 8700.0, cpc: 5.31, estimatedValue: 46197.00 },
    { keyword: 'cisco anyconnect download', platform: 'Cisco', currentTraffic: 5280.0, cpc: 4.76, estimatedValue: 25132.80 },
    { keyword: 'ztna', platform: 'Paloalto', currentTraffic: 2798.0, cpc: 6.56, estimatedValue: 18354.88 },
    { keyword: 'lacework', platform: 'Fortinet', currentTraffic: 3830.0, cpc: 4.72, estimatedValue: 18077.60 },
    { keyword: 'perimeter 81', platform: 'Checkpoint', currentTraffic: 747.0, cpc: 22.60, estimatedValue: 16882.20 },
    { keyword: 'endpoint management', platform: 'Crowdstrike', currentTraffic: 719.0, cpc: 23.10, estimatedValue: 16608.90 },
    { keyword: 'cisco splunk acquisition', platform: 'Cisco', currentTraffic: 2694.0, cpc: 5.51, estimatedValue: 14843.94 },
];

export const strikingDistanceOpportunities: StrikingDistanceKeyword[] = [
    { keyword: 'crowdstrike stock', platform: 'Crowdstrike', volume: 290000, kd: 32, currentPosition: 4.0, trafficChange: 4063.0 },
    { keyword: 'panw stock', platform: 'Paloalto', volume: 120000, kd: 34, currentPosition: 8.0, trafficChange: 979.0 },
    { keyword: 'honey pot', platform: 'Crowdstrike', volume: 45000, kd: 30, currentPosition: 14.0, trafficChange: -138.0 },
    { keyword: 'crowdstrike stock price', platform: 'Crowdstrike', volume: 28000, kd: 16, currentPosition: 5.0, trafficChange: 466.0 },
    { keyword: 'it cloud solution', platform: 'Cisco', volume: 22000, kd: 28, currentPosition: 6.0, trafficChange: 1538.0 },
    { keyword: 'www.dark web.com login', platform: 'Crowdstrike', volume: 20000, kd: 38, currentPosition: 9.0, trafficChange: 569.0 },
    { keyword: 'ethernet switch', platform: 'Fortinet', volume: 16000, kd: 14, currentPosition: 8.0, trafficChange: 333.0 },
    { keyword: 'ethernet switch', platform: 'Cisco', volume: 16000, kd: 7, currentPosition: 5.0, trafficChange: -195.0 },
    { keyword: 'palo alto networks stock', platform: 'Paloalto', volume: 14000, kd: 12, currentPosition: 8.0, trafficChange: -51.0 },
];

export const topGainedKeywordsByTrafficImpact: KeywordTrafficImpact[] = [
    { keyword: 'crowdstrike', platform: 'Crowdstrike', trafficChange: 27349.0, currentTraffic: 249554.0 },
    { keyword: 'nvme', platform: 'Cisco', trafficChange: 13100.0, currentTraffic: 13100.0 },
    { keyword: 'ethernet', platform: 'Cisco', trafficChange: 9395.0, currentTraffic: 9495.0 },
    { keyword: 'https', platform: 'Fortinet', trafficChange: 6190.0, currentTraffic: 8802.0 },
];

export const topLostKeywordsByTrafficImpact: KeywordTrafficImpact[] = [
    { keyword: 'malware', platform: 'Fortinet', trafficChange: -17566.0, currentTraffic: 120.0 },
    { keyword: 'ddos', platform: 'Fortinet', trafficChange: -13114.0, currentTraffic: 511.0 },
    { keyword: 'edr', platform: 'Crowdstrike', trafficChange: -9547.0, currentTraffic: 1.0 },
    { keyword: 'tcp', platform: 'Fortinet', trafficChange: -9082.0, currentTraffic: 127.0 },
    { keyword: 'checkpoint', platform: 'Checkpoint', trafficChange: -9040.0, currentTraffic: 2481.0 },
];

export const organicTrafficByIntent: IntentTrafficDistribution[] = [
    { platform: 'Crowdstrike', informational: 297838.0, navigational: 1310.0, transactional: 280.0, total: 299428.0 },
    { platform: 'Cisco', informational: 97755.0, navigational: 1372.0, transactional: 11697.0, total: 110824.0 },
    { platform: 'Fortinet', informational: 91421.0, navigational: 13418.0, transactional: 1164.0, total: 106003.0 },
    { platform: 'Checkpoint', informational: 33735.0, navigational: 374.0, transactional: 293.0, total: 34402.0 },
    { platform: 'Paloalto', informational: 24586.0, navigational: 474.0, transactional: 1155.0, total: 26215.0 },
];

// --- 4. Ranking Trends Dashboard ---
export const biggestClimbers: RankingTrend[] = [
    { keyword: 'it security services', platform: 'Fortinet', change: 92.0, previousPosition: 96.0, currentPosition: 4.0 },
    { keyword: 'command | dashboard', platform: 'Paloalto', change: 76.0, previousPosition: 82.0, currentPosition: 6.0 },
    { keyword: 'panw stock', platform: 'Paloalto', change: 68.0, previousPosition: 76.0, currentPosition: 8.0 },
    { keyword: 'usb console cable', platform: 'Fortinet', change: 54.0, previousPosition: 61.0, currentPosition: 7.0 },
    { keyword: 'sso login', platform: 'Fortinet', change: 51.0, previousPosition: 59.0, currentPosition: 8.0 },
    { keyword: 'cyber security companies', platform: 'Fortinet', change: 48.0, previousPosition: 54.0, currentPosition: 6.0 },
    { keyword: 'pentesting service', platform: 'Crowdstrike', change: 42.0, previousPosition: 47.0, currentPosition: 5.0 },
    { keyword: 'download perimeter 81', platform: 'Checkpoint', change: 39.0, previousPosition: 43.0, currentPosition: 4.0 },
    { keyword: 'how to access the dark web', platform: 'Crowdstrike', change: 38.0, previousPosition: 39.0, currentPosition: 1.0 },
    { keyword: 'cybersecurity', platform: 'Fortinet', change: 34.0, previousPosition: 35.0, currentPosition: 1.0 }
];

export const biggestDecliners: RankingTrend[] = [
    { keyword: 'fdr login', platform: 'Crowdstrike', change: -89.0, previousPosition: 9.0, currentPosition: 98.0 },
    { keyword: 'antivirus free trial', platform: 'Crowdstrike', change: -79.0, previousPosition: 14.0, currentPosition: 93.0 },
    { keyword: 'my case', platform: 'Cisco', change: -74.0, previousPosition: 20.0, currentPosition: 94.0 },
    { keyword: 'buy', platform: 'Cisco', change: -65.0, previousPosition: 16.0, currentPosition: 81.0 },
    { keyword: 'networking jobs near me', platform: 'Paloalto', change: -52.0, previousPosition: 9.0, currentPosition: 61.0 },
    { keyword: 'antivirus trial', platform: 'Crowdstrike', change: -45.0, previousPosition: 19.0, currentPosition: 64.0 },
    { keyword: 'palo alto remote jobs', platform: 'Paloalto', change: -38.0, previousPosition: 3.0, currentPosition: 41.0 },
    { keyword: 'vpn download', platform: 'Checkpoint', change: -38.0, previousPosition: 26.0, currentPosition: 64.0 },
    { keyword: 'download vpn', platform: 'Checkpoint', change: -37.0, previousPosition: 14.0, currentPosition: 51.0 },
    { keyword: 'lat mini', platform: 'Fortinet', change: -37.0, previousPosition: 15.0, currentPosition: 52.0 }
];

// --- 5. SERP Features Dashboard ---
export const serpFeaturesDistribution: SerpFeatureDistribution[] = [
    { name: 'Sitelinks', value: 651 },
    { name: 'Video preview', value: 614 },
    { name: 'People also ask', value: 537 },
    { name: 'Thumbnail', value: 325 },
    { name: 'Top stories', value: 160 },
    { name: 'Knowledge panel', value: 147 },
    { name: 'AI Overview', value: 140 },
    { name: 'Discussions and forums', value: 117 },
    { name: 'Shopping', value: 107 },
    { name: 'Knowledge card', value: 54 },
    { name: 'Paid sitelinks', value: 37 },
    { name: 'Bottom ads', value: 32 },
    { name: 'Top ads', value: 26 },
    { name: 'Shopping Ads', value: 21 },
    { name: 'Local pack', value: 14 },
    { name: 'Featured snippet', value: 14 },
    { name: 'Videos', value: 6 },
    { name: 'Local teaser', value: 5 }
];

export const serpFeatureWinRate: PlatformValue[] = [
    { platform: 'Cisco', value: 4.587500 },
    { platform: 'Fortinet', value: 4.193750 },
    { platform: 'Paloalto', value: 3.668750 },
    { platform: 'Crowdstrike', value: 3.393333 },
    { platform: 'Checkpoint', value: 3.056250 }
];

// --- 6. URL & Page Performance Dashboard ---
export const topLandingPagesByTraffic: TopLandingPage[] = [
    { url: 'https://www.crowdstrike.com/en-us/', traffic: 251273.0 },
    { url: 'https://www.fortinet.com/support/product-downloads', traffic: 26637.0 },
    { url: 'https://www.cisco.com/site/us/en/learn/topics/computing/what-is-nvme.html', traffic: 26200.0 },
    { url: 'https://www.checkpoint.com/cyber-hub/threat-prevention/ransomware/medusa-ransomware-group/', traffic: 12532.0 },
    { url: 'https://www.fortinet.com/products/next-generation-firewall', traffic: 12224.0 }
];

export const topLandingPagesTrafficChange: LandingPageTrafficChange[] = [
    { url: 'https://www.crowdstrike.com/en-us/', currentTraffic: 251273.0, previousTraffic: 223942.0, trafficChange: 27331.0 },
    { url: 'https://www.fortinet.com/support/product-downloads', currentTraffic: 26637.0, previousTraffic: 24580.0, trafficChange: 2057.0 },
    { url: 'https://www.cisco.com/site/us/en/learn/topics/c...', currentTraffic: 26200.0, previousTraffic: 0.0, trafficChange: 26200.0 },
    { url: 'https://www.checkpoint.com/cyber-hub/threat-pre...', currentTraffic: 12532.0, previousTraffic: 0.0, trafficChange: 12532.0 },
    { url: 'https://www.fortinet.com/products/next-generati...', currentTraffic: 12224.0, previousTraffic: 12241.0, trafficChange: -17.0 }
];


export const rankingKeywordsPerTopPage: RankingKeywordsPerPage[] = [
    { url: 'https://www.fortinet.com/support/product-downloads', count: 22 },
    { url: 'https://www.crowdstrike.com/en-us/', count: 17 },
    { url: 'https://www.checkpoint.com/quantum/remote-access-vpn/', count: 15 },
    { url: 'https://support.paloaltonetworks.com/Support/Index', count: 13 },
    { url: 'https://www.crowdstrike.com/en-us/cybersecurity-101/cyberattacks/keylogger/', count: 10 }
];

export const urlChangesCount = 285;
export const urlChangesSample: UrlChange[] = [
    { keyword: 'ติดตั้ง fortigate', platform: 'Fortinet', previousUrl: 'https://community.fortinet.com/t5/FortiGate/Te...', currentUrl: 'https://www.fortinet.com/support/product-downl...' },
    { keyword: 'forticloud', platform: 'Fortinet', previousUrl: 'https://support.fortinet.com/welcome/', currentUrl: 'https://docs.fortinet.com/forticloud-landing' },
    { keyword: 'fortiwlc', platform: 'Fortinet', previousUrl: 'https://docs.fortinet.com/product/wireless-con...', currentUrl: 'https://docs.fortinet.com/document/wireless-co...' },
    { keyword: 'fortigate 100f', platform: 'Fortinet', previousUrl: 'https://www.fortinet.com/content/dam/fortinet/...', currentUrl: 'https://www.fortinet.com/resources/data-sheets...' },
    { keyword: 'fortigate 40f', platform: 'Fortinet', previousUrl: 'https://www.fortinet.com/content/dam/fortinet/...', currentUrl: 'https://www.fortinet.com/resources/data-sheets...' }
];

// --- 7. Content Gap & Opportunity Dashboard ---
export const contentGaps: ContentGap[] = [
    { keyword: 'google pac-man', platform: 'Paloalto', position: 0.0, volume: 725000 },
    { keyword: 'vpn', platform: 'Cisco', position: 14.0, volume: 668000 },
    { keyword: 'crowdstrike', platform: 'Crowdstrike', position: 1.0, volume: 360000 },
    { keyword: 'crowdstrike stock', platform: 'Crowdstrike', position: 4.0, volume: 290000 },
    { keyword: 'wifi', platform: 'Cisco', position: 4.0, volume: 162000 },
    { keyword: 'panw stock', platform: 'Paloalto', position: 8.0, volume: 120000 },
    { keyword: 'medusa ransomware gang phishing campaigns', platform: 'Checkpoint', position: 3.0, volume: 107000 },
    { keyword: 'router', platform: 'Cisco', position: 13.0, volume: 100000 },
    { keyword: 'my case', platform: 'Cisco', position: 94.0, volume: 79000 }
];

export const contentIntentMismatch: IntentMismatch[] = [
    { keyword: 'ethernet switch', platform: 'Cisco', url: 'https://www.cisco.com/site/us/en/learn/topics/...', position: 5.0 }
];

// --- New Segment Data ---

export const currentTrafficBySegment: SegmentData[] = [
  { segment: 'Commercial + Branded', Checkpoint: 1024, Cisco: 6784, Crowdstrike: 2278, Fortinet: 9627, Paloalto: 3015, 'Grand Total': 22728 },
  { segment: 'Commercial + Non branded', Checkpoint: 3263, Cisco: 19364, Crowdstrike: 4349, Fortinet: 4364, Paloalto: 1268, 'Grand Total': 32608 },
  { segment: 'Informational + Branded', Checkpoint: 3912, Cisco: 20992, Crowdstrike: 271304, Fortinet: 22168, Paloalto: 7789, 'Grand Total': 326165 },
  { segment: 'Informational + Non Branded', Checkpoint: 25054, Cisco: 45093, Crowdstrike: 19529, Fortinet: 42430, Paloalto: 11823, 'Grand Total': 143929 },
  { segment: 'Navigational + Branded', Checkpoint: 495, Cisco: 3083, Crowdstrike: 549, Fortinet: 24170, Paloalto: 572, 'Grand Total': 28869 },
  { segment: 'Navigational + Non branded', Checkpoint: 297, Cisco: 732, Crowdstrike: 1011, Fortinet: 1049, Paloalto: 860, 'Grand Total': 3949 },
  { segment: 'Transactional + Branded', Checkpoint: 247, Cisco: 11224, Crowdstrike: 88, Fortinet: 1388, Paloalto: 131, 'Grand Total': 13078 },
  { segment: 'Transactional + Non branded', Checkpoint: 110, Cisco: 3552, Crowdstrike: 320, Fortinet: 807, Paloalto: 757, 'Grand Total': 5546 }
];

export const previousTrafficBySegment: SegmentData[] = [
  { segment: 'Commercial + Branded', Checkpoint: 1018, Cisco: 7506, Crowdstrike: 2513, Fortinet: 10011, Paloalto: 3016, 'Grand Total': 24064 },
  { segment: 'Commercial + Non branded', Checkpoint: 4048, Cisco: 8691, Crowdstrike: 2699, Fortinet: 2056, Paloalto: 2244, 'Grand Total': 19738 },
  { segment: 'Informational + Branded', Checkpoint: 13113, Cisco: 21485, Crowdstrike: 238256, Fortinet: 20640, Paloalto: 6593, 'Grand Total': 300087 },
  { segment: 'Informational + Non Branded', Checkpoint: 22423, Cisco: 46609, Crowdstrike: 30252, Fortinet: 78595, Paloalto: 12484, 'Grand Total': 190363 },
  { segment: 'Navigational + Branded', Checkpoint: 574, Cisco: 3090, Crowdstrike: 491, Fortinet: 19514, Paloalto: 571, 'Grand Total': 24240 },
  { segment: 'Navigational + Non branded', Checkpoint: 181, Cisco: 2014, Crowdstrike: 332, Fortinet: 1079, Paloalto: 730, 'Grand Total': 4336 },
  { segment: 'Transactional + Branded', Checkpoint: 257, Cisco: 12430, Crowdstrike: 52, Fortinet: 1574, Paloalto: 178, 'Grand Total': 14491 },
  { segment: 'Transactional + Non branded', Checkpoint: 78, Cisco: 7058, Crowdstrike: 171, Fortinet: 526, Paloalto: 476, 'Grand Total': 8309 }
];

export const trafficChangeBySegment: SegmentData[] = [
  { segment: 'Commercial + Branded', Checkpoint: 5, Cisco: -721, Crowdstrike: -238, Fortinet: -380, Paloalto: -7, 'Grand Total': -1341 },
  { segment: 'Commercial + Non branded', Checkpoint: -720, Cisco: 10674, Crowdstrike: 1476, Fortinet: 2320, Paloalto: -979, 'Grand Total': 12771 },
  { segment: 'Informational + Branded', Checkpoint: -9112, Cisco: -494, Crowdstrike: 33051, Fortinet: 1531, Paloalto: 1196, 'Grand Total': 26172 },
  { segment: 'Informational + Non Branded', Checkpoint: -9901, Cisco: -1517, Crowdstrike: -10727, Fortinet: -36164, Paloalto: -657, 'Grand Total': -58966 },
  { segment: 'Navigational + Branded', Checkpoint: -77, Cisco: -10, Crowdstrike: 65, Fortinet: 4660, Paloalto: 5, 'Grand Total': 4643 },
  { segment: 'Navigational + Non branded', Checkpoint: 63, Cisco: -1327, Crowdstrike: 699, Fortinet: 96, Paloalto: -278, 'Grand Total': -747 },
  { segment: 'Transactional + Branded', Checkpoint: -11, Cisco: -1205, Crowdstrike: 36, Fortinet: -183, Paloalto: -49, 'Grand Total': -1412 },
  { segment: 'Transactional + Non branded', Checkpoint: 16, Cisco: -3568, Crowdstrike: 159, Fortinet: 236, Paloalto: 279, 'Grand Total': -2878 }
];

// Renaming "Total Keywords" to "Volume" as it seems to be search volume
export const volumeBySegment: SegmentData[] = [
  { segment: 'Commercial + Branded', Checkpoint: 281, Cisco: 4017, Crowdstrike: 129, Fortinet: 667, Paloalto: 376, 'Grand Total': 5470 },
  { segment: 'Commercial + Non branded', Checkpoint: 12032, Cisco: 108520, Crowdstrike: 7813, Fortinet: 37706, Paloalto: 14295, 'Grand Total': 180366 },
  { segment: 'Informational + Branded', Checkpoint: 4097, Cisco: 13501, Crowdstrike: 1304, Fortinet: 2518, Paloalto: 2862, 'Grand Total': 24282 },
  { segment: 'Informational + Non Branded', Checkpoint: 141103, Cisco: 734265, Crowdstrike: 108417, Fortinet: 331138, Paloalto: 208863, 'Grand Total': 1523786 },
  { segment: 'Navigational + Branded', Checkpoint: 164, Cisco: 242, Crowdstrike: 36, Fortinet: 94, Paloalto: 90, 'Grand Total': 626 },
  { segment: 'Navigational + Non branded', Checkpoint: 2520, Cisco: 21652, Crowdstrike: 1292, Fortinet: 6484, Paloalto: 5599, 'Grand Total': 37547 },
  { segment: 'Transactional + Branded', Checkpoint: 90, Cisco: 869, Crowdstrike: 10, Fortinet: 117, Paloalto: 59, 'Grand Total': 1145 },
  { segment: 'Transactional + Non branded', Checkpoint: 3014, Cisco: 36438, Crowdstrike: 2704, Fortinet: 14023, Paloalto: 4706, 'Grand Total': 60885 }
];