export interface ShortenerAPI {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  maxViewsPerIP: number;
  priority: number;
  content: string;
  schedule: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  countries: string[];
  active: boolean;
  isSelfHosted?: boolean;
}

export interface ShortLinkResponse {
  success: boolean;
  shortUrl: string;
  error?: string;
}