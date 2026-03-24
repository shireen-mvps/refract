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

const noopLimit = { limit: async () => ({ success: true }) };

// 5 content repurposes per IP per 24 hours
export const repurposeLimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "24 h"), prefix: "rl:repurpose" })
  : noopLimit;

// 3 image generations per IP per 24 hours
export const imageLimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "24 h"), prefix: "rl:image" })
  : noopLimit;
