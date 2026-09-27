import type { AppContent, Slide } from './types';

export const defaultContent: AppContent = {
  version: '0.1.0',
  title: 'FSCC Dynamic Church Kiosk',
  settings: {
    defaultDuration: 12,
    accentColor: '#0E85B5',
    backgroundColor: '#1C1C1C',
    theme: 'dark',
  },
  slides: [
    {
      id: 'welcome',
      kind: 'welcome',
      title: 'С ПРАЗДНИКОМ ЖАТВЫ',
      subheading: 'Welcome to FSCC',
      body: ['A joyful season of fellowship, worship, and community.'],
      tags: ['FSCC', 'Harvest', 'Welcome'],
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=80',
          alt: 'Church congregation in worship',
          mode: 'ken-burns',
        },
      ],
      surface: 'media',
      motion: 'ken-burns',
      duration: 15,
      onOverview: true,
    },
    {
      id: 'harvest-celebration',
      kind: 'event',
      title: 'Harvest Celebration / Fellowship Lunch',
      subheading: 'Sunday after service',
      body: [
        'Join us for a joyful time of food, fellowship, and gratitude.',
        'Location: FSCC Fellowship Hall',
        'Time: 12:30 PM',
      ],
      tags: ['Food', 'Community', 'Harvest'],
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=80',
          alt: 'Community meal',
          mode: 'zoom-pan',
        },
      ],
      surface: 'light',
      motion: 'zoom-pan',
      duration: 12,
      onOverview: true,
    },
    {
      id: 'cabin-trip',
      title: '5280 Youth Cabin Trip 2026',
      subheading: 'An unforgettable weekend away',
      body: [
        'Dates: September 18–20',
        'Location: Colorado mountain cabin',
        'Registration open through Church Center.',
      ],
      tags: ['Youth', 'Trip', 'Adventure'],
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80',
          alt: 'Mountain cabin trip',
          mode: 'zoom-pan',
        },
      ],
      surface: 'accent',
      motion: 'zoom-pan',
      duration: 12,
      onOverview: true,
    },
    {
      id: 'weekly-schedule',
      kind: 'schedule',
      title: 'Weekly Schedule',
      subheading: 'Church rhythm for the week',
      body: [
        'Sunday 10:00 AM — Morning Service',
        'Sunday 6:00 PM — Youth Service',
        'Monday 7:00 PM — Youth Prayer',
        'Tuesday 7:00 PM — Church Prayer',
        'Wednesday 7:00 PM — Bible Study',
        'Friday 7:00 PM — Prayer Service',
      ],
      tags: ['Schedule', 'Prayer', 'Weekly'],
      surface: 'dark',
      duration: 13,
      onOverview: true,
    },
    {
      id: 'connect',
      title: 'Connect with FSCC',
      subheading: 'Stay connected',
      body: [
        'Visit fscchurch.com',
        'Explore church center resources and upcoming events.',
        'Follow our church community online.',
      ],
      tags: ['Website', 'Church Center', 'Links'],
      cta: { label: 'Visit Website', href: 'https://fscchurch.com/' },
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80',
          alt: 'People connecting in church fellowship',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 11,
      onOverview: true,
    },
  ],
};

export function validateContent(value: unknown): AppContent | null {
  if (!value || typeof value !== 'object') return null;

  const candidate = value as Partial<AppContent>;
  const slides = Array.isArray(candidate.slides) ? candidate.slides : null;

  if (!slides || slides.length === 0) return null;

  const safeSlides: Slide[] = slides
    .map((slide) => {
      if (!slide || typeof slide !== 'object') return null;
      const safeSlide: Slide = {
        id: typeof slide.id === 'string' ? slide.id : 'slide',
        title: typeof slide.title === 'string' ? slide.title : 'Untitled slide',
        body: Array.isArray(slide.body) ? slide.body.filter((entry) => typeof entry === 'string') : [],
        tags: Array.isArray(slide.tags) ? slide.tags.filter((tag) => typeof tag === 'string') : [],
        onOverview: typeof slide.onOverview === 'boolean' ? slide.onOverview : true,
        surface: slide.surface ?? 'automatic',
        motion: slide.motion ?? 'zoom-pan',
        duration: typeof slide.duration === 'number' ? slide.duration : undefined,
        cta: slide.cta && typeof slide.cta === 'object' ? slide.cta as Slide['cta'] : null,
        subheading: typeof slide.subheading === 'string' ? slide.subheading : undefined,
        kind: slide.kind ?? 'event',
      };
      return safeSlide;
    })
    .filter((slide): slide is Slide => slide !== null);

  if (safeSlides.length === 0) return null;

  return {
    version: typeof candidate.version === 'string' ? candidate.version : '0.1.0',
    title: typeof candidate.title === 'string' ? candidate.title : 'FSCC Dynamic Church Kiosk',
    settings: {
      defaultDuration:
        typeof candidate.settings?.defaultDuration === 'number' ? candidate.settings.defaultDuration : 12,
      accentColor:
        typeof candidate.settings?.accentColor === 'string' ? candidate.settings.accentColor : '#0E85B5',
      backgroundColor:
        typeof candidate.settings?.backgroundColor === 'string'
          ? candidate.settings.backgroundColor
          : '#1C1C1C',
      theme: candidate.settings?.theme === 'light' ? 'light' : 'dark',
    },
    slides: safeSlides,
  };
}
