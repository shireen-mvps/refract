export type OutputKey = "instagram" | "facebook" | "whatsapp" | "email" | "linkedin";
export type RepurposeOutput = Record<OutputKey, string>;

export type HistoryEntry = {
  id: string;
  date: string;
  businessName: string;
  campaignGoal: string;
  contentType: string;
  tone: string;
  output: RepurposeOutput;
};

export type BrandKit = {
  businessName: string;
  businessType: string;
  tone: string;
};
