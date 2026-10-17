export type JourneyId = 'progress' | 'training' | 'nutrition';
export type JourneyScreenshot = { src: string; alt: string; fit?: 'contain' | 'cover' };
export type JourneyStage = {
  id: JourneyId;
  label: string;
  title: string;
  description: string;
  stamp: string;
  mediaCaption?: string;
  desktop: JourneyScreenshot | null;
  mobile: JourneyScreenshot | null;
};

// Replace null with approved screenshots: { src: '/assets/img/journey/…', alt: '…' }.
// Until then, the device screens are explicitly labelled illustrative.
export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'progress', label: 'شوف تقدّمك', title: 'تقدّمك، واضح قدامك',
    description: 'صورك وقياساتك تحكي تقدّمك، وفريقك يراجعها معك.',
    stamp: 'كل خطوة لها أثر',
    mediaCaption: 'PRO-FIT · نادي تروح له ونادي يجيك',
    desktop: { src: '/assets/img/slider.png', alt: 'PRO-FIT — نادي تروح له ونادي يجيك', fit: 'cover' },
    mobile: { src: '/assets/img/ems-why.jpg', alt: 'لماذا تختار PRO-FIT EMS؟', fit: 'contain' },
  },
  {
    id: 'training', label: 'اعرف خطتك', title: 'هدفك له خطة',
    description: 'برنامج تدريب يناسبك، وخطوات واضحة تتطور مع تقدّمك.',
    stamp: 'خطة على قد هدفك', desktop: null, mobile: null,
  },
  {
    id: 'nutrition', label: 'كمّل يومك', title: 'متابعتك ما توقف هنا',
    description: 'تغذية تناسب يومك، ومتابعة تكمل معك بعد الجلسة.',
    stamp: 'معك بين الجلسات', desktop: null, mobile: null,
  },
];
