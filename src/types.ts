export type SlideMedia = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  mode?: 'zoom-pan' | 'ken-burns' | 'static';
  poster?: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type Slide = {
  id: string;
  title: string;
  subheading?: string;
  body: string[];
  tags: string[];
  media?: SlideMedia[];
  surface?: 'automatic' | 'media' | 'light' | 'dark' | 'accent';
  motion?: 'zoom-pan' | 'ken-burns' | 'static';
  duration?: number;
  cta?: Cta | null;
  onOverview?: boolean;
  kind?: 'welcome' | 'event' | 'schedule' | 'birthday';
};

export type AppSettings = {
  defaultDuration: number;
  accentColor: string;
  backgroundColor: string;
  theme: 'light' | 'dark';
};

export type AppContent = {
  version: string;
  title: string;
  slides: Slide[];
  settings: AppSettings;
};
