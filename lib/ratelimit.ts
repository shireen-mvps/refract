import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = isConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// 5 content repurposes per IP per 24 hours
// Soft fallback (allow) when Upstash is unconfigured — Anthropic spending cap acts as backstop
export const repurposeLimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "24 h"), prefix: "rl:repurpose", analytics: true })
  : { limit: async () => ({ success: true, remaining: 0 }) };

// 2 image generations per IP per 24 hours
// HARD BLOCK when Upstash is unconfigured — Gemini has no spending cap, no fallback allowed
export const imageLimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(2, "24 h"), prefix: "rl:image", analytics: true })
  : { limit: async () => ({ success: false, remaining: 0 }) };
