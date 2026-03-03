"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    color: "#6b6b80",
    features: [
      "Browse all free models",
      "Download free models",
      "Upload up to 3 models",
      "Basic profile",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 9,
    period: "month",
    color: "#4f8cff",
    priceId: "price_pro_monthly",
    features: [
      "Everything in Free",
      "Download all models",
      "Upload unlimited models",
      "Sell your models (20% fee)",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Start Pro",
    popular: true,
  },
  {
    name: "Vendor",
    price: 19,
    period: "month",
    color: "#a78bfa",
    priceId: "price_vendor_monthly",
    features: [
      "Everything in Pro",
      "Lower platform fee (15%)",
      "Featured listings",
      "Custom store page",
      "Sales reports",
      "Early access to features",
    ],
    cta: "Start Selling",
    popular: false,
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: any) => {
    if (plan.price === 0) {
      window.location.href = "/";
      return;
    }
    setLoading(plan.name);
    // Stripe checkout will go here
    alert(`Stripe checkout for ${plan.name} plan — coming soon!`);
    setLoading(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#0a0a0f;--surface:#111118;--card:#16161f;--border:#1e1e2e;--accent:#4f8cff;--accent2:#a78bfa;--text:#e8e8f0;--muted:#6b6b80;--radius:14px}
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem",height:60,background:"rgba(10,10,15,0.85)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)"}}>
        <a href="/" style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.3rem",background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textDecoration:"none"}}>fluidprints</a>
        <a href="/" style={{color:"var(--muted)",fontSize:"0.9rem",textDecoration:"none"}}>← Back to home</a>
      </nav>

      {/* HERO */}
      <section style={{padding:"120px 2rem 60px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:60,left:"50%",transform:"translateX(-50%)",width:600,height:400,background:"radial-gradient(ellipse,rgba(79,140,255,.1) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(79,140,255,.08)",border:"1px solid rgba(79,140,255,.2)",borderRadius:100,padding:"4px 14px",fontSize:"0.8rem",color:"var(--accent)",marginBottom:"1.5rem"}}>💎 Simple Pricing</div>
        <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:800,letterSpacing:"-2px",marginBottom:"1rem"}}>
          Choose your plan
        </h1>
        <p style={{color:"var(--muted)",fontSize:"1.05rem",maxWidth:460,margin:"0 auto",lineHeight:1.7}}>
          Start free, upgrade when you're ready. No hidden fees.
        </p>
      </section>

      {/* PLANS */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 2rem 5rem",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem",alignItems:"start"}}>
        {plans.map((plan, i) => (
          <div key={plan.name} style={{
            background: plan.popular ? "linear-gradient(145deg,#16161f,#1a1a2e)" : "var(--card)",
            border: `1px solid ${plan.popular ? "rgba(79,140,255,.4)" : "var(--border)"}`,
            borderRadius: 20,
            padding: "2rem",
            position: "relative",
            animation: `fadeUp .6s ${i*0.1}s ease both`,
            boxShadow: plan.popular ? "0 0 40px rgba(79,140,255,.1)" : "none",
          }}>
            {plan.popular && (
              <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#4f8cff,#a78bfa)",borderRadius:100,padding:"4px 16px",fontSize:"0.78rem",fontWeight:600,color:"#fff",whiteSpace:"nowrap"}}>
                ✦ Most Popular
              </div>
            )}

            {/* Plan Header */}
            <div style={{marginBottom:"1.5rem"}}>
              <div style={{fontSize:"0.85rem",color:"var(--muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:"1px"}}>{plan.name}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                <span style={{fontFamily:"Syne,sans-serif",fontSize:"3rem",fontWeight:800,color:plan.color}}>${plan.price}</span>
                <span style={{color:"var(--muted)",fontSize:"0.9rem"}}>/{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <div style={{marginBottom:"2rem"}}>
              {plan.features.map(f => (
                <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,fontSize:"0.9rem"}}>
                  <span style={{color:plan.color,fontSize:"1rem"}}>✓</span>
                  <span style={{color:"var(--text)"}}>{f}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleSubscribe(plan)}
              disabled={loading === plan.name}
              style={{
                width:"100%", padding:"12px",
                borderRadius:10,
                background: plan.popular ? "linear-gradient(135deg,#4f8cff,#a78bfa)" : plan.price === 0 ? "var(--surface)" : `${plan.color}22`,
                color: plan.popular ? "#fff" : plan.color,
                border: plan.popular ? "none" : `1px solid ${plan.color}44`,
                fontSize:"1rem",
                fontFamily:"Syne,sans-serif",
                fontWeight:600,
                cursor:"pointer",
                opacity: loading === plan.name ? 0.7 : 1,
              }}
            >
              {loading === plan.name ? "Loading..." : plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{maxWidth:700,margin:"0 auto",padding:"0 2rem 5rem"}}>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"1.6rem",fontWeight:800,textAlign:"center",marginBottom:"2rem"}}>Common Questions</h2>
        {[
          ["How does the vendor fee work?", "When you sell a model, we take 20% (Pro) or 15% (Vendor) of the sale price. The rest goes directly to you via Stripe."],
          ["Can I cancel anytime?", "Yes! Cancel anytime from your dashboard. You keep access until the end of your billing period."],
          ["What file formats are supported?", "We support STL, OBJ, and 3MF files for 3D printing models."],
          ["How do I get paid?", "Payouts are processed via Stripe directly to your bank account or Payoneer."],
        ].map(([q, a]) => (
          <div key={q} style={{borderBottom:"1px solid var(--border)",padding:"1.2rem 0"}}>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:600,marginBottom:"0.5rem"}}>{q}</div>
            <div style={{color:"var(--muted)",fontSize:"0.9rem",lineHeight:1.6}}>{a}</div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid var(--border)",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",color:"var(--muted)",fontSize:"0.82rem"}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>fluidprints</div>
        <div>© 2025 Fluidprints</div>
        <div style={{display:"flex",gap:18}}>
          <a href="/" style={{color:"var(--muted)",textDecoration:"none"}}>Home</a>
          <a href="/upload" style={{color:"var(--muted)",textDecoration:"none"}}>Upload</a>
        </div>
      </footer>
    </>
  );
}