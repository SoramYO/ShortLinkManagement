
export interface Link {
    _id: string;
    originalUrl: string;
    shortCode: string;
    customSlug?: string;
    title?: string;
    description?: string;
    stats: {
        totalViews : number;
    }
    createdAt: string;
  }