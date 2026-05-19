// nesti-gift-checkout.jsx — Dedicated gift checkout flow for guests buying from a shared wishlist.
// Steps:
//   1. Review gift
//   2. Choose delivery (to mother / to me)
//   3. Address + payment
//   → Confirmation page

function GiftCheckoutPage(){
  const { giftContext, signedIn, navigate, purchaseGift, ownerAddress, addToast, setGiftContext } = useApp();
  const { lang, t } = useLang();

  // If somebody lands here directly without picking a gift, gently set up a demo
  // so the screen is still previewable.
  React.useEffect(() => {
    if (!giftContext){
      setGiftContext({ itemId: 'p04', kind: 'product', ownerName: 'Maya', ownerInitial: 'M' });
    }
  }, [giftContext, setGiftContext]);

  if (!giftContext){
    return (
      <div className="container" style={{ padding: '100px 28px', textAlign:'center', maxWidth: 520 }}>
        <h1 className="display italic" style={{ fontSize: 36, margin: 0 }}>Loading your gift…</h1>
      </div>
    );
  }

  // Resolve the gift item from demo data
  const giftItem = useGuestGiftItem(giftContext.itemId);
  const product = giftItem?.product;
  const price = product ? product.price : (parseFloat(giftItem?.price) || 0);

  // ─── Steps ─────────────────────────────────────────────────────────────
  const [step, setStep] = React.useState(1);
  const [deliverTo, setDeliverTo] = React.useState('mother'); // 'mother' | 'me'
  const [myAddr, setMyAddr] = React.useState({
    name: signedIn?.name || '', phone: '', street: '', city: '', region: '', postcode: '',
  });
  const [payment, setPayment] = React.useState({
    method: 'card', cardName: '', cardNum: '', exp: '', cvc: '',
  });
  const [giftNote, setGiftNote] = React.useState('');
  const [errors, setErrors] = React.useState({});

  // ─── Pricing ────────────────────────────────────────────────────────────
  const subtotal = price;
  const shipping = subtotal > 80 ? 0 : 8;
  const total = subtotal + shipping;

  // ─── Validation ─────────────────────────────────────────────────────────
  const validateAddress = () => {
    const e = {};
    if (deliverTo === 'me'){
      if (!myAddr.name.trim()) e.name = true;
      if (!myAddr.phone.trim()) e.phone = true;
      if (!myAddr.street.trim()) e.street = true;
      if (!myAddr.city.trim()) e.city = true;
    }
    if (!payment.cardName.trim()) e.cardName = true;
    if (payment.cardNum.replace(/\s/g,'').length < 12) e.cardNum = true;
    if (!/^\d\d\s?\/\s?\d\d$/.test(payment.exp.trim())) e.exp = true;
    if (payment.cvc.length < 3) e.cvc = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validateAddress()) {
      addToast({ msg: 'Please fill the missing fields.', icon: 'close' });
      return;
    }
    const orderNum = purchaseGift(giftContext.itemId, signedIn.name, deliverTo);
    navigate({ name: 'gift-confirmation', orderNum });
  };

  return (
    <div className="container" style={{ padding: '32px 28px 96px', maxWidth: 1080 }}>
      {/* Eyebrow + title */}
      <div style={{ marginBottom: 28 }}>
        <button className="btn btn-ghost btn-sm" onClick={()=>navigate({name:'guest', wid:'demo'})}
          style={{ paddingInline: 4, marginBottom: 12, color: 'var(--ink-500)' }}>
          <NIcon name="arrowLeft" size={14}/> Back to {giftContext.ownerName}'s wishlist
        </button>
        <div style={{
          display:'flex', alignItems:'center', gap: 10,
          fontSize: 12, letterSpacing:'.14em', textTransform:'uppercase',
          color:'var(--petal-500)', fontWeight: 700, marginBottom: 14,
        }}>
          <NIcon name="bag" size={14}/> Gift checkout
        </div>
        <h1 className="display italic" style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: 0, lineHeight: 1.05 }}>
          A gift for {giftContext.ownerName}.
        </h1>
        <p style={{ color:'var(--ink-500)', marginTop: 12, fontSize: 15, maxWidth: 560 }}>
          We'll wrap it by hand, tuck in a note from you, and send it on its way.
        </p>
      </div>

      {/* Progress steps */}
      <Stepper step={step}/>

      <div className="gc-grid" style={{
        display:'grid', gridTemplateColumns: '1fr 380px', gap: 36, alignItems:'flex-start', marginTop: 28,
      }}>
        {/* Main column */}
        <div style={{ display:'grid', gap: 16 }}>
          {/* Step 1: Review */}
          <Section open={step === 1} idx={1} label="Review your gift" complete={step > 1} onEdit={()=>setStep(1)}>
            <GiftLine giftItem={giftItem} lang={lang}/>
            <div style={{ marginTop: 18 }}>
              <label className="field-label">Add a note for {giftContext.ownerName} <span style={{color:'var(--ink-300)'}}>(optional)</span></label>
              <textarea className="input" rows="3" value={giftNote} onChange={e=>setGiftNote(e.target.value)}
                placeholder={`A few words from ${signedIn?.name?.split(' ')[0] || 'you'}…`}
                style={{ resize: 'vertical', fontFamily: 'var(--font-sans)' }}/>
              <div style={{ fontSize: 12, color:'var(--ink-500)', marginTop: 6 }}>
                We'll hand-write it onto a soft card and tuck it in with the gift.
              </div>
            </div>
            <div style={{ display:'flex', gap: 10, marginTop: 22 }}>
              <button className="btn btn-ghost" onClick={()=>navigate({name:'guest', wid:'demo'})}>
                <NIcon name="arrowLeft" size={14}/> Back to wishlist
              </button>
              <button className="btn btn-primary" onClick={()=>setStep(2)} style={{ marginInlineStart: 'auto' }}>
                Continue to delivery <NIcon name="arrowRight" size={14}/>
              </button>
            </div>
          </Section>

          {/* Step 2: Delivery choice */}
          <Section open={step === 2} idx={2} label="Where should we send it?" complete={step > 2} onEdit={()=>setStep(2)}>
            <DeliveryChoice
              value={deliverTo}
              onChange={setDeliverTo}
              ownerName={giftContext.ownerName}
              ownerAddress={ownerAddress}
            />
            <div style={{ display:'flex', gap: 10, marginTop: 22 }}>
              <button className="btn btn-ghost" onClick={()=>setStep(1)}>
                <NIcon name="arrowLeft" size={14}/> Back
              </button>
              <button className="btn btn-primary" onClick={()=>setStep(3)} style={{ marginInlineStart: 'auto' }}>
                Continue to payment <NIcon name="arrowRight" size={14}/>
              </button>
            </div>
          </Section>

          {/* Step 3: Address + Payment */}
          <Section open={step === 3} idx={3} label="Your details" complete={false}>
            {deliverTo === 'me' ? (
              <AddressForm value={myAddr} onChange={setMyAddr} errors={errors}/>
            ) : (
              <ProtectedAddressCard ownerName={giftContext.ownerName} ownerInitial={giftContext.ownerInitial} ownerAddress={ownerAddress}/>
            )}
            <hr style={{ border:0, borderTop: '1px solid var(--line)', margin: '24px 0' }}/>
            <PaymentForm value={payment} onChange={setPayment} errors={errors}/>

            <div style={{ display:'flex', gap: 10, marginTop: 22 }}>
              <button className="btn btn-ghost" onClick={()=>setStep(2)}>
                <NIcon name="arrowLeft" size={14}/> Back
              </button>
              <button className="btn btn-primary btn-lg" onClick={placeOrder} style={{ marginInlineStart: 'auto' }}>
                <NIcon name="lock" size={14}/> Pay {formatPrice(total, lang)}
              </button>
            </div>
          </Section>
        </div>

        {/* Sticky summary */}
        <aside className="gc-summary" style={{ position:'sticky', top: 100 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 className="display" style={{ fontSize: 22, margin: '0 0 18px' }}>Order summary</h3>
            <GiftLineCompact giftItem={giftItem} lang={lang}/>
            <hr style={{ border:0, borderTop:'1px solid var(--line)', margin:'18px 0' }}/>
            <RowKV k="Subtotal" v={formatPrice(subtotal, lang)}/>
            <RowKV k="Shipping" v={shipping === 0 ? <span style={{color:'var(--petal-500)'}}>Free</span> : formatPrice(shipping, lang)}/>
            <RowKV k="Gift wrap" v={<span style={{color:'var(--petal-500)'}}>Included</span>}/>
            <hr style={{ border:0, borderTop:'1px solid var(--line)', margin:'12px 0' }}/>
            <RowKV k="Total" v={<span style={{fontSize: 20, fontWeight: 600}}>{formatPrice(total, lang)}</span>} bold/>
            <div style={{
              marginTop: 18, padding: 14, background: 'var(--petal-50)',
              borderRadius: 12, fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.55,
            }}>
              <NIcon name="lock" size={12}/> Once you pay, this item will be marked <strong>Purchased</strong> on {giftContext.ownerName}'s wishlist — so no one else buys it twice.
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 980px){
          .gc-grid{ grid-template-columns: 1fr !important; }
          .gc-summary{ position: static !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Resolve gift item — pulls from product catalog OR the demo "custom" item used on the guest page
function useGuestGiftItem(itemId){
  if (!itemId) return null;
  const product = NESTI_PRODUCT_BY_ID[itemId];
  if (product) return { kind: 'product', id: itemId, product };
  // Demo custom item from guest page
  if (itemId === 'c1') return {
    kind: 'custom', id: 'c1',
    name: 'Cot from somewhere else', price: '320',
    color: 'sand', glyph: 'blanket',
    url: 'https://example.com/cot',
  };
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
function Stepper({ step }){
  const steps = ['Review', 'Delivery', 'Pay'];
  return (
    <div style={{
      display:'flex', gap: 0, alignItems:'center',
      padding: '14px 18px', background: 'var(--surface-2)',
      borderRadius: 999,
    }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{
            display:'flex', alignItems:'center', gap: 10,
            color: step > i ? 'var(--petal-500)' : step === i + 1 ? 'var(--ink-900)' : 'var(--ink-300)',
            fontWeight: step === i + 1 ? 600 : 500,
            fontSize: 13,
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 999,
              background: step > i + 1 ? 'var(--petal-400)' :
                          step === i + 1 ? 'var(--ink-900)' : 'var(--bg)',
              border: step <= i ? '1px solid var(--line-strong)' : '0',
              color: step >= i + 1 ? 'var(--bg)' : 'var(--ink-500)',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              fontSize: 12, fontWeight: 600,
            }}>
              {step > i + 1 ? <NIcon name="check" size={12} stroke="var(--bg)"/> : i + 1}
            </div>
            <span>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, background: 'var(--line-strong)', margin: '0 12px', minWidth: 24 }}/>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function Section({ open, idx, label, complete, onEdit, children }){
  if (!open && !complete){
    // Show a locked / placeholder block
    return (
      <div style={{
        padding: '18px 22px', borderRadius: 'var(--r-lg)',
        background: 'var(--surface-2)',
        display:'flex', alignItems:'center', gap: 12,
        opacity: .55,
      }}>
        <span style={{
          width: 24, height: 24, borderRadius: 999, background:'var(--bg)',
          color:'var(--ink-500)', display:'inline-flex', alignItems:'center', justifyContent:'center',
          fontSize: 12, fontWeight: 600,
        }}>{idx}</span>
        <span style={{ fontFamily:'var(--font-display)', fontSize: 18, fontWeight: 500, color:'var(--ink-700)' }}>{label}</span>
      </div>
    );
  }
  return (
    <div className="card" style={{
      padding: 24, transition: 'box-shadow .2s',
      borderColor: open ? 'var(--line-strong)' : 'var(--line)',
      background: open ? 'var(--surface)' : 'var(--surface-2)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: open ? 16 : 0 }}>
        <span style={{
          width: 24, height: 24, borderRadius: 999,
          background: complete ? 'var(--petal-400)' : 'var(--ink-900)', color: 'var(--bg)',
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          fontSize: 12, fontWeight: 600,
        }}>{complete ? <NIcon name="check" size={12} stroke="var(--bg)"/> : idx}</span>
        <h3 style={{
          fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 500, margin: 0,
          flex: 1, letterSpacing: '-0.01em',
        }}>{label}</h3>
        {complete && !open && (
          <button className="btn btn-ghost btn-sm" onClick={onEdit}>
            <NIcon name="edit" size={14}/> Edit
          </button>
        )}
      </div>
      {open && children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function GiftLine({ giftItem, lang }){
  if (!giftItem) return null;
  const { kind, product, name, price } = giftItem;
  return (
    <div style={{
      display:'grid', gridTemplateColumns: '100px 1fr auto', gap: 18, alignItems:'center',
    }}>
      <div style={{ width: 100, height: 100, borderRadius: 14, overflow:'hidden' }}>
        {kind === 'product' ? <ProductArt product={product} size="sm" style={{ minHeight: 100 }}/> : (
          <div style={{
            width:'100%', height:'100%', background:'var(--bg-soft)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--petal-400)',
          }}>
            <NIcon name={giftItem.glyph || 'link'} size={48} strokeWidth={1.2}/>
          </div>
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        {kind === 'product' && (
          <div style={{ fontSize: 11, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ink-500)', marginBottom: 4 }}>
            {product.brand} · {NESTI_CATEGORIES.find(c=>c.id===product.cat)?.label}
          </div>
        )}
        <div style={{ fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 500, color:'var(--ink-900)', letterSpacing:'-0.01em' }}>
          {kind === 'product' ? product.name : name}
        </div>
        {kind === 'product' && (
          <p style={{ fontSize: 13, color:'var(--ink-500)', margin: '6px 0 0', lineHeight: 1.55 }}>
            {product.desc}
          </p>
        )}
      </div>
      <div style={{ textAlign:'end', fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 600 }}>
        {formatPrice(kind === 'product' ? product.price : parseFloat(price) || 0, lang)}
      </div>
    </div>
  );
}

function GiftLineCompact({ giftItem, lang }){
  if (!giftItem) return null;
  const { kind, product, name, price } = giftItem;
  return (
    <div style={{ display:'flex', gap: 12, alignItems:'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: 12, overflow:'hidden', flexShrink: 0 }}>
        {kind === 'product' ? <ProductArt product={product} size="sm" style={{ minHeight: 56 }}/> : (
          <div style={{
            width:'100%', height:'100%', background:'var(--bg-soft)',
            display:'flex', alignItems:'center', justifyContent:'center', color:'var(--petal-400)',
          }}>
            <NIcon name={giftItem.glyph || 'link'} size={26} strokeWidth={1.3}/>
          </div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily:'var(--font-display)', fontSize: 16, fontWeight: 500,
          color:'var(--ink-900)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
        }}>{kind === 'product' ? product.name : name}</div>
        <div style={{ fontSize: 12, color:'var(--ink-500)' }}>Qty 1</div>
      </div>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{formatPrice(kind === 'product' ? product.price : parseFloat(price) || 0, lang)}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function DeliveryChoice({ value, onChange, ownerName, ownerAddress }){
  return (
    <div style={{ display:'grid', gap: 12 }}>
      <ChoiceCard
        selected={value === 'mother'}
        onSelect={()=>onChange('mother')}
        icon="heart"
        title={`Deliver directly to ${ownerName}`}
        sub={`This gift will be sent to ${ownerName}'s saved address — kept private.`}
        meta={<ProtectedAddressInline ownerName={ownerName} ownerAddress={ownerAddress}/>}
        badge="Recommended"
      />
      <ChoiceCard
        selected={value === 'me'}
        onSelect={()=>onChange('me')}
        icon="home"
        title="Deliver to me"
        sub="We'll send it to you, so you can bring it in person."
      />
    </div>
  );
}

function ChoiceCard({ selected, onSelect, icon, title, sub, meta, badge }){
  return (
    <button onClick={onSelect} type="button" style={{
      textAlign:'start', cursor:'pointer', appearance: 'none', width: '100%',
      padding: 18, gap: 14, display:'grid', gridTemplateColumns: '24px 1fr auto', alignItems:'flex-start',
      border: '1.5px solid ' + (selected ? 'var(--petal-400)' : 'var(--line-strong)'),
      borderRadius: 14, background: selected ? 'var(--petal-50)' : 'var(--surface)',
      transition: 'border .15s, background .15s',
    }}>
      <span style={{ marginTop: 2, color: selected ? 'var(--petal-500)' : 'var(--ink-500)' }}>
        <Radio selected={selected}/>
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 4 }}>
          <span style={{ color: 'var(--petal-500)', flexShrink: 0, display:'inline-flex' }}><NIcon name={icon} size={18}/></span>
          <span style={{
            fontFamily:'var(--font-display)', fontSize: 19, fontWeight: 500,
            color:'var(--ink-900)', lineHeight: 1.2,
          }}>{title}</span>
        </div>
        <div style={{ fontSize: 13, color:'var(--ink-500)', lineHeight: 1.55 }}>{sub}</div>
        {selected && meta && <div style={{ marginTop: 12 }}>{meta}</div>}
      </div>
      {badge && (
        <span style={{
          background:'var(--petal-100)', color:'var(--petal-500)',
          padding:'4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
          letterSpacing:'.05em', whiteSpace:'nowrap', alignSelf:'flex-start',
        }}>{badge}</span>
      )}
    </button>
  );
}

function Radio({ selected }){
  return (
    <span style={{
      width: 18, height: 18, borderRadius: 999,
      border: '1.5px solid ' + (selected ? 'var(--petal-400)' : 'var(--line-strong)'),
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      background: selected ? 'var(--petal-400)' : 'transparent',
    }}>
      {selected && <span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff' }}/>}
    </span>
  );
}

function ProtectedAddressInline({ ownerName, ownerAddress }){
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap: 10,
      padding: '10px 14px', background: 'var(--surface)',
      border: '1px dashed var(--line-strong)', borderRadius: 12,
      fontSize: 12, color:'var(--ink-700)',
    }}>
      <NIcon name="lock" size={14} stroke="var(--petal-400)"/>
      <span><strong style={{color:'var(--ink-900)'}}>{ownerName}</strong> · {ownerAddress.city}, {ownerAddress.country} — full address hidden for privacy</span>
    </div>
  );
}

function ProtectedAddressCard({ ownerName, ownerInitial, ownerAddress }){
  return (
    <div style={{
      padding: 22, background:'var(--surface-2)', borderRadius: 14,
      border: '1px solid var(--line)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 999,
          background: 'linear-gradient(135deg, var(--petal-100), var(--petal-200))',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'var(--petal-500)',
          fontFamily:'var(--font-display)', fontSize: 22, fontStyle:'italic', fontWeight: 500,
        }}>{ownerInitial}</div>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize: 18, fontWeight: 500, color:'var(--ink-900)' }}>
            {ownerName}'s address
          </div>
          <div style={{ fontSize: 12, color:'var(--ink-500)' }}>Kept private for the wishlist owner.</div>
        </div>
        <span style={{
          marginInlineStart:'auto',
          padding:'4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
          letterSpacing:'.06em', background:'var(--petal-50)', color:'var(--petal-500)',
          display:'inline-flex', alignItems:'center', gap: 4,
        }}>
          <NIcon name="lock" size={12}/> PROTECTED
        </span>
      </div>
      <div style={{
        background:'var(--surface)', borderRadius: 10, padding: '14px 16px',
        border:'1px dashed var(--line-strong)',
        fontFamily:'ui-monospace, monospace', fontSize: 13, color:'var(--ink-700)',
        display:'grid', gap: 4,
      }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:'var(--ink-500)' }}>Name</span>
          <span>{ownerName.split(' ')[0]} •••••</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:'var(--ink-500)' }}>Street</span>
          <span>{ownerAddress.streetMasked}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:'var(--ink-500)' }}>City</span>
          <span>{ownerAddress.city}, {ownerAddress.region}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:'var(--ink-500)' }}>Postcode</span>
          <span>{ownerAddress.postcodeMasked}</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:'var(--ink-500)' }}>Country</span>
          <span>{ownerAddress.country}</span>
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-500)' }}>
        <NIcon name="eyeOff" size={12}/> This gift will be delivered directly to the wishlist owner. Their full address is not shared with you.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function AddressForm({ value, onChange, errors }){
  const u = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Full name" required>
          <input className="input" value={value.name} onChange={u('name')} placeholder="Sara Khoury"
            style={errors.name ? { borderColor: '#A04A38' } : {}}/>
        </Field>
        <Field label="Phone" required>
          <input className="input" value={value.phone} onChange={u('phone')} placeholder="+966 5•• •••• ••"
            style={errors.phone ? { borderColor: '#A04A38' } : {}}/>
        </Field>
      </div>
      <Field label="Street address" required>
        <input className="input" value={value.street} onChange={u('street')} placeholder="123 Olive Grove St."
          style={errors.street ? { borderColor: '#A04A38' } : {}}/>
      </Field>
      <div style={{ display:'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 14 }}>
        <Field label="City" required>
          <input className="input" value={value.city} onChange={u('city')} placeholder="Riyadh"
            style={errors.city ? { borderColor: '#A04A38' } : {}}/>
        </Field>
        <Field label="Region">
          <input className="input" value={value.region} onChange={u('region')} placeholder="Riyadh"/>
        </Field>
        <Field label="Postcode">
          <input className="input" value={value.postcode} onChange={u('postcode')} placeholder="12345"/>
        </Field>
      </div>
    </div>
  );
}

function PaymentForm({ value, onChange, errors }){
  const u = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 14 }}>
        <h4 style={{ fontFamily:'var(--font-display)', fontSize: 20, fontWeight: 500, margin: 0 }}>Payment</h4>
        <span style={{
          padding:'3px 9px', borderRadius: 999, background:'var(--petal-50)',
          color:'var(--petal-500)', fontSize: 11, fontWeight: 600, letterSpacing:'.05em',
          display:'inline-flex', alignItems:'center', gap: 4,
        }}>
          <NIcon name="lock" size={11}/> SECURE
        </span>
      </div>

      {/* Card */}
      <Field label="Cardholder name" required>
        <input className="input" value={value.cardName} onChange={u('cardName')} placeholder="Name on card"
          style={errors.cardName ? { borderColor: '#A04A38' } : {}}/>
      </Field>
      <Field label="Card number" required>
        <input className="input" value={value.cardNum} onChange={u('cardNum')} placeholder="4242 4242 4242 4242"
          style={errors.cardNum ? { borderColor: '#A04A38' } : {}}/>
      </Field>
      <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Expiry" required>
          <input className="input" value={value.exp} onChange={u('exp')} placeholder="MM/YY"
            style={errors.exp ? { borderColor: '#A04A38' } : {}}/>
        </Field>
        <Field label="CVC" required>
          <input className="input" value={value.cvc} onChange={u('cvc')} placeholder="123"
            style={errors.cvc ? { borderColor: '#A04A38' } : {}}/>
        </Field>
      </div>
    </div>
  );
}

function Field({ label, required, children }){
  return (
    <div style={{ marginTop: 14 }}>
      <label className="field-label">{label}{required && <span style={{color:'var(--petal-500)'}}> *</span>}</label>
      {children}
    </div>
  );
}

function RowKV({ k, v, bold }){
  return (
    <div style={{ display:'flex', justifyContent:'space-between', padding:'5px 0',
                  fontSize: 13, color: bold ? 'var(--ink-900)' : 'var(--ink-700)' }}>
      <span>{k}</span>
      <span style={{ fontWeight: bold ? 600 : 500 }}>{v}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Confirmation screen
function GiftConfirmationPage({ orderNum }){
  const { giftContext, navigate, reservations, setGiftContext } = useApp();
  const { lang, t } = useLang();
  const giftItem = useGuestGiftItem(giftContext?.itemId);
  const record = giftContext ? reservations[giftContext.itemId] : null;
  const order = orderNum || record?.orderNum || 'NS-•••••';

  return (
    <div className="container" style={{ padding: '64px 28px 96px', maxWidth: 760 }}>
      <div className="card fade-in" style={{
        padding: 56, textAlign:'center', borderRadius: 'var(--r-xl)',
        background: 'linear-gradient(180deg, var(--petal-50), var(--surface) 50%)',
      }}>
        <div className="pop" style={{
          width: 88, height: 88, borderRadius: 999, background: 'var(--petal-100)',
          color: 'var(--petal-500)', margin:'0 auto 20px',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <NIcon name="check" size={42} strokeWidth={2}/>
        </div>
        <div style={{
          fontSize: 11, letterSpacing:'.18em', textTransform:'uppercase',
          color:'var(--petal-500)', fontWeight: 700, marginBottom: 12,
        }}>Order #{order}</div>
        <h1 className="display italic" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', margin: 0, lineHeight: 1.05 }}>
          Your gift has been purchased successfully.
        </h1>
        <p style={{ color:'var(--ink-700)', marginTop: 16, fontSize: 16, maxWidth: 480, marginInline:'auto', lineHeight: 1.6 }}>
          We'll wrap it by hand, add your note, and {record?.deliverTo === 'mother' ? `send it directly to ${giftContext?.ownerName || 'the wishlist owner'}` : "send it to you"}. A receipt is on its way to your inbox.
        </p>

        {giftItem && (
          <div className="card" style={{
            textAlign:'start',
            margin:'32px auto 0', padding: 18, maxWidth: 440,
            background:'var(--surface)', border:'1px solid var(--line)',
          }}>
            <GiftLineCompact giftItem={giftItem} lang={lang}/>
            <div style={{
              marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)',
              display:'flex', gap: 8, flexWrap:'wrap',
            }}>
              <Pill icon="check" label="Purchased" tone="petal"/>
              {record?.deliverTo === 'mother'
                ? <Pill icon="heart" label={`Direct to ${giftContext?.ownerName || 'owner'}`} tone="ink"/>
                : <Pill icon="home" label="Delivering to you" tone="ink"/>}
              <Pill icon="lock" label="Address protected" tone="muted"/>
            </div>
          </div>
        )}

        <div style={{ display:'inline-flex', gap: 12, marginTop: 36, flexWrap:'wrap', justifyContent:'center' }}>
          <button className="btn btn-primary" onClick={()=>{
            setGiftContext(null);
            navigate({ name: 'guest', wid: 'demo' });
          }}>
            <NIcon name="arrowLeft" size={14}/> Back to wishlist
          </button>
          <button className="btn btn-outline" onClick={()=>navigate({ name: 'home' })}>
            Keep shopping
          </button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16, marginTop: 32 }} className="conf-next-grid">
        {[
          { ic:'check', t:'Item marked Purchased', s:'Other guests can no longer buy it.' },
          { ic:'sparkle', t:'Gift wrapped by hand', s:'Soft tissue, ribbon, and your note.' },
          { ic:'bag', t:'On its way soon', s:'Tracking lands in your inbox.' },
        ].map(x => (
          <div key={x.t} style={{
            padding: 18, background: 'var(--surface-2)', borderRadius: 14,
            display:'flex', gap: 12, alignItems:'flex-start',
          }}>
            <span style={{ color:'var(--petal-400)', marginTop: 2 }}><NIcon name={x.ic} size={16}/></span>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize: 16, fontWeight: 500, color:'var(--ink-900)' }}>{x.t}</div>
              <div style={{ fontSize: 12, color:'var(--ink-500)', marginTop: 2 }}>{x.s}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px){ .conf-next-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function Pill({ icon, label, tone }){
  const tones = {
    petal: { bg: 'var(--petal-100)', fg: 'var(--petal-500)' },
    ink:   { bg: 'var(--ink-900)', fg: 'var(--bg)' },
    muted: { bg: 'var(--bg-soft)', fg: 'var(--ink-700)' },
  };
  const c = tones[tone] || tones.muted;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap: 6,
      padding: '5px 10px', borderRadius: 999, background: c.bg, color: c.fg,
      fontSize: 11, fontWeight: 600, letterSpacing:'.04em',
    }}>
      <NIcon name={icon} size={12}/> {label}
    </span>
  );
}

Object.assign(window, { GiftCheckoutPage, GiftConfirmationPage });
