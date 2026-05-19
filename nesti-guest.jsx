// nesti-guest.jsx — guest view of a shared wishlist + reserve gift

function GuestWishlistPage({ wid }){
  const { navigate, reservations, addToast, startGiftPurchase } = useApp();
  const { t } = useLang();

  // Demo data — a curated wishlist as if it were the owner's
  const owner = { name: 'Maya', due: 'August' };
  const title = "Maya's baby wishlist";
  const items = [
    { kind:'product', id:'p04' },
    { kind:'product', id:'p07' },
    { kind:'product', id:'p13' },
    { kind:'product', id:'p11' },
    { kind:'product', id:'p02' },
    { kind:'product', id:'p06' },
    { kind:'custom', id:'c1', name:'Cot from somewhere else', price:'320', url:'https://example.com/cot', photo:null, color:'sand', glyph:'blanket' },
    { kind:'product', id:'p16' },
    { kind:'product', id:'p10' },
  ];

  const handleBuy = (item) => {
    startGiftPurchase(item, owner);
  };

  return (
    <div>
      {/* Guest banner */}
      <div style={{
        background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)',
        padding: '14px 16px', textAlign:'center', fontSize: 13, color:'var(--ink-700)',
      }}>
        <NIcon name="eye" size={14}/> {t('guest.banner1')} <strong style={{ color:'var(--ink-900)' }}>{owner.name}</strong>{t('guest.banner2')}
        <button onClick={()=>navigate({name:'home'})} style={{
          background:'transparent', border:0, color:'var(--ink-900)', cursor:'pointer',
          textDecoration:'underline', textUnderlineOffset: 3, marginLeft: 8, fontWeight: 500, fontSize: 13,
        }}>{t('guest.visitShop')}</button>
      </div>

      <div className="container" style={{ padding: '56px 28px 96px' }}>
        {/* Owner card */}
        <div style={{
          display:'grid', gridTemplateColumns: '88px 1fr auto', gap: 22, alignItems:'center',
          padding: 24, background:'var(--surface)', borderRadius: 'var(--r-lg)',
          border:'1px solid var(--line)', marginBottom: 36,
        }} className="owner-card">
          <div style={{
            width: 88, height: 88, borderRadius: 999,
            background: 'linear-gradient(135deg, var(--petal-100), var(--petal-200))',
            display:'flex', alignItems:'center', justifyContent:'center',
            color: 'var(--petal-500)',
            fontFamily:'var(--font-display)', fontSize: 36, fontWeight: 500, fontStyle:'italic',
          }}>{owner.name[0]}</div>
          <div>
            <div style={{
              fontSize: 12, letterSpacing:'.14em', textTransform:'uppercase',
              color: 'var(--petal-500)', fontWeight: 600, marginBottom: 8,
            }}>{t('guest.eyebrow')}</div>
            <h1 className="display italic" style={{ fontSize: 'clamp(34px, 5vw, 56px)', margin: 0, lineHeight: 1.05 }}>{title}</h1>
          </div>
          <div style={{
            display:'flex', flexDirection:'column', gap: 6, alignItems:'flex-end',
            fontSize: 12, color: 'var(--ink-500)',
          }}>
            <span>{t('guest.items', { n: items.length })}</span>
          </div>
        </div>

        {/* How it works */}
        <div style={{
          display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          marginBottom: 40,
        }} className="how-grid">
          {[
            { n: '1', t: t('guest.step1t'), s: t('guest.step1s', { name: owner.name }) },
            { n: '2', t: t('guest.step2t'), s: t('guest.step2s') },
            { n: '3', t: t('guest.step3t'), s: t('guest.step3s') },
          ].map(s => (
            <div key={s.n} style={{
              padding: 22, background:'var(--surface-2)', borderRadius: 'var(--r-md)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 999, background:'var(--ink-900)',
                color:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center',
                fontSize: 13, fontWeight: 600, marginBottom: 12,
              }}>{s.n}</div>
              <h4 style={{ fontFamily:'var(--font-display)', fontSize: 18, fontWeight: 500, margin: '0 0 4px' }}>{s.t}</h4>
              <p style={{ fontSize: 13, color:'var(--ink-500)', margin: 0, lineHeight: 1.55 }}>{s.s}</p>
            </div>
          ))}
        </div>

        {/* Items */}
        <div className="guest-grid" style={{
          display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
        }}>
          {items.map(it => {
            const reservation = reservations[it.id];
            return (
              <GuestItemCard key={it.id} item={it} reservation={reservation}
                onOpenDetail={(pid)=>navigate({name:'detail', id: pid})}
                onBuy={()=>handleBuy(it)}
              />
            );
          })}
        </div>

        <div style={{
          marginTop: 56, padding: 36, background: 'var(--petal-50)',
          borderRadius: 'var(--r-lg)', textAlign:'center', maxWidth: 640, marginInline:'auto',
        }}>
          <h3 className="display italic" style={{ fontSize: 26, margin: 0 }}>
            {t('guest.wantOwn')}
          </h3>
          <p style={{ color:'var(--ink-700)', marginTop: 8, fontSize: 14, maxWidth: 460, marginInline:'auto' }}>
            {t('guest.wantSub')}
          </p>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={()=>navigate({name:'signup'})}>
            {t('promo.startCta')}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px){
          .owner-card{ grid-template-columns: 64px 1fr !important; }
          .owner-card > div:last-child{ grid-column: 1 / -1; align-items: flex-start !important; }
          .how-grid{ grid-template-columns: 1fr !important; }
          .guest-grid{ grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px){
          .guest-grid{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function GuestItemCard({ item, reservation, onOpenDetail, onBuy }){
  const { lang, t } = useLang();
  const product = item.kind === 'product' ? NESTI_PRODUCT_BY_ID[item.id] : null;
  const isPurchased = !!reservation?.purchased;
  const isCustom = item.kind === 'custom';

  return (
    <article className="card fade-in" style={{
      overflow:'hidden', display:'flex', flexDirection:'column',
      opacity: isPurchased ? .78 : 1,
      transition: 'opacity .2s',
      position:'relative',
    }}>
      <div style={{ position:'relative' }} onClick={() => product && !isPurchased && onOpenDetail(product.id)}>
        {product ? <ProductArt product={product}/> : (
          <div style={{
            aspectRatio:'1/1', background:'var(--bg-soft)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color: 'var(--ink-500)',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{
              position:'absolute', width:'62%', aspectRatio:'1/1', borderRadius:'50%',
              background: 'radial-gradient(circle at 35% 35%, #fff8, var(--petal-50) 40%, transparent 70%)',
            }}/>
            <NIcon name={item.glyph || 'link'} size={96} strokeWidth={1.2} stroke="var(--petal-400)"/>
          </div>
        )}

        {/* Purchased overlay */}
        {isPurchased && (
          <div style={{
            position:'absolute', inset: 0,
            background: 'rgba(42,26,20,.62)',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter: 'blur(2px)',
          }}>
            <div style={{
              background:'var(--bg)', color:'var(--ink-900)',
              padding: '10px 18px', borderRadius: 999,
              fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 18, fontWeight: 500,
              display:'inline-flex', alignItems:'center', gap: 8,
              boxShadow: 'var(--shadow-md)',
            }}>
              <NIcon name="check" size={16} stroke="var(--petal-500)"/>
              {t('guest.reservedLabel')}
            </div>
          </div>
        )}

        {/* Custom label (only when not purchased) */}
        {isCustom && !isPurchased && (
          <span style={{
            position:'absolute', top: 12, left: 12,
            background:'rgba(251,246,241,.92)', backdropFilter:'blur(8px)',
            padding:'4px 10px', borderRadius:999, fontSize: 11,
            color:'var(--ink-700)', fontWeight:500,
          }}>From elsewhere</span>
        )}
      </div>

      <div style={{ padding: 18, display:'flex', flexDirection:'column', flex: 1 }}>
        <div style={{
          fontSize: 11, letterSpacing:'.12em', textTransform:'uppercase',
          color:'var(--ink-500)', fontWeight: 600, marginBottom: 6,
        }}>
          {product ? t('cat.' + product.cat) : t('wl.fromElsewhere')}
        </div>
        <h4 style={{
          fontFamily:'var(--font-display)', fontWeight: 500, fontSize: 19,
          margin:'0 0 4px', letterSpacing:'-0.01em',
        }}>{product ? product.name : item.name}</h4>

        {product?.desc && (
          <p style={{
            fontSize: 13, color:'var(--ink-500)', margin: '4px 0 10px',
            lineHeight: 1.55,
            display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow:'hidden',
          }}>{product.desc}</p>
        )}

        <div style={{ fontSize: 15, color:'var(--ink-900)', fontWeight: 600, marginBottom: 14 }}>
          {formatPrice(product ? product.price : parseFloat(item.price)||0, lang)}
        </div>

        <div style={{ display:'flex', gap: 8, marginTop:'auto', justifyContent:'space-between', alignItems:'center' }}>
          {product && !isPurchased ? (
            <button className="btn btn-ghost btn-sm" onClick={()=>onOpenDetail(product.id)}>
              {t('guest.viewDetails')}
            </button>
          ) : item.url && !isPurchased ? (
            <a href={item.url} target="_blank" rel="noopener" className="btn btn-ghost btn-sm" style={{textDecoration:'none'}}>
              <NIcon name="link" size={12}/> {t('wl.open')}
            </a>
          ) : <span/>}

          {isPurchased ? (
            <button className="btn btn-soft btn-sm" disabled style={{
              cursor:'not-allowed', opacity: .85,
              background:'var(--petal-50)', color:'var(--petal-500)',
            }}>
              <NIcon name="check" size={12}/> {t('guest.reservedLabel')}
            </button>
          ) : (
            <button className="btn btn-rose btn-sm" onClick={onBuy}>
              <NIcon name="bag" size={12}/> {t('guest.reserve')}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { GuestWishlistPage });
