
import { useState } from "react";

const BUSINESS_TYPES = ["Food & Beverage","Fashion & Apparel","Health & Wellness","Home & Lifestyle","Beauty & Skincare","Education & Coaching","Retail & E-commerce","Services & Consulting","Tech & SaaS","Other"];
const CONTENT_TYPES = ["Recipe / How-To","Product Description","Promo / Announcement","Event / Launch","Blog Post / Article","Customer Story","Behind the Scenes","Tips & Advice"];
const TONES = ["Warm & Homey","Bold & Promotional","Friendly & Casual","Professional & Trustworthy","Playful & Fun","Inspiring & Motivational"];

const PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: "📸", bg: "bg-pink-50", border: "border-pink-200", badge: "bg-pink-100 text-pink-700" },
  { key: "facebook",  label: "Facebook",  icon: "👥", bg: "bg-blue-50",  border: "border-blue-200",  badge: "bg-blue-100 text-blue-700"  },
  { key: "whatsapp",  label: "WhatsApp",  icon: "💬", bg: "bg-green-50", border: "border-green-200", badge: "bg-green-100 text-green-700" },
  { key: "email",     label: "Email Newsletter", icon: "📧", bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-700" },
  { key: "linkedin",  label: "LinkedIn",  icon: "💼", bg: "bg-sky-50",   border: "border-sky-200",   badge: "bg-sky-100 text-sky-700"   },
];

const DEMO_OUTPUT = {
  instagram: `🍱 Homemade never tasted this good! Sunny Homemade's signature nasi lemak — slow-cooked sambal, fragrant coconut rice, crispy anchovies. Every pack made fresh with love. Order now before it sells out! 🌿✨\n\n#SunnyHomemade #NasiLemak #HomemadeFood #KLFood #MalaysianFood #FoodDelivery`,
  facebook: `We poured our heart into every single pack. 💛 Sunny Homemade's nasi lemak is made fresh each morning — rich sambal, fluffy coconut rice, and all the classics you love. Limited packs daily, so don't wait too long! Drop us a message to order. What's your go-to nasi lemak topping? 👇`,
  whatsapp: `Hi! 👋 Sunny Homemade's fresh nasi lemak is ready for order today. Made this morning, limited packs. Reply to grab yours before it's gone! 🍱`,
  email: `Subject: Fresh Nasi Lemak — Made This Morning, Ready Now\n\nHey there! Sunny Homemade just packed today's batch of nasi lemak and it smells absolutely incredible. Slow-cooked sambal, coconut rice, and all the fixings — made fresh every single day. Reply to this message or drop us a WhatsApp to secure your pack today.`,
  linkedin: `Running a homemade food business has taught me one thing: consistency builds trust. At Sunny Homemade, we prepare everything fresh daily — no shortcuts. It's a small operation, but the attention to quality is what keeps customers coming back. The same principle applies to any business: people remember how you made them feel.`,
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all text-gray-600 shadow-sm"
    >
      {copied ? <span className="text-green-600">✓ Copied!</span> : "Copy"}
    </button>
  );
}

export default function Preview() {
  const [businessName, setBusinessName] = useState("Sunny Homemade");
  const [businessType, setBusinessType] = useState("Food & Beverage");
  const [contentType, setContentType] = useState("Product Description");
  const [tone, setTone] = useState("Warm & Homey");
  const [content, setContent] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!content.trim()) return;
    setLoading(true);
    setOutput(null);
    setTimeout(() => { setLoading(false); setOutput(DEMO_OUTPUT); }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 font-sans">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/90 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">✦</div>
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-none">AI Content Repurposer</p>
              <p className="text-xs text-gray-400 mt-0.5">Powered by Claude AI</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">shireen-mvps</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            One input.{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #9333ea, #ec4899)" }}>
              Five platforms.
            </span>
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Paste your content and get ready-to-post captions for Instagram, Facebook, WhatsApp, Email, and LinkedIn — instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name</label>
              <input value={businessName} onChange={e => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="e.g. Sunny Homemade" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Type</label>
              <select value={businessType} onChange={e => setBusinessType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                {BUSINESS_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Content Type</label>
                <select value={contentType} onChange={e => setContentType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                  {CONTENT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tone</label>
                <select value={tone} onChange={e => setTone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                  {TONES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Your Content</label>
                <span className="text-xs text-gray-400">{content.length} / 1500</span>
              </div>
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={7} maxLength={1500}
                placeholder="Paste your recipe, product description, announcement, or any content here..."
                className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none leading-relaxed" />
            </div>

            <button onClick={handleGenerate} disabled={content.trim().length < 10 || loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md"
              style={{ background: "linear-gradient(to right, #9333ea, #ec4899)" }}>
              {loading ? (
                <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Repurposing content...</>
              ) : (<><span>✦</span> Repurpose Content</>)}
            </button>

            <p className="text-xs text-center text-gray-400">Works for any business. Demo pre-loaded with Sunny Homemade.</p>
          </div>

          {/* Output */}
          <div className="flex flex-col gap-4">
            {!output && !loading && (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 p-10 text-center flex flex-col items-center gap-3">
                <div className="text-4xl">✦</div>
                <p className="text-sm text-gray-500 font-medium">Your repurposed content will appear here</p>
                <p className="text-xs text-gray-400">5 platform-ready posts generated in seconds</p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {PLATFORMS.map(p => (
                    <span key={p.key} className={`text-xs px-2.5 py-1 rounded-full ${p.badge}`}>{p.icon} {p.label}</span>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse"
                  style={{ background: "linear-gradient(to bottom right, #a855f7, #ec4899)" }}>
                  <span className="text-white text-xl">✦</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Claude is writing your content...</p>
                  <p className="text-xs text-gray-400 mt-1">Crafting 5 platform-specific posts</p>
                </div>
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {output && PLATFORMS.map(platform => (
              <div key={platform.key} className={`rounded-2xl border ${platform.border} ${platform.bg} p-5 flex flex-col gap-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{platform.icon}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${platform.badge}`}>{platform.label}</span>
                  </div>
                  <CopyButton text={output[platform.key]} />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{output[platform.key]}</p>
                <p className="text-xs text-gray-400 text-right">{output[platform.key].length} characters</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-16 text-center text-xs text-gray-400 pb-8">
          Built by Shireen · Powered by Claude AI · Part of the AI Portfolio Series
        </footer>
      </div>
    </div>
  );
}
