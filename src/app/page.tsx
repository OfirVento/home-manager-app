"use client";

import {
  Calendar, Home, MessageCircle, Send, Plus, CheckCircle2, Clock,
  AlertCircle, Sparkles, Settings, ChevronRight, MapPin, Users,
  FileText, CreditCard, ChevronLeft, User, Phone, Star, ArrowLeft,
  Video, MoreVertical, Paperclip, Mic, Smile, Check, CheckCheck
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { simulateAgentResponse } from './simulation';

export default function Page() {
  // --- STATE & LOGIC COPIED FROM OLD YoniView ---
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      role: "assistant",
      text: "היי 👋 אני יוני, מנהל הבית שלך. אעזור לך למצוא עובדי בית מאומתים ולנהל את כל התהליך..."
    },
    {
      id: 2,
      role: "assistant",
      text: "איזה בעל מקצוע תרצה לחפש?"
    }
  ]);
  const [quickReplies, setQuickReplies] = useState<string[]>(["לקבוע ניקיון", "אינסטלטור", "בייביסיטר דחוף"]);
  const [inputValue, setInputValue] = useState("");
  const [agentStatus, setAgentStatus] = useState<'idle' | 'thinking' | 'checking' | 'typing'>('idle');

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll only when USER sends a message
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (scrollRef.current && lastMsg?.role === 'user') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(text: string, displayText?: string) {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: displayText || text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setQuickReplies([]);

    // Simulation Cycle
    setAgentStatus('thinking');
    setTimeout(() => setAgentStatus('checking'), 800);
    setTimeout(() => setAgentStatus('typing'), 1800);

    // Helper to process response
    const handleAgentResponse = async (data: any) => {
      // Delay slightly for effect
      await new Promise(r => setTimeout(r, 1000));
      setAgentStatus('idle');

      if (data.assistant_message) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: "assistant",
          text: data.assistant_message,
          cards: data.cards
        }]);
      }
      if (data.quick_replies) setQuickReplies(data.quick_replies);
    };

    try {
      // Try to reach the local backend
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, homeId: 1, history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })) })
      });
      if (!res.ok) throw new Error("Backend unreachable");

      const data = await res.json();
      await handleAgentResponse(data);

    } catch (err) {
      console.log("Backend failed, switching to Client Simulation for Demo");
      // Fallback: Simulate response if backend is offline (e.g., GitHub Pages)
      const simulatedData = await simulateAgentResponse(text, messages);
      await handleAgentResponse(simulatedData);
    }
  }



  const getStatusText = () => {
    switch (agentStatus) {
      case 'thinking': return 'חושב...';
      case 'checking': return 'בודק נתונים...';
      case 'typing': return 'מקליד...';
      default: return 'מחובר';
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex flex-col font-sans text-right" dir="rtl">

      {/* LANDING HEADER */}


      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-12 w-full">

        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">סימולטור יוני (Yoni)</h1>
          <p className="text-lg text-gray-500 font-medium">בדיקת פלואו שיחה מול לקוח קצה</p>
          <p className="pt-2">
            <a
              href="/cally.html"
              dir="ltr"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
            >
              View Cally — Q1 2026 deck →
            </a>
          </p>
        </div>

        {/* MOBILE FRAME CONTAINER */}
        <div className="relative">
          {/* iPhone Frame */}
          <div className="w-[375px] h-[780px] bg-gray-900 rounded-[55px] p-[12px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-4 ring-gray-900/10 relative z-10 border-[4px] border-gray-800">

            {/* Inner Screen - The App */}
            <div className="w-full h-full bg-[#EFE7DE] rounded-[42px] overflow-hidden relative flex flex-col">

              {/* 1. WHATSAPP HEADER */}
              <div className="bg-[#008069] text-white p-3 px-4 flex items-center justify-between shadow-sm z-20 shrink-0">
                <div className="flex items-center gap-3">
                  <ArrowLeft className="w-6 h-6" />
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 overflow-hidden flex items-center justify-center">
                      {/* Fallback avatar if no image */}
                      <span className="text-gray-500 font-bold text-lg">Y</span>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <h1 className="font-bold text-base leading-tight">Yoni Agent</h1>
                      <span className="text-xs opacity-90">{getStatusText()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <Video className="w-6 h-6" />
                  <Phone className="w-5 h-5" />
                  <MoreVertical className="w-5 h-5" />
                </div>
              </div>

              {/* 2. CHAT AREA */}
              <div
                className="flex-1 overflow-y-auto p-3 space-y-2 bg-contain scrollbar-hide"
                style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}
                ref={scrollRef}
              >
                <div className="flex justify-center my-4">
                  <span className="bg-[#E1F3FB] text-gray-800 text-xs px-2 py-1 rounded shadow-sm opacity-90">היום</span>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col w-full mb-1 gap-2">
                    <div className={clsx("flex w-full", msg.role === 'user' ? "justify-start" : "justify-end")}>
                      <div className={clsx(
                        "max-w-[85%] px-3 py-1.5 text-sm shadow-sm relative",
                        msg.role === 'user'
                          ? "bg-[#D9FDD3] text-gray-900 rounded-lg rounded-tr-none"
                          : "bg-white text-gray-900 rounded-lg rounded-tl-none"
                      )}>
                        <span className="whitespace-pre-wrap leading-relaxed">{msg.text}</span>

                        <div className={clsx("flex items-center justify-end gap-1 mt-1 opacity-60 text-[10px] select-none", msg.role === 'user' && "justify-end")}>
                          <span>{new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {msg.role === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                        </div>
                      </div>
                    </div>
                    {/* Render Persisted Cards if any (Assistant only) */}
                    {msg.cards && msg.cards.length > 0 && msg.cards.map((card: any, idx: number) => (
                      <ContractorCard key={idx} card={card} onAction={sendMessage} />
                    ))}
                  </div>
                ))}



                {agentStatus !== 'idle' && (
                  <div className="flex w-full justify-end">
                    <div className="bg-white px-4 py-2 rounded-lg rounded-tl-none shadow-sm">
                      <span className="text-sm text-gray-500 italic">מקליד...</span>
                    </div>
                  </div>
                )}



                <div className="h-4"></div>
              </div>

              {/* QUICK REPLIES (Floating above input) */}
              {/* QUICK REPLIES (Floating above input) */}
              {quickReplies.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 overflow-x-auto no-scrollbar px-2 flex gap-2 z-10 bg-gradient-to-t from-[#EFE7DE] via-[#EFE7DE] to-transparent pt-6 pb-[75px] justify-center items-end">
                  {quickReplies.map((reply, i) => (
                    <button key={i} onClick={() => sendMessage(reply)} className="whitespace-nowrap bg-white text-[#008069] border border-[#008069]/30 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm active:bg-[#008069] active:text-white transition-all">
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* 3. INPUT AREA */}
              <div className="relative z-20 bg-[#F0F2F5] px-2 py-2 flex items-end gap-2 shrink-0 pb-safe-area min-h-[62px]">
                <button className="p-2 mb-1 text-gray-500 hover:bg-gray-200 rounded-full transition-colors order-1">
                  <Plus className="w-6 h-6" />
                </button>

                <div className="flex-1 bg-white rounded-2xl px-4 py-2 min-h-[44px] flex items-center shadow-sm order-2 border border-gray-100">
                  <input
                    className="w-full bg-transparent outline-none text-gray-900 text-[15px] placeholder:text-gray-400 max-h-32 overflow-y-auto"
                    placeholder="הודעה..."
                    dir="rtl"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                  />
                  <button className="ml-2 text-gray-400">
                    <Paperclip className="w-5 h-5 -rotate-45" />
                  </button>
                </div>

                <div className="order-3 mb-1">
                  {inputValue.trim() ? (
                    <button onClick={() => sendMessage(inputValue)} className="w-10 h-10 bg-[#008069] rounded-full flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
                      <Send className="w-5 h-5 ml-0.5" />
                    </button>
                  ) : (
                    <button className="w-10 h-10 bg-[#008069] rounded-full flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
                      <Mic className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl -z-10 rounded-full"></div>
        </div>

        <p className="mt-12 text-xs text-gray-400 max-w-md text-center">
          * זהו סימולטור לפיתוח בלבד. האפליקציה האמיתית תרוץ על גבי WhatsApp API.
        </p>
      </main>

      <footer className="w-full text-center p-6 text-gray-400 text-sm border-t border-gray-200/50">
        © 2026 Home Workers Marketplace. כל הזכויות שמורות.
      </footer>
    </div>
  );
}

// --- WORKER MESSAGE (WhatsApp Style Text) ---
function ContractorCard({ card, onAction }: { card: any, onAction: (t: string, d?: string) => void }) {
  // Support both types
  if (card.type !== 'worker' && card.type !== 'contractor') return null;

  return (
    <div className="flex flex-col items-start mb-4 mx-3 w-full max-w-[85%]" dir="rtl">
      {/* Message Bubble - WhatsApp Style */}
      <div className="bg-white rounded-lg rounded-tl-none shadow-sm p-3 text-sm text-gray-900 leading-relaxed whitespace-pre-wrap relative border border-gray-100/50">

        {/* Name */}
        <div className="font-bold text-[15px] mb-1">{card.title}</div>

        {/* Experience */}
        {card.experience && (
          <div className="italic mb-2 text-xs text-black">{card.experience}</div>
        )}

        {/* Strengths */}
        {card.strengths && card.strengths.length > 0 && (
          <div className="mb-2">
            {card.strengths.map((s: string, i: number) => (
              <div key={i}>✅ {s}</div>
            ))}
          </div>
        )}

        {/* Price & Availability */}
        {card.price && <div>💰 מחיר: {card.price}</div>}
        {card.availability && <div>📅 זמינות: {card.availability}</div>}

        {/* Verification */}
        {card.verification_text && (
          <div className="mt-2 text-black">
            🛡️ {card.verification_text.replace(/\n/g, ', ')}
          </div>
        )}

        {/* Local Proof */}
        {card.local_proof_text && (
          <div className="mt-1 font-medium text-black">
            👥 {card.local_proof_text}
          </div>
        )}

        {/* Ratings */}
        {(card.external_ratings || card.ratings_text) && (
          <div className="mt-1 font-medium text-black">
            ⭐ {Array.isArray(card.external_ratings) ? card.external_ratings.join(' | ') : card.ratings_text}
          </div>
        )}

        {/* Recommendation */}
        {card.recommendation_quote && (
          <div className="mt-2 italic border-l-2 border-gray-200 pl-2 text-xs text-black">
            "{card.recommendation_quote.replace(/"/g, '')}"
            {card.recommendation_author && <span className="block mt-0.5 not-italic text-[10px] text-black">- {card.recommendation_author}</span>}
          </div>
        )}

        {/* Timestamp */}
        <div className="flex justify-end gap-1 mt-1 opacity-60 text-[10px] select-none">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Action Buttons (List Style) */}
      <div className="flex flex-col gap-2 mt-2 w-full pr-1">
        {card.buttons ? (
          card.buttons.map((btn: any, i: number) => (
            <button
              key={i}
              onClick={() => onAction(btn.action, btn.label)}
              className="w-full bg-white text-[#008069] font-bold text-sm py-2.5 rounded-lg shadow-sm active:bg-gray-50 transition-colors text-center border-b border-gray-100"
            >
              {btn.label}
            </button>
          ))
        ) : (
          <button
            onClick={() => onAction(`לבחור את ${card.title.split('(')[0]}`, `בחרתי את ${card.title.split('(')[0]}`)}
            className="w-full bg-white text-[#008069] font-bold text-sm py-2.5 rounded-lg shadow-sm active:bg-gray-50 transition-colors text-center"
          >
            לבחור
          </button>
        )}

      </div>
    </div>
  );
}
