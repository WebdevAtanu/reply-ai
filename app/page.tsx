"use client";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";

export default function Home() {
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("professional");
  const [replies, setReplies] = useState<string[]>([]);
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!message.trim()) {
      setError("Please enter an email message");
      return;
    }

    setLoading(true);
    setError("");
    setReplies([]);
    setSelectedReply(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ message, mood }),
      });

      if (!res.ok) throw new Error("Failed to generate replies");

      const data = await res.json();
      setReplies(data.reply);
      setSelectedReply(data.reply[0]);
    } catch {
      setError("Error generating replies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex flex-col md:flex-row overflow-hidden font-sans text-slate-900">

      {/* LEFT SIDE - INPUT PANEL */}
      <aside className="w-full md:w-120 border-r border-slate-200 bg-white flex flex-col p-4 space-y-2 z-20">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            ReplyAI
          </h1>
          <p className="text-sm text-slate-500 mt-1">Refine your communication instantly.</p>
        </div>

        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex flex-col flex-1">
            <textarea
              placeholder="Paste the email you received here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 w-full p-4 text-sm border border-slate-200 rounded focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none bg-slate-50/50 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 block">Desired Tone</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none cursor-pointer hover:border-indigo-300 transition-colors"
              >
                <option value="professional">💼 Professional</option>
                <option value="friendly">👋 Friendly</option>
                <option value="apology">🙏 Apology</option>
                <option value="angry">🎯 Assertive</option>
                <option value="sales">📈 Sales</option>
                <option value="love">❤️ Love</option>
                <option value="funny">😂 Funny</option>
                <option value="sad">😢 Sad</option>
                <option value="excited">😍 Excited</option>
                <option value="romantic">💖 Romantic</option>
                <option value="curious">🤔 Curious</option>
                <option value="confused">😕 Confused</option>
                <option value="insightful">🧠 Insightful</option>
                <option value="motivational">🎯 Motivational</option>
                <option value="educational">📚 Educational</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-3 rounded-md transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] text-sm"
            >
              {loading ? "Crafting responses..." : "Generate Replies"}
            </button>

            {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE - SCROLLABLE REPLIES */}
      <main className="flex-1 flex flex-col h-full relative bg-[#F1F5F9]">
        <header className="px-6 py-4 border-b border-slate-200 bg-white/40 backdrop-blur-xl sticky top-0 z-10 flex justify-between items-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Generated Options</h2>
          {replies.length > 0 && <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-bold">{replies.length} REPLIES</span>}
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-500 font-medium animate-pulse">Thinking of the perfect response...</p>
            </div>
          ) : replies.length > 0 ? (
            replies.map((reply, index) => (
              <div
                key={index}
                onClick={() => setSelectedReply(reply)}
                className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer bg-white ${selectedReply === reply
                  ? "border-indigo-500 shadow-xl shadow-indigo-100 ring-2 ring-indigo-500/20 -translate-y-0.5"
                  : "border-transparent hover:border-slate-300 shadow-md hover:shadow-lg"
                  }`}
              >
                <div className="absolute top-4 right-4 opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(reply, index);
                    }}
                    className={`text-xs px-2 py-2 rounded font-bold transition-all ${copied === index
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                      : "bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-slate-200"
                      }`}
                  >
                    {copied === index ? "✓ Copied" : <FaCopy />}
                  </button>
                </div>

                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-400">
                    0{index + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed text-[15px] whitespace-pre-wrap pr-12 pt-1">
                    {reply}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-2 text-3xl rotate-12">✉️</div>
              <p className="text-slate-400 font-medium max-w-60">
                Enter your email and choose a tone to generate personalized replies instantly.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}