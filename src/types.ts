export interface Country {
  country: string;
  countryCode: string;
  slug: string;
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
  date: string;
}

export interface GlobalData {
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
}

export interface Article {
  source?: {
    id: string;
    name: string;
  };
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

export interface State {
  countries: Country[];
  tracked: number[];
  globalData: GlobalData;
  error?: Error | null;
  labels: string[];
  data: number[];
  pending: boolean;
  articles: Article[];
}

export interface NewsApiResponse {
  status: 'ok' | 'error';
  totalResults?: number;
  articles?: Article[];
  code?: string;
  message?: string;
}
