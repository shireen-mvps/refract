"use client";

import { useState } from "react";
import { Spinner } from "./ui";
import { ImageIcon } from "./icons";
import { IMAGE_STYLES as STYLES, IMAGE_FORMATS as FORMATS } from "@/lib/constants";

interface ImageGenerationCardProps {
  businessName: string;
  businessType: string;
  contentType: string;
  content: string;
}

export function ImageGenerationCard({
  businessName, businessType, contentType, content,
}: ImageGenerationCardProps) {
  const [imageStyle, setImageStyle] = useState("Lifestyle Shot");
  const [imageFormat, setImageFormat] = useState("1024x1024");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productImageMimeType] = useState("image/jpeg");
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProductImagePreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const MAX = 1024;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        setProductImage(canvas.toDataURL("image/jpeg", 0.85).split(",")[1]);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setImageLoading(true);
    setImageError(null);
    setImageUrl(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName, businessType, contentType, content,
          imageStyle, imageFormat,
          productImage, productImageMimeType,
          customPrompt: customPrompt.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.error === "no_key") { setImageError("no_key"); return; }
      if (!res.ok) { setImageError(data.error || "Image generation failed."); return; }
      setImageUrl(data.imageUrl);
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 flex flex-col gap-4 animate-card-appear" style={{ animationDelay: "0.45s" }}>
      <div className="flex items-center gap-2.5">
        <ImageIcon className="w-4 h-4 text-violet-400" />
        <span className="text-sm font-semibold text-white">Generate a Marketing Image</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/45 ml-auto">Powered by Gemini</span>
      </div>

      {imageError === "no_key" ? (
        <div className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 leading-relaxed">
          Add your <code className="font-mono bg-amber-500/20 px-1 rounded">GEMINI_API_KEY</code> to{" "}
          <code className="font-mono bg-amber-500/20 px-1 rounded">.env.local</code> to enable image generation.
        </div>
      ) : (
        <>
          {/* Custom prompt */}
          <div>
            <label className="block text-xs font-medium text-white/55 mb-2">
              Describe your image <span className="text-white/30 font-normal">(optional)</span>
            </label>
            <textarea value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. A calming massage room with soft lighting..." rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-transparent transition resize-none leading-relaxed" />
          </div>

          {/* Reference image */}
          <div>
            <label className="block text-xs font-medium text-white/55 mb-2">
              Upload a reference image <span className="text-white/30 font-normal">(optional)</span>
            </label>
            <label className="flex flex-col items-center justify-center w-full cursor-pointer">
              {productImagePreview ? (
                <div className="relative w-full">
                  <img src={productImagePreview} alt="Reference" className="w-full max-h-40 object-contain rounded-xl border border-white/10 bg-white/5" />
                  <button type="button" onClick={() => { setProductImage(null); setProductImagePreview(null); }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 border border-white/20 text-white/80 text-xs flex items-center justify-center hover:bg-black/80 transition-colors">✕</button>
                </div>
              ) : (
                <div className="w-full border-2 border-dashed border-white/10 rounded-xl py-6 flex flex-col items-center gap-1.5 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-200 bg-white/[0.02]">
                  <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-white/45">Click to upload product photo or logo</span>
                  <span className="text-xs text-white/30">JPG, PNG, WEBP</span>
                </div>
              )}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {/* Style pills */}
          <div>
            <label className="block text-xs font-medium text-white/55 mb-2">Image Style</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((style) => (
                <button key={style} type="button" onClick={() => setImageStyle(style)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${imageStyle === style ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20" : "bg-white/5 text-white/55 border-white/10 hover:border-violet-500/40 hover:text-white/80"}`}>
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-xs font-medium text-white/55 mb-2">Format</label>
            <div className="flex gap-2">
              {FORMATS.map((fmt) => (
                <button key={fmt.value} type="button" onClick={() => setImageFormat(fmt.value)}
                  className={`flex-1 flex flex-col items-center py-2.5 px-3 rounded-xl border text-xs transition-all duration-150 ${imageFormat === fmt.value ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20" : "bg-white/5 text-white/55 border-white/10 hover:border-violet-500/40 hover:text-white/80"}`}>
                  <span className="font-semibold">{fmt.label}</span>
                  <span className={`mt-0.5 ${imageFormat === fmt.value ? "text-violet-200" : "text-white/30"}`}>{fmt.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="button" onClick={handleGenerate} disabled={imageLoading}
            className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20">
            {imageLoading ? <><Spinner className="h-4 w-4" />Generating image...</> : "Generate Image"}
          </button>

          {imageError && imageError !== "no_key" && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">⚠ {imageError}</p>
          )}

          {imageUrl && (
            <div className="flex flex-col gap-2">
              <img src={imageUrl} alt="Generated marketing image" className="w-full rounded-xl border border-white/10" />
              <a href={imageUrl} download="refract-image.jpg" className="text-xs text-center text-violet-400 hover:text-violet-300 transition-colors">Download image ↓</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
