// nesti-i18n.jsx — translations + currency helper + language toggle

const NESTI_TRANSLATIONS = {
  en: {
    // utility strip
    'strip.before': 'Complimentary gift wrap on every order ·',
    'strip.slogan': "A nest for what's coming",
    'strip.after': '· Free shipping over SAR 300',

    // categories
    'cat.feeding': 'Feeding',
    'cat.nursery': 'Nursery',
    'cat.clothing': 'Clothing',
    'cat.toys': 'Toys',
    'cat.bath': 'Bath',
    'cat.mom': 'Mom Essentials',
    'cat.other': 'Other',

    // ages
    'age.newborn': 'Newborn',
    'age.0-3': '0–3 mo', 'age.3-6': '3–6 mo', 'age.6-12': '6–12 mo',
    'age.1-2': '1–2 yrs', 'age.2+': '2+ yrs',
    'age.all': 'All ages',

    // gender
    'gender.all': 'Everyone',
    'gender.girls': 'Girls',
    'gender.boys': 'Boys',

    // header
    'a11y.search': 'Search', 'a11y.home': 'Home', 'a11y.account': 'Account',
    'a11y.wishlist': 'Wishlist', 'a11y.cart': 'Cart', 'a11y.menu': 'Menu',
    'header.createAccount': 'Create account',
    'header.login': 'Log in',
    'header.myWishlist': 'My wishlist',
    'header.myCart': 'My cart',
    'header.signOut': 'Sign out',
    'header.hi': 'Hi,',

    // hero
    'hero.eyebrowNew': 'NEW · Wishlist sharing is here',
    'hero.title1': 'Mother to be?',
    'hero.title2': 'Share your wishlist',
    'hero.title3': 'with your loved ones.',
    'hero.shopNow': 'Shop now',
    'hero.startWishlist': 'Start your wishlist',
    'hero.centeredTitle': 'Mother to be? Share your wishlist with your loved ones.',
    'hero.centeredSub': 'A quiet place to save what you love — and let the people who love you help bring it home.',
    'hero.shopTheNest': 'Shop the nest',
    'hero.fullEyebrow': 'For mothers, by mothers',
    'hero.fullTitle1': "A nest for",
    'hero.fullTitle2': "what's coming.",
    'hero.fullSub': 'Mother to be? Share your wishlist with your loved ones — and let the gentle things find you.',

    // sections
    'sec.theShop': 'The shop',
    'sec.gentleTitle': 'Gentle things, gathered.',
    'sec.gentleSub': 'Six small worlds — feeding, sleep, dressing, play, bath, and a corner for mother.',
    'sec.shopEdit': 'Shop the edit',
    'sec.byAge': 'By age, by need.',
    'sec.byAgeSub': 'Each piece is hand-picked by mothers, doulas, and the people who actually use it.',
    'sec.firstArrivals': 'The first arrivals',
    'sec.piecesWeChose': "Pieces we'd choose ourselves.",
    'sec.piecesWeChoseSub': "A small, honest selection — the things we'd buy our own sisters.",
    'sec.recentlyIn': 'Recently in',
    'sec.softNews': 'Soft news.',
    'sec.viewWhole': 'View the whole shop',

    // filters / labels
    'lbl.age': 'Age', 'lbl.category': 'Category', 'lbl.for': 'For',
    'lbl.everything': 'Everything',

    // product card
    'pc.add': 'Add', 'pc.addToCart': 'Add to cart', 'pc.wishlist': 'Wishlist', 'pc.saved': 'Saved',

    // wishlist promo
    'promo.forMothers': 'For mothers-to-be',
    'promo.title': 'Make a soft list.',
    'promo.title2': 'Send it to the ones who love you.',
    'promo.sub': "Save anything from the shop. Add the cot from somewhere else. Share with a single link — your people can reserve a gift so nothing arrives twice.",
    'promo.startCta': 'Start your wishlist',
    'promo.seeExample': 'See an example',
    'promo.b1': 'Save from anywhere with a link — no judgement on where it came from.',
    'promo.b2': 'Family and friends can quietly reserve a gift before they buy.',
    'promo.b3': 'Edit and re-share. Nothing is locked.',

    // wishlist mock card
    'mock.maya': "Maya's baby wishlist",
    'mock.dueAug': 'Due August · 14 items',
    'mock.shared': 'Shared',
    'mock.available': 'Available', 'mock.reserved': 'Reserved',

    // editorial
    'edit.letters': 'Letters from Nesti',
    'edit.lettersTitle': 'The first few weeks: a quiet list of what really matters.',
    'edit.readLetter': 'Read the letter',

    // shop page
    'shop.numPieces': 'pieces',
    'shop.sort': 'Sort',
    'shop.featured': 'Featured', 'shop.loHi': 'Price, low to high', 'shop.hiLo': 'Price, high to low',

    // detail
    'det.suitable': 'Suitable for', 'det.qty': 'Quantity', 'det.addCart': 'Add to cart',
    'det.mothers': '({n} mothers)',
    'det.alsoLove': 'You may also love',
    'det.softness': 'In the same softness',
    'det.promise1Title': 'Complimentary gift wrap', 'det.promise1Sub': 'On every order, by hand.',
    'det.promise2Title': 'Returns within 30 days', 'det.promise2Sub': 'No questions. Soft policy.',
    'det.promise3Title': 'Mother-tested', 'det.promise3Sub': 'Vetted by our small group of mothers and midwives.',

    // cart
    'cart.eyebrow': 'Your cart',
    'cart.title': 'A small bundle, gathering.',
    'cart.subtotal': 'Subtotal', 'cart.shipping': 'Shipping', 'cart.giftwrap': 'Gift wrap',
    'cart.included': 'Included', 'cart.free': 'Free', 'cart.total': 'Total',
    'cart.checkout': 'Secure checkout', 'cart.signinNote': "You'll be asked to sign in or create an account at checkout.",
    'cart.noteTitle': 'A gentle note', 'cart.noteSub': 'Add a hand-written card or gift wrap at checkout. We tuck them in by hand.',
    'cart.keepBrowsing': 'Keep browsing', 'cart.remove': 'Remove',
    'cart.emptyTitle': 'Your bundle is empty.',
    'cart.emptySub': 'Begin softly. Anything you love can wait here, ready when you are.',
    'cart.browse': 'Browse the shop', 'cart.yourWishlist': 'Your wishlist',
    'cart.orderPlaced': 'Order placed — your nest is on its way.',

    // wishlist page
    'wl.dueAug': '{name}\'s wishlist · Due August',
    'wl.title': 'My Baby Wishlist',
    'wl.sub': "Everything you've saved. Share it with the people you love — they can reserve a gift so nothing arrives twice.",
    'wl.addCustom': 'Add a custom item', 'wl.share': 'Share wishlist',
    'wl.stat.saved': 'Saved', 'wl.stat.custom': 'Custom', 'wl.stat.reserved': 'Reserved',
    'wl.stat.totalValue': 'Total value',
    'wl.stat.reservedNote': 'When friends reserve a gift, it shows here.',
    'wl.empty.title': 'Your nest is empty.',
    'wl.empty.sub': 'Save something from the shop — or add a custom item from elsewhere with its link.',
    'wl.view': 'View', 'wl.open': 'Open link',
    'wl.fromElsewhere': 'From elsewhere', 'wl.priceNotSet': 'Price not set',
    'wl.custom': 'Custom',

    // wishlist (signed-out gate)
    'wl.gate.title': 'Your wishlist lives here.',
    'wl.gate.sub': 'Sign in to save what you love, share it with family, and let them gently bring it home.',
    'wl.gate.create': 'Create a free account',
    'wl.gate.have': 'I have one already',

    // custom item modal
    'ci.title': 'Add a custom item', 'ci.editTitle': 'Edit item',
    'ci.sub': 'Saw something perfect somewhere else? Add it to your nest with the link.',
    'ci.name': 'Item name *', 'ci.price': 'Price', 'ci.link': 'Product link',
    'ci.photo': 'Photo (optional)', 'ci.upload': 'Upload a photo', 'ci.change': 'Change photo',
    'ci.uploadSub': 'JPG or PNG, up to 5MB',
    'ci.cancel': 'Cancel', 'ci.save': 'Save changes', 'ci.add': 'Add to wishlist',
    'ci.added': 'Added to your wishlist.', 'ci.updated': 'Updated.',
    'ci.removed': 'Removed',

    // share modal
    'sh.title': 'Share your wishlist',
    'sh.sub': 'Anyone with this link can see your wishlist and reserve a gift quietly. No signup needed.',
    'sh.publicLink': 'Public link', 'sh.copy': 'Copy', 'sh.copied': 'Copied',
    'sh.orVia': 'or share via',
    'sh.nesti': 'Nesti', 'sh.whatsapp': 'WhatsApp', 'sh.email': 'Email',
    'sh.tip': 'Tip.', 'sh.tipSub': 'When a friend reserves a gift, the item shows as reserved for everyone else, so nothing arrives twice.',
    'sh.sentNesti': 'Sent to your friend on Nesti.',

    // guest
    'guest.banner1': "You're viewing", 'guest.banner2': "'s wishlist as a guest.",
    'guest.visitShop': 'Visit the shop',
    'guest.eyebrow': 'A shared wishlist',
    'guest.items': '{n} items',
    'guest.step1t': 'Have a look', 'guest.step1s': 'Browse {name}\'s nest. No account, no fuss.',
    'guest.step2t': 'Buy a gift', 'guest.step2s': "Pick what you'd like to bring — it adds to your cart and you check out in the same place.",
    'guest.step3t': 'Send your gift', 'guest.step3s': 'Order through Nesti and send your gift — we wrap it by hand.',
    'guest.reserve': 'Buy gift', 'guest.unreserve': 'Cancel',
    'guest.viewDetails': 'View details',
    'guest.reservedLabel': 'Purchased',
    'guest.wantOwn': 'Want one of your own?',
    'guest.wantSub': 'Start a wishlist for your own little one — it takes a minute, and your loved ones can help bring it home.',

    // reserve modal
    'rm.title': 'Buy this gift?',
    'rm.sub': 'We\u2019ll add it to your cart and take you to checkout. Other guests will see it marked as purchased so nothing arrives twice.',
    'rm.cancel': 'Cancel', 'rm.reserve': 'Add to cart & checkout',
    'rm.reserved': 'Added to your cart.', 'rm.removed': 'Removed.',

    // auth
    'auth.signup.title': 'Make your nest.', 'auth.signup.eyebrow': 'Create account',
    'auth.signup.sideHead': "A nest for what's coming.",
    'auth.signup.sideSub': 'Save the gentle things, in one place. Share with the people you love.',
    'auth.signup.lede': 'Free, no email noise. One soft place for your wishlist and orders.',
    'auth.signup.name': 'Your name', 'auth.signup.email': 'Email', 'auth.signup.pw': 'Password',
    'auth.signup.pwPh': '6+ characters', 'auth.signup.cta': 'Create account',
    'auth.signup.have': 'Already have an account?',
    'auth.signup.login': 'Log in',
    'auth.signup.terms': 'By creating an account, you agree to our soft terms and privacy notice.',
    'auth.signup.fillAll': 'Please fill all fields. Passwords need 6+ characters.',

    'auth.login.title': 'Welcome back.', 'auth.login.eyebrow': 'Log in',
    'auth.login.sideHead': 'Pick up where\nyou left off.',
    'auth.login.sideSub': 'Your wishlist and cart are waiting, untouched.',
    'auth.login.lede': 'Sign in to your Nesti.',
    'auth.login.cta': 'Log in', 'auth.login.forgot': 'Forgot?',
    'auth.login.new': 'New here?', 'auth.login.create': 'Create an account',
    'auth.login.welcome': 'Welcome back.',

    'otp.title': 'Check your inbox.', 'otp.eyebrow': 'One last step',
    'otp.sideHead': 'Almost there.', 'otp.sideSub': 'A tiny code, then your nest is open.',
    'otp.lede1': 'We sent a 6-digit code to', 'otp.lede2': 'Enter it below to finish creating your account.',
    'otp.cta': 'Verify and continue', 'otp.didntGet': "Didn't get it?",
    'otp.resendIn': 'Resend in', 'otp.resend': 'Resend code',
    'otp.wrongEmail': 'Wrong email',
    'otp.fillAll': 'Please enter all 6 digits.',
    'otp.verified': 'Verified. Welcome to Nesti.',

    'authprompt.checkout.title': 'Sign in to finish your order',
    'authprompt.checkout.sub': 'Your cart is waiting. Sign in or create a free account to check out securely.',
    'authprompt.wishlist.title': 'Sign in to start your wishlist',
    'authprompt.wishlist.sub': 'Your wishlist lives in your account — so you can share it, edit it, and find it from any device.',
    'authprompt.create': 'Create a free account', 'authprompt.have': 'I already have one',
    'authprompt.later': 'Maybe later',

    // footer
    'foot.slogan': "A nest for what's coming.",
    'foot.about': 'Thoughtfully made baby and mother essentials, gathered into a single, gentle place.',
    'foot.shop': 'Shop', 'foot.forMothers': 'For Mothers',
    'foot.startWl': 'Start a wishlist', 'foot.findWl': 'Find a wishlist', 'foot.giftcards': 'Gift cards',
    'foot.letters': 'Letters from Nesti',
    'foot.lettersSub': "Quiet emails, once a month. Stories from new mothers, and what we're making next.",
    'foot.copyright': '© Nesti, 2026 — made with care.',
    'foot.legal': 'Terms · Privacy · Press',

    // search
    'srch.placeholder': 'Search the nest…',
    'srch.nothing': 'Nothing matched.', 'srch.tryAnother': 'Try another word, or browse by category.',
    'srch.popular': 'Popular searches', 'srch.browseCats': 'Browse categories',
    'srch.cls': 'Close',

    // breadcrumb
    'crumb.home': 'Home',

    // toast / common
    'toast.addedCart': '{name} added to your cart',
    'toast.saved': 'Saved — {name}',
    'toast.removedWl': 'Removed from wishlist',
    'toast.removed': 'Removed',
    'toast.signedOut': 'Signed out — see you soon.',
    'toast.fillEmail': 'Please enter an email and password.',
  },

  ar: {
    'strip.before': 'تغليف هدية مجاني لكل طلب ·',
    'strip.slogan': 'عش لما هو قادم',
    'strip.after': '· شحن مجاني للطلبات فوق ٣٠٠ ر.س',

    'cat.feeding': 'الرضاعة',
    'cat.nursery': 'غرفة الطفل',
    'cat.clothing': 'الملابس',
    'cat.toys': 'الألعاب',
    'cat.bath': 'الاستحمام',
    'cat.mom': 'أساسيات الأم',
    'cat.other': 'أخرى',

    'age.newborn': 'حديث الولادة',
    'age.0-3': '٠–٣ شهور', 'age.3-6': '٣–٦ شهور', 'age.6-12': '٦–١٢ شهر',
    'age.1-2': 'سنة–سنتان', 'age.2+': 'سنتان فأكثر',
    'age.all': 'جميع الأعمار',

    'gender.all': 'الجميع',
    'gender.girls': 'بنات',
    'gender.boys': 'أولاد',

    'a11y.search': 'بحث', 'a11y.home': 'الرئيسية', 'a11y.account': 'الحساب',
    'a11y.wishlist': 'قائمة الأمنيات', 'a11y.cart': 'السلة', 'a11y.menu': 'القائمة',
    'header.createAccount': 'إنشاء حساب',
    'header.login': 'تسجيل الدخول',
    'header.myWishlist': 'قائمة أمنياتي',
    'header.myCart': 'سلتي',
    'header.signOut': 'تسجيل الخروج',
    'header.hi': 'مرحباً،',

    'hero.eyebrowNew': 'جديد · مشاركة قائمة الأمنيات متاحة',
    'hero.title1': 'هل أنتِ أم مستقبلية؟',
    'hero.title2': 'شاركي قائمة أمنياتك',
    'hero.title3': 'مع أحبائك.',
    'hero.shopNow': 'تسوّقي الآن',
    'hero.startWishlist': 'ابدئي قائمة أمنياتك',
    'hero.centeredTitle': 'أم مستقبلية؟ شاركي قائمة أمنياتك مع أحبائك.',
    'hero.centeredSub': 'مكان هادئ لحفظ ما تحبين — ودعي من يحبّونك يساعدون في إحضاره إليك.',
    'hero.shopTheNest': 'تسوّقي العش',
    'hero.fullEyebrow': 'للأمهات، من الأمهات',
    'hero.fullTitle1': 'عشٌّ',
    'hero.fullTitle2': 'لما هو قادم.',
    'hero.fullSub': 'أم مستقبلية؟ شاركي قائمتك مع من تحبين — ودعي الأشياء اللطيفة تجدك.',

    'sec.theShop': 'المتجر',
    'sec.gentleTitle': 'أشياء لطيفة، مجموعة بعناية.',
    'sec.gentleSub': 'ستة عوالم صغيرة — الرضاعة، النوم، الملابس، اللعب، الاستحمام، وركن خاص بالأم.',
    'sec.shopEdit': 'مختارات المتجر',
    'sec.byAge': 'حسب العمر، وحسب الحاجة.',
    'sec.byAgeSub': 'كل قطعة مختارة يدوياً من قبل الأمهات والقابلات ومن يستخدمن المنتج فعلاً.',
    'sec.firstArrivals': 'الوصول الأول',
    'sec.piecesWeChose': 'قطع نختارها لأنفسنا.',
    'sec.piecesWeChoseSub': 'مجموعة صغيرة وصادقة — ما كنا لنشتريه لأخواتنا.',
    'sec.recentlyIn': 'وصل حديثاً',
    'sec.softNews': 'أخبار لطيفة.',
    'sec.viewWhole': 'تصفّحي المتجر بالكامل',

    'lbl.age': 'العمر', 'lbl.category': 'الفئة', 'lbl.for': 'لـ',
    'lbl.everything': 'كل شيء',

    'pc.add': 'إضافة', 'pc.addToCart': 'أضف للسلة', 'pc.wishlist': 'الأمنيات', 'pc.saved': 'محفوظ',

    'promo.forMothers': 'للأمهات المستقبليات',
    'promo.title': 'اصنعي قائمة لطيفة.',
    'promo.title2': 'وأرسليها لمن يحبونك.',
    'promo.sub': 'احفظي أي شيء من المتجر. أضيفي السرير من مكان آخر. شاركي برابط واحد — يمكن لأحبائك حجز هدية حتى لا يصل شيء مكرر.',
    'promo.startCta': 'ابدئي قائمتك',
    'promo.seeExample': 'شاهدي مثالاً',
    'promo.b1': 'احفظي من أي مكان برابط — لا أحكام على المصدر.',
    'promo.b2': 'يمكن للعائلة والأصدقاء حجز الهدية بهدوء قبل الشراء.',
    'promo.b3': 'حرري وأعيدي المشاركة. لا شيء مقفل.',

    'mock.maya': 'قائمة مايا للأمنيات',
    'mock.dueAug': 'الموعد أغسطس · ١٤ قطعة',
    'mock.shared': 'تمت المشاركة',
    'mock.available': 'متوفر', 'mock.reserved': 'محجوز',

    'edit.letters': 'رسائل من نِستي',
    'edit.lettersTitle': 'الأسابيع الأولى: قائمة هادئة لما يهم حقاً.',
    'edit.readLetter': 'اقرئي الرسالة',

    'shop.numPieces': 'قطعة',
    'shop.sort': 'ترتيب',
    'shop.featured': 'مميّز', 'shop.loHi': 'السعر من الأقل إلى الأعلى', 'shop.hiLo': 'السعر من الأعلى إلى الأقل',

    'det.suitable': 'مناسب لـ', 'det.qty': 'الكمية', 'det.addCart': 'أضف للسلة',
    'det.mothers': '({n} أم)',
    'det.alsoLove': 'قد يعجبك أيضاً',
    'det.softness': 'في نفس النعومة',
    'det.promise1Title': 'تغليف هدية مجاني', 'det.promise1Sub': 'لكل طلب، يدوياً.',
    'det.promise2Title': 'إرجاع خلال ٣٠ يوماً', 'det.promise2Sub': 'بدون أسئلة. سياسة مرنة.',
    'det.promise3Title': 'مختبر من الأمهات', 'det.promise3Sub': 'مفحوص من مجموعتنا الصغيرة من الأمهات والقابلات.',

    'cart.eyebrow': 'سلتك',
    'cart.title': 'مجموعة صغيرة تتشكّل.',
    'cart.subtotal': 'المجموع الفرعي', 'cart.shipping': 'الشحن', 'cart.giftwrap': 'تغليف الهدية',
    'cart.included': 'مشمول', 'cart.free': 'مجاني', 'cart.total': 'الإجمالي',
    'cart.checkout': 'إتمام الدفع الآمن', 'cart.signinNote': 'سيُطلب منك تسجيل الدخول أو إنشاء حساب عند الدفع.',
    'cart.noteTitle': 'ملاحظة لطيفة', 'cart.noteSub': 'أضيفي بطاقة مكتوبة يدوياً أو تغليف هدية عند الدفع. نضعها بأنفسنا.',
    'cart.keepBrowsing': 'استمري في التصفح', 'cart.remove': 'إزالة',
    'cart.emptyTitle': 'سلتك فارغة.',
    'cart.emptySub': 'ابدئي بهدوء. أي شيء تحبينه يمكن أن ينتظر هنا حتى تكوني جاهزة.',
    'cart.browse': 'تصفّحي المتجر', 'cart.yourWishlist': 'قائمة أمنياتك',
    'cart.orderPlaced': 'تم الطلب — عشّك في طريقه إليك.',

    'wl.dueAug': 'قائمة {name} · الموعد أغسطس',
    'wl.title': 'قائمة أمنيات طفلي',
    'wl.sub': 'كل ما حفظته. شاركيه مع من تحبين — يمكنهم حجز هدية حتى لا يصل شيء مكرر.',
    'wl.addCustom': 'أضف عنصراً مخصصاً', 'wl.share': 'مشاركة القائمة',
    'wl.stat.saved': 'محفوظ', 'wl.stat.custom': 'مخصص', 'wl.stat.reserved': 'محجوز',
    'wl.stat.totalValue': 'القيمة الإجمالية',
    'wl.stat.reservedNote': 'عندما يحجز الأصدقاء هدية، ستظهر هنا.',
    'wl.empty.title': 'عشّك فارغ.',
    'wl.empty.sub': 'احفظي شيئاً من المتجر — أو أضيفي عنصراً مخصصاً من مكان آخر مع رابطه.',
    'wl.view': 'عرض', 'wl.open': 'فتح الرابط',
    'wl.fromElsewhere': 'من مكان آخر', 'wl.priceNotSet': 'السعر غير محدد',
    'wl.custom': 'مخصص',

    'wl.gate.title': 'قائمة أمنياتك تعيش هنا.',
    'wl.gate.sub': 'سجلي الدخول لحفظ ما تحبين، ومشاركته مع العائلة، ودعيهم يجلبونه إليك بلطف.',
    'wl.gate.create': 'أنشئي حساباً مجانياً',
    'wl.gate.have': 'لدي حساب بالفعل',

    'ci.title': 'أضيفي عنصراً مخصصاً', 'ci.editTitle': 'تعديل العنصر',
    'ci.sub': 'هل رأيت شيئاً مثالياً في مكان آخر؟ أضيفيه إلى عشّك مع الرابط.',
    'ci.name': 'اسم العنصر *', 'ci.price': 'السعر', 'ci.link': 'رابط المنتج',
    'ci.photo': 'صورة (اختياري)', 'ci.upload': 'ارفعي صورة', 'ci.change': 'تغيير الصورة',
    'ci.uploadSub': 'JPG أو PNG، حتى ٥ ميجابايت',
    'ci.cancel': 'إلغاء', 'ci.save': 'حفظ التغييرات', 'ci.add': 'أضيفي للقائمة',
    'ci.added': 'تمت الإضافة إلى قائمتك.', 'ci.updated': 'تم التحديث.',
    'ci.removed': 'تمت الإزالة',

    'sh.title': 'شاركي قائمتك',
    'sh.sub': 'أي شخص لديه هذا الرابط يمكنه رؤية قائمتك وحجز هدية بهدوء. لا حاجة للتسجيل.',
    'sh.publicLink': 'الرابط العام', 'sh.copy': 'نسخ', 'sh.copied': 'تم النسخ',
    'sh.orVia': 'أو شاركي عبر',
    'sh.nesti': 'نِستي', 'sh.whatsapp': 'واتساب', 'sh.email': 'البريد الإلكتروني',
    'sh.tip': 'نصيحة.', 'sh.tipSub': 'عندما يحجز صديق هدية، يظهر العنصر كمحجوز للجميع، لذا لا يصل شيء مكرر.',
    'sh.sentNesti': 'تم الإرسال إلى صديقتك على نِستي.',

    'guest.banner1': 'أنت تشاهدين', 'guest.banner2': ' كضيف.',
    'guest.visitShop': 'زيارة المتجر',
    'guest.eyebrow': 'قائمة مشاركة',
    'guest.items': '{n} عنصراً',
    'guest.step1t': 'ألقي نظرة', 'guest.step1s': 'تصفّحي عش {name}. بدون حساب، بدون عناء.',
    'guest.step2t': 'اشتري هدية', 'guest.step2s': 'اختاري ما تودين إحضاره — ستُضاف إلى سلتك وتُكملين الدفع في نفس المكان.',
    'guest.step3t': 'أرسلي هديتك', 'guest.step3s': 'اطلبي عبر نِستي وأرسلي هديتك — نغلفها يدوياً.',
    'guest.reserve': 'شراء الهدية', 'guest.unreserve': 'إلغاء',
    'guest.viewDetails': 'عرض التفاصيل',
    'guest.reservedLabel': 'تم الشراء',
    'guest.wantOwn': 'تريدين واحدة لنفسك؟',
    'guest.wantSub': 'ابدئي قائمة لطفلك — تستغرق دقيقة، ويمكن لأحبائك المساعدة في إحضارها.',

    'rm.title': 'شراء هذه الهدية؟',
    'rm.sub': 'سنضيفها إلى سلتك ونأخذك لإتمام الدفع. سيرى الضيوف الآخرون أنها مُشتراة حتى لا يصل شيء مكرر.',
    'rm.cancel': 'إلغاء', 'rm.reserve': 'أضف للسلة وادفع',
    'rm.reserved': 'تمت الإضافة إلى سلتك.', 'rm.removed': 'تمت الإزالة.',

    'auth.signup.title': 'اصنعي عشّك.', 'auth.signup.eyebrow': 'إنشاء حساب',
    'auth.signup.sideHead': 'عشّ لما هو قادم.',
    'auth.signup.sideSub': 'احفظي الأشياء اللطيفة في مكان واحد. شاركيها مع من تحبين.',
    'auth.signup.lede': 'مجاناً، بدون إزعاج البريد. مكان لطيف لقائمتك وطلباتك.',
    'auth.signup.name': 'اسمك', 'auth.signup.email': 'البريد الإلكتروني', 'auth.signup.pw': 'كلمة المرور',
    'auth.signup.pwPh': '٦ أحرف فأكثر', 'auth.signup.cta': 'إنشاء حساب',
    'auth.signup.have': 'لديك حساب بالفعل؟',
    'auth.signup.login': 'تسجيل الدخول',
    'auth.signup.terms': 'بإنشاء حساب، أنت توافقين على الشروط والخصوصية.',
    'auth.signup.fillAll': 'يرجى ملء جميع الحقول. كلمة المرور تحتاج ٦ أحرف فأكثر.',

    'auth.login.title': 'مرحباً بعودتك.', 'auth.login.eyebrow': 'تسجيل الدخول',
    'auth.login.sideHead': 'تابعي من حيث\nتوقفت.',
    'auth.login.sideSub': 'قائمتك وسلتك بانتظارك كما هي.',
    'auth.login.lede': 'سجّلي الدخول إلى نِستي.',
    'auth.login.cta': 'تسجيل الدخول', 'auth.login.forgot': 'نسيت؟',
    'auth.login.new': 'جديدة هنا؟', 'auth.login.create': 'أنشئي حساباً',
    'auth.login.welcome': 'مرحباً بعودتك.',

    'otp.title': 'تحققي من بريدك.', 'otp.eyebrow': 'خطوة أخيرة',
    'otp.sideHead': 'اقتربت.', 'otp.sideSub': 'رمز صغير، ثم يفتح عشّك.',
    'otp.lede1': 'أرسلنا رمزاً من ٦ أرقام إلى', 'otp.lede2': 'أدخليه أدناه لإكمال إنشاء حسابك.',
    'otp.cta': 'تحقّقي ومتابعة', 'otp.didntGet': 'لم يصلك؟',
    'otp.resendIn': 'إعادة الإرسال خلال', 'otp.resend': 'إعادة الإرسال',
    'otp.wrongEmail': 'بريد خاطئ',
    'otp.fillAll': 'يرجى إدخال جميع الأرقام الستة.',
    'otp.verified': 'تم التحقق. مرحباً بك في نِستي.',

    'authprompt.checkout.title': 'سجّلي الدخول لإتمام طلبك',
    'authprompt.checkout.sub': 'سلتك بانتظارك. سجّلي الدخول أو أنشئي حساباً مجانياً لإتمام الدفع بأمان.',
    'authprompt.wishlist.title': 'سجّلي الدخول لبدء قائمتك',
    'authprompt.wishlist.sub': 'قائمتك في حسابك — حتى تشاركيها وتعدّليها وتجديها من أي جهاز.',
    'authprompt.create': 'أنشئي حساباً مجانياً', 'authprompt.have': 'لديّ حساب بالفعل',
    'authprompt.later': 'ربما لاحقاً',

    'foot.slogan': 'عشّ لما هو قادم.',
    'foot.about': 'أساسيات الأم والطفل المختارة بعناية، مجموعة في مكان واحد لطيف.',
    'foot.shop': 'المتجر', 'foot.forMothers': 'للأمهات',
    'foot.startWl': 'ابدئي قائمة', 'foot.findWl': 'ابحثي عن قائمة', 'foot.giftcards': 'بطاقات الهدايا',
    'foot.letters': 'رسائل من نِستي',
    'foot.lettersSub': 'رسائل هادئة، مرة في الشهر. قصص من أمهات جديدات، وما نصنعه قادماً.',
    'foot.copyright': '© نِستي، ٢٠٢٦ — صُنع بحب.',
    'foot.legal': 'الشروط · الخصوصية · الصحافة',

    'srch.placeholder': 'ابحثي في العش…',
    'srch.nothing': 'لا توجد نتائج.', 'srch.tryAnother': 'جربي كلمة أخرى، أو تصفّحي حسب الفئة.',
    'srch.popular': 'عمليات البحث الشائعة', 'srch.browseCats': 'تصفّحي الفئات',
    'srch.cls': 'إغلاق',

    'crumb.home': 'الرئيسية',

    'toast.addedCart': 'تمت إضافة {name} إلى سلتك',
    'toast.saved': 'تم الحفظ — {name}',
    'toast.removedWl': 'تمت الإزالة من القائمة',
    'toast.removed': 'تمت الإزالة',
    'toast.signedOut': 'تم تسجيل الخروج — إلى اللقاء قريباً.',
    'toast.fillEmail': 'يرجى إدخال البريد وكلمة المرور.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Hook + helpers
const LangCtx = React.createContext({ lang: 'en', t: (k)=>k, setLang: ()=>{}, dir: 'ltr' });
const useLang = () => React.useContext(LangCtx);

// Currency formatting
const SAR_RATE = 3.75; // approx conversion
function formatPrice(usd, lang){
  const sar = Math.round(usd * SAR_RATE);
  if (lang === 'ar'){
    // Arabic-Indic digits + ر.س suffix
    const ar = String(sar).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
    return `${ar} ر.س`;
  }
  return `SAR ${sar.toLocaleString('en-US')}`;
}

// translate-with-vars
function makeT(lang){
  const dict = NESTI_TRANSLATIONS[lang] || NESTI_TRANSLATIONS.en;
  return (key, vars) => {
    let s = dict[key];
    if (s == null) s = NESTI_TRANSLATIONS.en[key] || key;
    if (vars) for (const k in vars) s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), vars[k]);
    return s;
  };
}

Object.assign(window, { NESTI_TRANSLATIONS, LangCtx, useLang, makeT, formatPrice });
