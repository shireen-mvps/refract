import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";
import { repurposeLimit } from "@/lib/ratelimit";

const repurposeSchema = z.object({
  instagram: z
    .string()
    .describe(
      "Instagram caption with 2-4 relevant emojis, punchy hook, and 4-6 hashtags at the end. 150-220 characters before hashtags."
    ),
  facebook: z
    .string()
    .describe(
      "Facebook post that is warm and conversational. 200-300 characters. Can end with a soft question to encourage comments."
    ),
  whatsapp: z
    .string()
    .describe(
      "WhatsApp broadcast message that reads like it is coming from a friend. Short, personal, direct. 100-150 characters. No hashtags."
    ),
  email: z
    .string()
    .describe(
      'Email formatted as "Subject: [subject line]\\n\\n[2-3 sentence body opener that hooks the reader]". Professional yet warm.'
    ),
  linkedin: z
    .string()
    .describe(
      "LinkedIn post with a professional insight or story angle. 200-250 characters. Broader takeaway relevant to the business or industry."
    ),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";
  const { success } = await repurposeLimit.limit(ip);
  if (!success) {
    return Response.json(
      { error: "Daily limit reached for this demo (5 repurposes per day). Clone the repo and add your own API keys for unlimited use." },
      { status: 429 }
    );
  }

  try {
    const { businessName, businessType, contentType, tone, campaignGoal, content } =
      await req.json();

    if (!content || content.trim().length < 10) {
      return Response.json(
        { error: "Please provide more content to repurpose." },
        { status: 400 }
      );
    }

    const { object } = await generateObject({
      model: anthropic("claude-sonnet-4-6"),
      maxTokens: 800, // 5 posts × ~150 chars avg — generous buffer, hard cap on cost
      schema: repurposeSchema,
      prompt: `You are a social media content expert who specialises in helping small businesses grow their online presence.

Your task: Repurpose the following content into 5 different platform-specific formats.

Business Name: ${businessName || "this business"}
Business Type: ${businessType}
Content Type: ${contentType}
Tone: ${tone}
Campaign Goal: ${campaignGoal || "Grow Awareness"}

Original Content:
---
${content}
---

Rules for each platform:
- instagram: Start with a strong hook. Use 2-4 well-placed emojis. End with 4-6 relevant hashtags on a new line. Keep the caption punchy and visual. Naturally mention "${businessName || "the business"}". Subtly align with the campaign goal: ${campaignGoal}.
- facebook: Conversational and warm. Write like you're talking to your community. Optionally end with a light question. Naturally mention "${businessName || "the business"}". Subtly align with the campaign goal: ${campaignGoal}.
- whatsapp: Write as if personally messaging a regular customer. No hashtags. Keep it short and friendly — like a real message from a person, not a brand. Subtly align with the campaign goal: ${campaignGoal}.
- email: Format exactly as "Subject: [catchy subject line]\\n\\n[2-3 sentence body that hooks the reader and makes them want to read more]". Warm but professional. Align with the campaign goal: ${campaignGoal}.
- linkedin: Take a broader, professional angle. What is the insight or story here that a professional audience would appreciate? Can reference the business but focus on a wider takeaway. Align with the campaign goal: ${campaignGoal}.

Tone guide: "${tone}" — apply this consistently across all platforms while respecting each platform's natural culture.

Always sound like a real human, never like a generic marketing bot.`,
    });

    return Response.json(object);
  } catch (error) {
    console.error("Repurpose API error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
