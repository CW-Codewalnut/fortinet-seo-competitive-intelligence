

export interface PlatformValue {
    platform: string;
    value: number;
}

export interface TrafficData {
    platform:string;
    current: number;
    previous: number;
}

export interface TrafficChange {
    platform: string;
    change: number;
}

export interface KeywordChange {
    platform: string;
    keyword: string;
    change: number;
}

export interface PositionChange {
    platform: string;
    keyword: string;
    change: number;
}

export interface BrandedTraffic {
    platform: string;
    branded: number;
    nonBranded: number;
}

export interface IntentSummary {
    platform: string;
    informational: number;
    commercial: number;
    transactional: number;
    navigational: number;
}

export interface AvgPosition {
    platform: string;
    position: number;
}

export interface KeywordSuperiority {
    keyword: string;
    platform: string;
    position: number;
}

export interface SerpFeatureCount {
    platform: string;
    count: number;
}

export interface KeywordTrafficValue {
    keyword: string;
    platform: string;
    currentTraffic: number;
    cpc: number;
    estimatedValue: number;
}

export interface StrikingDistanceKeyword {
    keyword: string;
    platform: string;
    volume: number;
    kd: number;
    currentPosition: number;
    trafficChange: number;
}

export interface KeywordTrafficImpact {
    keyword: string;
    platform: string;
    trafficChange: number;
    currentTraffic: number;
}

export interface IntentTrafficDistribution {
    platform: string;
    informational: number;
    navigational: number;
    transactional: number;
    total: number;
}


export interface RankingTrend {
    keyword: string;
    platform: string;
    change: number;
    previousPosition: number;
    currentPosition: number;
}

export interface SerpFeatureDistribution {
    name: string;
    value: number;
}

export interface TopLandingPage {
    url: string;
    traffic: number;
}

export interface LandingPageTrafficChange {
    url: string;
    currentTraffic: number;
    previousTraffic: number;
    trafficChange: number;
}

export interface RankingKeywordsPerPage {
    url: string;
    count: number;
}

export interface UrlChange {
    keyword: string;
    platform: string;
    previousUrl: string;
    currentUrl: string;
}

export interface ContentGap {
    keyword: string;
    platform: string;
    position: number;
    volume: number;
}

export interface IntentMismatch {
    keyword: string;
    platform: string;
    url: string;
    position: number;
}

export interface SegmentData {
    segment: string;
    Checkpoint: number;
    Cisco: number;
    Crowdstrike: number;
    Fortinet: number;
    Paloalto: number;
    'Grand Total': number;
}

export interface SerpFeatureBreakdownData {
    platform: string;
    'AI Overview': number;
    'Bottom ads': number;
    'Discussions and forums': number;

    'Featured snippet': number;
    'Knowledge card': number;
    'Knowledge panel': number;
    'Local pack': number;
    'Local teaser': number;
    'Paid sitelinks': number;
    'People also ask': number;
    'Shopping': number;
    'Shopping Ads': number;
    'Sitelinks': number;
    'Thumbnail': number;
    'Top ads': number;
    'Top stories': number;
    'Video preview': number;
    'Videos': number;
}