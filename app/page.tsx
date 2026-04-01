"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { InputForm } from "./components/InputForm";
import { OutputSection } from "./components/OutputSection";
import { ContentHistory } from "./components/ContentHistory";
import { UpgradeCTA } from "./components/UpgradeCTA";
import type { RepurposeOutput, HistoryEntry } from "@/lib/types";
import type { ContentDeckData } from "@/lib/generatePptx";

export default function Home() {
  // ── Form state ──────────────────────────────────────────────────
  const [businessName, setBusinessName] = useState("Sunny Homemade");
  const [businessType, setBusinessType] = useState("Food & Beverage");
  const [contentType, setContentType] = useState("Product Description");
  const [tone, setTone] = useState("Warm & Homey");
  const [campaignGoal, setCampaignGoal] = useState("Grow Awareness");
  const [content, setContent] = useState("");

  // ── Output / loading ─────────────────────────────────────────────
  const [output, setOutput] = useState<RepurposeOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Brand Kit ───────────────────────────────────────────────────
  const [brandKitLoaded, setBrandKitLoaded] = useState(false);
  const [brandKitToast, setBrandKitToast] = useState(false);

  // ── History ─────────────────────────────────────────────────────
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // ── Export ──────────────────────────────────────────────────────
  const [exportingPptx, setExportingPptx] = useState(false);

  // ── Load Brand Kit + History on mount ───────────────────────────
  useEffect(() => {
    try {
      const rawKit = localStorage.getItem("refract_brand_kit");
      if (rawKit) {
        const kit = JSON.parse(rawKit);
        setBusinessName(kit.businessName ?? "Sunny Homemade");
        setBusinessType(kit.businessType ?? "Food & Beverage");
        setTone(kit.tone ?? "Warm & Homey");
        setBrandKitLoaded(true);
      }
      const rawHistory = localStorage.getItem("refract_history");
      if (rawHistory) setHistory(JSON.parse(rawHistory));
    } catch { /* SSR guard */ }
  }, []);

  const handleSaveBrandKit = () => {
    localStorage.setItem("refract_brand_kit", JSON.stringify({ businessName, businessType, tone }));
    setBrandKitLoaded(true);
    setBrandKitToast(true);
    setTimeout(() => setBrandKitToast(false), 3000);
  };

  const saveToHistory = (newOutput: RepurposeOutput) => {
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      businessName, campaignGoal, contentType, tone,
      output: newOutput,
    };
    const updated = [entry, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("refract_history", JSON.stringify(updated));
  };

  const restoreFromHistory = (entry: HistoryEntry) => {
    setBusinessName(entry.businessName);
    setCampaignGoal(entry.campaignGoal);
    setContentType(entry.contentType);
    setTone(entry.tone);
    setOutput(entry.output);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const res = await fetch("/api/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, businessType, contentType, tone, campaignGoal, content }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); return; }
      setOutput(data);
      saveToHistory(data);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportPptx = async () => {
    if (!output) return;
    setExportingPptx(true);
    try {
      const { generateContentDeck } = await import("@/lib/generatePptx");
      const deckData: ContentDeckData = { businessName, businessType, campaignGoal, contentType, tone, output };
      await generateContentDeck(deckData);
    } catch (err) {
      console.error("PPTX export failed:", err);
    } finally {
      setExportingPptx(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07071a] text-white overflow-x-hidden">

      {/* ── Background system ───────────────────────────────────────── */}

      {/* Layer 1: dot grid */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Layer 2: primary violet orb — top center, breathes */}
      <div className="fixed top-[-8%] left-1/2 -translate-x-1/2 w-[950px] h-[600px] pointer-events-none animate-glow-breathe"
        style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.13) 0%, transparent 65%)" }} />

      {/* Layer 3: fuchsia orb — top right, drifts */}
      <div className="fixed pointer-events-none animate-drift-orb"
        style={{ top: "-5%", right: "-8%", width: "600px", height: "500px",
          background: "radial-gradient(ellipse at center, rgba(217,70,239,0.08) 0%, transparent 65%)",
          animationDelay: "2s" }} />

      {/* Layer 4: indigo orb — bottom left, drifts on alternate path */}
      <div className="fixed pointer-events-none animate-drift-orb-b"
        style={{ bottom: "0%", left: "-10%", width: "650px", height: "550px",
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.09) 0%, transparent 65%)",
          animationDelay: "6s" }} />

      {/* Layer 5: soft bottom vignette — grounds the page */}
      <div className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(7,7,26,0.6) 0%, transparent 100%)" }} />

      {/* Layer 6: floating micro-particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-1 h-1 rounded-full bg-violet-400/50 animate-float-particle"
          style={{ top: "14%", left: "18%", animationDelay: "0s" }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-fuchsia-400/35 animate-float-particle-b"
          style={{ top: "28%", right: "22%", animationDelay: "2s" }} />
        <div className="absolute w-1 h-1 rounded-full bg-violet-300/45 animate-float-particle-c"
          style={{ top: "55%", left: "8%", animationDelay: "1s" }} />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-pink-400/50 animate-float-particle"
          style={{ top: "42%", right: "12%", animationDelay: "3.5s" }} />
        <div className="absolute w-1 h-1 rounded-full bg-indigo-400/40 animate-float-particle-b"
          style={{ top: "72%", left: "38%", animationDelay: "5s" }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/25 animate-float-particle-c"
          style={{ top: "18%", right: "8%", animationDelay: "2.5s" }} />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-fuchsia-300/60 animate-float-particle"
          style={{ top: "85%", left: "65%", animationDelay: "4s" }} />
        <div className="absolute w-1 h-1 rounded-full bg-violet-300/35 animate-float-particle-b"
          style={{ top: "62%", right: "35%", animationDelay: "1.5s" }} />
      </div>

      {/* Header */}
      <Header onUpgradeClick={() => document.getElementById("upgrade")?.scrollIntoView({ behavior: "smooth" })} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* Hero */}
        <HeroSection />

        {/* ── Centered form ── */}
        <div className="max-w-2xl mx-auto w-full">
          <InputForm
            businessName={businessName} setBusinessName={setBusinessName}
            businessType={businessType} setBusinessType={setBusinessType}
            contentType={contentType} setContentType={setContentType}
            tone={tone} setTone={setTone}
            campaignGoal={campaignGoal} setCampaignGoal={setCampaignGoal}
            content={content} setContent={setContent}
            brandKitLoaded={brandKitLoaded}
            loading={loading}
            error={error}
            toastVisible={brandKitToast}
            onSubmit={handleSubmit}
            onSaveBrandKit={handleSaveBrandKit}
          />
        </div>

        {/* ── Output — appears below form, slightly wider ── */}
        {(output || loading) && (
          <div className="max-w-3xl mx-auto w-full mt-10 animate-slide-in-down">
            <OutputSection
              output={output}
              loading={loading}
              exportingPptx={exportingPptx}
              onExportPptx={handleExportPptx}
              businessName={businessName}
              businessType={businessType}
              contentType={contentType}
              content={content}
            />
          </div>
        )}

        {/* History */}
        <ContentHistory
          history={history}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          onRestore={restoreFromHistory}
        />

        {/* Upgrade CTA */}
        <UpgradeCTA />

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-white/30 pb-8">
          Built by{" "}
          <a href="https://github.com/shireen-mvps" target="_blank" rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors">Shireen</a>
          {" "}· Powered by Claude Code
        </footer>
      </div>
    </main>
  );
}
