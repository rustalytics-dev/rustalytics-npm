export interface AnalyticsConfig {
  apiToken: string;
}

export interface AnalyticsProps extends Partial<AnalyticsConfig> {
  route?: string;
  path?: string;
}
