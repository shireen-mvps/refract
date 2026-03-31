export const BUSINESS_TYPES = [
  "Food & Beverage", "Fashion & Apparel", "Health & Wellness",
  "Home & Lifestyle", "Beauty & Skincare", "Education & Coaching",
  "Retail & E-commerce", "Services & Consulting", "Tech & SaaS", "Other",
];

export const CONTENT_TYPES = [
  "Recipe / How-To", "Product Description", "Promo / Announcement",
  "Event / Launch", "Blog Post / Article", "Customer Story",
  "Behind the Scenes", "Tips & Advice",
];

export const TONES = [
  "Warm & Homey", "Bold & Promotional", "Friendly & Casual",
  "Professional & Trustworthy", "Playful & Fun", "Inspiring & Motivational",
];

export const CAMPAIGN_GOALS = [
  "Grow Awareness", "Drive Sales", "Product Launch",
  "Build Community", "Email Sign-ups", "Event Promotion",
  "Educate Audience", "Build Trust",
];

export const IMAGE_STYLES = [
  "Flat Lay", "Lifestyle Shot", "Minimalist Studio",
  "Vibrant & Bold", "Soft Aesthetic", "Editorial",
];

export const IMAGE_FORMATS = [
  { label: "Square",    hint: "Instagram feed",      value: "1024x1024" },
  { label: "Landscape", hint: "Facebook / LinkedIn", value: "1792x1024" },
  { label: "Portrait",  hint: "Stories / TikTok",    value: "1024x1792" },
];

export const PLATFORMS = [
  {
    key: "instagram" as const,
    label: "Instagram",
    topBorder: "border-t-rose-500",
    accent: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    featured: true,
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    topBorder: "border-t-blue-500",
    accent: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    featured: false,
  },
  {
    key: "whatsapp" as const,
    label: "WhatsApp",
    topBorder: "border-t-emerald-500",
    accent: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    featured: false,
  },
  {
    key: "email" as const,
    label: "Email Newsletter",
    topBorder: "border-t-amber-500",
    accent: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    featured: false,
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    topBorder: "border-t-sky-500",
    accent: "text-sky-400",
    badge: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    featured: false,
  },
] as const;

export type PlatformConfig = (typeof PLATFORMS)[number];
