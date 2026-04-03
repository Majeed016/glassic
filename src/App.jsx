import { useState, useEffect, useRef, useCallback } from "react";

const ELEVENLABS_VOICES = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel", gender: "Female", style: "Calm" },
  { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi", gender: "Female", style: "Strong" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella", gender: "Female", style: "Soft" },
  { id: "ErXwobaYiN019PkySvjV", name: "Antoni", gender: "Male", style: "Well-rounded" },
  { id: "MF3mGyEYCl7XYWbV9V6O", name: "Elli", gender: "Female", style: "Emotional" },
  { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh", gender: "Male", style: "Deep" },
  { id: "VR6AewLTigWG4xSOukaG", name: "Arnold", gender: "Male", style: "Crisp" },
  { id: "pNInz6obpgDQGcFmaJgB", name: "Brian", gender: "Male", style: "Authoritative" },
];

const AGENT_ROLES = ["Customer Support", "Sales Agent", "Tutor", "HR Assistant", "Cold Caller", "Appointment Booking"];
const PERSONALITIES = ["Empathetic", "Confident", "Energetic", "Calm", "Persuasive", "Friendly"];
const TONES = ["Professional", "Casual", "Formal", "Conversational", "Enthusiastic"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Hindi", "Arabic", "Japanese", "Portuguese"];

const USE_CASES = [
  { icon: "👥", title: "Customer Support", desc: "24/7 support handling inquiries, troubleshooting, and ticket creation", tag1: "45% Cost Reduction", tag2: "24/7 Availability", color: "#6366f1" },
  { icon: "📅", title: "Healthcare", desc: "Automated booking and management of appointments across time zones", tag1: "70% Time Saved", tag2: "3x Booking Rate", color: "#10b981" },
  { icon: "🎯", title: "Lead Qualification", desc: "Engage and qualify leads instantly, any time of day", tag1: "2x Conversion Rate", tag2: "50% Faster Response", color: "#f59e0b" },
  { icon: "📦", title: "Order Management", desc: "Handle order status, tracking, and basic modifications", tag1: "60% Less Queries", tag2: "98% Accuracy", color: "#3b82f6" },
  { icon: "🔧", title: "Home Services", desc: "Schedule and manage service appointments efficiently", tag1: "40% More Bookings", tag2: "Zero Wait Time", color: "#8b5cf6" },
  { icon: "📊", title: "Survey & Feedback", desc: "Collect and analyze customer feedback automatically", tag1: "4x Response Rate", tag2: "Real-time Analysis", color: "#ec4899" },
];

const TESTIMONIALS = [
  { name: "Sarah Johnson", role: "Customer Support Manager, TechCorp", text: "Since implementing this AI agent solution, our response time has decreased by 70% and we've been able to reallocate our human agents to more complex issues.", avatar: "SJ" },
  { name: "Michael Chen", role: "Operations Director, E-Commerce Giant", text: "The AI agents handle over 80% of our routine customer inquiries, allowing our team to focus on high-value interactions that truly require human empathy.", avatar: "MC" },
  { name: "Emma Rodriguez", role: "CEO, Startup Inc", text: "Our customer satisfaction scores have actually improved since implementing the AI agents, as customers get faster resolutions to their common issues.", avatar: "ER" },
];

const DEMO_MESSAGES = [
  { role: "user", text: "Hello Yeah, who is this?" },
  { role: "agent", text: "Hi, I'm Sam from Emporium. How are you doing today?" },
  { role: "user", text: "I'm doing great Yeah What about you? You have called me." },
  { role: "agent", text: "I'm doing great. Thanks for asking. I'm here to check in with you about your recent purchase from Emporium. By the way, may I know your name?" },
];

function NavBar({ page, setPage, theme, setTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { label: "Demo", href: "#demo" }, { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" }, { label: "Pricing", href: "#pricing" },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: theme === "dark" ? "rgba(10,10,18,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 16 }}>◈</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: theme === "dark" ? "#fff" : "#0a0a12", letterSpacing: "-0.5px" }}>Glassic</span>
        </button>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-links">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = theme === "dark" ? "#fff" : "#000"}
              onMouseLeave={e => e.target.style.color = theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
            >{l.label}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{ background: "none", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: theme === "dark" ? "#fff" : "#000", fontSize: 14 }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setPage("login")} style={{ background: "none", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`, borderRadius: 8, padding: "8px 20px", cursor: "pointer", color: theme === "dark" ? "#fff" : "#000", fontSize: 14, fontWeight: 500 }}>Sign In</button>
          <button onClick={() => setPage("upload")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 600 }}>Set Up Your Agent</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ setPage, theme }) {
  const [typed, setTyped] = useState("");
  const full = "Transform customer support with AI Voice Agents";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { if (i < full.length) { setTyped(full.slice(0, ++i)); } else clearInterval(t); }, 40);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: theme === "dark" ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 60%)" : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: theme === "dark" ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 100, padding: "6px 16px", fontSize: 13, color: "#6366f1", fontWeight: 600, marginBottom: 32 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse 2s infinite" }} /> AI Voice Platform by VoxEra
      </div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,6vw,72px)", fontWeight: 800, lineHeight: 1.1, maxWidth: 820, margin: "0 auto 24px", color: theme === "dark" ? "#fff" : "#0a0a12", letterSpacing: "-2px" }}>
        Elevate Customer Interactions With<br />
        <span style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Conversational AI Voice Solutions</span>
      </h1>
      <p style={{ fontSize: 18, color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
        Build, deploy, and scale AI voice agents that handle customer interactions with human-like understanding. Available 24/7, in multiple languages.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => setPage("upload")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 12, padding: "14px 32px", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.35)" }}>Start Free Trial</button>
        <button onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "none", border: `1.5px solid ${theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`, borderRadius: 12, padding: "14px 32px", color: theme === "dark" ? "#fff" : "#000", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Watch Demo</button>
      </div>
      <div style={{ marginTop: 64, display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
        {[["500+", "Companies"], ["99.9%", "Uptime"], ["<1s", "Response"], ["20+", "Languages"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12" }}>{n}</div>
            <div style={{ fontSize: 13, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", fontWeight: 500 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DemoSection({ theme }) {
  const [active, setActive] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [shown, setShown] = useState([]);
  useEffect(() => {
    if (!playing) return;
    if (msgIdx >= DEMO_MESSAGES.length) { setPlaying(false); return; }
    const t = setTimeout(() => { setShown(s => [...s, DEMO_MESSAGES[msgIdx]]); setMsgIdx(i => i + 1); }, msgIdx === 0 ? 300 : 1600);
    return () => clearTimeout(t);
  }, [playing, msgIdx]);
  const startDemo = () => { setShown([]); setMsgIdx(0); setPlaying(true); setActive("cold"); };
  return (
    <section id="demo" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#6366f1", textTransform: "uppercase" }}>Demo</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "12px 0 16px", letterSpacing: "-1px" }}>See AI in Action</h2>
        <p style={{ color: theme === "dark" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", fontSize: 16 }}>Experience realistic voice agent interactions</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 32, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[{ id: "cold", icon: "🎯", label: "Cold Call", desc: "Outbound sales agent" }, { id: "support", icon: "💬", label: "Support", desc: "Customer help flow" }, { id: "booking", icon: "📅", label: "Booking", desc: "Appointment scheduler" }].map(s => (
            <button key={s.id} onClick={() => { setActive(s.id); startDemo(); }} style={{ background: active === s.id ? (theme === "dark" ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.08)") : (theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"), border: `1.5px solid ${active === s.id ? "#6366f1" : (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)")}`, borderRadius: 12, padding: "16px 20px", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: theme === "dark" ? "#fff" : "#0a0a12", fontSize: 15, margin: "4px 0 2px" }}>{s.label}</div>
              <div style={{ fontSize: 13, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}>{s.desc}</div>
            </button>
          ))}
        </div>
        <div style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16, padding: 24, minHeight: 320 }}>
          {shown.length === 0 && !playing ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 280, gap: 16 }}>
              <div style={{ fontSize: 40 }}>🎙️</div>
              <p style={{ color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)", fontSize: 15, textAlign: "center" }}>Select a scenario and click to watch a live demo</p>
              <button onClick={startDemo} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>▶ Play Demo</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#10b981" }}>LIVE</span>
                <span style={{ fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginLeft: "auto" }}>Cold Call · Sam @ Emporium</span>
              </div>
              {shown.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 10, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "agent" && <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", flexShrink: 0 }}>🤖</div>}
                  <div style={{ maxWidth: "75%", background: m.role === "agent" ? (theme === "dark" ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)") : (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"), borderRadius: m.role === "agent" ? "4px 12px 12px 12px" : "12px 4px 12px 12px", padding: "10px 14px", fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)", lineHeight: 1.5 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: m.role === "agent" ? "#6366f1" : (theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"), marginBottom: 4 }}>{m.role === "agent" ? "🤖 AI Agent" : "👤 Customer"}</div>
                    {m.text}
                  </div>
                  {m.role === "user" && <div style={{ width: 28, height: 28, borderRadius: "50%", background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>👤</div>}
                </div>
              ))}
              {playing && <div style={{ display: "flex", gap: 4, padding: "8px 14px", width: "fit-content" }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
              </div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ theme }) {
  const features = [
    { icon: "📞", title: "Telephony via SIP Trunking", desc: "Enterprise-grade voice infrastructure with seamless integration" },
    { icon: "🛠", title: "Custom Actions", desc: "Build and extend capabilities with custom API integrations" },
    { icon: "🧩", title: "Custom Workflows", desc: "Automate phone calls with booking, call transfers, and handoffs" },
    { icon: "🔄", title: "No-Code Flow Designer", desc: "Design complex workflows without writing a single line of code" },
    { icon: "🤖", title: "AI Agent Templates", desc: "Start quickly with pre-built, industry-specific templates" },
    { icon: "🌐", title: "Multilingual Agents", desc: "Support 20+ languages and dialects out of the box" },
    { icon: "🧠", title: "Memory System", desc: "Maintain context across sessions for personalized interactions" },
    { icon: "⚡", title: "Low Latency (<1s)", desc: "Near-instant responses for natural conversation flow" },
  ];
  return (
    <section id="features" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#6366f1", textTransform: "uppercase" }}>Features</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "12px 0 16px", letterSpacing: "-1px" }}>Powerful Voice Agent Creation</h2>
        <p style={{ color: theme === "dark" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", fontSize: 16 }}>Everything you need to build and deploy intelligent voice agents</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16, padding: 24, transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: theme === "dark" ? "#fff" : "#0a0a12", marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ theme }) {
  const steps = [
    { n: "1", title: "Integration", desc: "Connect our AI agents to your existing systems and communication channels in minutes." },
    { n: "2", title: "Training", desc: "Customize your AI agents with your brand voice, knowledge base, and specific workflows." },
    { n: "3", title: "Optimization", desc: "Monitor performance and let our ML algorithms continuously improve your customer experience." },
  ];
  return (
    <section id="how-it-works" style={{ padding: "80px 24px", background: theme === "dark" ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.03)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#6366f1", textTransform: "uppercase" }}>Process</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "12px 0 48px", letterSpacing: "-1px" }}>How It Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 32 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>{s.n}</div>
              <h3 style={{ fontWeight: 700, fontSize: 18, color: theme === "dark" ? "#fff" : "#0a0a12", marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16, padding: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)", marginBottom: 24, textTransform: "uppercase", letterSpacing: 1, fontSize: 12 }}>AI Agent Workflow</div>
          <div style={{ display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap" }}>
            {["Customer Inquiry", "AI Analysis", "Response Generation", "Continuous Learning"].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ background: i % 2 === 0 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"), border: i % 2 !== 0 ? `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}` : "none", borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: i % 2 === 0 ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)") }}>{step}</div>
                {i < 3 && <span style={{ margin: "0 8px", color: "#6366f1", fontSize: 18 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ theme }) {
  const [activeFilter, setActiveFilter] = useState("All Industries");
  const filters = ["All Industries", "Healthcare", "Sales", "E-commerce", "Home Services", "Research"];
  return (
    <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#6366f1", textTransform: "uppercase" }}>Applications</span>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "12px 0 32px", letterSpacing: "-1px" }}>Use Cases</h2>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "none", border: `1px solid ${activeFilter === f ? "transparent" : (theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)")}`, borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 600, color: activeFilter === f ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)"), cursor: "pointer" }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
        {USE_CASES.map((u, i) => (
          <div key={i} style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16, padding: 24, transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${u.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{u.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: theme === "dark" ? "#fff" : "#0a0a12", marginBottom: 8 }}>{u.title}</h3>
            <p style={{ fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", lineHeight: 1.6, marginBottom: 16 }}>{u.desc}</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[u.tag1, u.tag2].map(t => <span key={t} style={{ background: `${u.color}18`, borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: u.color }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({ theme }) {
  return (
    <section style={{ padding: "80px 24px", background: theme === "dark" ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.03)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "0 0 48px", letterSpacing: "-1px" }}>What Our Customers Say</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ background: theme === "dark" ? "rgba(255,255,255,0.05)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16, padding: 28, textAlign: "left" }}>
              <div style={{ fontSize: 24, color: "#6366f1", marginBottom: 16 }}>"</div>
              <p style={{ fontSize: 15, color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)", lineHeight: 1.7, marginBottom: 24 }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ setPage, theme }) {
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: "Starter", price: annual ? 169 : 199, desc: "Everything you need to get started", features: ["Up to 5,000 monthly interactions", "Basic analytics dashboard", "Email & chat support", "Basic customization", "Single language support"], popular: false },
    { name: "Growth", price: annual ? 419 : 499, desc: "For growing businesses", features: ["Up to 20,000 monthly interactions", "Advanced analytics & reporting", "Priority support", "Custom workflows", "Multi-language support", "API access", "CRM integrations"], popular: true },
    { name: "Enterprise", price: null, desc: "Custom enterprise solutions", features: ["Unlimited interactions", "Custom AI training", "Dedicated account manager", "Advanced security & compliance", "Custom integrations", "On-premise deployment", "24/7 premium support"], popular: false },
  ];
  return (
    <section id="pricing" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "0 0 24px", letterSpacing: "-1px" }}>Flexible Pricing Plans</h2>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", borderRadius: 100, padding: "6px 8px" }}>
          <button onClick={() => setAnnual(false)} style={{ background: !annual ? (theme === "dark" ? "rgba(255,255,255,0.12)" : "#fff") : "none", border: "none", borderRadius: 100, padding: "6px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: theme === "dark" ? "#fff" : "#0a0a12" }}>Monthly</button>
          <button onClick={() => setAnnual(true)} style={{ background: annual ? (theme === "dark" ? "rgba(255,255,255,0.12)" : "#fff") : "none", border: "none", borderRadius: 100, padding: "6px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: theme === "dark" ? "#fff" : "#0a0a12", display: "flex", alignItems: "center", gap: 8 }}>Annual <span style={{ background: "#6366f1", color: "#fff", fontSize: 10, borderRadius: 4, padding: "2px 6px" }}>-15%</span></button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
        {plans.map((p, i) => (
          <div key={i} style={{ background: p.popular ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : (theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff"), border: `${p.popular ? "0" : "1"}px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 20, padding: 32, position: "relative" }}>
            {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#fff", color: "#6366f1", fontSize: 11, fontWeight: 800, borderRadius: 100, padding: "4px 16px", whiteSpace: "nowrap" }}>MOST POPULAR</div>}
            <div style={{ fontWeight: 800, fontSize: 22, color: p.popular ? "#fff" : (theme === "dark" ? "#fff" : "#0a0a12"), marginBottom: 8 }}>{p.name}</div>
            <div style={{ marginBottom: 24 }}>
              {p.price ? (
                <><span style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 800, color: p.popular ? "#fff" : (theme === "dark" ? "#fff" : "#0a0a12") }}>${p.price}</span><span style={{ fontSize: 15, color: p.popular ? "rgba(255,255,255,0.7)" : (theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)") }}>/month</span></>
              ) : (
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 800, color: p.popular ? "#fff" : (theme === "dark" ? "#fff" : "#0a0a12") }}>Custom</span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {p.features.map((f, j) => (
                <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: p.popular ? "rgba(255,255,255,0.9)" : "#6366f1", fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 14, color: p.popular ? "rgba(255,255,255,0.85)" : (theme === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)"), lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setPage("upload")} style={{ width: "100%", background: p.popular ? "#fff" : "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", color: p.popular ? "#6366f1" : "#fff" }}>Start Free Trial</button>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>All plans include a 14-day free trial. No credit card required.</p>
    </section>
  );
}

function CTASection({ setPage, theme }) {
  return (
    <section style={{ padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 24, padding: "60px 40px" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-1px" }}>Ready to Transform Your Customer Support?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 32 }}>Join hundreds of companies already using VoxEra AI voice agents</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={() => setPage("upload")} style={{ background: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", color: "#6366f1" }}>Start Free Trial</button>
          <button style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", color: "#fff" }}>Watch Demo</button>
        </div>
      </div>
    </section>
  );
}

function Footer({ theme }) {
  return (
    <footer style={{ borderTop: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 14 }}>◈</span></div>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: theme === "dark" ? "#fff" : "#0a0a12" }}>Glassic</span>
            </div>
            <p style={{ fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)", lineHeight: 1.7, maxWidth: 280 }}>Build, deploy, and scale AI voice agents that handle customer interactions with human-like understanding.</p>
          </div>
          {[{ title: "Product", links: ["Features", "Pricing", "Integrations", "Security"] }, { title: "Company", links: ["About Us", "Careers", "News", "Contact"] }, { title: "Resources", links: ["Documentation", "Blog", "Guides", "Support"] }, { title: "Legal", links: ["Privacy", "Terms", "Cookie Policy", "GDPR"] }].map((col, i) => (
            <div key={i}>
              <div style={{ fontWeight: 700, fontSize: 13, color: theme === "dark" ? "#fff" : "#0a0a12", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>{col.title}</div>
              {col.links.map(l => <div key={l} style={{ marginBottom: 10 }}><a href="#" style={{ fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", textDecoration: "none" }}>{l}</a></div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}>© 2025 VoxEra. All rights reserved.</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Twitter", "GitHub", "LinkedIn"].map(s => <a key={s} href="#" style={{ fontSize: 13, color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", textDecoration: "none" }}>{s}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

function LoginPage({ setPage, theme }) {
  const [tab, setTab] = useState("email");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError("Please fill all fields"); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setPage("dashboard");
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>◈</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "0 0 8px", letterSpacing: "-1px" }}>Sign In</h1>
          <p style={{ color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", fontSize: 14 }}>Welcome back to Glassic</p>
        </div>
        <div style={{ background: theme === "dark" ? "rgba(255,255,255,0.05)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, borderRadius: 20, padding: 32 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {["email", "google", "github"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, background: tab === t ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "none", border: `1px solid ${tab === t ? "transparent" : (theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)")}`, borderRadius: 8, padding: "8px 4px", fontSize: 12, fontWeight: 600, cursor: "pointer", color: tab === t ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)"), textTransform: "capitalize" }}>{t === "email" ? "✉️ Email" : t === "google" ? "G Google" : "⌥ GitHub"}</button>
            ))}
          </div>
          {tab === "email" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#ef4444" }}>{error}</div>}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)", marginBottom: 8 }}>Email</label>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" placeholder="you@company.com" style={{ width: "100%", background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, borderRadius: 10, padding: "12px 14px", fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)", marginBottom: 8 }}>Password</label>
                <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} type="password" placeholder="••••••••" style={{ width: "100%", background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, borderRadius: 10, padding: "12px 14px", fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12", outline: "none", boxSizing: "border-box" }} />
              </div>
              <a href="#" style={{ fontSize: 13, color: "#6366f1", textAlign: "right", display: "block", textDecoration: "none", marginTop: -8 }}>Forgot password?</a>
              <button onClick={handleSubmit} disabled={loading} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", color: "#fff", opacity: loading ? 0.7 : 1 }}>{loading ? "Signing in..." : "Sign In"}</button>
            </div>
          )}
          {tab !== "email" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <button onClick={() => setPage("dashboard")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", color: "#fff" }}>Continue with {tab === "google" ? "Google" : "GitHub"}</button>
            </div>
          )}
        </div>
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}>
          Don't have an account?{" "}
          <button onClick={() => setPage("register")} style={{ background: "none", border: "none", color: "#6366f1", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Register</button>
        </p>
      </div>
    </div>
  );
}

function RegisterPage({ setPage, theme }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setPage("dashboard");
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>◈</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "0 0 8px", letterSpacing: "-1px" }}>Create Account</h1>
        </div>
        <div style={{ background: theme === "dark" ? "rgba(255,255,255,0.05)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, borderRadius: 20, padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[{ key: "name", label: "Full Name", type: "text", placeholder: "Majeed Khan" }, { key: "email", label: "Email", type: "email", placeholder: "you@company.com" }, { key: "company", label: "Company", type: "text", placeholder: "VoxEra Inc." }, { key: "password", label: "Password", type: "password", placeholder: "••••••••" }].map(f => (
              <div key={f.key}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)", marginBottom: 8 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} type={f.type} placeholder={f.placeholder} style={{ width: "100%", background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, borderRadius: 10, padding: "12px 14px", fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <button onClick={handleSubmit} disabled={loading} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", color: "#fff", marginTop: 4 }}>{loading ? "Creating account..." : "Get Started Free"}</button>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}>
          Already have an account?{" "}
          <button onClick={() => setPage("login")} style={{ background: "none", border: "none", color: "#6366f1", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Sign In</button>
        </p>
      </div>
    </div>
  );
}

function Dashboard({ setPage, theme }) {
  const [activeTab, setActiveTab] = useState("agents");
  const [agents, setAgents] = useState([
    { id: 1, name: "Support Sam", role: "Customer Support", voice: "Rachel", status: "active", calls: 1284, satisfaction: 94 },
    { id: 2, name: "Sales Max", role: "Sales Agent", voice: "Brian", status: "active", calls: 847, satisfaction: 88 },
    { id: 3, name: "HR Helper", role: "HR Assistant", voice: "Bella", status: "paused", calls: 312, satisfaction: 91 },
  ]);
  const tabs = [{ id: "agents", label: "My Agents", icon: "🤖" }, { id: "analytics", label: "Analytics", icon: "📊" }, { id: "calls", label: "Call Logs", icon: "📞" }, { id: "docs", label: "Documents", icon: "📄" }, { id: "settings", label: "Settings", icon: "⚙️" }];
  const stats = [{ label: "Total Calls", value: "2,443", change: "+12%", up: true }, { label: "Avg. Satisfaction", value: "91%", change: "+3%", up: true }, { label: "Cost Saved", value: "$4,280", change: "+8%", up: true }, { label: "Active Agents", value: "2", change: "0", up: null }];
  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 64 }}>
      <aside style={{ width: 240, borderRight: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, padding: "24px 16px", position: "fixed", top: 64, bottom: 0, background: theme === "dark" ? "#0a0a12" : "#fff", overflowY: "auto", zIndex: 50 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", textTransform: "uppercase", letterSpacing: 1, padding: "0 12px", marginBottom: 8 }}>Navigation</div>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: activeTab === t.id ? (theme === "dark" ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)") : "none", border: "none", cursor: "pointer", color: activeTab === t.id ? "#6366f1" : (theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)"), fontSize: 14, fontWeight: activeTab === t.id ? 700 : 500, textAlign: "left", marginBottom: 4 }}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
        <div style={{ marginTop: 32, padding: "0 12px" }}>
          <button onClick={() => setPage("voice")} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer", color: "#fff" }}>🎙️ Voice Test</button>
        </div>
      </aside>
      <main style={{ flex: 1, marginLeft: 240, padding: 32 }}>
        {activeTab === "agents" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: 0, letterSpacing: "-0.5px" }}>My Agents</h1>
                <p style={{ color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", fontSize: 14, margin: "4px 0 0" }}>Manage and monitor your AI voice agents</p>
              </div>
              <button onClick={() => setPage("upload")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", color: "#fff" }}>+ New Agent</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ background: theme === "dark" ? "rgba(255,255,255,0.05)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", marginBottom: 4 }}>{s.value}</div>
                  {s.up !== null && <div style={{ fontSize: 12, fontWeight: 700, color: s.up ? "#10b981" : "#ef4444" }}>{s.change} this month</div>}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              {agents.map(a => (
                <div key={a.id} style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16, padding: 24, display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🤖</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 16, color: theme === "dark" ? "#fff" : "#0a0a12" }}>{a.name}</span>
                      <span style={{ background: a.status === "active" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.1)", color: a.status === "active" ? "#10b981" : "#ef4444", fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase" }}>{a.status}</span>
                    </div>
                    <div style={{ fontSize: 13, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}>{a.role} · Voice: {a.voice}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12" }}>{a.calls.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)", fontWeight: 600 }}>CALLS</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800, color: "#10b981" }}>{a.satisfaction}%</div>
                    <div style={{ fontSize: 11, color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)", fontWeight: 600 }}>SATISFACTION</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setPage("voice")} style={{ background: "rgba(99,102,241,0.1)", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#6366f1" }}>🎙️ Talk</button>
                    <button onClick={() => setPage("upload")} style={{ background: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "analytics" && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "0 0 32px", letterSpacing: "-0.5px" }}>Analytics</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[{ label: "Call Volume", data: [320, 480, 380, 620, 540, 780, 920, 840, 1100, 980, 1240, 1180] }, { label: "Satisfaction Score", data: [82, 84, 85, 87, 86, 89, 88, 91, 90, 93, 92, 94] }].map((chart, ci) => (
                <div key={ci} style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16, padding: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: theme === "dark" ? "#fff" : "#0a0a12", marginBottom: 20 }}>{chart.label}</div>
                  <div style={{ height: 120, display: "flex", alignItems: "flex-end", gap: 6 }}>
                    {chart.data.map((v, i) => {
                      const max = Math.max(...chart.data);
                      const h = Math.round((v / max) * 100);
                      return <div key={i} style={{ flex: 1, height: `${h}%`, background: `linear-gradient(to top, #6366f1, #8b5cf6)`, borderRadius: "4px 4px 0 0", opacity: 0.7 + (i / chart.data.length) * 0.3 }} />;
                    })}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)" }}>
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <span key={m}>{m}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "calls" && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "0 0 32px", letterSpacing: "-0.5px" }}>Call Logs</h1>
            <div style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16, overflow: "hidden" }}>
              {[{ caller: "+1 (555) 234-1234", agent: "Support Sam", duration: "3m 42s", outcome: "Resolved", time: "2m ago" }, { caller: "+91 98765 43210", agent: "Sales Max", duration: "7m 18s", outcome: "Qualified", time: "15m ago" }, { caller: "+44 7911 123456", agent: "Support Sam", duration: "1m 55s", outcome: "Transferred", time: "1h ago" }, { caller: "+1 (555) 987-6543", agent: "HR Helper", duration: "5m 03s", outcome: "Resolved", time: "3h ago" }].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 24px", borderBottom: i < 3 ? `1px solid ${theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` : "none" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📞</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12" }}>{c.caller}</div>
                    <div style={{ fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}>{c.agent} · {c.duration}</div>
                  </div>
                  <span style={{ background: c.outcome === "Resolved" ? "rgba(16,185,129,0.15)" : c.outcome === "Qualified" ? "rgba(99,102,241,0.15)" : "rgba(245,158,11,0.15)", color: c.outcome === "Resolved" ? "#10b981" : c.outcome === "Qualified" ? "#6366f1" : "#f59e0b", fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 10px" }}>{c.outcome}</span>
                  <span style={{ fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", minWidth: 60, textAlign: "right" }}>{c.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "docs" && <UploadPage theme={theme} inline />}
        {activeTab === "settings" && (
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "0 0 32px", letterSpacing: "-0.5px" }}>Account Settings</h1>
            <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 24 }}>
              {[{ label: "Full Name", value: "Majeed Khan" }, { label: "Email", value: "majeed@voxera.ai" }, { label: "Company", value: "VoxEra" }].map(f => (
                <div key={f.label} style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 14, padding: 20 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{f.label}</label>
                  <input defaultValue={f.value} style={{ width: "100%", background: "none", border: "none", outline: "none", fontSize: 15, fontWeight: 600, color: theme === "dark" ? "#fff" : "#0a0a12", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ display: "flex", gap: 12 }}>
                <button style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", color: "#fff" }}>Save Changes</button>
                <button onClick={() => setPage("home")} style={{ background: "none", border: `1px solid rgba(239,68,68,0.3)`, borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#ef4444" }}>Sign Out</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function UploadPage({ setPage, theme, inline }) {
  const [agentConfig, setAgentConfig] = useState({ name: "", role: "Customer Support", personality: "Empathetic", tone: "Professional", voice: "21m00Tcm4TlvDq8ikWAM", language: "English", elevenLabsKey: "", openAIKey: "" });
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("config");
  const fileRef = useRef();
  const handleFileUpload = async (files) => {
    const allowed = Array.from(files).filter(f => f.name.endsWith(".pdf") || f.name.endsWith(".docx") || f.name.endsWith(".txt"));
    if (!allowed.length) return;
    setUploading(true);
    await new Promise(r => setTimeout(r, 1500));
    setUploadedDocs(prev => [...prev, ...allowed.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(1) + " KB", status: "ready", uploadedAt: new Date().toLocaleTimeString() }))]);
    setUploading(false);
  };
  const handleSave = async () => {
    setSaved(false);
    await new Promise(r => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  const s = (key, val) => setAgentConfig(prev => ({ ...prev, [key]: val }));
  const sel = (label, key, options) => (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{label}</label>
      <select value={agentConfig[key]} onChange={e => s(key, e.target.value)} style={{ width: "100%", background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12", outline: "none", boxSizing: "border-box" }}>
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
      </select>
    </div>
  );
  const inp = (label, key, placeholder, type = "text") => (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{label}</label>
      <input value={agentConfig[key]} onChange={e => s(key, e.target.value)} type={type} placeholder={placeholder} style={{ width: "100%", background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12", outline: "none", boxSizing: "border-box" }} />
    </div>
  );
  const content = (
    <div>
      {!inline && <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: "0 0 8px", letterSpacing: "-1px" }}>Configure Your AI Agent</h1>
        <p style={{ color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", fontSize: 15 }}>Set up persona, voice, knowledge base, and API keys</p>
      </div>}
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {[{ id: "config", label: "🤖 Agent Config" }, { id: "docs", label: "📄 Documents" }, { id: "keys", label: "🔑 API Keys" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : (theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"), border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", color: tab === t.id ? "#fff" : (theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)") }}>{t.label}</button>
        ))}
      </div>
      {tab === "config" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ gridColumn: "1/-1" }}>{inp("Agent Name", "name", "e.g. Support Sam, Sales Max")}</div>
          {sel("Role", "role", AGENT_ROLES)}
          {sel("Personality", "personality", PERSONALITIES)}
          {sel("Tone", "tone", TONES)}
          {sel("Language", "language", LANGUAGES)}
          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Voice Selection</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10 }}>
              {ELEVENLABS_VOICES.map(v => (
                <button key={v.id} onClick={() => s("voice", v.id)} style={{ background: agentConfig.voice === v.id ? "rgba(99,102,241,0.15)" : (theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"), border: `1.5px solid ${agentConfig.voice === v.id ? "#6366f1" : (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")}`, borderRadius: 10, padding: "12px", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: agentConfig.voice === v.id ? "#6366f1" : (theme === "dark" ? "#fff" : "#0a0a12") }}>{v.name}</div>
                  <div style={{ fontSize: 11, color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginTop: 2 }}>{v.gender} · {v.style}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "docs" && (
        <div>
          <div onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleFileUpload(e.dataTransfer.files); }} onClick={() => fileRef.current?.click()} style={{ border: `2px dashed ${theme === "dark" ? "rgba(99,102,241,0.4)" : "rgba(99,102,241,0.3)"}`, borderRadius: 16, padding: "48px 24px", textAlign: "center", cursor: "pointer", marginBottom: 24, background: theme === "dark" ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.02)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = theme === "dark" ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = theme === "dark" ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.02)"}
          >
            <div style={{ fontSize: 36, marginBottom: 16 }}>{uploading ? "⏳" : "📁"}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: theme === "dark" ? "#fff" : "#0a0a12", marginBottom: 8 }}>{uploading ? "Uploading to S3..." : "Drop files here or click to upload"}</div>
            <div style={{ fontSize: 13, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}>Supports PDF, DOCX, TXT · Max 50MB per file</div>
            <input ref={fileRef} type="file" multiple accept=".pdf,.docx,.txt" style={{ display: "none" }} onChange={e => handleFileUpload(e.target.files)} />
          </div>
          {uploadedDocs.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {uploadedDocs.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 12, padding: "14px 18px" }}>
                  <span style={{ fontSize: 20 }}>{d.name.endsWith(".pdf") ? "📕" : d.name.endsWith(".docx") ? "📘" : "📄"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12" }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>{d.size} · Uploaded {d.uploadedAt}</div>
                  </div>
                  <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 10px" }}>✓ Ready</span>
                  <button onClick={() => setUploadedDocs(p => p.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)" }}>✕</button>
                </div>
              ))}
            </div>
          )}
          {uploadedDocs.length === 0 && !uploading && (
            <div style={{ textAlign: "center", padding: "24px 0", color: theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)", fontSize: 14 }}>No documents uploaded yet. Upload FAQs, SOPs, or product docs.</div>
          )}
        </div>
      )}
      {tab === "keys" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 600 }}>
          <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#f59e0b" }}>⚠️ Keys are stored locally and never sent to our servers. For production, use environment variables.</div>
          {inp("ElevenLabs API Key", "elevenLabsKey", "sk-xxxxxxxxxxxxxxxxxxxxxxxx", "password")}
          {inp("OpenAI / Bedrock API Key", "openAIKey", "sk-proj-xxxxxxxxxxxxxxxxxx", "password")}
          <div style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: theme === "dark" ? "#fff" : "#0a0a12", marginBottom: 8 }}>Backend Endpoint</div>
            <input defaultValue="https://api.glassic.ai/v1" style={{ width: "100%", background: "none", border: "none", outline: "none", fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", fontFamily: "monospace", boxSizing: "border-box" }} />
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        <button onClick={handleSave} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "13px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", color: "#fff" }}>{saved ? "✓ Saved!" : "Save Configuration"}</button>
        {!inline && <button onClick={() => setPage("voice")} style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", border: "none", borderRadius: 10, padding: "13px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", color: theme === "dark" ? "#fff" : "#0a0a12" }}>🎙️ Test Voice</button>}
      </div>
    </div>
  );
  if (inline) return <div>{content}</div>;
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 60px" }}>
      {content}
    </div>
  );
}

function VoicePage({ theme }) {
  const [status, setStatus] = useState("idle");
  const [messages, setMessages] = useState([{ role: "agent", text: "Hello! I'm your AI voice agent. Click the microphone to start talking. How can I assist you today?" }]);
  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceId, setVoiceId] = useState("21m00Tcm4TlvDq8ikWAM");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const BACKEND_URL = "http://localhost:3001/api/chat";
  const TTS_URL = "http://localhost:3001/api/tts";
  const HEALTH_URL = "http://localhost:3001/health";

  // Test backend connectivity on mount
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch(HEALTH_URL);
        const data = await response.json();
        console.log('[VoicePage] Backend health check:', data);
        if (!data.apiKeyConfigured) {
          setError("⚠️ Backend API keys not configured. Check backend .env file.");
        }
      } catch (err) {
        console.error('[VoicePage] Backend connection failed:', err);
        setError("⚠️ Cannot connect to backend. Make sure it's running on port 3001.");
      }
    };
    testBackend();
  }, []);

  const buildPrompt = (history, userMsg) => {
    const sysPrompt = `You are a helpful, empathetic AI voice agent named "Sam" from VoxEra. You handle customer support queries.
Respond concisely (1-3 sentences) since this is a voice conversation. Be warm, professional, and helpful.
Never use markdown, bullet points, or special characters in your responses — speak naturally.`;
    return { systemPrompt: sysPrompt, userMsg, history };
  };

  const callAI = async (userText) => {
    try {
      const msgs = [...messages.slice(-6), { role: "user", text: userText }];
      const apiMessages = msgs.map(m => ({ role: m.role === "agent" ? "assistant" : "user", content: m.text }));
      
      console.log('[Frontend] Sending request to backend:', { messagesCount: apiMessages.length, model: "mixtral-8x7b-32768" });
      
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          max_tokens: 200,
          system: "You are Sam, a helpful, empathetic AI voice agent for VoxEra. You handle customer support queries. Respond concisely in 1-3 sentences for voice conversations. Be warm, professional, and helpful. Never use markdown, bullet points, or special characters in your responses - speak naturally.",
          messages: apiMessages
        })
      });
      
      console.log('[Frontend] Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Frontend] API Error:', errorData);
        setError(`API Error: ${errorData.details || errorData.error || 'Unknown error'}`);
        const fallbacks = ["I understand your concern. Let me help you with that right away!", "That's a great question. Based on our knowledge base, I'd be happy to assist.", "I appreciate you reaching out. Our team is committed to resolving this quickly.", "Thank you for that information. Let me pull up your account details."];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }
      
      const data = await response.json();
      console.log('[Frontend] AI Response:', { responseLength: data.content?.[0]?.text?.length });
      
      const reply = data.content?.[0]?.text || "I apologize, could you please repeat that?";
      setError("");
      return reply;
    } catch (error) {
      console.error('[Frontend] Error:', error);
      setError(`Error: ${error.message}`);
      const fallbacks = ["I understand your concern. Let me help you with that right away!", "That's a great question. Based on our knowledge base, I'd be happy to assist.", "I appreciate you reaching out. Our team is committed to resolving this quickly.", "Thank you for that information. Let me pull up your account details."];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
  };

  const speakText = async (text) => {
    if (!apiKey) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95; utter.pitch = 1.05;
      window.speechSynthesis.speak(utter);
      setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      return;
    }
    try {
      console.log('[Frontend] Requesting TTS for text:', text.substring(0, 50) + '...');
      
      const response = await fetch(TTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice_id: voiceId })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Frontend] TTS Error:', errorData);
        throw new Error(errorData.details || 'TTS failed');
      }
      
      const blob = await response.blob();
      console.log('[Frontend] TTS Response received, blob size:', blob.size);
      
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setIsSpeaking(true);
      audio.play();
      audio.onended = () => { setIsSpeaking(false); URL.revokeObjectURL(url); };
    } catch (error) {
      console.error('[Frontend] TTS Exception:', error.message);
      // Fallback to browser TTS
      const utter = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utter);
      setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError("Speech recognition not supported. Try Chrome or Edge.");
      return;
    }
    stopSpeaking();
    setError("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;
    setStatus("listening");
    setTranscript("");
    recognition.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join("");
      setTranscript(t);
    };
    recognition.onend = async () => {
      if (transcript || recognitionRef.current?._finalTranscript) {
        const finalText = recognitionRef.current?._finalTranscript || transcript;
        if (finalText.trim()) {
          setMessages(prev => [...prev, { role: "user", text: finalText }]);
          setStatus("processing");
          setTranscript("");
          try {
            const reply = await callAI(finalText);
            setMessages(prev => [...prev, { role: "agent", text: reply }]);
            setStatus("idle");
            speakText(reply);
          } catch {
            setStatus("idle");
            setError("Failed to get response. Check your API key.");
          }
        } else setStatus("idle");
      } else setStatus("idle");
    };
    recognition.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join("");
      setTranscript(t);
      if (e.results[e.results.length - 1].isFinal) recognitionRef.current._finalTranscript = t;
    };
    recognition.onerror = (e) => {
      if (e.error !== "no-speech") setError(`Mic error: ${e.error}`);
      setStatus("idle");
    };
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setStatus("idle");
  };

  const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 40px", display: "flex", flexDirection: "column", height: "100vh", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, color: theme === "dark" ? "#fff" : "#0a0a12", margin: 0, letterSpacing: "-0.5px" }}>🎙️ Voice Interaction</h1>
          <p style={{ color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)", fontSize: 14, margin: "4px 0 0" }}>Talk to your AI agent in real-time</p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <select value={voiceId} onChange={e => setVoiceId(e.target.value)} style={{ background: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color: theme === "dark" ? "#fff" : "#0a0a12", outline: "none" }}>
            {ELEVENLABS_VOICES.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
          <input value={apiKey} onChange={e => setApiKey(e.target.value)} type="password" placeholder="ElevenLabs API key (optional)" style={{ background: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, color: theme === "dark" ? "#fff" : "#0a0a12", outline: "none", width: 220 }} />
        </div>
      </div>
      {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#ef4444", marginBottom: 16 }}>{error}</div>}
      <div style={{ flex: 1, background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#fff", border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, borderRadius: 20, padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, minHeight: 0, marginBottom: 24 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 12, justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end" }}>
            {m.role === "agent" && <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>}
            <div style={{ maxWidth: "72%", background: m.role === "agent" ? (theme === "dark" ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)") : (theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"), borderRadius: m.role === "agent" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", padding: "12px 16px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: m.role === "agent" ? "#6366f1" : (theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"), marginBottom: 6, letterSpacing: 0.5 }}>{m.role === "agent" ? "AI AGENT · SAM" : "YOU"}</div>
              <div style={{ fontSize: 15, color: theme === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)", lineHeight: 1.6 }}>{m.text}</div>
            </div>
            {m.role === "user" && <div style={{ width: 34, height: 34, borderRadius: "50%", background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>👤</div>}
          </div>
        ))}
        {status === "processing" && (
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
            <div style={{ background: theme === "dark" ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)", borderRadius: "4px 16px 16px 16px", padding: "14px 20px", display: "flex", gap: 5 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", animation: `bounce 1s ${i * 0.15}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {transcript && (
        <div style={{ background: theme === "dark" ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)", border: `1px solid rgba(99,102,241,0.2)`, borderRadius: 12, padding: "10px 16px", fontSize: 14, color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", marginBottom: 16, fontStyle: "italic" }}>
          🎙️ {transcript}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "center" }}>
        {isSpeaking && <button onClick={stopSpeaking} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 100, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#ef4444" }}>⏹ Stop</button>}
        <div style={{ position: "relative" }}>
          <button
            onMouseDown={startListening} onMouseUp={stopListening} onTouchStart={startListening} onTouchEnd={stopListening}
            style={{ width: 72, height: 72, borderRadius: "50%", border: "none", background: status === "listening" ? "linear-gradient(135deg,#ef4444,#dc2626)" : status === "processing" ? "linear-gradient(135deg,#f59e0b,#d97706)" : "linear-gradient(135deg,#6366f1,#8b5cf6)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: status === "listening" ? "0 0 0 8px rgba(239,68,68,0.25), 0 0 0 16px rgba(239,68,68,0.1)" : "0 8px 32px rgba(99,102,241,0.4)", transition: "all 0.2s" }}>
            {status === "listening" ? "⏺" : status === "processing" ? "⏳" : "🎙️"}
          </button>
        </div>
        <div style={{ fontSize: 13, color: theme === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)", textAlign: "center" }}>
          {status === "listening" ? "🔴 Listening... Release to send" : status === "processing" ? "⏳ Thinking..." : isSpeaking ? "🔊 Speaking..." : "Hold to speak"}
        </div>
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: theme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", marginTop: 16 }}>
        Uses Web Speech API for STT · ElevenLabs for TTS · Browser TTS fallback if no key
      </p>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.body.style.background = theme === "dark" ? "#0a0a12" : "#f8f8fc";
    document.body.style.color = theme === "dark" ? "#fff" : "#0a0a12";
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'DM Sans', -apple-system, sans-serif";
  }, [theme]);
  return (
    <div style={{ minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.9)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }
        option { background: #1a1a2e; color: #fff; }
      `}</style>
      {page !== "home" && <NavBar page={page} setPage={setPage} theme={theme} setTheme={setTheme} />}
      {page === "home" && (
        <>
          <NavBar page={page} setPage={setPage} theme={theme} setTheme={setTheme} />
          <HeroSection setPage={setPage} theme={theme} />
          <DemoSection theme={theme} />
          <FeaturesSection theme={theme} />
          <HowItWorks theme={theme} />
          <UseCasesSection theme={theme} />
          <TestimonialsSection theme={theme} />
          <PricingSection setPage={setPage} theme={theme} />
          <CTASection setPage={setPage} theme={theme} />
          <Footer theme={theme} />
        </>
      )}
      {page === "login" && <LoginPage setPage={setPage} theme={theme} />}
      {page === "register" && <RegisterPage setPage={setPage} theme={theme} />}
      {page === "dashboard" && <Dashboard setPage={setPage} theme={theme} />}
      {page === "upload" && <UploadPage setPage={setPage} theme={theme} />}
      {page === "voice" && <VoicePage theme={theme} />}
    </div>
  );
}
