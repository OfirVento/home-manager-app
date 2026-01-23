"use client";

import {
  Calendar, Home, MessageCircle, Send, Plus, CheckCircle2, Clock,
  AlertCircle, Sparkles, Settings, ChevronRight, MapPin, Users,
  FileText, CreditCard, ChevronLeft, User, Phone, Star, ArrowLeft
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type Tab = "status" | "yoni" | "calendar";
type ViewState = "tabs" | "my_home" | "pro_profile" | "payment_details";

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>("status");
  const [viewState, setViewState] = useState<ViewState>("tabs");
  const [selectedData, setSelectedData] = useState<any>(null);

  const navigateTo = (view: ViewState, data?: any) => {
    setViewState(view);
    if (data) setSelectedData(data);
  };

  const goBack = () => {
    if (viewState === "pro_profile" || viewState === "payment_details") {
      setViewState("my_home");
    } else {
      setViewState("tabs");
    }
  };

  return (
    <main className="mobile-container font-sans text-[var(--md-sys-color-on-background)]" dir="rtl">

      {/* View Container */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {viewState === "tabs" && (
          <div className="flex-1 relative overflow-hidden flex flex-col" >
            {activeTab === "status" && <StatusView setActiveTab={setActiveTab} onOpenSettings={() => navigateTo("my_home")} />}
            {activeTab === "yoni" && <YoniView />}
            {activeTab === "calendar" && <CalendarView />}
          </div>
        )}

        {viewState === "my_home" && <MyHomeView onBack={goBack} onNavigate={navigateTo} />}
        {viewState === "pro_profile" && <ProProfileView pro={selectedData} onBack={goBack} />}
        {viewState === "payment_details" && <PaymentDetailsView payment={selectedData} onBack={goBack} />}
      </div>

      {/* Bottom Navigation (M3 Style) */}
      {viewState === "tabs" && (
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </main>
  );
}

// --- Views ---

function StatusView({ setActiveTab, onOpenSettings }: { setActiveTab: (tab: Tab) => void, onOpenSettings: () => void }) {
  return (
    <div className="absolute inset-0 overflow-y-auto bg-[var(--md-sys-color-surface)]">
      {/* M3 Large Top App Bar */}
      <div className="pt-8 pb-4 px-4 flex justify-between items-start">
        <h1 className="text-[32px] leading-[40px] font-normal text-[var(--md-sys-color-on-surface)]">
          סטטוס<br />הבית שלך
        </h1>
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 pl-3 pr-2 py-2 bg-[var(--md-sys-color-surface-variant)] rounded-full text-[var(--md-sys-color-on-surface-variant)] hover:opacity-80 transition-opacity"
        >
          <span className="text-sm font-medium">הגדרות</span>
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 space-y-4 pb-24">
        {/* "Today at Home" Card - Elevated */}
        <div className="card-elevated p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center text-[var(--md-sys-color-on-primary-container)]">
              <Home className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-medium">היום בבית</h2>
          </div>

          <div className="space-y-1">
            <StatusRow
              icon={<Sparkles className="w-5 h-5 text-purple-600" />}
              title="ניקיון קבוע – מריה"
              time="09:00–12:00"
              status="מתוכנן"
              bgColor="bg-purple-50"
            />
            <StatusRow
              icon={<Clock className="w-5 h-5 text-blue-600" />}
              title="עוזרת אחה״צ – נועה"
              time="14:00–18:00"
              status="בדרך"
              bgColor="bg-blue-50"
            />
            <StatusRow
              icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
              title="אין תקלות פתוחות"
              time="הכל תקין"
              status="תקין"
              bgColor="bg-green-50"
              isLast
            />
          </div>
        </div>

        {/* Priority Alert Card (Tonal) */}
        <div className="card-filled p-4 bg-[var(--md-sys-color-error-container)] text-[var(--md-sys-color-on-error-container)]">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">תשלום קרוב – ניקיון</h3>
              <p className="text-sm opacity-90">יום חמישי – ₪250 (ממתין לאישור)</p>
            </div>
          </div>
        </div>

        {/* FAB-like action within content */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setActiveTab("yoni")}
            className="flex items-center gap-2 bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] px-6 py-4 rounded-[16px] shadow-sm hover:shadow-md transition-all active:scale-95 w-full justify-center"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium text-base">צריך עזרה בבית?</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ icon, title, time, status, bgColor, isLast }: any) {
  return (
    <div className={clsx("flex items-center gap-4 py-3", !isLast && "border-b border-[var(--md-sys-color-outline-variant)] border-opacity-20")}>
      <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0", bgColor)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[var(--md-sys-color-on-surface)] truncate">{title}</div>
        <div className="text-sm text-[var(--md-sys-color-outline)]">{time}</div>
      </div>
      <div className="text-xs font-medium px-2 py-1 rounded-md bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface-variant)]">
        {status}
      </div>
    </div>
  );
}

function MyHomeView({ onBack, onNavigate }: { onBack: () => void, onNavigate: (v: ViewState, d?: any) => void }) {
  const settingsSections = [
    { title: "פרטי הבית", icon: MapPin, items: [{ l: "כתובת", v: "הרימון 12, אבן יהודה" }, { l: "עיר", v: "אבן יהודה" }] },
    { title: "המשפחה", icon: Users, items: [{ l: "הורים", v: "נועה ואיתי" }, { l: "ילדים", v: "אורי (6), מיה (10)" }] },
    { title: "העדפות", icon: Sparkles, items: [{ l: "ימים", v: "חמישי בוקר" }] }
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--md-sys-color-surface)]">
      {/* M3 Small Top App Bar */}
      <div className="h-[64px] flex items-center px-2 gap-2 sticky top-0 bg-[var(--md-sys-color-surface)] z-10">
        <button onClick={onBack} className="w-[48px] h-[48px] flex items-center justify-center rounded-full hover:bg-[var(--md-sys-color-surface-variant)] transition-colors">
          <ArrowLeft className="w-6 h-6 text-[var(--md-sys-color-on-surface)]" />
        </button>
        <span className="text-[22px] leading-[28px] text-[var(--md-sys-color-on-surface)]">הבית שלי</span>
      </div>

      <div className="px-4 pb-8 space-y-4 overflow-y-auto">
        {/* Using M3 List Styles */}

        {settingsSections.map((sec, i) => (
          <div key={i} className="card-outlined overflow-hidden">
            <div className="p-4 bg-[var(--md-sys-color-surface-variant)] bg-opacity-30 border-b border-[var(--md-sys-color-outline-variant)] border-opacity-20 flex items-center gap-3">
              <sec.icon className="w-5 h-5 text-[var(--md-sys-color-primary)]" />
              <h3 className="font-medium text-[var(--md-sys-color-on-surface-variant)]">{sec.title}</h3>
            </div>
            <div className="p-4 space-y-3">
              {sec.items.map((it, j) => (
                <div key={j} className="flex justify-between items-center text-sm">
                  <span className="text-[var(--md-sys-color-outline)]">{it.l}</span>
                  <span className="font-medium text-[var(--md-sys-color-on-surface)]">{it.v}</span>
                </div>
              ))}
              <button className="text-[var(--md-sys-color-primary)] text-sm font-medium mt-2">
                עריכה
              </button>
            </div>
          </div>
        ))}

        {/* Pros Section */}
        <div className="card-outlined overflow-hidden">
          <div className="p-4 bg-[var(--md-sys-color-surface-variant)] bg-opacity-30 border-b border-[var(--md-sys-color-outline-variant)] border-opacity-20 flex items-center gap-3">
            <User className="w-5 h-5 text-[var(--md-sys-color-primary)]" />
            <h3 className="font-medium text-[var(--md-sys-color-on-surface-variant)]">אנשי מקצוע</h3>
          </div>
          <div className="divide-y divide-[var(--md-sys-color-outline-variant)] divide-opacity-20">
            {[
              { name: "דניאל מ.", role: "אינסטלטור", rating: 4.9, img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "אורן ש.", role: "מזגן", rating: 4.8, img: "https://randomuser.me/api/portraits/men/45.jpg" }
            ].map((pro, k) => (
              <div key={k} className="p-3 flex items-center gap-3 active:bg-[var(--md-sys-color-surface-variant)] transition-colors" onClick={() => onNavigate("pro_profile", pro)}>
                <img src={pro.img} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                <div className="flex-1">
                  <div className="font-medium text-[var(--md-sys-color-on-surface)]">{pro.name}</div>
                  <div className="text-xs text-[var(--md-sys-color-outline)]">{pro.role}</div>
                </div>
                <div className="w-[32px] h-[32px] rounded-full border border-[var(--md-sys-color-outline)] flex items-center justify-center">
                  <ChevronLeft className="w-5 h-5 text-[var(--md-sys-color-outline)]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="card-filled p-4 bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              תשלומים
            </h3>
            <span className="text-2xl font-bold">₪1,450</span>
          </div>
          <div className="text-sm opacity-80 mb-4">סיכום חודשי</div>
          <button className="w-full py-2 bg-[var(--md-sys-color-on-secondary-container)] text-[var(--md-sys-color-secondary-container)] rounded-full text-sm font-medium">
            לפירוט המלא
          </button>
        </div>

      </div>
    </div>
  );
}

function ProProfileView({ pro, onBack }: { pro: any, onBack: () => void }) {
  if (!pro) return null;
  return (
    <div className="flex flex-col h-full bg-[var(--md-sys-color-surface)]">
      <div className="h-[64px] flex items-center px-2 gap-2 sticky top-0 z-10">
        <button onClick={onBack} className="w-[48px] h-[48px] flex items-center justify-center rounded-full hover:bg-[var(--md-sys-color-surface-variant)]">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center p-6">
        <img src={pro.img} className="w-28 h-28 rounded-full shadow-md mb-4" />
        <h1 className="text-[28px] leading-[36px] text-[var(--md-sys-color-on-surface)]">{pro.name}</h1>
        <p className="text-[var(--md-sys-color-on-surface-variant)] text-lg">{pro.role}</p>

        <div className="mt-6 flex gap-4 w-full max-w-xs">
          <button className="flex-1 card-filled p-3 flex flex-col items-center gap-1">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span className="font-bold text-lg">{pro.rating}</span>
            <span className="text-xs text-[var(--md-sys-color-outline)]">דירוג</span>
          </button>
          <button className="flex-1 card-filled p-3 flex flex-col items-center gap-1">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <span className="font-bold text-lg">מאומת</span>
            <span className="text-xs text-[var(--md-sys-color-outline)]">סטטוס</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[var(--md-sys-color-surface-variant)] bg-opacity-30 rounded-t-[32px] p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-3">זמינות קרובה</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {["היום 16:00", "מחר 09:00", "חמישי 12:00"].map((t, i) => (
              <button key={i} className="whitespace-nowrap px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-[8px] text-sm text-[var(--md-sys-color-on-surface)]">
                {t}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] py-4 rounded-full text-lg font-medium shadow-md">
          הזמנה חוזרת
        </button>
      </div>
    </div>
  );
}

function PaymentDetailsView({ payment, onBack }: { payment: any, onBack: () => void }) {
  if (!payment) return null;
  return (
    <div className="flex flex-col h-full bg-[var(--md-sys-color-surface)]">
      <div className="h-[64px] flex items-center px-2 gap-2">
        <button onClick={onBack} className="w-[48px] h-[48px] flex items-center justify-center rounded-full hover:bg-[var(--md-sys-color-surface-variant)]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-[22px]">פרטי תשלום</span>
      </div>
      {/* Simplify for demo */}
      <div className="p-6">
        <div className="text-center py-8">
          <h1 className="text-[45px] leading-[52px] text-[var(--md-sys-color-primary)] font-medium">₪{payment.amount}</h1>
          <p className="text-[var(--md-sys-color-on-surface-variant)] mt-2">{payment.type} • {payment.to}</p>
        </div>
      </div>
    </div>
  );
}

function YoniView() {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      role: "assistant",
      text: "היי 👋 אני יוני, מנהל הבית שלך. אעזור לך למצוא עובדי בית מאומתים ולנהל את כל התהליך..."
    }
  ]);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [activeCards, setActiveCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Status Logic
  const [agentStatus, setAgentStatus] = useState<'idle' | 'thinking' | 'checking' | 'typing'>('idle');

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeCards, isLoading, quickReplies, agentStatus]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setQuickReplies([]);
    setActiveCards([]);

    // Simulation Cycle
    setAgentStatus('thinking');
    setTimeout(() => setAgentStatus('checking'), 800);
    setTimeout(() => setAgentStatus('typing'), 1800);

    try {
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, homeId: 1, history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })) })
      });
      const data = await res.json();

      // Delay slightly to finish animation cycle if response is too fast
      await new Promise(r => setTimeout(r, 2000));

      setAgentStatus('idle');

      if (data.assistant_message) setMessages(prev => [...prev, { id: Date.now() + 1, role: "assistant", text: data.assistant_message }]);
      if (data.quick_replies) setQuickReplies(data.quick_replies);
      if (data.cards && data.cards.length > 0) setActiveCards(data.cards);
    } catch (err) {
      setAgentStatus('idle');
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "assistant", text: "שגיאה בתקשורת" }]);
    }
  }

  // Initial Recommendations (Restored)
  const initialRecs = {
    title: 'המלצות שלי ליום שני, 14 בינואר',
    items: [
      { icon: "🪟", text: "בניקיון הבא: להוסיף חלונות בכל הבית", action: "תוסיף חלונות לניקיון הבא" },
      { icon: "💰", text: "תזכורת: צריך לשלם לנועה על פעמיים", action: "אני רוצה לשלם לנועה" },
      { icon: "❄️", text: "המלצת עונה: לנקות פילטרים במזגנים", action: "איך מנקים פילטרים?" },
    ]
  };

  // Primary Actions (Restored)
  const primaryActions = [
    { label: "מצא בעל מקצוע", action: "אני צריך בעל מקצוע" },
    { label: "המלצות לעונה", action: "תן המלצות עונתיות לבית שלי" },
    { label: "תשלומים וקבלות", action: "תראה לי תשלומים וקבלות" },
  ];

  const getStatusText = () => {
    switch (agentStatus) {
      case 'thinking': return 'יוני חושב...';
      case 'checking': return 'בודק נתונים...';
      case 'typing': return 'מקליד...';
      default: return 'מחובר כעת';
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-[var(--md-sys-color-surface)]">
      {/* Top Bar (Chat style) */}
      <div className="bg-[var(--md-sys-color-surface)] border-b border-[var(--md-sys-color-outline-variant)] border-opacity-20 p-4 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center text-[var(--md-sys-color-on-primary-container)] font-bold">
            Y
          </div>
          <div>
            <h1 className="font-medium text-[var(--md-sys-color-on-surface)]">יוני - מנהל בית</h1>
            <span className={clsx("text-xs transition-colors duration-300", agentStatus !== 'idle' ? "text-[var(--md-sys-color-primary)] font-medium" : "text-[var(--md-sys-color-outline)]")}>
              {getStatusText()}
            </span>
          </div>
        </div>
        <button className="p-2"><Settings className="w-6 h-6 text-[var(--md-sys-color-on-surface-variant)]" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[var(--md-sys-color-surface)]/50" ref={scrollRef}>

        {messages.map((msg) => (
          <div key={msg.id} className={clsx("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={clsx(
              "max-w-[80%] p-4 text-[15px] leading-6 shadow-sm",
              msg.role === 'user'
                ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-[20px] rounded-tl-none"
                : "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] rounded-[20px] rounded-tr-none"
            )}>
              {msg.text}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="card-outlined p-0 overflow-hidden">
            <div className="p-4 bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] font-medium text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {initialRecs.title}
            </div>
            <div className="divide-y divide-[var(--md-sys-color-outline-variant)] divide-opacity-20">
              {initialRecs.items.map((item, idx) => (
                <button key={idx} onClick={() => sendMessage(item.action)} className="w-full text-right p-4 hover:bg-[var(--md-sys-color-surface-variant)] transition-colors flex items-center gap-3">
                  <div>{item.icon}</div>
                  <span className="text-sm text-[var(--md-sys-color-on-surface)]">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {agentStatus !== 'idle' && (
          <div className="flex justify-start">
            <div className="bg-[var(--md-sys-color-secondary-container)] p-4 rounded-[20px] rounded-tr-none shadow-sm flex gap-2">
              <div className="w-2 h-2 bg-[var(--md-sys-color-on-secondary-container)] rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-[var(--md-sys-color-on-secondary-container)] rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-[var(--md-sys-color-on-secondary-container)] rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}

        {/* Dynamic Cards (Contractors) */}
        {activeCards.length > 0 && activeCards.map((card, idx) => (
          <ContractorCard key={idx} card={card} onAction={sendMessage} />
        ))}

        <div className="pb-4" />
      </div>

      {/* Chat Footer */}
      <div className="z-10 bg-[var(--md-sys-color-surface)] pb-safe-area">
        {quickReplies.length > 0 && (
          <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar">
            {quickReplies.map((reply, i) => (
              <button key={i} onClick={() => sendMessage(reply)} className="whitespace-nowrap h-[32px] px-4 rounded-[8px] border border-[var(--md-sys-color-outline)] text-sm font-medium text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] transition-colors">
                {reply}
              </button>
            ))}
          </div>
        )}

        {quickReplies.length === 0 && (
          <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar border-t border-[var(--md-sys-color-outline-variant)] border-opacity-20">
            {primaryActions.map((action, i) => (
              <button key={i} onClick={() => sendMessage(action.action)} className="whitespace-nowrap h-[32px] px-4 bg-[var(--md-sys-color-primary-container)] rounded-[8px] text-sm font-medium text-[var(--md-sys-color-on-primary-container)]">
                {action.label}
              </button>
            ))}
          </div>
        )}

        <div className="p-2 flex items-center gap-2 bg-[var(--md-sys-color-surface-variant)] m-2 rounded-[28px] pl-4">
          <button className="p-2 text-[var(--md-sys-color-on-surface-variant)]"><Plus className="w-6 h-6" /></button>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
            className="flex-1 bg-transparent outline-none text-[var(--md-sys-color-on-surface)] text-base placeholder-[var(--md-sys-color-outline)] text-right"
            placeholder="הודעה ליוני..."
            dir="rtl"
          />
          <button onClick={() => sendMessage(inputValue)} className="w-10 h-10 bg-[var(--md-sys-color-primary)] rounded-full flex items-center justify-center text-white">
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ContractorCard({ card, onAction }: { card: any, onAction: (t: string) => void }) {
  if (card.type !== 'contractor') return null;

  return (
    <div className="card-elevated overflow-hidden mb-4">
      <div className="p-4 flex gap-4" dir="rtl">
        <img src={card.image_url} className="w-14 h-14 rounded-full object-cover bg-gray-200" />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-[var(--md-sys-color-on-surface)] text-lg">{card.title}</h3>
            <span className="text-xs bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] px-2 py-0.5 rounded-[4px] font-bold">
              4.9 ★
            </span>
          </div>
          <p className="text-[var(--md-sys-color-on-surface-variant)] text-sm">{card.subtitle}</p>
        </div>
      </div>

      <div className="px-4 py-2 bg-[var(--md-sys-color-surface-variant)] bg-opacity-30 flex gap-4 text-xs text-[var(--md-sys-color-on-surface-variant)]">
        <span>📍 {card.details?.find((d: any) => d.label === 'area')?.value || 'השרון'}</span>
        <span>📅 פנוי היום</span>
      </div>

      <div className="p-4 flex gap-2 justify-end">
        <button onClick={() => onAction('עוד אופציות')} className="px-4 py-2 text-[var(--md-sys-color-primary)] text-sm font-medium">
          עוד אופציות
        </button>
        <button onClick={() => onAction(`לבחור את ${card.title}`)} className="px-5 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full text-sm font-medium">
          לבחור
        </button>
      </div>
    </div>
  );
}

function CalendarView() {
  const events = [
    { title: "ניקיון (מריה)", time: "09:00 - 12:00", color: "bg-purple-200" },
    { title: "עוזרת אחה״צ", time: "14:00 - 18:00", color: "bg-blue-200" },
  ];

  return (
    <div className="absolute inset-0 overflow-y-auto bg-[var(--md-sys-color-surface)]">
      <div className="pt-8 px-4 pb-4">
        <h1 className="text-[32px] font-normal text-[var(--md-sys-color-on-surface)]">ינואר 2026</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Minimal Day View */}
        <div className="flex gap-4">
          <div className="w-[50px] flex flex-col items-center pt-2">
            <span className="text-xs font-medium text-[var(--md-sys-color-on-surface-variant)]">ה׳</span>
            <span className="text-xl w-[40px] h-[40px] rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] flex items-center justify-center mt-1">22</span>
          </div>

          <div className="flex-1 space-y-2 pt-2">
            {events.map((ev, i) => (
              <div key={i} className={`p-3 rounded-[12px] ${ev.color} text-[var(--md-sys-color-on-surface)] mb-2`}>
                <div className="font-medium text-sm">{ev.title}</div>
                <div className="text-xs opacity-80">{ev.time}</div>
              </div>
            ))}

            {/* Empty slot */}
            <div className="p-3 border border-dashed border-[var(--md-sys-color-outline)] rounded-[12px] flex justify-center text-[var(--md-sys-color-outline)] text-sm">
              אין אירועים נוספים
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Components ---

function BottomNavigation({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (t: Tab) => void }) {
  const tabs = [
    { id: "status", label: "סטטוס", icon: Home },
    { id: "yoni", label: "מנהל הבית", icon: MessageCircle },
    { id: "calendar", label: "יומן", icon: Calendar },
  ] as const;

  return (
    <nav className="bg-[var(--md-sys-color-surface)] border-t border-[var(--md-sys-color-outline-variant)] border-opacity-20 pb-safe z-30 h-[80px] flex items-center">
      <div className="flex w-full justify-around px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 w-full"
            >
              <div className={clsx(
                "w-[64px] h-[32px] rounded-[16px] flex items-center justify-center transition-colors",
                isActive ? "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]" : "text-[var(--md-sys-color-on-surface-variant)]"
              )}>
                <tab.icon className={clsx("w-6 h-6", isActive && "fill-current")} />
              </div>
              <span className={clsx("text-xs font-medium", isActive ? "text-[var(--md-sys-color-on-surface)]" : "text-[var(--md-sys-color-on-surface-variant)]")}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
