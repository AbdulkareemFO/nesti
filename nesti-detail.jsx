// nesti-detail.jsx — product detail page

function ProductDetailPage({ id }){
  const { navigate, addToCart, toggleWishlist, wishlistIds, signedIn, requireAuth, addToast } = useApp();
  const { lang, t } = useLang();
  const product = NESTI_PRODUCT_BY_ID[id];
  const [qty, setQty] = React.useState(1);
  const inWishlist = wishlistIds.has(id);

  if (!product){
    return (
      <div className="container" style={{ padding: '120px 28px', textAlign:'center' }}>
        <h1 className="display italic">We can't find that one.</h1>
        <button className="btn btn-primary" onClick={()=>navigate({name:'home'})} style={{marginTop:20}}>Back home</button>
      </div>
    );
  }

  const catLabel = NESTI_CATEGORIES.find(c=>c.id===product.cat)?.label;
  const ageLabels = (product.age||[]).map(a => NESTI_AGES.find(x=>x.id===a)?.label).filter(Boolean);
  const recommend = NESTI_PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0,4);

  const onWishlist = () => {
    if (!signedIn) return requireAuth({ reason: 'wishlist', pendingProductId: product.id });
    toggleWishlist(product.id);
  };

  const onAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product.id);
  };

  return (
    <div className="container" style={{ padding: '40px 28px 80px' }}>
      {/* Breadcrumb */}
      <nav style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 28, fontSize: 13, color: 'var(--ink-500)' }}>
        <button onClick={()=>navigate({name:'home'})} style={{background:'transparent', border:0, color:'inherit', cursor:'pointer'}}>Home</button>
        <NIcon name="chev" size={12}/>
        <button onClick={()=>navigate({name:'shop', cat: product.cat})} style={{background:'transparent', border:0, color:'inherit', cursor:'pointer'}}>{catLabel}</button>
        <NIcon name="chev" size={12}/>
        <span style={{ color: 'var(--ink-900)' }}>{product.name}</span>
      </nav>

      <div className="detail-grid" style={{
        display:'grid', gridTemplateColumns: '1.15fr 1fr', gap: 56, alignItems:'flex-start',
      }}>
        {/* Gallery */}
        <div>
          <div style={{
            borderRadius: 'var(--r-xl)', overflow:'hidden',
            background: 'var(--surface)',
          }}>
            <ProductArt product={product} size="xl" />
          </div>
          {/* Thumbnails */}
          <div style={{ display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 12 }}>
            {[0,1,2,3].map(i => (
              <button key={i} style={{
                background:'transparent', border: i===0 ? '1.5px solid var(--ink-900)' : '1px solid var(--line)',
                borderRadius: 'var(--r-md)', overflow:'hidden', padding: 0, cursor:'pointer',
                aspectRatio: '1/1', opacity: i===0 ? 1 : .85,
              }}>
                <ProductArt product={product} size="sm" style={{ borderRadius: 0, transform: `rotate(${i*4 - 6}deg) scale(${1 - i*0.05})` }}/>
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div style={{ position:'sticky', top: 100 }}>
          <div style={{
            fontSize: 12, letterSpacing:'.14em', textTransform:'uppercase',
            color: 'var(--petal-500)', fontWeight: 600, marginBottom: 10,
          }}>{product.brand} · {catLabel}</div>
          <h1 className="display italic" style={{ fontSize: 'clamp(34px, 4.4vw, 56px)', margin: 0, lineHeight: 1.05 }}>
            {product.name}
          </h1>

          <div style={{ display:'flex', alignItems:'center', gap: 12, marginTop: 18 }}>
            <Stars/>
            <span style={{ fontSize: 13, color:'var(--ink-500)' }}>(214 mothers)</span>
          </div>

          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 24, fontFamily:'var(--font-display)' }}>
            {formatPrice(product.price, lang)}
          </div>

          <p style={{ marginTop: 28, color: 'var(--ink-700)', fontSize: 16, lineHeight: 1.7 }}>
            {product.desc}
          </p>

          {/* Age suitability */}
          <div style={{ marginTop: 28 }}>
            <div className="field-label">Suitable for</div>
            <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
              {ageLabels.map(a => (
                <span key={a} className="chip" style={{ cursor:'default' }}>{a}</span>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginTop: 28 }}>
            <div className="field-label">Quantity</div>
            <div style={{
              display:'inline-flex', alignItems:'center',
              border: '1px solid var(--line-strong)', borderRadius: 999,
              overflow:'hidden',
            }}>
              <button onClick={()=>setQty(q => Math.max(1, q-1))} style={{
                width: 44, height: 44, border: 0, background:'transparent', cursor: 'pointer',
              }} aria-label="Decrease">
                <NIcon name="minus" size={14}/>
              </button>
              <span style={{ minWidth: 36, textAlign:'center', fontWeight: 500, fontSize: 14 }}>{qty}</span>
              <button onClick={()=>setQty(q => q+1)} style={{
                width: 44, height: 44, border: 0, background:'transparent', cursor: 'pointer',
              }} aria-label="Increase">
                <NIcon name="plus" size={14}/>
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display:'flex', gap: 12, marginTop: 28, flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={onAdd} style={{ flex: '1 1 240px' }}>
              <NIcon name="bag" size={16}/> Add to cart — {formatPrice(product.price * qty, lang)}
            </button>
            <button className="btn btn-outline btn-lg" onClick={onWishlist} style={{ flex: '0 0 auto' }}>
              <NIcon name={inWishlist ? 'heartFill' : 'heart'} size={16} stroke={inWishlist ? 'var(--petal-500)' : 'currentColor'}/>
              {inWishlist ? 'Saved' : 'Wishlist'}
            </button>
          </div>

          {/* Promises */}
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
            {[
              {ic:'check', t:'Complimentary gift wrap', s:'On every order, by hand.'},
              {ic:'check', t:'Returns within 30 days', s:'No questions. Soft policy.'},
              {ic:'check', t:'Mother-tested', s:'Vetted by our small group of mothers and midwives.'},
            ].map(r => (
              <div key={r.t} style={{ display:'flex', alignItems:'flex-start', gap: 14, padding: '10px 0' }}>
                <span style={{ color: 'var(--petal-400)', marginTop: 3 }}><NIcon name={r.ic} size={16}/></span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-900)' }}>{r.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{r.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* You may also love */}
      <section style={{ marginTop: 96 }}>
        <SectionHeading
          eyebrow="In the same softness"
          title="You may also love"
        />
        <ProductGrid products={recommend} navigate={navigate}/>
      </section>

      <style>{`
        @media (max-width: 980px){
          .detail-grid{ grid-template-columns: 1fr !important; gap: 36px !important; }
          .detail-grid > div:last-child{ position: static !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shop / category listing page

function ShopPage({ cat }){
  const { navigate } = useApp();
  const [activeCat, setActiveCat] = React.useState(cat || 'all');
  const [activeAge, setActiveAge] = React.useState('all');
  const [activeGender, setActiveGender] = React.useState('all');
  const [sort, setSort] = React.useState('featured');

  React.useEffect(() => { setActiveCat(cat || 'all'); }, [cat]);

  let products = NESTI_PRODUCTS.filter(p =>
    (activeCat === 'all' || p.cat === activeCat) &&
    (activeAge === 'all' || (p.age || []).includes(activeAge)) &&
    (activeGender === 'all' || p.gender === activeGender || (activeGender === 'neutral' && p.gender === 'mom'))
  );

  if (sort === 'lo-hi') products = [...products].sort((a,b)=>a.price-b.price);
  if (sort === 'hi-lo') products = [...products].sort((a,b)=>b.price-a.price);

  const catLabel = activeCat === 'all' ? 'Everything' : NESTI_CATEGORIES.find(c=>c.id===activeCat)?.label;

  return (
    <div className="container" style={{ padding: '40px 28px 96px' }}>
      <header style={{ marginBottom: 32 }}>
        <div style={{
          fontSize: 12, letterSpacing:'.14em', textTransform:'uppercase',
          color: 'var(--petal-500)', fontWeight: 600, marginBottom: 14,
        }}>The shop</div>
        <h1 className="display italic" style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: 0, lineHeight: 1 }}>{catLabel}</h1>
      </header>

      <FilterRow label="Category" items={[{id:'all', label:'Everything'}, ...NESTI_CATEGORIES]} value={activeCat} onChange={setActiveCat} />
      <FilterRow label="Age" items={[{id:'all', label:'All ages'}, ...NESTI_AGES]} value={activeAge} onChange={setActiveAge} />
      <FilterRow label="For" items={NESTI_GENDERS} value={activeGender} onChange={setActiveGender} />

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 24, marginBottom: 24 }}>
        <span style={{ fontSize: 13, color:'var(--ink-500)' }}>{products.length} pieces</span>
        <label style={{ display:'flex', alignItems:'center', gap: 10, fontSize: 13, color: 'var(--ink-500)' }}>
          Sort
          <select value={sort} onChange={e=>setSort(e.target.value)} className="input" style={{ width: 'auto', padding: '8px 14px' }}>
            <option value="featured">Featured</option>
            <option value="lo-hi">Price, low to high</option>
            <option value="hi-lo">Price, high to low</option>
          </select>
        </label>
      </div>

      <ProductGrid products={products} navigate={navigate}/>
    </div>
  );
}

Object.assign(window, { ProductDetailPage, ShopPage });
