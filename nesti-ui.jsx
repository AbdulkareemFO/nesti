// nesti-ui.jsx — shared UI primitives, icons, header, footer, product card

const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Icons (24px line icons, tuned for petal-rose UI)
const NIcon = ({ name, size = 20, stroke = "currentColor", strokeWidth = 1.6 }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
                   stroke, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    search:  <><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.5-3.5"/></>,
    heart:   <path d="M12 20s-7-4.35-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z"/>,
    heartFill: <path fill="currentColor" stroke="currentColor" d="M12 20s-7-4.35-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z"/>,
    bag:     <><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
    user:    <><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5"/></>,
    menu:    <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    close:   <><path d="M6 6l12 12"/><path d="M18 6l-12 12"/></>,
    plus:    <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus:   <path d="M5 12h14"/>,
    chev:    <path d="M9 6l6 6-6 6"/>,
    chevDown:<path d="M6 9l6 6 6-6"/>,
    arrowRight: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    arrowLeft:  <><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></>,
    check:   <path d="M5 12.5l4 4 10-10"/>,
    star:    <path d="M12 4l2.4 5.1 5.6.7-4.1 3.9 1.1 5.7L12 16.7 6.9 19.4 8 13.7 4 9.8l5.6-.7L12 4Z"/>,
    share:   <><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 11l8-4"/><path d="M8 13l8 4"/></>,
    link:    <><path d="M10 14a4 4 0 0 1 0-5.6l2.6-2.6a4 4 0 0 1 5.6 5.6L17 12.6"/><path d="M14 10a4 4 0 0 1 0 5.6l-2.6 2.6a4 4 0 0 1-5.6-5.6L7 11.4"/></>,
    copy:    <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></>,
    edit:    <><path d="M4 20l4-1 11-11-3-3L5 16l-1 4Z"/></>,
    trash:   <><path d="M5 7h14"/><path d="M10 7V5h4v2"/><path d="M7 7l1 12h8l1-12"/></>,
    eye:     <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff:  <><path d="M4 4l16 16"/><path d="M9 5.5C10 5.2 11 5 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3 3.7"/><path d="M6.5 7.5C3.6 9.3 2 12 2 12s3.5 7 10 7c1.6 0 3-.3 4.3-.8"/></>,
    home:    <><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></>,
    globe:   <><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.5 3 2.5 14 0 17"/><path d="M12 3.5c-2.5 3-2.5 14 0 17"/></>,
    sparkle: <><path d="M12 4v5"/><path d="M12 15v5"/><path d="M4 12h5"/><path d="M15 12h5"/></>,
    lock:    <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
    whatsapp:<><path d="M20.5 12a8.5 8.5 0 1 0-15.7 4.5L4 21l4.7-1.1A8.5 8.5 0 0 0 20.5 12Z"/><path d="M9 9c.5-.5 1.5-.5 2 .5l.7 1.3-.7 1c.7 1.3 1.6 2.2 2.9 2.9l1-.7 1.3.7c1 .5 1 1.5.5 2-.7.7-1.8 1-3 .5-2.4-1-4.6-3.2-5.6-5.6-.5-1.2-.2-2.3.5-3Z"/></>,
    rabbit:  <><path d="M9 4c.4 2 .8 4 1.5 5.5"/><path d="M15 4c-.4 2-.8 4-1.5 5.5"/><circle cx="12" cy="14" r="5"/><circle cx="10.5" cy="13" r=".7" fill="currentColor"/><circle cx="13.5" cy="13" r=".7" fill="currentColor"/><path d="M11 16h2"/></>,
    bottle:  <><path d="M9 3h6"/><path d="M10 3v3"/><path d="M14 3v3"/><path d="M9 6h6c.5 0 1 .5 1 1v13c0 .5-.5 1-1 1H9c-.5 0-1-.5-1-1V7c0-.5.5-1 1-1Z"/><path d="M9 11h6"/></>,
    moon:    <path d="M20 14.5A8 8 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>,
    shirt:   <><path d="M7 6l-3 2 2 3 2-1v10h8V10l2 1 2-3-3-2-3 1c-1 1-3 1-4 0L7 6Z"/></>,
    drop:    <path d="M12 3s-6 6-6 10a6 6 0 0 0 12 0c0-4-6-10-6-10Z"/>,
    rose:    <><circle cx="12" cy="9" r="4"/><path d="M12 13v8"/><path d="M9 18c-3 0-4-2-4-4"/><path d="M15 18c3 0 4-2 4-4"/></>,
    bowl:    <><path d="M3 11h18l-2 9H5l-2-9Z"/><path d="M8 11c0-2 2-3 4-3s4 1 4 3"/></>,
    lantern: <><rect x="8" y="6" width="8" height="12" rx="2"/><path d="M10 3h4"/><path d="M10 21h4"/></>,
    blanket: <><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 6v12"/><path d="M12 6v12"/><path d="M16 6v12"/></>,
    rings:   <><circle cx="12" cy="14" r="5"/><circle cx="12" cy="9" r="3"/></>,
    leaf:    <><path d="M5 19c0-9 6-15 15-15-1 9-6 15-15 15Z"/><path d="M5 19l9-9"/></>,
    bag2:    <><path d="M4 8h16l-1 12H5L4 8Z"/><path d="M8 8a4 4 0 0 1 8 0"/></>,
  };
  const map = { bottle: paths.bottle, bowl: paths.bowl, moon: paths.moon, shirt: paths.shirt,
                rabbit: paths.rabbit, drop: paths.drop, rose: paths.rose,
                lantern: paths.lantern, blanket: paths.blanket, rings: paths.rings, leaf: paths.leaf, bag: paths.bag2 };
  const content = paths[name] || map[name] || null;
  return <svg {...common}>{content}</svg>;
};

// ─────────────────────────────────────────────────────────────────────────────
// Logo
const NestiLogo = ({ size = 36, color = "currentColor" }) => (
  <span style={{
    fontFamily: 'var(--font-display)',
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: size,
    letterSpacing: '-0.02em',
    color,
    display: 'inline-flex',
    alignItems: 'baseline',
    lineHeight: 1,
  }}>
    Nesti
    <span style={{
      width: 6, height: 6, borderRadius: 999,
      background: 'var(--petal-400)', display: 'inline-block',
      marginLeft: 2, alignSelf: 'flex-end', marginBottom: size * 0.12,
    }}/>
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// Placeholder product art (CSS only — no real images by user's choice)
const ProductArt = ({ product, size = "md", style = {} }) => {
  const pal = NESTI_PALETTES[product.color] || NESTI_PALETTES.blush;
  const heights = { sm: 160, md: 260, lg: 420, xl: 520 };
  const glyphSize = { sm: 64, md: 96, lg: 180, xl: 220 }[size] || 96;
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1 / 1',
      minHeight: heights[size] || 260,
      background: pal.bg,
      borderRadius: 'inherit',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style
    }}>
      {/* soft circular highlight */}
      <div style={{
        position:'absolute', inset:0,
        background: `radial-gradient(60% 55% at 30% 30%, ${pal.accent}80, transparent 65%)`,
      }}/>
      <div style={{
        position:'absolute', width:'62%', aspectRatio:'1/1', borderRadius:'50%',
        background: `radial-gradient(circle at 35% 35%, #fff8, ${pal.accent}40 30%, transparent 70%)`,
      }}/>
      <div style={{
        position: 'relative',
        width: glyphSize, height: glyphSize,
        display:'flex', alignItems:'center', justifyContent:'center',
        color: pal.fg, opacity: .9,
      }}>
        <NIcon name={product.glyph} size={glyphSize} strokeWidth={1.2} />
      </div>
      {/* tiny brand mark in bottom-left */}
      {product.brand && size !== "sm" && (
        <div style={{
          position:'absolute', left: 16, bottom: 14,
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          color: pal.fg, opacity: .55, fontSize: 13, letterSpacing: '.02em',
        }}>{product.brand}</div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// App state context (single source of truth across pages)
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

function makeUid(){ return Math.random().toString(36).slice(2,9); }

// ─────────────────────────────────────────────────────────────────────────────
// Toaster
function Toaster({ toasts }){
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div className="toast" key={t.id}>
          {t.icon && <NIcon name={t.icon} size={16} />}
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal
function Modal({ open, onClose, children, width = 520, title, hideClose = false }){
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(42,26,20,.32)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'nesti-fade-in .2s ease both',
    }} onClick={onClose}>
      <div className="card pop" onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: width, padding: 32,
        boxShadow: 'var(--shadow-lg)',
        maxHeight: 'calc(100vh - 40px)', overflow:'auto',
        position: 'relative',
      }}>
        {!hideClose && (
          <button className="btn btn-ghost btn-icon" onClick={onClose}
                  style={{ position:'absolute', top: 14, right: 14 }} aria-label="Close">
            <NIcon name="close" size={18}/>
          </button>
        )}
        {title && <h3 className="display" style={{ fontSize: 28, margin: '0 0 8px' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Product Card (compact, premium)
function ProductCard({ product, onOpen }){
  const { wishlistIds, toggleWishlist, addToCart, requireAuth, signedIn } = useApp();
  const { lang, t } = useLang();
  const inWishlist = wishlistIds.has(product.id);
  const catLabel = NESTI_CATEGORIES.find(c=>c.id===product.cat)?.label;
  const ageLabel = product.age?.[0] ? NESTI_AGES.find(a=>a.id===product.age[0])?.label : null;

  const onWishlist = (e) => {
    e.stopPropagation();
    if (!signedIn){
      requireAuth({ reason: 'wishlist', pendingProductId: product.id });
      return;
    }
    toggleWishlist(product.id);
  };

  const onAdd = (e) => {
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <article className="product-card fade-in" onClick={() => onOpen(product.id)} style={{
      cursor:'pointer', position:'relative',
      background: 'transparent', borderRadius: 'var(--r-lg)',
      transition: 'transform .2s ease',
    }}>
      <div style={{
        position:'relative', borderRadius: 'var(--r-lg)', overflow:'hidden',
        background: 'var(--surface)',
      }}>
        <ProductArt product={product} size="md" />
        <button onClick={onWishlist} aria-label="Add to wishlist"
                style={{
                  position:'absolute', top: 12, right: 12,
                  width: 38, height: 38, border: 0, cursor: 'pointer',
                  background: '#fff', borderRadius: 999,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow: 'var(--shadow-sm)',
                  color: inWishlist ? 'var(--petal-500)' : 'var(--ink-700)',
                  transition: 'transform .15s',
                }}>
          <NIcon name={inWishlist ? 'heartFill' : 'heart'} size={18}/>
        </button>
      </div>
      <div style={{ padding: '14px 4px 0' }}>
        <div style={{
          display:'flex', justifyContent:'space-between', gap: 8,
          fontSize: 11, letterSpacing: '.06em', textTransform:'uppercase',
          color: 'var(--ink-500)', marginBottom: 6,
        }}>
          <span>{t('cat.' + product.cat)}</span>
          {ageLabel && <span>{ageLabel}</span>}
        </div>
        <h4 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 19, lineHeight: 1.2,
          margin: '0 0 6px',
          color: 'var(--ink-900)',
          letterSpacing: '-0.01em',
        }}>{product.name}</h4>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>{formatPrice(product.price, lang)}</span>
          <button className="btn btn-soft btn-sm" onClick={onAdd}>
            <NIcon name="plus" size={14}/> {t('pc.add')}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header
function Header(){
  const { route, navigate, cartCount, wishlistCount, signedIn, signOut, openSearch, query, setQuery } = useApp();
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const isHome = route.name === 'home';

  return (
    <>
      {/* Top utility strip */}
      <div style={{
        background: 'var(--ink-900)', color: 'var(--bg)',
        fontSize: 12, letterSpacing: lang==='ar' ? 0 : '.06em', textTransform: lang==='ar' ? 'none' : 'uppercase',
        textAlign: 'center', padding: '9px 16px',
      }}>
        {t('strip.before')}
        <span style={{ fontStyle: lang==='ar' ? 'normal' : 'italic', textTransform:'none', letterSpacing:'.01em', margin: '0 6px', fontFamily: lang==='ar' ? 'var(--font-ar-serif)' : 'var(--font-display)' }}>
          {t('strip.slogan')}
        </span> {t('strip.after')}
      </div>

      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(251,246,241,.88)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div className="container" style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          height: 76, gap: 16,
        }}>
          <button className="btn btn-ghost" onClick={() => navigate({name:'home'})}
                  style={{ padding: 0, background:'transparent' }}>
            <NestiLogo size={30}/>
          </button>

          {/* Category nav */}
          <nav className="cat-nav" style={{
            display:'flex', gap: 26, alignItems:'center',
          }}>
            {NESTI_CATEGORIES.map(c => (
              <button key={c.id} className="catlink"
                onClick={() => navigate({ name:'shop', cat: c.id })}
                style={{
                  background:'transparent', border:0, cursor:'pointer',
                  fontSize: 13.5, fontWeight: 500, color: 'var(--ink-700)',
                  fontFamily: lang==='ar' ? 'var(--font-ar-sans)' : 'var(--font-sans)',
                  padding: '6px 0', letterSpacing: lang==='ar' ? 0 : '.02em',
                }}>{t('cat.' + c.id)}</button>
            ))}
          </nav>

          <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
            <button className="btn btn-ghost btn-icon search-btn" onClick={openSearch} aria-label={t('a11y.search')}>
              <NIcon name="search" size={18}/>
            </button>
            <button className="btn btn-ghost btn-icon" onClick={() => navigate({name:'home'})} aria-label={t('a11y.home')} title={t('a11y.home')}>
              <NIcon name="home" size={18}/>
            </button>
            <button className="btn btn-ghost" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              aria-label={lang === 'en' ? 'العربية' : 'English'}
              title={lang === 'en' ? 'العربية' : 'English'}
              style={{
                width: 40, height: 40, padding: 0, borderRadius: 999,
                fontSize: 12, fontWeight: 600, letterSpacing: '.05em',
                display:'inline-flex', alignItems:'center', justifyContent:'center', gap: 4,
              }}>
              <NIcon name="globe" size={16}/>
              <span style={{ fontSize: 11 }}>{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <div style={{ position:'relative' }}>
              <button className="btn btn-ghost btn-icon" onClick={() => {
                if (!signedIn) { setAccountOpen(o=>!o); }
                else { setAccountOpen(o=>!o); }
              }} aria-label="Account">
                <NIcon name="user" size={18}/>
              </button>
              {accountOpen && (
                <div onMouseLeave={()=>setAccountOpen(false)} className="card" style={{
                  position:'absolute', right: 0, top: 50, width: 220,
                  padding: 8, boxShadow: 'var(--shadow-md)', zIndex: 60,
                }}>
                  {!signedIn ? (
                    <>
                      <button className="dropdown-item" onClick={()=>{ setAccountOpen(false); navigate({name:'signup'}); }}>{t('header.createAccount')}</button>
                      <button className="dropdown-item" onClick={()=>{ setAccountOpen(false); navigate({name:'login'}); }}>{t('header.login')}</button>
                    </>
                  ) : (
                    <>
                      <div style={{ padding:'10px 12px', fontSize: 12, color:'var(--ink-500)' }}>{t('header.hi')} {signedIn.name.split(' ')[0]}</div>
                      <button className="dropdown-item" onClick={()=>{ setAccountOpen(false); navigate({name:'wishlist'}); }}>{t('header.myWishlist')}</button>
                      <button className="dropdown-item" onClick={()=>{ setAccountOpen(false); navigate({name:'cart'}); }}>{t('header.myCart')}</button>
                      <button className="dropdown-item" onClick={()=>{ setAccountOpen(false); signOut(); }}>{t('header.signOut')}</button>
                    </>
                  )}
                </div>
              )}
            </div>
            <button className="btn btn-ghost btn-icon" onClick={() => navigate({name:'wishlist'})} aria-label={t('a11y.wishlist')} style={{ position:'relative' }}>
              <NIcon name="heart" size={18}/>
              {wishlistCount > 0 && <Badge value={wishlistCount}/>}
            </button>
            <button className="btn btn-ghost btn-icon" onClick={() => navigate({name:'cart'})} aria-label={t('a11y.cart')} style={{ position:'relative' }}>
              <NIcon name="bag" size={18}/>
              {cartCount > 0 && <Badge value={cartCount}/>}
            </button>
            <button className="btn btn-ghost btn-icon hamburger" onClick={()=>setMenuOpen(true)} aria-label={t('a11y.menu')}>
              <NIcon name="menu" size={20}/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <Modal open={menuOpen} onClose={()=>setMenuOpen(false)} width={420}>
        <h3 className="display" style={{fontSize: 26, margin:'0 0 18px'}}>{t('foot.shop')}</h3>
        <div style={{display:'grid', gap: 4}}>
          {NESTI_CATEGORIES.map(c => (
            <button key={c.id} className="dropdown-item" onClick={()=>{setMenuOpen(false); navigate({name:'shop', cat: c.id});}}>
              {t('cat.' + c.id)}
            </button>
          ))}
        </div>
        <hr style={{border:0, borderTop:'1px solid var(--line)', margin:'18px 0'}}/>
        <div style={{display:'grid', gap: 4}}>
          <button className="dropdown-item" onClick={()=>{setMenuOpen(false); navigate({name:'wishlist'});}}>{t('a11y.wishlist')}</button>
          <button className="dropdown-item" onClick={()=>{setMenuOpen(false); navigate({name:'cart'});}}>{t('a11y.cart')}</button>
          {!signedIn && <button className="dropdown-item" onClick={()=>{setMenuOpen(false); navigate({name:'signup'});}}>{t('header.createAccount')}</button>}
          {!signedIn && <button className="dropdown-item" onClick={()=>{setMenuOpen(false); navigate({name:'login'});}}>{t('header.login')}</button>}
        </div>
      </Modal>

      <style>{`
        .dropdown-item{
          appearance:none; border:0; background:transparent; cursor:pointer;
          width: 100%; text-align:left; padding: 10px 12px;
          font: 14px/1.3 var(--font-sans); color: var(--ink-900);
          border-radius: 10px;
        }
        .dropdown-item:hover{ background: var(--petal-50); }
        .hamburger{ display:none; }
        @media (max-width: 980px){
          .cat-nav{ display:none; }
          .hamburger{ display: inline-flex; }
        }
      `}</style>
    </>
  );
}

function Badge({ value }){
  return (
    <span style={{
      position:'absolute', top: 4, right: 4,
      background: 'var(--petal-400)', color: '#fff',
      borderRadius: 999, minWidth: 16, height: 16,
      padding: '0 4px', fontSize: 10, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      lineHeight: 1,
    }}>{value}</span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
function Footer(){
  const { navigate } = useApp();
  const { t } = useLang();
  return (
    <footer style={{
      marginTop: 'auto',
      background: 'var(--ink-900)', color: 'var(--bg)',
      padding: '72px 0 36px',
    }}>
      <div className="container footer-grid" style={{
        display:'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 36,
      }}>
        <div>
          <NestiLogo size={32} color="var(--bg)"/>
          <p style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.3, margin: '20px 0 8px',
            color: 'var(--bg)', maxWidth: 320,
          }}>{t('foot.slogan')}</p>
          <p style={{ color: '#fbf6f199', fontSize: 13, maxWidth: 320 }}>
            {t('foot.about')}
          </p>
        </div>
        <div>
          <h5 style={{ fontSize: 11, letterSpacing: '.12em', textTransform:'uppercase', color: '#fbf6f199', margin:'0 0 14px' }}>{t('foot.shop')}</h5>
          {NESTI_CATEGORIES.map(c => (
            <div key={c.id}>
              <button onClick={() => navigate({name:'shop', cat: c.id})} style={{ background:'transparent', border:0, color:'var(--bg)', padding:'4px 0', cursor:'pointer', fontSize: 14 }}>{t('cat.' + c.id)}</button>
            </div>
          ))}
        </div>
        <div>
          <h5 style={{ fontSize: 11, letterSpacing: '.12em', textTransform:'uppercase', color: '#fbf6f199', margin:'0 0 14px' }}>{t('foot.forMothers')}</h5>
          <div><button onClick={()=>navigate({name:'wishlist'})} style={{ background:'transparent', border:0, color:'var(--bg)', padding:'4px 0', cursor:'pointer', fontSize: 14 }}>{t('foot.startWl')}</button></div>
          <div><button onClick={()=>navigate({name:'guest', wid: 'demo'})} style={{ background:'transparent', border:0, color:'var(--bg)', padding:'4px 0', cursor:'pointer', fontSize: 14 }}>{t('foot.findWl')}</button></div>
          <div><button style={{ background:'transparent', border:0, color:'var(--bg)', padding:'4px 0', cursor:'pointer', fontSize: 14 }}>{t('foot.giftcards')}</button></div>
        </div>
        <div>
          <h5 style={{ fontSize: 11, letterSpacing: '.12em', textTransform:'uppercase', color: '#fbf6f199', margin:'0 0 14px' }}>{t('foot.letters')}</h5>
          <p style={{color: '#fbf6f199', fontSize: 13, margin: '0 0 12px'}}>{t('foot.lettersSub')}</p>
          <form onSubmit={e=>{e.preventDefault();}} style={{display:'flex', gap: 6}}>
            <input className="input" placeholder="you@home.com" style={{ background:'transparent', color:'var(--bg)', borderColor:'#fbf6f133' }}/>
            <button className="btn btn-rose btn-sm" type="submit"><NIcon name="arrowRight" size={14}/></button>
          </form>
        </div>
      </div>
      <div className="container" style={{
        borderTop: '1px solid #fbf6f122', marginTop: 56, paddingTop: 24,
        display:'flex', justifyContent:'space-between', alignItems:'center',
        color: '#fbf6f199', fontSize: 12,
      }}>
        <span>{t('foot.copyright')}</span>
        <span>{t('foot.legal')}</span>
      </div>
      <style>{`
        @media (max-width: 860px){ .footer-grid{ grid-template-columns: 1fr 1fr !important; gap: 28px !important; } }
        @media (max-width: 540px){ .footer-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section heading
function SectionHeading({ eyebrow, title, sub, cta }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 20, marginBottom: 28, flexWrap:'wrap' }}>
      <div>
        {eyebrow && <div style={{
          fontSize: 11, letterSpacing: '.14em', textTransform:'uppercase',
          color: 'var(--petal-500)', marginBottom: 10, fontWeight: 600,
        }}>{eyebrow}</div>}
        <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: 0, fontWeight: 500 }}>{title}</h2>
        {sub && <p style={{ color: 'var(--ink-500)', maxWidth: 520, marginTop: 12, fontSize: 15 }}>{sub}</p>}
      </div>
      {cta}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stars (for review counts)
function Stars({ count = 5, value = 5, size = 12 }){
  return (
    <span style={{ display:'inline-flex', gap: 2, color: 'var(--petal-400)' }}>
      {[...Array(count)].map((_,i)=><NIcon key={i} name="star" size={size} />)}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Search overlay
function SearchOverlay({ open, onClose }){
  const { navigate } = useApp();
  const { lang, t } = useLang();
  const [q, setQ] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (open){
      setQ('');
      setTimeout(() => inputRef.current?.focus(), 50);
      const onKey = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }
  }, [open, onClose]);

  if (!open) return null;

  const term = q.trim().toLowerCase();
  const matches = term ? NESTI_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.brand.toLowerCase().includes(term) ||
    p.desc.toLowerCase().includes(term) ||
    (NESTI_CATEGORIES.find(c=>c.id===p.cat)?.label.toLowerCase().includes(term))
  ).slice(0, 8) : [];

  const popular = ['Cot sheet','Bottle','Sleepsuit','Hooded towel','Lullaby','Bunny'];

  const go = (product) => {
    onClose();
    navigate({ name:'detail', id: product.id });
  };

  return (
    <div style={{
      position:'fixed', inset: 0, zIndex: 300,
      background: 'rgba(42,26,20,.32)', backdropFilter: 'blur(8px)',
      animation: 'nesti-fade-in .2s ease both',
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background: 'var(--bg)',
        maxWidth: 680, margin: '64px auto 0',
        borderRadius: 'var(--r-xl)',
        boxShadow: 'var(--shadow-lg)',
        overflow:'hidden',
        animation: 'nesti-fade-in .25s ease both',
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap: 14,
          padding: '18px 22px',
          borderBottom: '1px solid var(--line)',
        }}>
          <NIcon name="search" size={20} stroke="var(--ink-500)"/>
          <input
            ref={inputRef}
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Search the nest…"
            style={{
              flex: 1, border: 0, outline: 'none', background:'transparent',
              fontSize: 18, fontFamily:'var(--font-display)', fontStyle:'italic',
              color:'var(--ink-900)',
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && matches[0]) go(matches[0]);
            }}
          />
          <button onClick={onClose} className="btn btn-ghost btn-sm" aria-label="Close">
            <NIcon name="close" size={16}/>
          </button>
        </div>

        <div style={{ maxHeight: 'min(560px, calc(100vh - 200px))', overflow: 'auto' }}>
          {term && matches.length === 0 && (
            <div style={{ padding: '36px 24px', textAlign:'center', color:'var(--ink-500)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 20, color:'var(--ink-900)', marginBottom: 6 }}>Nothing matched.</div>
              <div style={{ fontSize: 13 }}>Try another word, or browse by category.</div>
            </div>
          )}
          {!term && (
            <div style={{ padding: '18px 22px' }}>
              <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform:'uppercase', color:'var(--ink-500)', fontWeight: 600, marginBottom: 12 }}>
                Popular searches
              </div>
              <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
                {popular.map(p => (
                  <button key={p} className="chip" onClick={()=>setQ(p)}>{p}</button>
                ))}
              </div>
              <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform:'uppercase', color:'var(--ink-500)', fontWeight: 600, margin: '22px 0 12px' }}>
                Browse categories
              </div>
              <div style={{ display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {NESTI_CATEGORIES.map(c => (
                  <button key={c.id} onClick={()=>{ onClose(); navigate({name:'shop', cat: c.id}); }} style={{
                    padding: '12px 14px', background:'var(--surface)', border:'1px solid var(--line)',
                    borderRadius: 12, cursor:'pointer', textAlign:'left',
                    display:'flex', alignItems:'center', gap: 10, color:'var(--ink-900)',
                    fontSize: 14, fontWeight: 500,
                  }}>
                    <span style={{ color:'var(--petal-400)' }}><NIcon name={c.glyph} size={18}/></span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {matches.length > 0 && (
            <div style={{ padding: '8px' }}>
              {matches.map(p => (
                <button key={p.id} onClick={()=>go(p)} style={{
                  width:'100%', textAlign:'left', background:'transparent', border:0, cursor:'pointer',
                  display:'grid', gridTemplateColumns: '52px 1fr auto', gap: 14, alignItems:'center',
                  padding: 10, borderRadius: 14,
                }} onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                   onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, overflow:'hidden' }}>
                    <ProductArt product={p} size="sm" style={{ minHeight: 52 }}/>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily:'var(--font-display)', fontSize: 16, fontWeight: 500, color:'var(--ink-900)', letterSpacing:'-0.01em' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color:'var(--ink-500)' }}>{p.brand} · {NESTI_CATEGORIES.find(c=>c.id===p.cat)?.label}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color:'var(--ink-900)' }}>{formatPrice(p.price, lang)}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
Object.assign(window, {
  NIcon, NestiLogo, ProductArt, ProductCard, Header, Footer, Modal,
  SectionHeading, Stars, AppCtx, useApp, Toaster, Badge, makeUid,
  SearchOverlay,
});
