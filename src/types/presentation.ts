export type SlideType =
  | "title"
  | "split"
  | "metrics"
  | "featureGrid"
  | "quote"
  | "code";

export interface MetricCard {
  id: string;
  value: string;
  label: string;
  description?: string;
  trend?: string;
  badgeColor?: "seagrass" | "coral" | "skygold" | "noaa";
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  accentColor?: "seagrass" | "coral" | "skygold" | "noaa";
}

export interface CodeSnippet {
  language: string;
  filename?: string;
  code: string;
  highlights?: string[];
}

export interface BaseSlide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  category?: string;
  notes?: string;
}

export interface TitleSlideData extends BaseSlide {
  type: "title";
  author?: string;
  authorRole?: string;
  date?: string;
  tags?: string[];
  logoPath?: string;
}

export interface SplitSlideData extends BaseSlide {
  type: "split";
  bullets?: string[];
  mediaType?: "image" | "card";
  mediaUrl?: string;
  mediaCaption?: string;
  mediaCardTitle?: string;
  mediaCardItems?: { label: string; value: string }[];
}

export interface MetricsSlideData extends BaseSlide {
  type: "metrics";
  metrics: MetricCard[];
  summaryNote?: string;
}

export interface FeatureGridSlideData extends BaseSlide {
  type: "featureGrid";
  features: FeatureCard[];
}

export interface QuoteSlideData extends BaseSlide {
  type: "quote";
  quote: string;
  author: string;
  authorTitle: string;
  organization?: string;
  avatarUrl?: string;
}

export interface CodeSlideData extends BaseSlide {
  type: "code";
  snippet: CodeSnippet;
  explanationBullets?: string[];
}

export type SlideData =
  | TitleSlideData
  | SplitSlideData
  | MetricsSlideData
  | FeatureGridSlideData
  | QuoteSlideData
  | CodeSlideData;

export interface PresentationConfig {
  title: string;
  shortTitle: string;
  subtitle?: string;
  author: string;
  version: string;
  lastUpdated: string;
  slides: SlideData[];
}
