"use client";
import { useState } from "react";
import { supabase } from "../supabase";

export default function Upload() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("functional");
  const [price, setPrice] = useState("0");
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file || !name) {
      setMessage("❌ Please fill in the name and select a file!");
      return;
    }

    setLoading(true);
    setMessage("");

    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setMessage("❌ You must be logged in to upload!");
      setLoading(false);
      return;
    }

    // Upload file to Supabase Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("models")
      .upload(fileName, file);

    if (uploadError) {
      setMessage("❌ Upload failed: " + uploadError.message);
      setLoading(false);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("models")
      .getPublicUrl(fileName);

    // Save model info to database
    const { error: dbError } = await supabase.from("models").insert({
      user_id: session.user.id,
      name,
      description,
      category,
      price: parseFloat(price),
      file_url: publicUrl,
    });

    if (dbError) {
      setMessage("❌ Error saving model: " + dbError.message);
    } else {
      setSuccess(true);
      setMessage("✅ Model uploaded successfully!");
      setName("");
      setDescription("");
      setFile(null);
    }

    setLoading(false);
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

      {/* MAIN */}
      <main style={{maxWidth:600,margin:"0 auto",padding:"100px 2rem 4rem"}}>
        <div style={{animation:"fadeUp .6s ease both"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(79,140,255,.08)",border:"1px solid rgba(79,140,255,.2)",borderRadius:100,padding:"4px 14px",fontSize:"0.8rem",color:"var(--accent)",marginBottom:"1.5rem"}}>⬆️ Upload Model</div>
          <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"2.2rem",fontWeight:800,letterSpacing:"-1px",marginBottom:"0.5rem"}}>Share your design</h1>
          <p style={{color:"var(--muted)",marginBottom:"2.5rem"}}>Upload your 3D model and share it with the Fluidprints community.</p>
        </div>

        {success ? (
          <div style={{background:"rgba(52,211,153,.08)",border:"1px solid rgba(52,211,153,.2)",borderRadius:"var(--radius)",padding:"2rem",textAlign:"center",animation:"fadeUp .5s ease both"}}>
            <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🎉</div>
            <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"1.4rem",marginBottom:"0.5rem"}}>Model uploaded!</h2>
            <p style={{color:"var(--muted)",marginBottom:"1.5rem"}}>Your model is now live on Fluidprints.</p>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <a href="/" style={{padding:"8px 20px",borderRadius:8,background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff",textDecoration:"none",fontSize:"0.9rem"}}>View Homepage</a>
              <button onClick={()=>setSuccess(false)} style={{padding:"8px 20px",borderRadius:8,background:"transparent",color:"var(--muted)",border:"1px solid var(--border)",fontSize:"0.9rem"}}>Upload Another</button>
            </div>
          </div>
        ) : (
          <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:"2rem",animation:"fadeUp .7s .1s ease both"}}>

            {/* Model Name */}
            <div style={{marginBottom:"1.2rem"}}>
              <label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:6}}>Model Name *</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Articulated Dragon" style={{width:"100%",padding:"10px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontFamily:"DM Sans,sans-serif",fontSize:"0.95rem",outline:"none"}}/>
            </div>

            {/* Description */}
            <div style={{marginBottom:"1.2rem"}}>
              <label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:6}}>Description</label>
              <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Describe your model..." rows={3} style={{width:"100%",padding:"10px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontFamily:"DM Sans,sans-serif",fontSize:"0.95rem",outline:"none",resize:"vertical"}}/>
            </div>

            {/* Category */}
            <div style={{marginBottom:"1.2rem"}}>
              <label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:6}}>Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} style={{width:"100%",padding:"10px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontFamily:"DM Sans,sans-serif",fontSize:"0.95rem",outline:"none"}}>
                <option value="functional">Functional</option>
                <option value="art">Art & Decor</option>
                <option value="miniatures">Miniatures</option>
                <option value="tools">Tools</option>
                <option value="toys">Toys</option>
              </select>
            </div>

            {/* Price */}
            <div style={{marginBottom:"1.2rem"}}>
              <label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:6}}>Price (USD) — set 0 for free</label>
              <input type="number" value={price} onChange={e=>setPrice(e.target.value)} min="0" step="0.99" style={{width:"100%",padding:"10px 14px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",fontFamily:"DM Sans,sans-serif",fontSize:"0.95rem",outline:"none"}}/>
            </div>

            {/* File Upload */}
            <div style={{marginBottom:"1.5rem"}}>
              <label style={{display:"block",fontSize:"0.85rem",color:"var(--muted)",marginBottom:6}}>3D Model File * (STL, OBJ, 3MF)</label>
              <div style={{border:"2px dashed var(--border)",borderRadius:8,padding:"1.5rem",textAlign:"center",cursor:"pointer",transition:"border-color .2s"}}
                onClick={()=>(document.getElementById("fileInput") as HTMLInputElement).click()}
                onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor="var(--accent)"}}
                onDragLeave={e=>{e.currentTarget.style.borderColor="var(--border)"}}
                onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)setFile(f);e.currentTarget.style.borderColor="var(--border)"}}>
                <div style={{fontSize:"2rem",marginBottom:8}}>{file ? "✅" : "📁"}</div>
                <p style={{color:file?"var(--accent)":"var(--muted)",fontSize:"0.9rem"}}>
                  {file ? file.name : "Click or drag & drop your file here"}
                </p>
                {!file && <p style={{color:"var(--muted)",fontSize:"0.78rem",marginTop:4}}>Supports STL, OBJ, 3MF</p>}
              </div>
              <input id="fileInput" type="file" accept=".stl,.obj,.3mf" style={{display:"none"}} onChange={e=>setFile(e.target.files?.[0] ?? null)}/>
            </div>

            {message && (
              <div style={{padding:"10px 14px",borderRadius:8,background:"rgba(79,140,255,.08)",border:"1px solid rgba(79,140,255,.2)",fontSize:"0.85rem",color:"var(--text)",marginBottom:"1.2rem"}}>{message}</div>
            )}

            <button onClick={handleUpload} disabled={loading} style={{width:"100%",padding:"12px",borderRadius:10,background:"linear-gradient(135deg,#4f8cff,#a78bfa)",color:"#fff",border:"none",fontSize:"1rem",fontFamily:"Syne,sans-serif",fontWeight:600,opacity:loading?0.7:1,cursor:loading?"not-allowed":"pointer"}}>
              {loading ? "Uploading..." : "Upload Model ⬆️"}
            </button>

          </div>
        )}
      </main>
    </>
  );
}