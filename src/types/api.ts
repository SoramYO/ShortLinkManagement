export interface ShortenerAPI {
  name: string;
  url: string;
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
}

export interface ShortLinkResponse {
  success: boolean;
  shortUrl: string;
  error?: string;
}
export interface ShortenerAPIResponse {
  id : string;
  name: string;
  url: string;
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
}