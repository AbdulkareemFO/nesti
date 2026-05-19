// nesti-home.jsx — Homepage with multiple hero variants

const { useState: useStateH, useMemo: useMemoH } = React;

function HomePage(){
  const { navigate, addToCart, requireAuth, signedIn, tweaks } = useApp();
  const { lang, t } = useLang();
  const [activeCat, setActiveCat] = useStateH('all');
  const [activeAge, setActiveAge] = useStateH('all');
  const [activeGender, setActiveGender] = useStateH('all');

  const filtered = useMemoH(() => {
    return NESTI_PRODUCTS.filter(p =>
      (activeCat === 'all' || p.cat === activeCat) &&
      (activeAge === 'all' || (p.age || []).includes(activeAge)) &&
      (activeGender === 'all' || p.gender === activeGender || (activeGender === 'neutral' && p.gender === 'mom'))
    );
  }, [activeCat, activeAge, activeGender]);

  const featured = NESTI_FEATURED.map(id => NESTI_PRODUCT_BY_ID[id]).filter(Boolean);
  const newIn = NESTI_NEW_IN.map(id => NESTI_PRODUCT_BY_ID[id]).filter(Boolean);

  const catItems = [{id:'all', label: t('lbl.everything')}, ...NESTI_CATEGORIES.map(c => ({ id: c.id, label: t('cat.' + c.id) }))];
  const ageItems = [{id:'all', label: t('age.all')}, ...NESTI_AGES.map(a => ({ id: a.id, label: t('age.' + a.id) }))];
  const genderItems = NESTI_GENDERS.map(g => ({ id: g.id, label: t('gender.' + g.id) }));

  return (
    <div>
      <Hero variant={tweaks.hero} />

      {/* Category browse strip */}
      <section className="container" style={{ paddingTop: 96, paddingBottom: 24 }}>
        <SectionHeading
          eyebrow={t('sec.theShop')}
          title={t('sec.gentleTitle')}
          sub={t('sec.gentleSub')}
        />
        <div style={{
          display:'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 14,
        }} className="cat-grid">
          {NESTI_CATEGORIES.map((c, i) => (
            <button key={c.id} onClick={()=>navigate({name:'shop', cat: c.id})}
              className="cat-tile"
              style={{
                cursor:'pointer', border: 0, padding: 0, textAlign:'center',
                background: 'transparent',
                animation: `nesti-fade-in .5s ease both`,
                animationDelay: `${i * 60}ms`,
              }}>
              <div style={{
                aspectRatio: '1 / 1.05',
                background: ['var(--petal-50)', 'var(--bg-soft)', 'var(--petal-100)', 'var(--surface-2)', 'var(--petal-50)', 'var(--bg-soft)'][i],
                borderRadius: 'var(--r-lg)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color: 'var(--petal-500)',
                transition: 'transform .25s ease, box-shadow .25s ease',
                marginBottom: 10,
              }}>
                <NIcon name={c.glyph} size={56} strokeWidth={1.2}/>
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500,
                color: 'var(--ink-900)', letterSpacing: '-0.01em',
              }}>{t('cat.' + c.id)}</div>
            </button>
          ))}
        </div>
        <style>{`
          .cat-tile:hover > div:first-child{
            transform: translateY(-3px);
            box-shadow: var(--shadow-md);
          }
          @media (max-width: 980px){ .cat-grid{ grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 480px){ .cat-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </section>

      {/* Age + Category filter row */}
      <section className="container" style={{ paddingTop: 64, paddingBottom: 24 }}>
        <SectionHeading
          eyebrow={t('sec.shopEdit')}
          title={t('sec.byAge')}
          sub={t('sec.byAgeSub')}
        />
        <FilterRow label={t('lbl.age')} items={ageItems} value={activeAge} onChange={setActiveAge} />
        <FilterRow label={t('lbl.for')} items={genderItems} value={activeGender} onChange={setActiveGender} />
        <FilterRow label={t('lbl.category')} items={catItems} value={activeCat} onChange={setActiveCat} />

        <div style={{ marginTop: 32 }}>
          <ProductGrid products={filtered} navigate={navigate} />
        </div>

        {filtered.length > 8 && (
          <div style={{ display:'flex', justifyContent:'center', marginTop: 36 }}>
            <button className="btn btn-outline" onClick={() => navigate({name:'shop'})}>
              {t('sec.viewWhole')} <NIcon name="arrowRight" size={14} className="icon-flip"/>
            </button>
          </div>
        )}
      </section>

      {/* Wishlist promo strip */}
      <WishlistPromo navigate={navigate} signedIn={signedIn} requireAuth={requireAuth} />

      {/* Featured */}
      <section className="container" style={{ paddingTop: 96, paddingBottom: 24 }}>
        <SectionHeading
          eyebrow={t('sec.firstArrivals')}
          title={t('sec.piecesWeChose')}
          sub={t('sec.piecesWeChoseSub')}
        />
        <ProductGrid products={featured} navigate={navigate}/>
      </section>

      {/* Editorial banner */}
      <Editorial />

      {/* New in */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 96 }}>
        <SectionHeading
          eyebrow={t('sec.recentlyIn')}
          title={t('sec.softNews')}
        />
        <ProductGrid products={newIn} navigate={navigate}/>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — three variants by tweak: split | centered | full
function Hero({ variant = 'split' }){
  const { navigate, requireAuth, signedIn } = useApp();
  const { lang, t } = useLang();

  const startWishlist = () => {
    if (!signedIn) requireAuth({ reason: 'wishlist' });
    else navigate({ name: 'wishlist' });
  };

  if (variant === 'centered'){
    return (
      <section style={{ background: 'var(--bg-soft)', overflow:'hidden', position:'relative' }}>
        <div className="container" style={{ padding: '96px 28px 88px', textAlign:'center', position:'relative' }}>
          <div style={{
            fontSize: 12, letterSpacing: '.18em', textTransform:'uppercase',
            color: 'var(--petal-500)', fontWeight: 600, marginBottom: 22,
          }}>· N · E · S · T · I ·</div>
          <h1 className="display italic" style={{
            fontSize: 'clamp(40px, 7vw, 88px)', margin: 0,
            maxWidth: 880, marginInline: 'auto',
          }}>
            {t('hero.centeredTitle')}
          </h1>
          <p style={{
            fontSize: 17, color: 'var(--ink-500)', maxWidth: 560,
            margin: '24px auto 32px', lineHeight: 1.55,
          }}>
            {t('hero.centeredSub')}
          </p>
          <div style={{ display:'inline-flex', gap: 12, flexWrap:'wrap', justifyContent:'center' }}>
            <button className="btn btn-primary btn-lg" onClick={()=>navigate({name:'shop'})}>{t('hero.shopTheNest')}</button>
            <button className="btn btn-outline btn-lg" onClick={startWishlist}>{t('hero.startWishlist')} <NIcon name="heart" size={14}/></button>
          </div>
          <SoftStat />
        </div>
      </section>
    );
  }

  if (variant === 'full'){
    return (
      <section style={{ position:'relative', minHeight: 620, background:'var(--petal-50)' }}>
        <div style={{ position:'absolute', inset: 0, overflow:'hidden' }}>
          <div style={{
            position:'absolute', top: '-15%', right: '-10%', width: '70%', aspectRatio:'1/1',
            background: 'radial-gradient(circle at 30% 30%, var(--petal-200), var(--petal-100) 50%, transparent 75%)',
            opacity: .9,
          }}/>
          <div style={{
            position:'absolute', bottom: '-20%', left: '-15%', width: '60%', aspectRatio:'1/1',
            background: 'radial-gradient(circle at 60% 40%, var(--bg-soft), transparent 70%)',
          }}/>
        </div>
        <div className="container" style={{ position:'relative', padding: '120px 28px 100px' }}>
          <div style={{
            fontSize: 12, letterSpacing: '.18em', textTransform:'uppercase',
            color: 'var(--petal-500)', fontWeight: 600, marginBottom: 22,
          }}>{t('hero.fullEyebrow')}</div>
          <h1 className="display italic" style={{
            fontSize: 'clamp(44px, 8vw, 110px)', margin: 0, lineHeight: 1,
            maxWidth: 1000,
          }}>
            {t('hero.fullTitle1')}<br/>{t('hero.fullTitle2')}
          </h1>
          <p style={{
            fontSize: 18, color: 'var(--ink-700)', maxWidth: 480, marginTop: 28,
          }}>
            {t('hero.fullSub')}
          </p>
          <div style={{ display:'flex', gap: 12, marginTop: 36, flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={()=>navigate({name:'shop'})}>{t('hero.shopNow')}</button>
            <button className="btn btn-outline btn-lg" onClick={startWishlist}>{t('hero.startWishlist')}</button>
          </div>
        </div>
      </section>
    );
  }

  // Default: split (image collage right, copy left)
  return (
    <section style={{ background: 'var(--bg)', overflow:'hidden' }}>
      <div className="container hero-split" style={{
        display:'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56,
        padding: '76px 28px 76px',
        alignItems:'center',
      }}>
        <div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap: 8,
            padding: '6px 12px', borderRadius: 999, background: 'var(--petal-50)',
            color: 'var(--petal-500)', fontSize: 12, fontWeight: 600, letterSpacing: lang==='ar' ? 0 : '.06em',
            marginBottom: 28,
          }}>
            <NIcon name="sparkle" size={12}/> {t('hero.eyebrowNew')}
          </div>
          <h1 className="display italic" style={{
            fontSize: 'clamp(42px, 6.4vw, 86px)', margin: 0, lineHeight: 1,
          }}>
            {t('hero.title1')}<br/>
            <span style={{ fontStyle:'normal' }}>{t('hero.title2')}</span><br/>
            {t('hero.title3')}
          </h1>
          <div style={{ display:'flex', gap: 12, marginTop: 36, flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={()=>navigate({name:'shop'})}>
              {t('hero.shopNow')}
            </button>
            <button className="btn btn-outline btn-lg" onClick={startWishlist}>
              {t('hero.startWishlist')} <NIcon name="heart" size={14}/>
            </button>
          </div>
        </div>

        {/* Collage right */}
        <div style={{ position:'relative', height: 540 }} className="hero-collage">
          <CollageCard product={NESTI_PRODUCT_BY_ID.p04} style={{
            position:'absolute', top: 10, right: 12, width: '68%', height: 380, transform:'rotate(-3deg)',
          }}/>
          <CollageCard product={NESTI_PRODUCT_BY_ID.p16} style={{
            position:'absolute', bottom: 20, left: 0, width: '52%', height: 280, transform:'rotate(3deg)', zIndex: 3,
          }}/>
          {/* decorative dot */}
          <div style={{
            position:'absolute', top: 18, left: 30, width: 10, height: 10, borderRadius: 999,
            background: 'var(--petal-400)', boxShadow: '0 0 0 6px var(--petal-50)',
          }}/>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px){
          .hero-split{ grid-template-columns: 1fr !important; gap: 40px !important; padding-top: 48px !important; padding-bottom: 56px !important; }
          .hero-collage{ height: 380px !important; }
        }
      `}</style>
    </section>
  );
}

function SmallTrust({ label }){
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap: 8, color:'var(--ink-700)', fontSize: 13 }}>
      <div style={{ width: 6, height: 6, background: 'var(--petal-400)', borderRadius: 999 }}/>
      {label}
    </div>
  );
}

function SoftStat(){
  return (
    <div style={{ display:'flex', justifyContent:'center', gap: 40, marginTop: 48, flexWrap:'wrap' }}>
      {[
        { n: '12,400+', l: 'mothers nesting' },
        { n: '320+', l: 'gentle brands' },
        { n: '4.9 ★', l: 'softly reviewed' },
      ].map((s,i)=>(
        <div key={i} style={{textAlign:'center'}}>
          <div className="display" style={{ fontSize: 30, fontWeight: 500 }}>{s.n}</div>
          <div style={{ fontSize: 12, letterSpacing:'.12em', textTransform:'uppercase', color: 'var(--ink-500)', marginTop: 4 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function CollageCard({ product, style }){
  const { navigate } = useApp();
  return (
    <div onClick={() => navigate({ name:'detail', id: product.id })}
      style={{
        ...style,
        background: 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        overflow:'hidden',
        boxShadow: 'var(--shadow-md)',
        cursor: 'pointer',
        transition: 'transform .3s ease, box-shadow .3s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
    >
      <ProductArt product={product} style={{ height: '100%', aspectRatio: 'auto' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter row
function FilterRow({ label, items, value, onChange }){
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 14, marginBottom: 14, flexWrap:'nowrap', overflowX:'auto' }} className="hide-scrollbar">
      <div style={{
        fontSize: 11, letterSpacing: '.14em', textTransform:'uppercase',
        color: 'var(--ink-500)', minWidth: 78, fontWeight: 600,
      }}>{label}</div>
      <div style={{ display:'flex', gap: 8, paddingRight: 24, flexWrap:'wrap' }}>
        {items.map(it => (
          <button key={it.id} className={`chip petal ${value === it.id ? 'active' : ''}`}
            onClick={()=>onChange(it.id)}>{it.label}</button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Product grid
function ProductGrid({ products, navigate }){
  if (!products.length){
    return (
      <div className="card-soft" style={{ padding: 48, textAlign:'center' }}>
        <p style={{ fontFamily:'var(--font-display)', fontSize: 22, fontStyle:'italic', color:'var(--ink-700)', margin: 0 }}>
          Nothing here yet for that combination — try another age or category.
        </p>
      </div>
    );
  }
  return (
    <div style={{
      display:'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24,
    }} className="product-grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} onOpen={(id)=>navigate({name:'detail', id})}/>
      ))}
      <style>{`
        @media (max-width: 980px){ .product-grid{ grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 720px){ .product-grid{ grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; } }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Wishlist promo strip
function WishlistPromo({ navigate, signedIn, requireAuth }){
  const { t } = useLang();
  const start = () => {
    if (!signedIn) requireAuth({ reason: 'wishlist' });
    else navigate({ name: 'wishlist' });
  };
  return (
    <section style={{ background: 'var(--petal-50)', marginTop: 80 }}>
      <div className="container wishlist-promo" style={{
        padding: '80px 28px',
        display:'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems:'center',
      }}>
        <div>
          <div style={{
            fontSize: 11, letterSpacing: '.14em', textTransform:'uppercase',
            color: 'var(--petal-500)', fontWeight: 700, marginBottom: 18,
          }}>{t('promo.forMothers')}</div>
          <h2 className="display italic" style={{ fontSize: 'clamp(34px, 5vw, 60px)', margin: 0, lineHeight: 1.05 }}>
            {t('promo.title')}<br/>{t('promo.title2')}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-700)', maxWidth: 520, marginTop: 22, lineHeight: 1.6 }}>
            {t('promo.sub')}
          </p>
          <div style={{ display:'flex', gap: 12, marginTop: 28, flexWrap:'wrap' }}>
            <button className="btn btn-primary" onClick={start}>{t('promo.startCta')}</button>
            <button className="btn btn-ghost" onClick={()=>navigate({name:'guest', wid: 'demo'})}>
              {t('promo.seeExample')} <NIcon name="arrowRight" size={14} className="icon-flip"/>
            </button>
          </div>
          <ul style={{ listStyle:'none', padding: 0, margin: '32px 0 0', display:'grid', gap: 12 }}>
            {[t('promo.b1'), t('promo.b2'), t('promo.b3')].map((tx, i) => (
              <li key={i} style={{ display:'flex', alignItems:'flex-start', gap: 10, color:'var(--ink-700)', fontSize: 14 }}>
                <span style={{ marginTop: 2, color: 'var(--petal-400)' }}><NIcon name="check" size={16}/></span>
                {tx}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ position:'relative' }}>
          <WishlistMockCard/>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px){
          .wishlist-promo{ grid-template-columns: 1fr !important; gap: 32px !important; padding: 56px 28px !important; }
        }
      `}</style>
    </section>
  );
}

function WishlistMockCard(){
  const { lang, t } = useLang();
  const items = ['p04','p07','p13'].map(id => NESTI_PRODUCT_BY_ID[id]);
  return (
    <div className="card" style={{ padding: 22, boxShadow: 'var(--shadow-md)', maxWidth: 440, marginLeft:'auto' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 18 }}>
        <div>
          <div className="display italic" style={{ fontSize: 24 }}>{t('mock.maya')}</div>
          <div style={{ fontSize: 12, color:'var(--ink-500)', marginTop: 2 }}>{t('mock.dueAug')}</div>
        </div>
        <span className="chip petal" style={{ background:'var(--petal-100)', color:'var(--petal-500)', border:0 }}>
          <NIcon name="share" size={12}/> {t('mock.shared')}
        </span>
      </div>
      <div style={{ display:'grid', gap: 10 }}>
        {items.map((p,i) => (
          <div key={p.id} style={{
            display:'flex', alignItems:'center', gap: 12,
            padding: 10, background: 'var(--bg)', borderRadius: 14,
          }}>
            <div style={{ width: 60, height: 60, borderRadius: 12, overflow:'hidden', flexShrink: 0 }}>
              <ProductArt product={p} size="sm" style={{ minHeight: 60 }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-900)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{formatPrice(p.price, lang)}</div>
            </div>
            <span style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 999,
              background: i === 1 ? 'var(--petal-100)' : 'var(--bg-soft)',
              color: i === 1 ? 'var(--petal-500)' : 'var(--ink-500)',
              fontWeight: 500, whiteSpace:'nowrap',
            }}>{i === 1 ? t('mock.reserved') : t('mock.available')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Editorial banner
function Editorial(){
  const { t } = useLang();
  return (
    <section className="container" style={{ paddingTop: 96, paddingBottom: 32 }}>
      <div style={{
        position:'relative', background: 'var(--petal-100)',
        borderRadius: 'var(--r-lg)', overflow:'hidden', minHeight: 320,
        display:'flex', alignItems:'flex-end', padding: 48,
      }}>
        <div style={{
          position:'absolute', top:0, right:0, width: '55%', height:'100%',
          background: 'radial-gradient(circle at 70% 40%, var(--petal-50), transparent 70%)',
        }}/>
        <div style={{ position:'relative', maxWidth: 480 }}>
          <div style={{ fontSize: 11, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--petal-500)', fontWeight: 700, marginBottom: 14 }}>{t('edit.letters')}</div>
          <h3 className="display italic" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', margin: 0, lineHeight: 1.1 }}>{t('edit.lettersTitle')}</h3>
          <button className="btn btn-primary btn-sm" style={{ marginTop: 24 }}>{t('edit.readLetter')} <NIcon name="arrowRight" size={12} className="icon-flip"/></button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage, ProductGrid, FilterRow });

// ─────────────────────────────────────────────────────────────────────────────
// Temporary preview banner that surfaces the entire guest gift-purchase flow.
// This is intentionally prominent so it's easy to click into for testing.
function PreviewFlowBanner(){
  const { navigate, signOut, signedIn } = useApp();
  const open = () => {
    // Sign out so the auth gate actually fires during the preview.
    if (signedIn) signOut();
    setTimeout(() => navigate({ name: 'guest', wid: 'demo' }), 50);
  };
  return (
    <div style={{
      background: 'linear-gradient(90deg, var(--petal-100), var(--petal-50))',
      borderBottom: '1px solid var(--line)',
    }}>
      <div className="container" style={{
        padding: '12px 28px',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap: 16, flexWrap:'wrap',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 14, minWidth: 0 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 999, background:'var(--surface)',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            color:'var(--petal-500)', flexShrink: 0, boxShadow:'var(--shadow-sm)',
          }}>
            <NIcon name="sparkle" size={18}/>
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: 11, letterSpacing:'.14em', textTransform:'uppercase',
              color:'var(--petal-500)', fontWeight: 700, lineHeight: 1.2,
            }}>Preview flow · for testing</div>
            <div style={{
              fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 17,
              color:'var(--ink-900)', marginTop: 2, lineHeight: 1.25,
            }}>
              Walk through the public guest wishlist → Buy Gift → checkout → confirmation.
            </div>
          </div>
        </div>
        <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
          <button className="btn btn-primary btn-sm" onClick={open}>
            <NIcon name="eye" size={14}/> Preview Guest Wishlist Flow
          </button>
          <button className="btn btn-ghost btn-sm" onClick={()=>navigate({ name:'guest', wid:'demo' })}>
            Open as guest
          </button>
        </div>
      </div>
    </div>
  );
}
