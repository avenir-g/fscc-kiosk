import type { AppContent, Slide } from './types';

export const defaultContent: AppContent = {
  version: '0.3.0',
  title: 'FSCC Dynamic Church Kiosk',
  settings: {
    defaultDuration: 12,
    accentColor: '#0E85B5',
    backgroundColor: '#F5F3EE',
    theme: 'light',
    stagePadding: {
      top: 32,
      right: 32,
      bottom: 32,
      left: 32,
    },
    cardGap: 18,
    animationConfig: {
      headingDuration: 420,
      bodyDuration: 540,
      staggerDelay: 90,
    },
    defaultMediaMotion: 'zoom-pan',
    qrDefaults: {
      enabled: true,
      value: 'https://links.fscchurch.com/',
      size: 160,
      position: 'br',
      offset: 18,
      borderRadius: 16,
    },
    birthdayConfig: {
      enabled: true,
      names: ['Grace', 'Noah', 'Elena'],
      date: 'Today',
      darkness: 0.55,
      backgroundMedia: {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80',
        alt: 'Birthday celebration',
        mode: 'ken-burns',
      },
    },
  },
  slides: [
    {
      id: 'welcome',
      kind: 'welcome',
      title: 'С ПРАЗДНИКОМ ЖАТВЫ',
      subheading: 'Welcome to FSCC',
      body: ['A joyful season of fellowship, worship, and community.'],
      tags: ['FSCC', 'Harvest', 'Welcome'],
      layout: 'hero',
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
      title: 'Harvest Celebration & Fellowship Lunch',
      subheading: 'September 27 • 1:00 PM',
      body: [
        'Join us for a joyful time of food, fellowship, and gratitude.',
        'Location: FSCC Fellowship Hall',
        'Questions? Lena Samokha (720) 933-5320 / Zhenya Loboda (303) 579-9726',
      ],
      tags: ['Food', 'Community', 'Harvest'],
      layout: 'large',
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
      id: 'weekly-schedule',
      kind: 'schedule',
      title: 'Weekly Schedule',
      subheading: 'Church rhythm',
      body: [
        'Sunday 10:00 AM — Morning Service',
        'Sunday 6:00 PM — Youth Service',
        'Monday 7:00 PM — Youth Prayer',
        'Tuesday 7:00 PM — Church Prayer',
        'Wednesday 7:00 PM — Bible Study',
        'Friday 7:00 PM — Prayer Service',
      ],
      tags: ['Schedule', 'Prayer', 'Weekly'],
      layout: 'medium',
      surface: 'dark',
      duration: 13,
      onOverview: true,
    },
    {
      id: 'cabin-trip',
      kind: 'event',
      title: '5280 Youth Cabin Trip',
      subheading: 'October 2–4 • Grand Lake',
      body: [
        'An unforgettable weekend away for youth fellowship and growth.',
        'Registration open through Church Center.',
        'Questions? Contact your youth leader.',
      ],
      tags: ['Youth', 'Trip', 'Adventure'],
      layout: 'medium',
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
      id: 'young-kids-ministry',
      kind: 'ministry',
      title: 'Young Kids Ministry',
      subheading: 'Ages 2–7',
      body: [
        'A safe, loving, and Christ-centered environment for children.',
        'Location: First Floor after the first part of the sermon.',
        'Volunteers needed! Contact Karina Mishchenkov (720) 687-7981 or Yulia Makaryan (720) 281-7692.',
      ],
      tags: ['Kids', 'Ministry', 'Volunteers'],
      layout: 'small',
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1566020593948-6ac3a6090908?auto=format&fit=crop&w=1800&q=80',
          alt: 'Children in church ministry',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 11,
      onOverview: true,
    },
    {
      id: 'sunday-school-volunteers',
      kind: 'recruitment',
      title: 'Sunday School Volunteers Needed',
      subheading: 'Preschool through High School',
      body: [
        'Classes for Preschool through High School. Make an eternal impact!',
        'We need teachers and volunteers of all ages.',
        'Contact Alla Rukosuyev (303) 406-8609 (text preferred).',
      ],
      tags: ['Volunteer', 'Education', 'Community'],
      layout: 'small',
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1427504494785-cdbbadeb27be?auto=format&fit=crop&w=1800&q=80',
          alt: 'Classroom teaching',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 11,
      onOverview: true,
    },
    {
      id: 'russian-school-assistants',
      kind: 'recruitment',
      title: 'Russian School Assistants',
      subheading: 'Language, Reading, Culture',
      body: [
        'Teachers needed for Russian Language, Reading, and Culture school.',
        'We are looking for kind, responsible individuals who love children.',
        'Contact Inna Cherniy (202) 913-7555.',
      ],
      tags: ['Volunteer', 'Russian', 'Education'],
      layout: 'small',
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1503676260728-1c00da068326?auto=format&fit=crop&w=1800&q=80',
          alt: 'Language learning',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 11,
      onOverview: true,
    },
    {
      id: 'serve-5280-youth',
      kind: 'ministry',
      title: 'Serve with 5280 Youth',
      subheading: 'Find your place',
      body: [
        'Service opportunities in youth ministry: video, worship, media, coffee shop, events, and more.',
        'Look for roles that align with F.A.I.T.H.',
        'Ask a youth leader how you can serve.',
      ],
      tags: ['Youth', 'Volunteer', 'Ministry'],
      layout: 'medium',
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&w=1800&q=80',
          alt: 'Youth group fellowship',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 12,
      onOverview: true,
    },
    {
      id: 'meal-ministry',
      kind: 'ministry',
      title: 'Meal Ministry',
      subheading: 'Share and serve',
      body: [
        'Share a meal for those in need. Serve God by serving others.',
        'Whether you want to contribute a meal or need support, we are here to help.',
        'Contact Lena Samokha (720) 933-5320.',
      ],
      tags: ['Service', 'Community', 'Care'],
      layout: 'small',
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1547521868-14cd169cecaf?auto=format&fit=crop&w=1800&q=80',
          alt: 'Community meal preparation',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 11,
      onOverview: true,
    },
    {
      id: 'denver-rescue-mission',
      kind: 'outreach',
      title: 'Serve at Denver Rescue Mission',
      subheading: 'Every Saturday at 7:00 AM',
      body: [
        'Serving our local community and those in need every Saturday morning.',
        'Join us for weekly outreach at Denver Rescue Mission.',
        'Meet at FSCC 15 minutes before departure.',
      ],
      tags: ['Outreach', 'Community', 'Service'],
      layout: 'small',
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1469571486292-f86350aaf308?auto=format&fit=crop&w=1800&q=80',
          alt: 'Community service',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 11,
      onOverview: true,
    },
    {
      id: 'sanctuary-guidelines',
      kind: 'notice',
      title: 'No Food or Drinks in the Sanctuary',
      subheading: 'During worship',
      body: [
        'No food or drinks in the sanctuary during worship.',
        'Please silence cell phones before entering.',
        'This helps us maintain a focused, reverent environment for all.',
      ],
      tags: ['Worship', 'Guidelines', 'Respect'],
      layout: 'small',
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1800&q=80',
          alt: 'Sanctuary',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 11,
      onOverview: true,
    },
    {
      id: 'connect-fscc',
      kind: 'link',
      title: 'Stay Connected with FSCC',
      subheading: 'Find FSCC online',
      body: [
        'Visit fscchurch.com and explore our church resources.',
        'Use Church Center for events, giving, and updates.',
        'Follow us on YouTube, Instagram, and Facebook.',
      ],
      tags: ['Website', 'Connect', 'Online'],
      layout: 'large',
      cta: { label: 'Visit Website', href: 'https://fscchurch.com/' },
      qr: {
        enabled: true,
        value: 'https://links.fscchurch.com/',
        size: 160,
        position: 'br',
        offset: 18,
        borderRadius: 16,
      },
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
    {
      id: 'coffee-shop',
      kind: 'ministry',
      title: 'Coffee Shop',
      subheading: 'Fellowship & hospitality',
      body: [
        'A welcoming space for fellowship before and after services.',
        'Café volunteers help keep our community connected and warm.',
        'Contact Polina Tsuber (720) 237-6033 to join the café team.',
      ],
      tags: ['Fellowship', 'Volunteer', 'Community'],
      layout: 'small',
      media: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1502551785612-a674fb0eeef8?auto=format&fit=crop&w=1800&q=80',
          alt: 'Coffee fellowship',
          mode: 'zoom-pan',
        },
      ],
      surface: 'automatic',
      motion: 'zoom-pan',
      duration: 11,
      onOverview: true,
    },
    {
      id: 'birthday',
      kind: 'birthday',
      title: 'Happy Birthday',
      subheading: 'Celebrating together',
      body: ['Grace', 'Noah', 'Elena'],
      tags: ['Birthday', 'Community', 'Joy'],
      layout: 'hero',
      surface: 'dark',
      motion: 'static',
      duration: 10,
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
        customDurationEnabled: !!slide.customDurationEnabled,
        cta: slide.cta && typeof slide.cta === 'object' ? slide.cta as Slide['cta'] : null,
        subheading: typeof slide.subheading === 'string' ? slide.subheading : undefined,
        kind: slide.kind ?? 'event',
        media: Array.isArray(slide.media) ? slide.media : undefined,
        layout: slide.layout ?? 'medium',
        qr: slide.qr && typeof slide.qr === 'object' ? slide.qr as Slide['qr'] : undefined,
      };
      return safeSlide;
    })
    .filter((slide): slide is Slide => slide !== null);

  if (safeSlides.length === 0) return null;

  return {
    version: typeof candidate.version === 'string' ? candidate.version : '0.3.0',
    title: typeof candidate.title === 'string' ? candidate.title : 'FSCC Dynamic Church Kiosk',
    settings: {
      defaultDuration:
        typeof candidate.settings?.defaultDuration === 'number' ? candidate.settings.defaultDuration : 12,
      accentColor:
        typeof candidate.settings?.accentColor === 'string' ? candidate.settings.accentColor : '#0E85B5',
      backgroundColor:
        typeof candidate.settings?.backgroundColor === 'string'
          ? candidate.settings.backgroundColor
          : '#F5F3EE',
      theme: candidate.settings?.theme === 'dark' ? 'dark' : 'light',
      stagePadding: candidate.settings?.stagePadding ?? { top: 32, right: 32, bottom: 32, left: 32 },
      cardGap: typeof candidate.settings?.cardGap === 'number' ? candidate.settings.cardGap : 18,
      animationConfig: candidate.settings?.animationConfig ?? { headingDuration: 420, bodyDuration: 540, staggerDelay: 90 },
      defaultMediaMotion: candidate.settings?.defaultMediaMotion ?? 'zoom-pan',
      qrDefaults: candidate.settings?.qrDefaults ?? {
        enabled: true,
        value: 'https://links.fscchurch.com/',
        size: 160,
        position: 'br',
        offset: 18,
        borderRadius: 16,
      },
      birthdayConfig: candidate.settings?.birthdayConfig ?? {
        enabled: true,
        names: ['Grace', 'Noah', 'Elena'],
        date: 'Today',
        darkness: 0.55,
      },
    },
    slides: safeSlides,
  };
}
