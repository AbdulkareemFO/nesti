// nesti-wishlist.jsx — owner's wishlist page + add custom + share modal

function WishlistPage(){
  const { wishlist, signedIn, navigate, removeFromWishlist, requireAuth, addToast, customItems, addCustomItem, removeCustomItem, updateCustomItem, wishlistTitle, setWishlistTitle, getShareUrl } = useApp();
  const { lang, t } = useLang();
  const [showAdd, setShowAdd] = React.useState(false);
  const [showShare, setShowShare] = React.useState(false);
  const [editing, setEditing] = React.useState(null); // custom item id being edited
  const [editingTitle, setEditingTitle] = React.useState(false);

  if (!signedIn){
    return (
      <div className="container" style={{ padding: '80px 28px 120px', textAlign:'center', maxWidth: 600 }}>
        <div style={{
          width: 120, height: 120, borderRadius: 999, background: 'var(--petal-50)',
          margin: '0 auto 32px', display:'flex', alignItems:'center', justifyContent:'center',
          color: 'var(--petal-400)',
        }}>
          <NIcon name="heart" size={48}/>
        </div>
        <h1 className="display italic" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: 0 }}>
          Your wishlist lives here.
        </h1>
        <p style={{ color: 'var(--ink-500)', marginTop: 16, fontSize: 16 }}>
          Sign in to save what you love, share it with family, and let them gently bring it home.
        </p>
        <div style={{ display:'inline-flex', gap: 12, marginTop: 28, flexWrap:'wrap', justifyContent:'center' }}>
          <button className="btn btn-primary btn-lg" onClick={()=>navigate({name:'signup'})}>Create a free account</button>
          <button className="btn btn-outline btn-lg" onClick={()=>navigate({name:'login'})}>I have one already</button>
        </div>
      </div>
    );
  }

  const productItems = wishlist.map(id => ({ kind:'product', product: NESTI_PRODUCT_BY_ID[id], id })).filter(x=>x.product);
  const allItems = [
    ...productItems,
    ...customItems.map(c => ({ kind:'custom', custom: c, id: c.uid })),
  ];

  return (
    <div className="container" style={{ padding: '40px 28px 96px' }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        gap: 24, flexWrap:'wrap', marginBottom: 36,
      }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{
            fontSize: 12, letterSpacing:'.14em', textTransform:'uppercase',
            color: 'var(--petal-500)', fontWeight: 600, marginBottom: 12,
          }}>{signedIn.name.split(' ')[0]}'s wishlist · Due August</div>

          {editingTitle ? (
            <input
              autoFocus
              value={wishlistTitle}
              onChange={e=>setWishlistTitle(e.target.value)}
              onBlur={()=>setEditingTitle(false)}
              onKeyDown={e=>{ if (e.key==='Enter') setEditingTitle(false); }}
              className="input"
              style={{
                fontFamily:'var(--font-display)', fontStyle:'italic',
                fontSize: 'clamp(40px, 5.5vw, 64px)',
                padding: '4px 8px', border: '1px dashed var(--line-strong)',
                background: 'transparent', lineHeight: 1.05,
              }}
            />
          ) : (
            <h1 onClick={()=>setEditingTitle(true)} className="display italic" style={{
              fontSize: 'clamp(40px, 5.5vw, 64px)', margin: 0, lineHeight: 1.05, cursor: 'text',
            }} title="Click to rename">
              {wishlistTitle} <span style={{ color:'var(--ink-300)' }}><NIcon name="edit" size={20}/></span>
            </h1>
          )}
          <p style={{ color:'var(--ink-500)', marginTop: 16, fontSize: 15, maxWidth: 540 }}>
            Everything you've saved. Share it with the people you love — they can reserve a gift so nothing arrives twice.
          </p>
        </div>
        <div style={{ display:'flex', gap: 10, flexWrap:'wrap' }}>
          <button className="btn btn-outline" onClick={()=>setShowAdd(true)}>
            <NIcon name="plus" size={14}/> Add a custom item
          </button>
          <button className="btn btn-primary" onClick={()=>setShowShare(true)}>
            <NIcon name="share" size={14}/> Share wishlist
          </button>
        </div>
      </div>

      {/* Stat strip */}
      <div className="card" style={{
        display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 0,
        padding: 4, marginBottom: 36, overflow:'hidden',
      }} >
        <StatTile label="Saved" value={allItems.length} icon="heart"/>
        <StatTile label="Custom" value={customItems.length} icon="link"/>
        <StatTile label="Reserved" value={0} icon="check" note="When friends reserve a gift, it shows here."/>
        <StatTile label="Total value" value={formatPrice(allItems.reduce((s,i) => s + (i.kind==='product' ? i.product.price : (parseFloat(i.custom.price)||0)), 0), lang)} icon="bag"/>
      </div>

      {/* Items */}
      {allItems.length === 0 ? (
        <EmptyWishlist onAdd={()=>setShowAdd(true)} onBrowse={()=>navigate({name:'home'})}/>
      ) : (
        <div className="wishlist-grid" style={{
          display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
        }}>
          {allItems.map(it => (
            it.kind === 'product' ? (
              <WishlistProductCard key={it.id} product={it.product} 
                onOpen={()=>navigate({name:'detail', id: it.id})}
                onRemove={()=>removeFromWishlist(it.id)}
              />
            ) : (
              <WishlistCustomCard key={it.id} item={it.custom}
                onEdit={()=>setEditing(it.id)}
                onRemove={()=>removeCustomItem(it.id)}
              />
            )
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 980px){ .wishlist-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px){ .wishlist-grid{ grid-template-columns: 1fr !important; } }
        @media (max-width: 720px){
          .card > [data-stats]{ grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <CustomItemModal
        open={showAdd}
        onClose={()=>setShowAdd(false)}
        onSubmit={(it) => { addCustomItem(it); setShowAdd(false); addToast({ msg: 'Added to your wishlist.', icon: 'check'}); }}
      />
      <CustomItemModal
        open={!!editing}
        onClose={()=>setEditing(null)}
        editing={customItems.find(c => c.uid === editing)}
        onSubmit={(it) => { updateCustomItem(editing, it); setEditing(null); addToast({ msg: 'Updated.', icon: 'check' }); }}
      />
      <ShareModal
        open={showShare}
        onClose={()=>setShowShare(false)}
        url={getShareUrl()}
        title={wishlistTitle}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function StatTile({ label, value, icon, note }){
  return (
    <div style={{
      padding: '20px 22px', borderRight: '1px solid var(--line)',
      display:'flex', flexDirection:'column', gap: 4,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap: 8, color:'var(--ink-500)', fontSize: 11, letterSpacing:'.12em', textTransform:'uppercase', fontWeight: 600 }}>
        <NIcon name={icon} size={12}/> {label}
      </div>
      <div className="display" style={{ fontSize: 28, fontWeight: 500 }}>{value}</div>
      {note && <div style={{ fontSize: 11, color:'var(--ink-500)' }}>{note}</div>}
    </div>
  );
}

function EmptyWishlist({ onAdd, onBrowse }){
  return (
    <div className="card-soft" style={{
      padding: 64, textAlign:'center',
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 999, background: 'var(--petal-100)',
        margin: '0 auto 22px', display:'flex', alignItems:'center', justifyContent:'center',
        color: 'var(--petal-500)',
      }}>
        <NIcon name="heart" size={36}/>
      </div>
      <h3 className="display italic" style={{ fontSize: 28, margin: 0 }}>
        Your nest is empty.
      </h3>
      <p style={{ color:'var(--ink-500)', marginTop: 10, maxWidth: 460, marginInline:'auto' }}>
        Save something from the shop — or add a custom item from elsewhere with its link.
      </p>
      <div style={{ display:'inline-flex', gap: 10, marginTop: 22, flexWrap:'wrap', justifyContent:'center' }}>
        <button className="btn btn-primary" onClick={onBrowse}>Browse the shop</button>
        <button className="btn btn-outline" onClick={onAdd}><NIcon name="plus" size={14}/> Add a custom item</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function WishlistProductCard({ product, onOpen, onRemove }){
  const { lang, t } = useLang();
  return (
    <article className="card" style={{ overflow:'hidden', position:'relative', display:'flex', flexDirection:'column' }}>
      <div onClick={onOpen} style={{ cursor:'pointer' }}>
        <ProductArt product={product}/>
      </div>
      <div style={{ padding: 18, display:'flex', flexDirection:'column', flex: 1 }}>
        <div style={{
          display:'flex', justifyContent:'space-between', gap: 8,
          fontSize: 11, letterSpacing:'.12em', textTransform:'uppercase',
          color: 'var(--ink-500)', marginBottom: 6, fontWeight: 600,
        }}>
          <span>{NESTI_CATEGORIES.find(c=>c.id===product.cat)?.label}</span>
          <span style={{
            background:'var(--bg-soft)', color:'var(--ink-700)',
            padding:'2px 8px', borderRadius: 999, letterSpacing: '.04em',
          }}>Available</span>
        </div>
        <h4 style={{
          fontFamily:'var(--font-display)', fontWeight: 500, fontSize: 19,
          margin:'0 0 4px', letterSpacing:'-0.01em', color:'var(--ink-900)',
        }}>{product.name}</h4>
        <div style={{ fontSize: 14, color:'var(--ink-700)', marginBottom: 14 }}>{formatPrice(product.price, lang)}</div>

        <div style={{ display:'flex', gap: 8, marginTop: 'auto', justifyContent:'space-between' }}>
          <button className="btn btn-soft btn-sm" onClick={onOpen}>
            <NIcon name="link" size={12}/> View
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onRemove} aria-label="Remove">
            <NIcon name="trash" size={14}/>
          </button>
        </div>
      </div>
    </article>
  );
}

function WishlistCustomCard({ item, onEdit, onRemove }){
  const { lang, t } = useLang();
  return (
    <article className="card" style={{ overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <div style={{
        aspectRatio:'1/1', background:'var(--bg-soft)',
        display:'flex', alignItems:'center', justifyContent:'center', position:'relative',
      }}>
        {item.photo ? (
          <img src={item.photo} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        ) : (
          <div style={{ textAlign:'center', color:'var(--ink-500)' }}>
            <div style={{
              width: 64, height: 64, borderRadius: 999, background: 'var(--petal-50)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'var(--petal-400)', margin:'0 auto 8px',
            }}>
              <NIcon name="link" size={24}/>
            </div>
            <div style={{ fontSize: 12, fontFamily:'var(--font-display)', fontStyle:'italic' }}>From elsewhere</div>
          </div>
        )}
        <span style={{
          position:'absolute', top: 12, left: 12,
          background:'rgba(251,246,241,.9)', backdropFilter:'blur(8px)',
          padding:'4px 10px', borderRadius:999, fontSize: 11,
          color:'var(--ink-700)', fontWeight:500,
        }}>Custom</span>
      </div>
      <div style={{ padding: 18, display:'flex', flexDirection:'column', flex:1 }}>
        <div style={{
          display:'flex', justifyContent:'space-between', gap: 8,
          fontSize: 11, letterSpacing:'.12em', textTransform:'uppercase',
          color: 'var(--ink-500)', marginBottom: 6, fontWeight: 600,
        }}>
          <span>From elsewhere</span>
          <span style={{
            background:'var(--bg-soft)', color:'var(--ink-700)',
            padding:'2px 8px', borderRadius: 999, letterSpacing:'.04em',
          }}>Available</span>
        </div>
        <h4 style={{
          fontFamily:'var(--font-display)', fontWeight: 500, fontSize: 19,
          margin:'0 0 4px', letterSpacing:'-0.01em', color:'var(--ink-900)',
        }}>{item.name}</h4>
        <div style={{ fontSize: 14, color:'var(--ink-700)', marginBottom: 14 }}>
          {item.price ? `${formatPrice(item.price, lang)}` : 'Price not set'}
        </div>
        <div style={{ display:'flex', gap: 8, marginTop:'auto', justifyContent:'space-between' }}>
          {item.url ? (
            <a href={item.url} target="_blank" rel="noopener" className="btn btn-soft btn-sm" style={{ textDecoration:'none' }}>
              <NIcon name="link" size={12}/> Open link
            </a>
          ) : <span/>}
          <div style={{ display:'flex', gap: 4 }}>
            <button className="btn btn-ghost btn-sm" onClick={onEdit} aria-label="Edit"><NIcon name="edit" size={14}/></button>
            <button className="btn btn-ghost btn-sm" onClick={onRemove} aria-label="Remove"><NIcon name="trash" size={14}/></button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function CustomItemModal({ open, onClose, onSubmit, editing }){
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const fileRef = React.useRef();

  React.useEffect(() => {
    if (open){
      setName(editing?.name || '');
      setPrice(editing?.price || '');
      setUrl(editing?.url || '');
      setPhoto(editing?.photo || '');
    }
  }, [open, editing]);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setPhoto(e.target.result);
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, price, url, photo });
  };

  return (
    <Modal open={open} onClose={onClose} width={520}>
      <h3 className="display italic" style={{ fontSize: 32, margin: 0, lineHeight: 1.1 }}>
        {editing ? 'Edit item' : 'Add a custom item'}
      </h3>
      <p style={{ color:'var(--ink-500)', marginTop: 8, marginBottom: 24, fontSize: 14 }}>
        Saw something perfect somewhere else? Add it to your nest with the link.
      </p>
      <form onSubmit={submit} style={{ display:'grid', gap: 16 }}>
        <div>
          <label className="field-label">Item name *</label>
          <input className="input" required value={name} onChange={e=>setName(e.target.value)} placeholder="Walnut crib"/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label className="field-label">Price</label>
            <input className="input" inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value.replace(/[^0-9.]/g,''))} placeholder="320"/>
          </div>
          <div>
            <label className="field-label">Product link</label>
            <input className="input" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..."/>
          </div>
        </div>
        <div>
          <label className="field-label">Photo (optional)</label>
          <button type="button" onClick={()=>fileRef.current?.click()} style={{
            width: '100%', padding: 18, border: '1.5px dashed var(--line-strong)',
            borderRadius: 14, background: 'transparent', cursor:'pointer',
            color: 'var(--ink-500)', display:'flex', alignItems:'center', gap: 14,
          }}>
            {photo ? (
              <img src={photo} style={{ width: 64, height: 64, borderRadius: 10, objectFit:'cover' }}/>
            ) : (
              <div style={{
                width: 64, height: 64, borderRadius: 10, background: 'var(--petal-50)',
                display:'flex', alignItems:'center', justifyContent:'center', color:'var(--petal-400)', flexShrink:0,
              }}><NIcon name="plus" size={20}/></div>
            )}
            <div style={{ textAlign:'left' }}>
              <div style={{ fontSize: 14, color:'var(--ink-900)', fontWeight: 500 }}>{photo ? 'Change photo' : 'Upload a photo'}</div>
              <div style={{ fontSize: 12, color:'var(--ink-500)' }}>JPG or PNG, up to 5MB</div>
            </div>
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleFile(e.target.files?.[0])}/>
        </div>
        <div style={{ display:'flex', gap: 10, marginTop: 8 }}>
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {editing ? 'Save changes' : 'Add to wishlist'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function ShareModal({ open, onClose, url, title }){
  const { navigate, addToast } = useApp();
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef();

  React.useEffect(()=>{ if (open) setCopied(false); }, [open]);

  const copy = async () => {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(url);
      else { inputRef.current?.select(); document.execCommand('copy'); }
      setCopied(true);
      setTimeout(()=>setCopied(false), 2000);
    } catch (e) {}
  };

  const whatsapp = () => {
    const msg = encodeURIComponent(`Hi — I made a baby wishlist on Nesti: ${title}. You can have a look here (no signup needed): ${url}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <Modal open={open} onClose={onClose} width={500}>
      <div style={{
        width: 56, height: 56, borderRadius: 999, background: 'var(--petal-50)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'var(--petal-400)', marginBottom: 14,
      }}>
        <NIcon name="share" size={24}/>
      </div>
      <h3 className="display italic" style={{ fontSize: 30, margin: 0, lineHeight: 1.05 }}>Share your wishlist</h3>
      <p style={{ color:'var(--ink-500)', marginTop: 10, marginBottom: 22, fontSize: 14 }}>
        Anyone with this link can see your wishlist and reserve a gift quietly. No signup needed.
      </p>

      <label className="field-label">Public link</label>
      <div style={{ display:'flex', gap: 8 }}>
        <input ref={inputRef} className="input" value={url} readOnly onClick={e=>e.target.select()} style={{ fontSize: 13, fontFamily: 'ui-monospace, monospace' }}/>
        <button className={`btn ${copied ? 'btn-rose' : 'btn-primary'}`} onClick={copy} style={{ minWidth: 110 }}>
          {copied ? <><NIcon name="check" size={14}/> Copied</> : <><NIcon name="copy" size={14}/> Copy</>}
        </button>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap: 12, margin:'24px 0 12px', color:'var(--ink-500)' }}>
        <hr style={{ flex:1, border:0, borderTop:'1px solid var(--line)' }}/>
        <span style={{ fontSize: 12, letterSpacing:'.1em', textTransform:'uppercase' }}>or share via</span>
        <hr style={{ flex:1, border:0, borderTop:'1px solid var(--line)' }}/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 10 }}>
        <button className="btn btn-outline" onClick={()=>{ onClose(); navigate({name:'guest', wid:'demo'}); addToast?.({ msg: 'Sent to your friend on Nesti.', icon: 'check' }); }} style={{ padding: '14px 8px' }}>
          <NestiNMark/> Nesti
        </button>
        <button className="btn btn-outline" onClick={whatsapp} style={{ padding: '14px 8px' }}>
          <NIcon name="whatsapp" size={18}/> WhatsApp
        </button>
        <button className="btn btn-outline" onClick={()=>{ window.location.href = `mailto:?subject=${encodeURIComponent('My baby wishlist')}&body=${encodeURIComponent(`I made a wishlist on Nesti — have a look: ${url}`)}`; }} style={{ padding: '14px 8px' }}>
          <NIcon name="share" size={16}/> Email
        </button>
      </div>

      <div style={{
        marginTop: 22, padding: 14, background: 'var(--bg-soft)',
        borderRadius: 12, fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.5,
      }}>
        <strong style={{color:'var(--ink-900)'}}>Tip.</strong> When a friend reserves a gift, the item shows as <em>reserved</em> for everyone else, so nothing arrives twice.
      </div>
    </Modal>
  );
}

Object.assign(window, { WishlistPage, ShareModal, CustomItemModal });

// Small Nesti N-mark for share buttons
function NestiNMark(){
  return (
    <span style={{
      width: 20, height: 20, borderRadius: 6,
      background: 'var(--ink-900)', color: 'var(--bg)',
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      fontFamily: 'var(--font-display)', fontStyle: 'italic',
      fontSize: 13, fontWeight: 500, lineHeight: 1,
    }}>n</span>
  );
}
