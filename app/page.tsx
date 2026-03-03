"use client";
import { useState } from "react";

const models = [
  { id:1, name:"Articulated Dragon", author:"ZenForge", downloads:4812, likes:320, category:"art", icon:"🐉", color:"#4f8cff" },
  { id:2, name:"Cable Management Clip", author:"PrintLab", downloads:3201, likes:210, category:"functional", icon:"🔧", color:"#a78bfa" },
  { id:3, name:"Moon Lamp Base", author:"LunaDesigns", downloads:2900, likes:198, category:"art", icon:"🌙", color:"#38bdf8" },
  { id:4, name:"Tabletop Orc Warrior", author:"MiniMasters", downloads:2100, likes:175, category:"miniatures", icon:"⚔️", color:"#fb923c" },
  { id:5, name:"Fidget Spinner Deluxe", author:"SpinWorks", downloads:1850, likes:144, category:"toys", icon:"🌀", color:"#34d399" },
  { id:6, name:"Wall Hook Organizer", author:"HomeHacks", downloads:1700, likes:130, category:"functional", icon:"🪝", color:"#f472b6" },
  { id:7, name:"Terrain Tile Set", author:"DungeonCraft", downloads:1600, likes:122, category:"miniatures", icon:"🏔️", color:"#facc15" },
  { id:8, name:"Hex Planter Pot", author:"GreenPrint", downloads:1400, likes:108, category:"art", icon:"🌱", color:"#4ade80" },
  { id:9, name:"Adjustable Phone Stand", author:"DeskMod", downloads:1350, likes:99, category:"tools", icon:"📱", color:"#60a5fa" },
  { id:10, name:"Flexi Cat Toy", author:"PetPrint", downloads:1200, likes:95, category:"toys", icon:"🐱", color:"#f87171" },
  { id:11, name:"Knife Block Organizer", author:"KitchenPro", downloads:1100, likes:88, category:"tools", icon:"🔪", color:"#c084fc" },
  { id:12, name:"Low Poly Fox", author:"PolyArtist", downloads:980, likes:82, category:"art", icon:"🦊", color:"#fb923c" },
];

const filters = ["all","functional","art","miniatures","tools","toys"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [modal, setModal] = useState<null|"login"|"signup">(null);

  const filtered = models.filter(m => {
    const matchCat = activeFilter === "all" || m.category === activeFilter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#0a0a0f;--surface:#111118;--card:#16161f;--border:#1e1e2e;--accent:#4f8cff;--accent2:#a78bfa;--text:#e8e8f0;--muted:#6b6b80;--radius:14px}
        body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh}
        a{text-decoration:none;color:var(--muted);transition:color .2s}
        a:hover{color:var(--text)}
        button{cursor:pointer;font-family:'DM Sans',sans-serif}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem",height:60,background:"rgba(10,10,15,0.85)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.3rem",background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>fluidprints</div>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,padding:"6px 12px",flex:1,maxWidth:340,margin:"0 2rem"}}>
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search 3D models…" style={{background:"none",border:"none",outline:"none",color:"var(--text)",fontSize:"0.9rem",width:"100%",fontFamily:"DM Sans,sans-serif"}}/>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <a href="#">Explore</a>
          <a href="#">Makers</a>
          <button onClick={()=>setModal("login")} style={{padding:"6px 14px",borderRadius:8,fontSize:"0.88rem",background:"transparent",color:"var(--muted)",border:"1px solid var(--border)"}}>Log in</button>
          <button onClick={()=>setModal("signup")} style={{padding:"6px 14px",borderRadius:8,fontSize:"0.88rem",background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff",border:"none"}}>Sign up</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:"120px 2rem 60px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:60,left:"50%",transform:"translateX(-50%)",width:600,height:600,background:"radial-gradient(ellipse,rgba(79,140,255,.12) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(79,140,255,.08)",border:"1px solid rgba(79,140,255,.2)",borderRadius:100,padding:"4px 14px",fontSize:"0.8rem",color:"var(--accent)",marginBottom:"1.5rem",animation:"fadeUp .6s ease both"}}>✦ 3D Model Community</div>
        <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(2.4rem,6vw,4.2rem)",fontWeight:800,lineHeight:1.08,letterSpacing:"-2px",animation:"fadeUp .7s .1s ease both"}}>
          Discover, share &<br/>
          <span style={{background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>print anything</span>
        </h1>
        <p style={{color:"var(--muted)",fontSize:"1.05rem",margin:"1.2rem auto 2rem",maxWidth:500,lineHeight:1.7,animation:"fadeUp .7s .2s ease both"}}>The home for 3D designers and makers. Upload your models, explore thousands of prints, and connect with the community.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp .7s .3s ease both"}}>
          <button style={{padding:"10px 28px",fontSize:"1rem",borderRadius:10,background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff",border:"none"}}>Explore Models</button>
          <button onClick={()=>setModal("signup")} style={{padding:"10px 28px",fontSize:"1rem",borderRadius:10,background:"transparent",color:"var(--muted)",border:"1px solid var(--border)"}}>Start Uploading</button>
        </div>
      </section>

      {/* STATS */}
      <div style={{display:"flex",justifyContent:"center",gap:"3rem",flexWrap:"wrap",padding:"2rem",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",background:"var(--surface)"}}>
        {[["12,400+","3D Models"],["3,200+","Makers"],["98k+","Downloads"],["Free","Always"]].map(([num,label])=>(
          <div key={label} style={{textAlign:"center"}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:"1.6rem",fontWeight:800,background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{num}</div>
            <div style={{color:"var(--muted)",fontSize:"0.82rem",marginTop:4}}>{label}</div>
          </div>
        ))}
      </div>

      {/* GRID */}
      <div style={{padding:"3rem 2rem",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:"1.4rem",fontWeight:700}}>Trending Models</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {filters.map(f=>(
              <button key={f} onClick={()=>setActiveFilter(f)} style={{padding:"5px 14px",borderRadius:100,fontSize:"0.82rem",border:`1px solid ${activeFilter===f?"var(--accent)":"var(--border)"}`,background:activeFilter===f?"rgba(79,140,255,.07)":"var(--surface)",color:activeFilter===f?"var(--accent)":"var(--muted)"}}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"1.2rem"}}>
          {filtered.map((m,i)=>(
            <div key={m.id} onClick={()=>alert(`Opening "${m.name}" — 3D preview coming soon!`)} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",overflow:"hidden",cursor:"pointer",transition:"transform .25s,border-color .25s",animation:`fadeUp .5s ${i*0.05}s ease both`}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(-4px)";(e.currentTarget as HTMLDivElement).style.borderColor="rgba(79,140,255,.35)"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(0)";(e.currentTarget as HTMLDivElement).style.borderColor="var(--border)"}}>
              <div style={{width:"100%",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",background:`${m.color}18`,position:"relative"}}>
                <span style={{fontSize:"3.2rem"}}>{m.icon}</span>
                <div style={{position:"absolute",top:8,right:8,background:"rgba(10,10,15,.75)",backdropFilter:"blur(6px)",border:"1px solid var(--border)",borderRadius:6,padding:"2px 8px",fontSize:"0.72rem",color:"var(--muted)"}}>STL</div>
              </div>
              <div style={{padding:"12px 14px 14px"}}>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:600,fontSize:"0.95rem",marginBottom:6,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.name}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"0.78rem",color:"var(--muted)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:18,height:18,borderRadius:"50%",background:"linear-gradient(135deg,#4f8cff,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem",color:"#fff",fontWeight:700}}>{m.author[0]}</div>
                    {m.author}
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <span>⬇️ {(m.downloads/1000).toFixed(1)}k</span>
                    <span>❤️ {m.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPLOAD CTA */}
      <div onClick={()=>setModal("signup")} style={{margin:"0 2rem 3rem",maxWidth:1280,marginLeft:"auto",marginRight:"auto",border:"2px dashed var(--border)",borderRadius:"var(--radius)",padding:"2.5rem",textAlign:"center",cursor:"pointer"}}>
        <div style={{fontSize:"2.2rem",marginBottom:12}}>⬆️</div>
        <h3 style={{fontFamily:"Syne,sans-serif",fontSize:"1.1rem",marginBottom:6}}>Share your designs with the world</h3>
        <p style={{color:"var(--muted)",fontSize:"0.88rem"}}>Upload STL, OBJ, or 3MF files — free forever. Join thousands of makers on Fluidprints.</p>
      </div>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid var(--border)",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",color:"var(--muted)",fontSize:"0.82rem"}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,background:"linear-gradient(120deg,#4f8cff,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>fluidprints</div>
        <div>© 2025 Fluidprints · Built for makers</div>
        <div style={{display:"flex",gap:18}}><a href="#">About</a><a href="#">Privacy</a><a href="#">Terms</a></div>
      </footer>

      {/* MODAL */}
      {modal && (
        <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.7)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:18,padding:"2rem",width:"90%",maxWidth:480,position:"relative",animation:"fadeUp .3s ease"}}>
            <button onClick={()=>setModal(null)} style={{position:"absolute",top:12,right:16,background:"none",border:"none",color:"var(--muted)",fontSize:"1.4rem"}}>×</button>
            <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"1.3rem",marginBottom:"1.2rem"}}>{modal==="login"?"Welcome back":"Join Fluidprints"}</h2>
            {modal==="signup" && <div style={{marginBottom:14}}><label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:4}}>Username</label><input placeholder="coolmaker99" style={{width:"100%",padding:"8px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontFamily:"DM Sans,sans-serif",fontSize:"0.9rem",outline:"none"}}/></div>}
            <div style={{marginBottom:14}}><label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:4}}>Email</label><input type="email" placeholder="you@example.com" style={{width:"100%",padding:"8px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontFamily:"DM Sans,sans-serif",fontSize:"0.9rem",outline:"none"}}/></div>
            <div style={{marginBottom:14}}><label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:4}}>Password</label><input type="password" placeholder="••••••••" style={{width:"100%",padding:"8px 12px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontFamily:"DM Sans,sans-serif",fontSize:"0.9rem",outline:"none"}}/></div>
            <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:"1.5rem"}}>
              <button onClick={()=>setModal(null)} style={{padding:"8px 16px",borderRadius:8,background:"transparent",color:"var(--muted)",border:"1px solid var(--border)"}}>Cancel</button>
              <button style={{padding:"8px 16px",borderRadius:8,background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff",border:"none"}}>{modal==="login"?"Log in":"Create account"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}