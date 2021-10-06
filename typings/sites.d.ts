type SITETYPE = 'technology' | 'life' | 'info' | 'others';

declare module 'site-type' {
  export type SITETYPE = SITETYPE;
}

interface AnyCommonObj {
  [x: ?any]: any;
}

interface SiteModel {
  userId?: string;
  siteName?: string;
  siteLink?: string;
  linkPrefix?: string;
  siteDesc?: string;
  siteType?: SITETYPE;
  siteIcon?: {
    value?: string;
  };
  // | string;
  siteImgs?: Array<{ src: string; value?: string }>;
  rss?: string;
  notiEmail?: string;
  submitDate?: Date | string;
  _id?: string;
  siteId?: string;
  originUrl?: string;
  hot?: number;
}
