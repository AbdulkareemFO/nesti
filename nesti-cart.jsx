// nesti-cart.jsx — cart page + empty state + sign-in prompt before checkout

function CartPage(){
  const { cart, updateQty, removeFromCart, navigate, requireAuth, signedIn, addToast } = useApp();
  const { lang, t } = useLang();

  const lines = cart.map(c => ({ ...c, product: NESTI_PRODUCT_BY_ID[c.id] })).filter(l => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal > 80 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  const onCheckout = () => {
    if (!signedIn){
      requireAuth({ reason: 'checkout' });
      return;
    }
    addToast({ msg: 'Order placed — your nest is on its way.', icon: 'check' });
  };

  if (!lines.length){
    return <CartEmpty />;
  }

  return (
    <div className="container" style={{ padding: '40px 28px 96px' }}>
      <header style={{ marginBottom: 36 }}>
        <div style={{
          fontSize: 12, letterSpacing:'.14em', textTransform:'uppercase',
          color: 'var(--petal-500)', fontWeight: 600, marginBottom: 12,
        }}>Your cart</div>
        <h1 className="display italic" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: 0 }}>
          A small bundle, gathering.
        </h1>
      </header>

      <div className="cart-grid" style={{
        display:'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, alignItems:'flex-start',
      }}>
        <div className="card" style={{ padding: 8 }}>
          {lines.map((l, i) => (
            <CartLine key={l.id} line={l} last={i === lines.length - 1}
              onUp={() => updateQty(l.id, l.qty + 1)}
              onDown={() => updateQty(l.id, l.qty - 1)}
              onRemove={() => removeFromCart(l.id)}
              onOpen={() => navigate({ name:'detail', id: l.id })}
            />
          ))}
        </div>

        <aside className="cart-summary" style={{ position:'sticky', top: 100 }}>
          <div className="card" style={{ padding: 28 }}>
            <h3 className="display" style={{ fontSize: 24, margin: 0, marginBottom: 18 }}>Order summary</h3>
            <Row k="Subtotal" v={`${formatPrice(subtotal, lang)}`}/>
            <Row k="Shipping" v={shipping === 0 ? <span style={{color:'var(--petal-500)'}}>Free</span> : `${formatPrice(shipping, lang)}`}/>
            <Row k="Gift wrap" v={<span style={{color:'var(--petal-500)'}}>Included</span>}/>
            <hr style={{border:0, borderTop:'1px solid var(--line)', margin:'16px 0'}}/>
            <Row k="Total" v={<span style={{fontSize: 20, fontWeight: 600}}>{formatPrice(total, lang)}</span>} bold/>

            <button className="btn btn-primary btn-lg" style={{ width:'100%', marginTop: 22 }} onClick={onCheckout}>
              <NIcon name="lock" size={14}/> Secure checkout
            </button>

            {!signedIn && (
              <p style={{ fontSize: 12, color: 'var(--ink-500)', textAlign:'center', marginTop: 12 }}>
                You'll be asked to sign in or create an account at checkout.
              </p>
            )}

            <div style={{
              marginTop: 24, padding: 16, background: 'var(--petal-50)',
              borderRadius: 14, fontSize: 13, color: 'var(--ink-700)',
            }}>
              <strong style={{display:'block', marginBottom: 4, color:'var(--petal-500)', fontSize: 12, letterSpacing:'.1em', textTransform:'uppercase'}}>A gentle note</strong>
              Add a hand-written card or gift wrap at checkout. We tuck them in by hand.
            </div>
          </div>

          <button className="btn btn-ghost" onClick={()=>navigate({name:'home'})} style={{ marginTop: 12, width:'100%' }}>
            <NIcon name="arrowLeft" size={14}/> Keep browsing
          </button>
        </aside>
      </div>

      <style>{`
        @media (max-width: 980px){
          .cart-grid{ grid-template-columns: 1fr !important; }
          .cart-summary{ position: static !important; }
        }
      `}</style>
    </div>
  );
}

function Row({ k, v, bold }){
  return (
    <div style={{ display:'flex', justifyContent:'space-between', padding:'6px 0',
                  fontSize: 14, color: bold ? 'var(--ink-900)' : 'var(--ink-700)' }}>
      <span>{k}</span>
      <span style={{ fontWeight: bold ? 600 : 500 }}>{v}</span>
    </div>
  );
}

function CartLine({ line, onUp, onDown, onRemove, onOpen, last }){
  const { lang } = useLang();
  const { product, qty } = line;
  return (
    <div style={{
      display:'grid', gridTemplateColumns: '88px 1fr auto', gap: 18, alignItems:'center',
      padding: 18, borderBottom: last ? '0' : '1px solid var(--line)',
    }}>
      <div onClick={onOpen} style={{
        cursor:'pointer', width: 88, height: 88, borderRadius: 14, overflow:'hidden',
      }}>
        <ProductArt product={product} size="sm" style={{ minHeight: 88 }}/>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ink-500)', marginBottom: 4 }}>{product.brand}</div>
        <div onClick={onOpen} style={{
          fontFamily:'var(--font-display)', fontSize: 19, fontWeight: 500, cursor:'pointer',
          color:'var(--ink-900)', letterSpacing:'-0.01em', marginBottom: 8,
        }}>{product.name}</div>
        <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
          <div style={{
            display:'inline-flex', alignItems:'center',
            border: '1px solid var(--line-strong)', borderRadius: 999,
          }}>
            <button onClick={onDown} style={{
              width: 32, height: 32, border: 0, background:'transparent', cursor: 'pointer',
            }}><NIcon name="minus" size={12}/></button>
            <span style={{ minWidth: 24, textAlign:'center', fontSize: 13, fontWeight: 500 }}>{qty}</span>
            <button onClick={onUp} style={{
              width: 32, height: 32, border: 0, background:'transparent', cursor: 'pointer',
            }}><NIcon name="plus" size={12}/></button>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onRemove}>
            <NIcon name="trash" size={14}/> Remove
          </button>
        </div>
      </div>
      <div style={{ textAlign:'right', fontWeight: 600, fontSize: 16 }}>
        {formatPrice(product.price * qty, lang)}
      </div>
    </div>
  );
}

function CartEmpty(){
  const { navigate } = useApp();
  return (
    <div className="container" style={{ padding: '80px 28px 120px', textAlign:'center', maxWidth: 600 }}>
      <div style={{
        width: 120, height: 120, borderRadius: 999, background: 'var(--petal-50)',
        margin: '0 auto 32px', display:'flex', alignItems:'center', justifyContent:'center',
        color: 'var(--petal-400)',
      }}>
        <NIcon name="bag" size={48}/>
      </div>
      <h1 className="display italic" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: 0 }}>
        Your bundle is empty.
      </h1>
      <p style={{ color: 'var(--ink-500)', marginTop: 16, fontSize: 16 }}>
        Begin softly. Anything you love can wait here, ready when you are.
      </p>
      <div style={{ display:'inline-flex', gap: 12, marginTop: 28, flexWrap:'wrap', justifyContent:'center' }}>
        <button className="btn btn-primary btn-lg" onClick={()=>navigate({name:'home'})}>Browse the shop</button>
        <button className="btn btn-outline btn-lg" onClick={()=>navigate({name:'wishlist'})}><NIcon name="heart" size={14}/> Your wishlist</button>
      </div>
    </div>
  );
}

Object.assign(window, { CartPage });
