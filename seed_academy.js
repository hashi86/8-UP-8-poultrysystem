const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'poultry.db'));

// ==================== SEED DISEASES ====================
const diseases = [
  {
    name: 'نيوكاسل (الطاعون الدجاجي)',
    name_en: 'Newcastle Disease',
    category: 'viral',
    severity: 'critical',
    cause: 'فيروس بارامكسو من النوع الأول (PMV-1) - فيروس RNA سالب الاتجاه',
    symptoms: 'إسهال أخضر مائي، تورم الرأس والرقبة، شلل الأرجل والأجنحة، أصوات تنفسية غير طبيعية، انخفاض حاد في إنتاج البيض',
    diagnosis: 'عزل الفيروس من الدم والأعضاء، PCR، اختبار HI (Hemagglutination Inhibition)، فحص مصلي',
    treatment: 'لا يوجد علاج مباشر. دعم الطيور بالفيتامينات والكهارل والمضادات الحيوية الثانوية لمنع العدوى البكتيرية الثانوية',
    prevention: 'تحصين منتظم بلقاح نيوكاسل (B1 أو LaSota)، بيوسيكيوريتي صارم، عزل الطيور المريضة فوراً'
  },
  {
    name: 'إنفلونزا الطيور (H5N1)',
    name_en: 'Avian Influenza H5N1',
    category: 'viral',
    severity: 'critical',
    cause: 'فيروس إنفلونزا من النوع A، سلالة H5N1 شديدة الممرضية',
    symptoms: 'نفوق مفاجئ دون أعراض واضحة، أو أعراض حادة: ارتفاع درجة الحرارة، تورم الوجه والرقبة، أصوات تنفسية، إسهال دموي، شلل',
    diagnosis: 'عزل الفيروس، RT-PCR، اختبار ELISA، فحص مصلي، اختبار الحساسية',
    treatment: 'لا يوجد علاج فعال. الإجراء الوحيد هو الإعدام الرحيم والتطهير الشامل',
    prevention: 'تحصين بلقاح إنفلونزا الطيور، بيوسيكيوريتي عالي جداً، مراقبة الطيور البرية، تطهير شامل بعد كل دفعة'
  },
  {
    name: 'غامبورو (IBD)',
    name_en: 'Gumboro Disease / Infectious Bursal Disease',
    category: 'viral',
    severity: 'high',
    cause: 'فيروس غامبورو (IBDV) - يصيب الحوصلة الفابريسية (Bursa of Fabricius)',
    symptoms: 'كآبة شديدة، فقدان الشهية، إسهال مائي أبيض، ألم في البطن (الطيور تجلس على الأرض)، ريش منتفش، جفاف',
    diagnosis: 'فحص مجهري للحوصلة: تورم واحمرار وتنخر، عزل الفيروس، PCR، اختبار ELISA',
    treatment: 'لا علاج مباشر. دعم الطيور بالفيتامينات خاصة A و E، كهارل، مضادات حيوية ثانوية',
    prevention: 'تحصين بلقاح غامبورو في الوقت المناسب (يوم 12-14)، تجنب الإجهاد، بيوسيكيوريتي جيد'
  },
  {
    name: 'برونشيتيس معدي (IB)',
    name_en: 'Infectious Bronchitis',
    category: 'viral',
    severity: 'high',
    cause: 'فيروس برونشيتيس المعدي (IBV) - فيروس RNA موجب الاتجاه',
    symptoms: 'سعال وعطاس، أصوات تنفسية خشخشة، إفرازات أنفية وعينية، انخفاض إنتاج البيض 30-50%، بيض مشوه بدون قشرة',
    diagnosis: 'PCR، عزل الفيروس، اختبار HI، فحص الكلى والمبيضين',
    treatment: 'لا علاج مباشر. تحسين التهوية + مضادات حيوية للوقاية الثانوية + فيتامين A و C + مقشعات',
    prevention: 'تحصين H120 يوم 7 + تنشيط H52 يوم 18، اختيار اللقاح المناسب للسيروتايب السائد'
  },
  {
    name: 'ماريك (Marek\'s Disease)',
    name_en: 'Marek\'s Disease',
    category: 'viral',
    severity: 'high',
    cause: 'فيروس ماريك (MDV) - فيروس DNA من عائلة الهربس',
    symptoms: 'شلل في الأجنحة والأرجل، تدلي الجناح، تشوه حدقة العين، عمى، فقدان وزن، أورام في الأعضاء',
    diagnosis: 'فحص هيستولوجي، عزل الفيروس من ريشة، PCR',
    treatment: 'لا علاج. إعدام الطيور المريضة. تعزيز المناعة بالفيتامينات',
    prevention: 'تحصين الكتاكيت بالمشفرة أو HVT يوم 1 أو في البيضة، بيئة نظيفة'
  },
  {
    name: 'الكوكسيديا (العميان)',
    name_en: 'Coccidiosis',
    category: 'parasitic',
    severity: 'moderate',
    cause: 'طفيليات الكوكسيديا (Eimeria spp.) - تصيب الأمعاء الدقيقة والعمياء',
    symptoms: 'إسهال دموي أحمر أو بني، فقدان شهية، كآبة وتجمع، شحوب العرف، جفاف، نفوق متقطع',
    diagnosis: 'فحص مجهري للبراز (oocysts)، فحص مقطع معوي عند التشريح',
    treatment: 'أمبروليوم 20% بمعدل 0.012% في الماء 5-7 أيام أو ديكلازوريل أو سالينوميسين علاجي',
    prevention: 'أمبروليوم وقائي، لقاح كوكسيديا، فرشة جافة + تهوية جيدة، نظافة شربات الماء'
  },
  {
    name: 'المايكوبلازما (CRD)',
    name_en: 'Mycoplasmosis / CRD',
    category: 'bacterial',
    severity: 'moderate',
    cause: 'بكتيريا المايكوبلازما (Mycoplasma gallisepticum) - تصيب الجهاز التنفسي',
    symptoms: 'أصوات خشخشة تنفسية مزمنة، إفرازات أنفية لزجة، تورم الجيوب الأنفية، انخفاض تدريجي في البيض',
    diagnosis: 'ELISA، PCR، عزل البكتيريا، سيروتايبينج',
    treatment: 'تياموتين + داكسيسيكلين 7-10 أيام أو تايلوزين في الماء 3-5 أيام',
    prevention: 'كتاكيت خالية من MG، تحصين MG بلقاح TS-11، بيوسيكيوريتي صارم'
  },
  {
    name: 'الإي كولاي (Colibacillosis)',
    name_en: 'Colibacillosis / E.coli',
    category: 'bacterial',
    severity: 'moderate',
    cause: 'بكتيريا الإشريكية القولونية (E. coli) - بكتيريا سالبة الجرام',
    symptoms: 'إسهال أصفر مخضر، ضعف عام، احمرار الرأس، التهاب المفاصل، التهاب الكيس الصفري',
    diagnosis: 'عزل E.coli من الأعضاء المصابة، اختبار حساسية المضادات الحيوية',
    treatment: 'أموكسيسيلين أو إنروفلوكساسين أو كولستين حسب الحساسية + فيتامين C + كهارل',
    prevention: 'نظافة بيض التفريخ، ماء نظيف، تهوية كافية، تقليل الإجهاد'
  },
  {
    name: 'سالمونيلا (التيفود)',
    name_en: 'Salmonellosis / Fowl Typhoid',
    category: 'bacterial',
    severity: 'high',
    cause: 'بكتيريا سالمونيلا (Salmonella gallinarum) - بكتيريا سالبة الجرام',
    symptoms: 'إسهال أصفر كبريتي، ضعف وتجمع الكتاكيت، تضخم الكبد والطحال، التهاب المفاصل، نفوق مرتفع',
    diagnosis: 'عزل البكتيريا من الكبد والطحال، اختبار أبلاستون، PCR',
    treatment: 'إنروفلوكساسين أو سيبروفلوكساسين 5-7 أيام + فيتامين B مركب',
    prevention: 'تحصين بلقاح سالمونيلا المنعطف، صحة المسارح، مراقبة القطعان الأمهات'
  },
  {
    name: 'كوليرا الدجاج (Fowl Cholera)',
    name_en: 'Fowl Cholera / Pasteurellosis',
    category: 'bacterial',
    severity: 'high',
    cause: 'بكتيريا باستوريلا (Pasteurella multocida) - بكتيريا سالبة الجرام',
    symptoms: 'نفوق مفاجئ دون أعراض، احمرار الرأس والوجه، صعوبة تنفس، إسهال أخضر لزج، تورم المفاصل',
    diagnosis: 'عزل Pasteurella multocida من الكبد، صبغة غرام، PCR',
    treatment: 'سلفاميثازين أو تتراسيكلين أو أموكسيسيلين 7 أيام مع اختبار الحساسية',
    prevention: 'تحصين بلقاح الكوليرا، القضاء على الطيور البرية، نظافة شاملة'
  },
  {
    name: 'إجهاد الحرارة',
    name_en: 'Heat Stress',
    category: 'environmental',
    severity: 'moderate',
    cause: 'ارتفاع درجة حرارة البيئة فوق الحد الأمثل للطيور (>28°م)',
    symptoms: 'لهاث وفتح الفم للتنفس، أجنحة مفتوحة مدلاة، ابتعاد عن العلف، زيادة شرب الماء، انخفاض البيض',
    diagnosis: 'سريري: حرارة العنبر >28°م + أعراض + توقيت الإصابة',
    treatment: 'تبريد فوري: رش الماء + مراوح + تفريق الكثافة + كهارل + فيتامين C',
    prevention: 'عوازل سقف + مراوح + ستائر مياه، تقليل كثافة الطيور صيفاً، مياه باردة دائمة'
  }
];

// Insert diseases
const insertDisease = db.prepare(`
  INSERT INTO disease_dictionary 
  (name, name_en, category, severity, cause, symptoms, diagnosis, treatment, prevention)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

diseases.forEach(d => {
  try {
    insertDisease.run(d.name, d.name_en, d.category, d.severity, d.cause, d.symptoms, d.diagnosis, d.treatment, d.prevention);
  } catch (e) {
    console.log(`Error inserting ${d.name}:`, e.message);
  }
});

console.log(`✅ تم إضافة ${diseases.length} مرض`);

// ==================== SEED MEDICINES ====================
const medicines = [
  { name: 'أموكسيسيلين 20%', category: 'antibiotic', dose: '25 ملغ/كغ', route: 'ماء الشرب', withdrawal_days: 5, indications: 'عدوى بكتيرية عامة، إي كولاي، سالمونيلا' },
  { name: 'إنروفلوكساسين 10%', category: 'antibiotic', dose: '10 ملغ/كغ', route: 'ماء الشرب', withdrawal_days: 3, indications: 'سالمونيلا، إي كولاي، مايكوبلازما' },
  { name: 'داكسيسيكلين', category: 'antibiotic', dose: '20-40 ملغ/لتر', route: 'ماء الشرب', withdrawal_days: 7, indications: 'مايكوبلازما، كلوستريديوم' },
  { name: 'تايلوزين', category: 'antibiotic', dose: '50 ملغ/لتر', route: 'ماء الشرب', withdrawal_days: 5, indications: 'مايكوبلازما، برونشيتيس' },
  { name: 'أمبروليوم 20%', category: 'antiparasitic', dose: '0.012%', route: 'ماء الشرب', withdrawal_days: 0, indications: 'كوكسيديا - وقائي وعلاجي' },
  { name: 'ديكلازوريل 2.5%', category: 'antiparasitic', dose: '25 ملغ/كغ', route: 'العلف', withdrawal_days: 5, indications: 'كوكسيديا - علاجي' },
  { name: 'فيتامين A D E', category: 'vitamin', dose: '10 مل/لتر', route: 'ماء الشرب', withdrawal_days: 0, indications: 'تحسين المناعة، صحة الجهاز التنفسي' },
  { name: 'فيتامين C', category: 'vitamin', dose: '500 ملغ/لتر', route: 'ماء الشرب', withdrawal_days: 0, indications: 'مضاد أكسدة، تقليل الإجهاد' },
  { name: 'كهارل + سكر', category: 'supplement', dose: '1-2 غ/لتر', route: 'ماء الشرب', withdrawal_days: 0, indications: 'إعادة التوازن الكهربائي، الجفاف' },
  { name: 'بروبيوتيك', category: 'probiotic', dose: '1 غ/كغ علف', route: 'العلف', withdrawal_days: 0, indications: 'تحسين الهضم، تعزيز البكتيريا النافعة' }
];

const insertMedicine = db.prepare(`
  INSERT INTO medicine_list 
  (name, category, dose, route, withdrawal_days, indications)
  VALUES (?, ?, ?, ?, ?, ?)
`);

medicines.forEach(m => {
  try {
    insertMedicine.run(m.name, m.category, m.dose, m.route, m.withdrawal_days, m.indications);
  } catch (e) {
    console.log(`Error inserting ${m.name}:`, e.message);
  }
});

console.log(`✅ تم إضافة ${medicines.length} دواء`);

// ==================== SEED ARTICLES ====================
const articles = [
  {
    title: 'مقدمة عن تربية الدواجن الحديثة',
    summary: 'شرح شامل لأساسيات تربية الدواجن والمتطلبات الأساسية',
    content: 'تربية الدواجن تتطلب فهماً عميقاً للاحتياجات البيولوجية للطيور. يجب توفير بيئة مناسبة من حيث الحرارة والرطوبة والتهوية...',
    category: 'general',
    tags: 'أساسيات، تربية، دواجن',
    author: 'فريق الأكاديمية',
    read_time: 8
  },
  {
    title: 'برامج التحصين الفعالة',
    summary: 'دليل شامل لبرامج التحصين حسب نوع الطير والعمر',
    content: 'التحصين هو أساس الوقاية من الأمراض. يجب اتباع برنامج تحصين منظم يتناسب مع نوع الطير والظروف المحلية...',
    category: 'health',
    tags: 'تحصين، وقاية، صحة',
    author: 'فريق الأكاديمية',
    read_time: 10
  },
  {
    title: 'التغذية السليمة وتأثيرها على الإنتاج',
    summary: 'كيفية صياغة علائق متوازنة لتحسين الإنتاجية',
    content: 'التغذية السليمة هي أساس الإنتاج الجيد. يجب توفير جميع العناصر الغذائية الضرورية بالنسب الصحيحة...',
    category: 'nutrition',
    tags: 'تغذية، علائق، إنتاج',
    author: 'فريق الأكاديمية',
    read_time: 12
  }
];

const insertArticle = db.prepare(`
  INSERT INTO academy_articles 
  (title, content, summary, category, tags, author, read_time)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

articles.forEach(a => {
  try {
    insertArticle.run(a.title, a.content, a.summary, a.category, a.tags, a.author, a.read_time);
  } catch (e) {
    console.log(`Error inserting ${a.title}:`, e.message);
  }
});

console.log(`✅ تم إضافة ${articles.length} مقالة`);

console.log('\n✅ تم إكمال البذر بنجاح!');
db.close();
