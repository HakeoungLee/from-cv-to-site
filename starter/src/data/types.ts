export type Publication = {
  authors: string[];
  year: number;
  title: string;
  venue: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
};

export type Project = {
  title: string;
  startYear: number;
  endYear?: number;
  role?: string;
  funder?: string;
  summary?: string;
};

export type Fellowship = {
  name: string;
  awarder: string;
  year: number;
};

export type Talk = {
  title: string;
  venue: string;
  location?: string;
  month?: string;
  year: number;
};

export type TeachingItem = {
  title: string;
  code?: string;
  level?: string;
  terms: string[];
};

export type NewsItem = {
  date: string;
  title: string;
  summary?: string;
  link?: string;
};
