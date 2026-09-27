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

export type QRConfig = {
  enabled: boolean;
  value: string;
  size?: number; // pixels
  position?: 'tl' | 'tr' | 'bl' | 'br'; // top-left, etc
  offset?: number; // edge offset in pixels
  borderRadius?: number; // corner radius
};

export type WeeklyScheduleEntry = {
  id: string;
  weekday: string; // Sunday, Monday, etc
  time: string; // 10:00 AM
  titleEn: string;
  titleRu?: string;
  strikeout?: boolean;
  highlight?: boolean;
};

export type BirthdayConfig = {
  enabled: boolean;
  names: string[];
  date?: string; // date string
  backgroundMedia?: SlideMedia;
  darkness?: number; // 0-1, darkness overlay
};

export type AnimationConfig = {
  headingDuration?: number; // ms for word-curtain
  bodyDuration?: number; // ms for fade-up
  staggerDelay?: number; // ms between elements
};

export type SlidePadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
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
  customDurationEnabled?: boolean;
  cta?: Cta | null;
  qr?: QRConfig;
  onOverview?: boolean;
  layout?: 'small' | 'medium' | 'large' | 'hero'; // card size for overview
  kind?: 'welcome' | 'event' | 'schedule' | 'birthday' | 'ministry' | 'recruitment' | 'outreach' | 'notice' | 'link' | 'gallery';
  galleryItems?: SlideMedia[]; // for gallery slides
  weeklySchedule?: WeeklyScheduleEntry[]; // for schedule slides
};

export type AppSettings = {
  defaultDuration: number;
  accentColor: string;
  backgroundColor: string;
  theme: 'light' | 'dark';
  stagePadding: SlidePadding;
  cardGap: number;
  animationConfig: AnimationConfig;
  defaultMediaMotion: 'zoom-pan' | 'ken-burns' | 'static';
  qrDefaults: QRConfig;
  birthdayConfig: BirthdayConfig;
};

export type AppContent = {
  version: string;
  title: string;
  slides: Slide[];
  settings: AppSettings;
};
