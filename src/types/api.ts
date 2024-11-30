export interface ShortenerAPI {
  name: string;
  endpoint: string;
  maxViewsPerIP: number;
  priority: number;
  content: string;
  schedule: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  applicableCountries: string[];
  isActive: boolean;
}

export interface ShortLinkResponse {
  success: boolean;
  shortUrl: string;
  error?: string;
}
export interface ShortenerAPIResponse {
  _id : string;
  name: string;
  endpoint: string;
  maxViewsPerIP: number;
  priority: number;
  content: string;
  schedule: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  applicableCountries: string[];
  isActive: boolean;
}