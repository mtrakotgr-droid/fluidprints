"use client";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const filters = ["all","functional","art","miniatures","tools","toys"];
const ICONS: any = { functional:"🔧", art:"🎨", miniatures:"⚔️", tools:"🛠️", toys:"🎮" };

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [modal, setModal] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [models, setModels] = useState<any[]>([]);
  const [modelsLoading, setModelsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    supabase.from("models").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { if(data) setModels(data); setModelsLoading(false); });
  }, []);

  const handleSignup = async () => {
    setLoading(true); setMessage("");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setMessage("❌ " + error.message); }
    else { if (data.user) await supabase.from("profiles").insert({ id: data.user.id, username }); setMessage("✅ Check your email!"); }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true); setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMessage("❌ " + error.message); }
    else { setMessage("✅ Logged in!"); setTimeout(() => setModal(null), 1000); }
    setLoading(false);
  };

  const filtered = models.filter(m =>
    (activeFilter === "all" || m.category === activeFilter) &&
    (m.name||"").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#0a0a0f;--surface:#111118;--card:#16161f;--border:#1e1e2e;--accent:#4f8cff;--accent2:#a78bfa;--text:#e8e8f0;--muted:#6b6b80;--radius:14px}
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh}
        a{text-decoration:none;color:var(--muted);transition:color .2s} a:hover{color:var(--text)}
        button{cursor:pointer;font-family:'DM Sans',sans-serif}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem",height:60,background:"rgba(10,10,15,0.85)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.3rem",background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>fluidprints</div>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"6px 12px",flex:1,maxWidth:340,margin:"0 2rem"}}>
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search 3D models…" style={{background:"none",border:"none",outline:"none",color:"var(--text)",fontSize:"0.9rem",width:"100%",fontFamily:"DM Sans,sans-serif"}}/>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <a href="/upload">⬆️ Upload</a>
          {user ? (
            <>
              <span style={{color:"var(--accent)",fontSize:"0.88rem"}}>👤 {user.email}</span>
              <button onClick={()=>supabase.auth.signOut().then(()=>setUser(null))} style={{padding:"6px 14px",borderRadius:8,fontSize:"0.88rem",background:"transparent",color:"var(--muted)",border:"1px solid var(--border)"}}>Log out</button>
            </>
          ) : (
            <>
              <button onClick={()=>{setModal("login");setMessage("");}} style={{padding:"6px 14px",borderRadius:8,fontSize:"0.88rem",background:"transparent",color:"var(--muted)",border:"1px solid var(--border)"}}>Log in</button>
              <button onClick={()=>{setModal("signup");setMessage("");}} style={{padding:"6px 14px",borderRadius:8,fontSize:"0.88rem",background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff",border:"none"}}>Sign up</button>
            </>
          )}
        </div>
      </nav>

      <section style={{padding:"120px 2rem 60px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:60,left:"50%",transform:"translateX(-50%)",width:600,height:600,background:"radial-gradient(ellipse,rgba(79,140,255,.12) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(79,140,255,.08)",border:"1px solid rgba(79,140,255,.2)",borderRadius:100,padding:"4px 14px",fontSize:"0.8rem",color:"var(--accent)",marginBottom:"1.5rem"}}>✦ 3D Model Community</div>
        <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(2.4rem,6vw,4.2rem)",fontWeight:800,lineHeight:1.08,letterSpacing:"-2px"}}>
          Discover, share &<br/>
          <span style={{background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>print anything</span>
        </h1>
        <p style={{color:"var(--muted)",fontSize:"1.05rem",margin:"1.2rem auto 2rem",maxWidth:500,lineHeight:1.7}}>The home for 3D designers and makers.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <a href="/upload" style={{padding:"10px 28px",fontSize:"1rem",borderRadius:10,background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff"}}>Upload Model</a>
          <button onClick={()=>{setModal("signup");setMessage("");}} style={{padding:"10px 28px",fontSize:"1rem",borderRadius:10,background:"transparent",color:"var(--muted)",border:"1px solid var(--border)"}}>Join Community</button>
        </div>
      </section>

      <div style={{display:"flex",justifyContent:"center",gap:"3rem",padding:"2rem",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",background:"var(--surface)"}}>
        {[[String(models.length),"Models"],["Free","Always"],["STL/OBJ","Formats"]].map(([n,l])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:"1.6rem",fontWeight:800,background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{n}</div>
            <div style={{color:"var(--muted)",fontSize:"0.82rem"}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{padding:"3rem 2rem",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:"1.4rem",fontWeight:700}}>Latest Models</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {filters.map(f=>(
              <button key={f} onClick={()=>setActiveFilter(f)} style={{padding:"5px 14px",borderRadius:100,fontSize:"0.82rem",border:`1px solid ${activeFilter===f?"var(--accent)":"var(--border)"}`,background:activeFilter===f?"rgba(79,140,255,.07)":"var(--surface)",color:activeFilter===f?"var(--accent)":"var(--muted)"}}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {modelsLoading ? (
          <div style={{textAlign:"center",padding:"4rem",color:"var(--muted)"}}>
            <div style={{fontSize:"2rem",display:"inline-block",animation:"spin 1s linear infinite"}}>⚙️</div>
            <p style={{marginTop:"1rem"}}>Loading models...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{textAlign:"center",padding:"4rem",color:"var(--muted)",border:"2px dashed var(--border)",borderRadius:"var(--radius)"}}>
            <div style={{fontSize:"3rem",marginBottom:"1rem"}}>📭</div>
            <h3 style={{fontFamily:"Syne,sans-serif",marginBottom:"0.5rem"}}>No models yet</h3>
            <p style={{marginBottom:"1.5rem"}}>Be the first to upload!</p>
            <a href="/upload" style={{padding:"8px 20px",borderRadius:8,background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff"}}>Upload Now</a>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"1.2rem"}}>
            {filtered.map((m,i)=>(
              <div key={m.id} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",overflow:"hidden",cursor:"pointer",transition:"transform .25s",animation:`fadeUp .5s ${i*0.05}s ease both`}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"}}>
                <div style={{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(79,140,255,.06)",position:"relative"}}>
                  <span style={{fontSize:"3.2rem"}}>{ICONS[m.category]||"📦"}</span>
                  <div style={{position:"absolute",top:8,right:8,background:"rgba(10,10,15,.75)",borderRadius:6,padding:"2px 8px",fontSize:"0.72rem",color:"var(--muted)",border:"1px solid var(--border)"}}>
                    {m.price > 0 ? `$${m.price}` : "FREE"}
                  </div>
                </div>
                <div style={{padding:"12px 14px"}}>
                  <div style={{fontFamily:"Syne,sans-serif",fontWeight:600,fontSize:"0.95rem",marginBottom:6,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.name}</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"0.78rem",color:"var(--muted)"}}>
                    <span style={{background:"rgba(79,140,255,.08)",borderRadius:6,padding:"2px 8px",color:"var(--accent)",fontSize:"0.72rem",border:"1px solid rgba(79,140,255,.15)"}}>{m.category}</span>
                    <span>⬇️ {m.downloads||0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{borderTop:"1px solid var(--border)",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",color:"var(--muted)",fontSize:"0.82rem"}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>fluidprints</div>
        <div>© 2025 Fluidprints</div>
        <div style={{display:"flex",gap:18}}><a href="#">About</a><a href="#">Privacy</a></div>
      </footer>

      {modal && (
        <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.7)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:18,padding:"2rem",width:"90%",maxWidth:480,position:"relative"}}>
            <button onClick={()=>setModal(null)} style={{position:"absolute",top:12,right:16,background:"none",border:"none",color:"var(--muted)",fontSize:"1.4rem"}}>×</button>
            <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"1.3rem",marginBottom:"1.2rem"}}>{modal==="login"?"Welcome back":"Join Fluidprints"}</h2>
            {modal==="signup" && <div style={{marginBottom:14}}><label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:4}}>Username</label><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="coolmaker99" style={{width:"100%",padding:"8px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",outline:"none"}}/></div>}
            <div style={{marginBottom:14}}><label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:4}}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{width:"100%",padding:"8px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",outline:"none"}}/></div>
            <div style={{marginBottom:14}}><label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:4}}>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{width:"100%",padding:"8px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",outline:"none"}}/></div>
            {message && <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(79,140,255,.08)",border:"1px solid rgba(79,140,255,.2)",fontSize:"0.85rem",marginBottom:12}}>{message}</div>}
            <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:"1.5rem"}}>
              <button onClick={()=>setModal(null)} style={{padding:"8px 16px",borderRadius:8,background:"transparent",color:"var(--muted)",border:"1px solid var(--border)"}}>Cancel</button>
              <button onClick={modal==="login"?handleLogin:handleSignup} disabled={loading} style={{padding:"8px 16px",borderRadius:8,background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff",border:"none",opacity:loading?0.7:1}}>
                {loading?"Loading...":(modal==="login"?"Log in":"Create account")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}