export const GALLERY_VIDEOS = [
  {
    id: 'main', src: '/assets/videos/reel2.mp4',
    poster: '/assets/img/gallery/previews/video-wide.webp', title: 'خذ فكرة عن التجربة.',
    description: 'شوف PRO-FIT عن قرب، وخذ أول خطوة على راحتك.',
    label: 'الصورة الكاملة', duration: '00:20', orientation: 'landscape',
  },
  {
    id: 'reel-one', src: '/assets/videos/land-video.mp4',
    poster: '/assets/img/gallery/previews/post-04.webp', title: 'خطوة أقرب لهدفك',
    description: 'لقطة من عالم PRO-FIT', label: 'لقطة سريعة', duration: '00:15', orientation: 'portrait',
  },
  {
    id: 'reel-two', src: '/assets/videos/reel1.mp4',
    poster: '/assets/img/gallery/previews/post-07.webp', title: 'خذها معك ليومك',
    description: 'شوفها بطريقتك', label: 'لقطة سريعة', duration: '00:13', orientation: 'portrait',
  },
] as const;

export const GALLERY_POSTS = [
  { file: '2-INSTA.jpg.jpeg', title: 'تدريب يجيك لين البيت', category: 'تجربة PRO-FIT', height: 1350 },
  { file: '5-insta.jpg.jpeg', title: 'خصوصيتك، على راحتك', category: 'تدريب شخصي', height: 1350 },
  { file: 'post1.jpeg', title: 'اضبط تمرينك على كيفك', category: 'تقنية EMS', height: 1350 },
  { file: '2-TIKTOK.jpg.jpeg', title: 'خطوتك لنمط حياة أنشط', category: 'من عالمنا', height: 1920 },
  { file: '9-INSTA-نمط-حياتك-صحي (1).jpg.jpeg', title: 'نمط حياتك يبدأ بخطوة', category: 'أسلوب حياة', height: 1350 },
  { file: 'post2.jpeg', title: 'وقت لتمرينك وسط يومك', category: 'تدريب EMS', height: 1350 },
  { file: '3-TIKTOK.jpg.jpeg', title: 'ابدأ من المكان اللي يناسبك', category: 'من عالمنا', height: 1920 },
  { file: '6-INSTA-كليه-عسكريه.jpg.jpeg', title: 'استعد لخطوتك الجاية', category: 'جاهزية ولياقة', height: 1350 },
  { file: '7-INSTAالتخرج (1).jpg.jpeg', title: 'لكل هدف، بداية', category: 'أهدافك معنا', height: 1350 },
  { file: '8-INSTA-صيف (1).jpg.jpeg', title: 'تمرّن براحة في الصيف', category: 'حركة على راحتك', height: 1350 },
].map((post, index) => ({
  ...post,
  src: `/assets/img/gallery/${post.file}`,
  thumbSrc: `/assets/img/gallery/previews/post-${String(index + 1).padStart(2, '0')}.webp`,
}));

export type GalleryVideo = typeof GALLERY_VIDEOS[number];
