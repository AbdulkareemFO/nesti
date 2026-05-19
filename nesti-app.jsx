// nesti-app.jsx — main App, state, router, mounts everything

const { useState: uS, useEffect: uE, useMemo: uM, useCallback: uC } = React;

function App(){
  // ─── Tweaks ──────────────────────────────────────────────────────────────
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { palette: 'petal', type: 'serif', hero: 'split' });

  uE(() => {
    document.documentElement.dataset.palette = t.palette;
    document.documentElement.dataset.type = t.type;
  }, [t.palette, t.type]);

  // ─── Language ────────────────────────────────────────────────────────────
  const [lang, setLang] = uS('en');
  const tr = uM(() => makeT(lang), [lang]);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  uE(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);
  const langCtx = uM(() => ({ lang, t: tr, setLang, dir, price: (n) => formatPrice(n, lang) }), [lang, tr, dir]);

  // ─── App state ──────────────────────────────────────────────────────────
  const [route, setRoute] = uS({ name: 'home' });
  const [signedIn, setSignedIn] = uS(null); // {name, email}
  const [pendingAuthAction, setPendingAuthAction] = uS(null); // {reason, pendingProductId}
  const [authPromptOpen, setAuthPromptOpen] = uS(false);

  // Shopping state
  const [cart, setCart] = uS([]); // [{id, qty}]
  const [wishlist, setWishlist] = uS([]); // [productId]
  const [customItems, setCustomItems] = uS([]); // [{uid, name, price, url, photo}]
  const [reservations, setReservations] = uS({}); // {itemId: {buyer, deliverTo, orderNum, ts}}
  const [wishlistTitle, setWishlistTitle] = uS('My Baby Wishlist');

  // Gift purchase context — set when a guest clicks "Buy gift" on a shared wishlist
  const [giftContext, setGiftContext] = uS(null); // {itemId, ownerName, ownerInitial}
  // Owner's protected delivery address (the mother's; redacted to guests)
  const ownerAddress = {
    name: 'Maya Khoury',
    streetMasked: 'King Abdulaziz Rd, Apt ••', city: 'Riyadh', region: 'Riyadh',
    postcodeMasked: '12••', country: 'Saudi Arabia',
  };

  const [toasts, setToasts] = uS([]);
  const addToast = uC((t) => {
    const id = makeUid();
    setToasts(arr => [...arr, { id, ...t }]);
    setTimeout(()=>setToasts(arr => arr.filter(x => x.id !== id)), 2400);
  }, []);

  // Scroll to top on route change
  uE(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [route]);

  // ─── Cart ops ───────────────────────────────────────────────────────────
  const addToCart = uC((id) => {
    setCart(c => {
      const existing = c.find(x => x.id === id);
      if (existing) return c.map(x => x.id === id ? {...x, qty: x.qty + 1} : x);
      return [...c, { id, qty: 1 }];
    });
    const p = NESTI_PRODUCT_BY_ID[id];
    addToast({ msg: `${p.name} added to your cart`, icon: 'check' });
  }, [addToast]);

  const updateQty = uC((id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(c => c.map(x => x.id === id ? {...x, qty} : x));
  }, []);

  const removeFromCart = uC((id) => {
    setCart(c => c.filter(x => x.id !== id));
  }, []);

  // ─── Wishlist ops ───────────────────────────────────────────────────────
  const wishlistIds = uM(() => new Set(wishlist), [wishlist]);

  const toggleWishlist = uC((id) => {
    setWishlist(w => {
      if (w.includes(id)){
        const p = NESTI_PRODUCT_BY_ID[id];
        addToast({ msg: `Removed from wishlist`, icon: 'heart' });
        return w.filter(x => x !== id);
      }
      const p = NESTI_PRODUCT_BY_ID[id];
      addToast({ msg: `Saved — ${p.name}`, icon: 'heartFill' });
      return [...w, id];
    });
  }, [addToast]);

  const removeFromWishlist = uC((id) => {
    setWishlist(w => w.filter(x => x !== id));
    addToast({ msg: 'Removed from wishlist' });
  }, [addToast]);

  const addCustomItem = uC((item) => {
    setCustomItems(c => [...c, { uid: makeUid(), ...item }]);
  }, []);
  const updateCustomItem = uC((uid, item) => {
    setCustomItems(c => c.map(x => x.uid === uid ? { ...x, ...item } : x));
  }, []);
  const removeCustomItem = uC((uid) => {
    setCustomItems(c => c.filter(x => x.uid !== uid));
    addToast({ msg: 'Removed' });
  }, [addToast]);

  // ─── Reservations / Purchases (guest gift flow) ─────────────────────────
  const reserveGift = uC((itemId, buyer, extra = {}) => {
    setReservations(r => ({ ...r, [itemId]: { buyer, ts: Date.now(), ...extra } }));
  }, []);
  const unreserveGift = uC((itemId) => {
    setReservations(r => { const n = {...r}; delete n[itemId]; return n; });
  }, []);
  const purchaseGift = uC((itemId, buyer, deliverTo) => {
    const orderNum = 'NS-' + Math.floor(100000 + Math.random() * 900000);
    setReservations(r => ({ ...r, [itemId]: { buyer, deliverTo, orderNum, purchased: true, ts: Date.now() } }));
    return orderNum;
  }, []);

  // Trigger the gift-checkout flow. If not signed in, gate behind auth first.
  const startGiftPurchase = uC((item, owner) => {
    const ctx = { itemId: item.id, kind: item.kind, ownerName: owner.name, ownerInitial: owner.name[0] };
    setGiftContext(ctx);
    if (!signedIn){
      setPendingAuthAction({ reason: 'buyGift', giftContext: ctx });
      setAuthPromptOpen(true);
    } else {
      setRoute({ name: 'gift-checkout' });
    }
  }, [signedIn]);

  // ─── Auth ───────────────────────────────────────────────────────────────
  const signUp = uC(({ name, email, skipOtp }) => {
    if (skipOtp){
      setSignedIn({ name, email });
      // Handle any pending action
      if (pendingAuthAction){
        if (pendingAuthAction.pendingProductId){
          setWishlist(w => w.includes(pendingAuthAction.pendingProductId) ? w : [...w, pendingAuthAction.pendingProductId]);
        }
        if (pendingAuthAction.giftContext){
          setGiftContext(pendingAuthAction.giftContext);
          // Defer to next tick so any caller-side navigate after this runs first and gets overridden last by us.
          setTimeout(() => setRoute({ name: 'gift-checkout' }), 30);
        }
        setPendingAuthAction(null);
      }
    } else {
      // Stash pending name/email for OTP step
      setPendingAuthAction(p => ({ ...(p || {}), name, email }));
    }
  }, [pendingAuthAction]);

  const verifyOtp = uC(() => {
    setPendingAuthAction(p => {
      if (p?.name && p?.email){
        setSignedIn({ name: p.name, email: p.email });
        if (p.pendingProductId){
          setWishlist(w => w.includes(p.pendingProductId) ? w : [...w, p.pendingProductId]);
        }
        if (p.giftContext){
          setGiftContext(p.giftContext);
          setTimeout(()=> setRoute({ name: 'gift-checkout' }), 0);
        }
      }
      return null;
    });
  }, []);

  const signOut = uC(() => {
    setSignedIn(null);
    addToast({ msg: 'Signed out — see you soon.' });
  }, [addToast]);

  const requireAuth = uC((opts = {}) => {
    setPendingAuthAction(opts);
    setAuthPromptOpen(true);
  }, []);

  // ─── Navigation ─────────────────────────────────────────────────────────
  const navigate = uC((r) => { setRoute(r); }, []);

  const openSearch = uC(() => {
    setSearchOpen(true);
  }, []);
  const [searchOpen, setSearchOpen] = uS(false);

  // Share URL — fake but plausible
  const getShareUrl = uC(() => {
    const base = (typeof window !== 'undefined') ? `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, '')}` : 'https://nesti.shop/';
    return `${base}#wishlist/${(signedIn?.name || 'maya').toLowerCase().replace(/\s+/g,'-')}-${Math.floor(Math.random()*900+100)}`;
  }, [signedIn]);

  // Derived
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const wishlistCount = wishlist.length + customItems.length;

  const ctx = {
    route, navigate,
    signedIn, signUp, verifyOtp, signOut,
    requireAuth, pendingAuthAction,
    cart, addToCart, updateQty, removeFromCart, cartCount,
    wishlist, wishlistIds, toggleWishlist, removeFromWishlist, wishlistCount,
    customItems, addCustomItem, updateCustomItem, removeCustomItem,
    reservations, reserveGift, unreserveGift, purchaseGift,
    giftContext, setGiftContext, startGiftPurchase, ownerAddress,
    wishlistTitle, setWishlistTitle,
    addToast, openSearch, query: '', setQuery: () => {},
    tweaks: t, setTweak,
    getShareUrl,
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  const hideChrome = ['signup', 'login', 'otp'].includes(route.name);

  let pageEl;
  switch(route.name){
    case 'home':     pageEl = <HomePage/>; break;
    case 'shop':     pageEl = <ShopPage cat={route.cat}/>; break;
    case 'detail':   pageEl = <ProductDetailPage id={route.id}/>; break;
    case 'cart':     pageEl = <CartPage/>; break;
    case 'wishlist': pageEl = <WishlistPage/>; break;
    case 'guest':    pageEl = <GuestWishlistPage wid={route.wid}/>; break;
    case 'signup':   pageEl = <SignUpPage/>; break;
    case 'login':    pageEl = <LoginPage/>; break;
    case 'otp':      pageEl = <OTPPage email={pendingAuthAction?.email || route.email}/>; break;
    case 'gift-checkout':     pageEl = <GiftCheckoutPage/>; break;
    case 'gift-confirmation': pageEl = <GiftConfirmationPage orderNum={route.orderNum}/>; break;
    default:         pageEl = <HomePage/>;
  }

  return (
    <AppCtx.Provider value={ctx}>
    <LangCtx.Provider value={langCtx}>
      <div data-screen-label={route.name} style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
        {!hideChrome && <Header/>}
        <main style={{ flex: 1 }}>
          {pageEl}
        </main>
        {!hideChrome && <Footer/>}
      </div>

      <AuthPrompt
        open={authPromptOpen}
        reason={pendingAuthAction?.reason}
        onClose={()=>setAuthPromptOpen(false)}
      />

      <SearchOverlay open={searchOpen} onClose={()=>setSearchOpen(false)}/>

      <Toaster toasts={toasts}/>

      <NestiTweaks t={t} setTweak={setTweak}/>
    </LangCtx.Provider>
    </AppCtx.Provider>
  );
}

// ─── Tweaks panel ───────────────────────────────────────────────────────
function NestiTweaks({ t, setTweak }){
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette" />
      <TweakColor
        label="Palette"
        value={t.palette === 'petal' ? ['#F7D9CC','#C97D67','#FCEBE3'] :
               t.palette === 'sand'  ? ['#EEDFC3','#C9A56C','#F7EFE2'] :
                                       ['#D4DECA','#92A57F','#E9EFE5']}
        options={[
          ['#F7D9CC','#C97D67','#FCEBE3'], // petal
          ['#EEDFC3','#C9A56C','#F7EFE2'], // sand
          ['#D4DECA','#92A57F','#E9EFE5'], // sage
        ]}
        onChange={(v) => {
          // map array back to a palette key by first color
          const first = v[0];
          if (first === '#F7D9CC') setTweak('palette', 'petal');
          else if (first === '#EEDFC3') setTweak('palette', 'sand');
          else setTweak('palette', 'sage');
        }}
      />
      <TweakRadio
        label="Set"
        value={t.palette}
        options={['petal','sand','sage']}
        onChange={(v) => setTweak('palette', v)}
      />

      <TweakSection label="Typography"/>
      <TweakRadio
        label="Headlines"
        value={t.type}
        options={['serif','sans','mixed']}
        onChange={(v) => setTweak('type', v)}
      />

      <TweakSection label="Hero layout"/>
      <TweakRadio
        label="Style"
        value={t.hero}
        options={['split','centered','full']}
        onChange={(v) => setTweak('hero', v)}
      />
    </TweaksPanel>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);
