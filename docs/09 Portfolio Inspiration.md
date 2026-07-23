---
title: Detailed Portfolio Audit — Omar Emara, Mariem Eid, and ImmersiveWeb
status: active
updated: 2026-07-21
language: ar
tags:
  - portfolio
  - inspiration
  - benchmark
  - UX
  - motion
  - code-analysis
  - accessibility
  - performance
---

# تحليل تفصيلي: Omar Emara وMariem Eid وImmersiveWeb

## الروابط

- Omar Emara: https://omar-emara.vercel.app/
- Mariem Eid: https://mariem-eid.github.io/mariameid./
- ImmersiveWeb: https://immersiveweb.app/

---

# 0. منهج التحقيق ودرجة الثقة

هذا التحليل لا يفترض أن كل موقع متاح أو أن كل Repository باسم مشابه هو مصدره الحقيقي.

## تصنيف الأدلة

| الرمز            | المعنى                                                     |
| ---------------- | ---------------------------------------------------------- |
| ✅ مؤكد          | الموقع أو المصدر البرمجي مطابق ويمكن الاستناد إليه مباشرة  |
| ⚠️ مرشح          | مصدر عام قريب، لكن لا يوجد دليل كافٍ أنه مصدر النشر الحالي |
| 🕐 قديم أو متعلق | مصدر مرتبط بصاحبه أو نسخة أخرى، لكنه ليس النسخة الحالية    |
| ❌ غير متاح      | الموقع غير قابل للفحص ولا يوجد مصدر مطابق                  |
| 🔍 استنتاج       | تحليل منطقي لا يُقدم كحقيقة مؤكدة                          |

## حالة المواقع الثلاثة

| الموقع       | حالة الموقع                   | حالة المصدر                                                 | مستوى التحليل الممكن                                |
| ------------ | ----------------------------- | ----------------------------------------------------------- | --------------------------------------------------- |
| Omar Emara   | غير قابل للفحص وقت المراجعة   | لا يوجد مصدر مطابق                                          | تحليل حالة المرجع والمخاطر فقط، مع قائمة فحص مطلوبة |
| Mariem Eid   | رابط GitHub Pages ومصدر مطابق | ✅ مؤكد                                                     | تحليل بصري وبرمجي وهيكلي عميق                       |
| ImmersiveWeb | الموقع الحي غير قابل للفحص    | ⚠️ Repo مرشح يشير إلى `hazem.vip` لا إلى `immersiveweb.app` | تحليل المرشح كمرجع تقني، مع منع نسبه للموقع الحي    |

> قاعدة النزاهة: الجزء الذي لا توجد له لقطة شاشة أو DOM أو Source مطابق يبقى غير محسوم، ولا يتم ملؤه بالتخمين.

---

# 1. Omar Emara

## 1.1 الحكم الحالي

الرابط `https://omar-emara.vercel.app/` لم يكن قابلًا للتحميل أو الفهرسة وقت المراجعة، ولم يظهر بحث GitHub مصدرًا عامًا يحتوي رابط النشر أو نصوص الموقع أو أصولًا تطابقه.

بالتالي لا يمكن وصف الأمور التالية بصدق:

- الألوان.
- نوع الخط.
- شكل الـHero.
- عدد الأقسام.
- الحركة.
- نوع الـNavigation.
- المشروعات المعروضة.
- نسخة الموبايل.
- الـStack المستخدم في الموقع.
- هل توجد 3D أو GSAP أو Framer Motion.
- هل الموقع Single Page أو Multi-page.

## 1.2 لماذا عدم اختراع التحليل مهم؟

المواقع المنشورة على Vercel يمكن أن تكون مبنية بأي شيء تقريبًا:

- Next.js.
- React + Vite.
- Vue.
- Svelte.
- HTML/CSS/JS ثابت.
- مشروع مولد بأداة AI.
- Static export من Framework آخر.

لذلك عبارة “الموقع على Vercel” لا تثبت Next.js، كما أن اسم الدومين لا يثبت هوية صاحبه أو حساب GitHub معين.

## 1.3 المشكلات التي يكشفها اختفاء الموقع نفسه

حتى دون رؤية التصميم، عدم توفر المرجع يقدم درسًا مهمًا للبورتفوليو:

### رابط Inspiration غير مستقر

عند الاعتماد على مواقع Vercel مجانية أو روابط مؤقتة، قد يحدث:

- حذف المشروع.
- تغيير اسم النشر.
- انتهاء الربط بالمستودع.
- إيقاف الحساب.
- تحويل الرابط إلى نشر جديد مختلف.

### لا يوجد Source of truth

عدم وجود Repo مطابق أو Screenshot محفوظ يجعل المرجع غير قابل للمراجعة لاحقًا.

### المرجع لا يجب أن يبقى في القائمة النشطة دون Capture

الموقع يمكن حفظه في Review queue، لكن لا ينبغي استخدامه لاتخاذ قرار تصميم قبل توثيق:

- Full-page desktop capture.
- Full-page mobile capture.
- تسجيل الحركة.
- قائمة الأقسام.
- Network/technology inspection.

## 1.4 ما المطلوب لتحليل Omar Emara بالحرف؟

### الحزمة الدنيا

1. Screenshot لأول شاشة على Desktop.
2. Full-page screenshot.
3. Screenshot على Mobile.
4. Screen recording من بداية الدخول حتى نهاية الصفحة.
5. فتح القائمة وكل Modal أو Project detail.
6. نسخة من View Source أو قائمة ملفات Network إن أمكن.

### حزمة الكود

أحد الأدلة التالية يكفي لبدء التحليل البرمجي:

- رابط GitHub من Footer.
- Repo يحتوي رابط Vercel في About/README.
- `package.json` من المشروع.
- ملف HTML المصدر.
- Deployment metadata.

## 1.5 قالب التدقيق الجاهز للموقع عند توفره

### أول خمس ثوانٍ

- ما أول عنصر يظهر؟
- هل توجد Intro؟
- هل يمكن تخطيها؟
- هل الاسم والدور واضحان؟
- هل يوجد CTA قبل التمرير؟

### الـHero

- هل يقدم Role أم Slogan غامضًا؟
- هل المشروع الأقوى ظاهر؟
- هل توجد صورة شخصية أم 3D object؟
- هل الحركة تخدم الرسالة؟
- هل Text contrast كافٍ؟

### الـNavigation

- Fixed أم hidden؟
- هل الوصول إلى Work وContact وCV مباشر؟
- هل يعتمد على Cursor أو Hover؟
- هل Anchor scrolling طبيعي؟
- هل Back behavior واضح؟

### عرض المشروعات

- هل المشروع مجرد Card؟
- هل Context واضح؟
- هل دور Omar ظاهر؟
- هل يوجد Live demo وRepository؟
- هل توجد Case Study؟
- هل النتيجة موثقة؟

### الحركة

- هل تستخدم للتفسير أم للزينة؟
- هل يوجد Scroll hijacking؟
- هل الـPinned sections طويلة؟
- هل يوجد `prefers-reduced-motion`؟
- هل الموبايل يحصل على بديل؟

### التقنية

- Framework.
- Animation library.
- 3D library.
- Content source.
- Hosting.
- Image pipeline.
- Analytics.
- SEO architecture.
- Bundle behavior.

## 1.6 قرار المرجع حاليًا

| القرار                      | الحالة                 |
| --------------------------- | ---------------------- |
| استخدامه كمرجع بصري نشط     | مرفوض مؤقتًا           |
| الاحتفاظ بالرابط            | نعم، داخل Review queue |
| الاستنتاج من اسمه أو Vercel | مرفوض                  |
| طلب Capture من المستخدم     | مطلوب                  |
| مقارنته بالمواقع الأخرى     | مؤجل                   |

## 1.7 ما نتعلمه لمشروع Nour

- كل Reference مهم يجب أن يملك Screenshot محفوظًا.
- لا تعتمد على رابط حي فقط.
- سجل تاريخ المراجعة.
- احفظ اسم المصمم والمصدر والترخيص.
- سجل ما الذي أعجبك تحديدًا قبل أن يختفي الموقع.
- الموقع الخاص بـNour نفسه يجب أن يملك Video fallback وRepository موثقًا ونسخة محتوى محلية.

---

# 2. Mariem Eid

## 2.1 حالة المصدر

✅ المصدر المطابق متاح علنًا:

- Live: https://mariem-eid.github.io/mariameid./
- Repo: https://github.com/mariem-eid/mariameid.

المشروع مبني أساسًا من:

- HTML.
- CSS.
- JavaScript مباشر.
- Canvas particles.
- Google Fonts.
- ملفات CSS منفصلة جزئيًا.
- كمية كبيرة من CSS وJavaScript داخل `index.html`.

لا يوجد Framework حديث ظاهر في الجذر.

## 2.2 الفكرة المركزية

الموقع لا يقدم تجربة واحدة، بل يضع الزائر أمام خيارين:

- **Get me hired**: عالم مهني منظم.
- **Get inspired**: عالم إبداعي يشبه Storyboard ومكتب أفكار.

هذه واحدة من أوضح محاولات تنفيذ “Audience Worlds” فعليًا.

الفكرة ليست مجرد تغيير ترتيب الأقسام؛ بل تغير:

- الخلفية.
- الخطوط.
- الألوان.
- شكل البطاقات.
- اللغة النصية.
- نوع الحركة.
- طريقة التنقل.
- طريقة عرض الشخصية.

## 2.3 شاشة الاختيار — The Nexus

### التنفيذ

`#nexus` يغطي الشاشة بالكامل ويستخدم Flex لعمل نصفين. النصف الذي يمر فوقه المؤشر يتمدد من `flex: 1` إلى `flex: 1.4`، بينما توجد دائرة OR في المنتصف.

### نقاط القوة

- الاختيار مفهوم بصريًا دون شرح طويل.
- التباين بين الأبيض وورق الـStoryboard يلمح إلى العالمين قبل الدخول.
- تأثير التمدد يعطي Preview للحركة.
- الدائرة المركزية تربط الخيارين بدل أن تبدوا صفحتين منفصلتين.

### المشكلات النصية

النص الحالي في المصدر:

```text
Are you
to get me hired?
```

و:

```text
Are you
to get inspired?
```

الجمل ناقصة نحويًا. يُرجح أن كلمة مثل `ready` مفقودة.

هذا خطأ عالي التأثير؛ لأنه يقع في أول شاشة ويضعف الثقة قبل رؤية العمل.

### مشكلة بوابة المحتوى

كل محتوى الموقع مخفي مبدئيًا خلف الاختيار. رغم جمال الفكرة، هذا يضيف قرارًا قبل أن يعرف الزائر:

- من هي Mariem؟
- ما دورها؟
- ما أقوى مشروع؟
- لماذا يختار أحد المسارين؟

### مشكلة الوصول

الاختيار منفذ بـ`div` مع `onclick` وليس Button semantic. لذلك يحتاج:

- `role="button"` على الأقل.
- `tabindex="0"`.
- Keyboard handlers لـEnter وSpace.
- Focus style.
- Accessible labels.

### تطبيقها عند Nour

لا يُنصح بنسخ البوابة كأول شاشة في الـMVP. الأفضل:

- إظهار الاسم والدور أولًا.
- تقديم Recruiter Cut كاختيار اختياري.
- أو جعل الاختيار في Hero دون حجب المحتوى.

## 2.4 العالم المهني — Architect Path

### الهوية

العالم المهني يستخدم:

- Inter للعناوين والنصوص.
- Space Mono للعناصر التقنية.
- خلفية دافئة قريبة من Off-white.
- Accent أحمر داكن.
- Cards بيضاء.
- Borders خفيفة.
- Gradient بسيط في الـHero.
- Dark mode منفصل.

### Design Tokens

وجود `variables.css` قرار جيد نسبيًا. الملف يحدد:

- الخلفيات.
- ألوان النص.
- Accent.
- Borders.
- Shadows.
- Typography scales.
- Container.
- Radii.
- Transitions.
- Dark-mode tokens.

هذا أفضل من تكرار القيم بالكامل، لكنه غير مطبق على المشروع كله؛ لأن `index.html` ما زال يحتوي قيمًا كثيرة Inline وHard-coded.

### نظام الألوان

الأساس:

```text
Background: #F8F6F3
Text: #1a1a1a
Primary: #c0392b
Secondary text: #555
```

النظام هادئ ومناسب للـRecruiter path، لكنه قريب من مواقع السيرة التقليدية أكثر من كونه عالمًا تقنيًا قويًا.

### الـDark Mode

يغير Tokens فعلًا ولا يضيف Filter سطحيًا. هذه نقطة جيدة.

لكن يجب التحقق من:

- حفظ اختيار المستخدم في `localStorage`.
- احترام `prefers-color-scheme`.
- Contrast في كل Cards.
- عدم تغير عالم الـStoryboard بشكل غير متوقع.

## 2.5 Navigation المهني

الـNavigation يحتوي على:

- العودة إلى الاختيار.
- Motives.
- Experience.
- Projects.
- Skills.
- Check.
- Theme toggle.
- Contact.
- Resume.

### نقاط القوة

- الـCV ظاهر في Header.
- Contact ليس مدفونًا.
- الأقسام واضحة.
- Fixed navigation مناسب للصفحة الطويلة.
- يوجد Active underline visual language.

### نقاط الضعف

- عدد العناصر كبير نسبيًا.
- كلمة `Check` غامضة.
- العودة مكتوبة `← ME` ولا تشرح أنها تعيد إلى اختيار العالم.
- التنقل يستخدم Inline `onclick` مع `preventDefault` بدل بنية أنظف.
- على الموبايل تتحول الـNavigation من Fixed إلى Relative، ما يغير السلوك جذريًا.

### ما يناسب Nour

Navigation أقصر:

```text
Work
Knowledge
About
```

والـCV والـContact واللغة Actions منفصلة، وهو ما يتوافق مع وثائق المشروع.

## 2.6 الـHero المهني

### النص الرئيسي

```text
MARIAM EID
CS Student · Game Developer · C# & Unity
```

ثم وصف يركز على تحويل المفاهيم المجردة إلى Logic فعلي، مع البحث عن Team أوProject أوOpportunity.

### نقاط القوة

- الاسم ضخم وواضح.
- الدور يظهر مباشرة.
- C# وUnity يحددان مركزًا مهنيًا.
- `Open to Internships` معلومة عملية.
- الجامعة وسنة التخرج ظاهرتان.
- CTA للمشروعات وCTA للـResume.
- Social links موجودة دون إخفاء.

### التناقض المهني

العنوان يقول:

```text
Game Developer · C# & Unity
```

لكن Floating card تقول:

```text
Open to Internships
Backend · Security
```

هذا يخلق ثلاثة اتجاهات في أول شاشة:

- Game development.
- Backend.
- Security.

الزائر لا يعرف ما الوظيفة المستهدفة فعلًا.

### الوصف

عبارة:

> I bridge the gap between abstract concepts and actual, responsive logic.

جميلة، لكنها عامة. يجب ربطها بدليل أو Workflow من مشروع.

### الـQuote

```text
I turn 'what if' into standard WASD.
```

ممتعة ومناسبة للألعاب، لكنها تزيد تضارب Hero لو كان الهدف Backend/Security Internship.

### الصورة

الصورة داخل Blob عضوي غير منتظم مع Ring وبطاقتين عائمتين.

نقاط القوة:

- شخصية أكثر من Portrait داخل دائرة عادية.
- البطاقات تعطي Proof سريعًا.
- الـBlob ينسجم مع فكرة الإبداع.

المخاطر:

- Floating cards تتحرك باستمرار.
- لا يوجد Reduced motion واضح في CSS المستعرض.
- الصورة 440×440 ثابتة قبل Media queries، ما يحتاج ضبطًا قويًا للموبايل.

## 2.7 قسم Motives

القسم يقدم التعلم كـOperating system، ويستخدم عبارات مثل:

- constant curiosity.
- mental sandbox.
- perpetual beta.

### ما يعمل

- يعطي Voice شخصية.
- يشرح الدافع بدل تكرار Skills.
- يربط التعلم بلغة الأنظمة.

### ما لا يعمل

- القسم طويل ومجرد.
- لا يقدم Evidence.
- “Perpetual beta” قد توحي بعدم الاكتمال المستمر.
- الريكروتر يحتاج مثالًا على التعلم السريع، لا وصفًا فقط.

### التحسين

بعد الفقرة مباشرة، اعرض:

```text
Unknown domain → decision → artifact → validation
```

مثل مشروع تم تعلم Unity أو Security خلاله.

## 2.8 Experience Timeline

المصدر يعرض Experience على هيئة Timeline، ومنه نشاط في FCAI Game Dev Club.

### نقاط القوة

- السياق واضح: College Activity.
- المنظمة والتاريخ ظاهران.
- Social proof للمنظمة موجود.

### المشكلات المحتملة

- الأنشطة الجامعية يمكن أن تبدو كخبرة وظيفية إن لم يتم الفصل بصريًا.
- كلمة `Experience` واسعة، ويجب تقسيمها إلى:
  - Employment.
  - Leadership.
  - Activities.
  - Education.

### تطبيقها عند Nour

لا تجمع Team leadership الجامعي والعمل المهني في Timeline واحد دون Labels واضحة.

## 2.9 عالم الـStoryboard

### الفكرة

العالم الثاني يحول الموقع إلى مساحة أفكار:

- خلفية ورق.
- Textures.
- Caveat handwritten font.
- Sticky notes.
- Cards مائلة.
- عناصر قابلة للسحب.
- Pins.
- Tilt ثلاثي الأبعاد.
- Hover يكشف “chaos view”.

هذا ليس Theme switch؛ إنه Grammar مختلف بالكامل.

### قوة العالم

- يشرح الشخصية الفضولية أسرع من فقرة About.
- يسمح بعرض أفكار وملاحظات وشبكة اهتمامات.
- يجسد “inspiration” فعليًا.
- يمكن أن يجعل الزائر يتذكر الموقع.

### الخطر

- سهل جدًا أن يتحول إلى Scrapbook غير قابل للمسح.
- الخط اليدوي أقل كفاءة للنصوص الطويلة.
- Cards مائلة + Tilt + Drag + Hover تضع عدة حركات على نفس العنصر.
- Desktop interaction لا ينتقل طبيعيًا إلى Touch.
- المستخدم قد يهتم بالشكل أكثر من المحتوى.

## 2.10 Cards والـTilt

JavaScript يحسب موضع المؤشر داخل كل Card ثم يطبق:

- `perspective(1000px)`.
- `scale3d(1.05...)`.
- `rotateX` حتى نحو 8 درجات.
- `rotateY` حتى نحو 8 درجات.

### ما يعمل

- يعطي Physicality للأوراق.
- لا يحتاج مكتبة خارجية.
- التأثير مرتبط بموقع المؤشر.

### ما لا يعمل

- يتم تعديل `style.transform` مباشرة.
- يمكن أن يتعارض مع Rotation الأساسي للبطاقة.
- كثرة العناصر ستسبب Layout/paint work.
- لا يوجد Touch equivalent.
- لا يوجد Reduced motion guard.
- Hover scale 1.05 مع Cards متقاربة قد يسبب overlap.

### تنفيذ أفضل

- CSS custom properties للميل.
- `requestAnimationFrame` لتقليل updates.
- تعطيل التأثير للأجهزة الخشنة `pointer: coarse`.
- عدم تطبيق Tilt على كل Cards.
- استخدامه في Signature artifact واحد فقط.

## 2.11 العناصر القابلة للسحب

الموقع يسمح بسحب Notes وPins عبر Mouse events مباشرة.

### نقاط القوة

- يثبت أن العالم ليس صورة ثابتة.
- يضيف Playfulness.
- مناسب لمفهوم مكتب الأفكار.

### المشكلات

- `mousedown/mousemove/mouseup` فقط؛ لا Pointer Events.
- لا دعم Keyboard.
- لا Touch drag.
- تغيير `left/top` يسبب Layout work أكثر من transform.
- لا توجد Bounds تمنع رمي العنصر خارج الشاشة.
- الحالة لا تُحفظ.
- قد يمنع تحديد النص أو الضغط على روابط داخل العنصر.

### قرار مناسب لـNour

Dragging لا ينبغي أن يكون جزءًا أساسيًا من MVP. إن استُخدم لاحقًا:

- enhancement اختياري.
- عبر Pointer Events.
- باستخدام transforms.
- مع زر Reset.
- دون إخفاء أي معلومة.

## 2.12 Typewriter effect

النص يكتب حرفًا حرفًا بسرعة عشوائية بين نحو 15–35ms.

### المشكلات

- يغير `innerHTML` حرفًا حرفًا.
- يمكن أن يزعج قارئات الشاشة.
- يخفي النص في البداية عبر اللون الشفاف.
- قد يؤخر القراءة بلا فائدة.
- لا يحترم Reduced motion.
- استخدام `innerHTML +=` متكرر غير مثالي.

### البديل

- النص موجود كاملًا في DOM.
- Mask reveal بصري عبر CSS.
- Screen reader يحصل على النص مباشرة.
- تعطيل كامل للحركة عند Reduced motion.

## 2.13 Scroll Reveal

استخدام `IntersectionObserver` هنا مناسب نسبيًا:

- يبدأ عند 10% visibility.
- يضيف Class مرة واحدة.
- يتوقف عن مراقبة العنصر بعد الظهور.

هذا أفضل من Scroll listener مستمر.

لكن اختيار العناصر واسع ومعقد، وقد يفشل مع العناصر المضافة أو اختلاف البنية.

## 2.14 Overlays

يوجد:

- Invest overlay.
- Contact overlay.
- Coming soon overlay.

### نقاط القوة

- لا ينقل المستخدم بعيدًا.
- يحافظ على هوية العالم.
- يضع خيارات الدعم والتواصل في Cards واضحة.

### المشكلات

- ليست Dialog semantics.
- لا يوجد Focus trap.
- لا يظهر إغلاق عبر Escape.
- لا تعاد Focus إلى العنصر الذي فتح Overlay.
- تغيير `body.style.overflow` يدوي ومتكرر.
- Overlays لا تملك URLs قابلة للمشاركة.
- Coming soon داخل تجربة التوظيف يقلل النضج.

## 2.15 “Invest in the Journey”

هذا CTA غير تقليدي، ويشمل:

- Coffee talk.
- Hire me.
- Share resources.
- Donate/fuel builds.

### الإيجابي

- إنساني.
- يفتح أشكال مساعدة متعددة.
- يناسب طالبًا في بداية الرحلة.

### السلبي

- التبرع داخل Portfolio توظيف قد يشتت.
- “Invest” قد يبدو طلب دعم مالي قبل إثبات العمل.
- يجب أن يكون Hire/Contact هو المسار الأساسي، والدعم المالي بعيدًا أو غير موجود.

## 2.16 الموبايل

الـMedia query يحول شاشة الاختيار إلى عمودين رأسيين، ويخفي العناصر القابلة للسحب.

### نقاط جيدة

- لا يحاول إجبار Drag على الموبايل.
- Grids تتحول إلى عمود.
- الصور تضبط على عرض الشاشة.
- Overlays تسمح بالتمرير.

### مشكلات

- `.presenting-tag` يتحول إلى `1.5rem` رغم أنه كان Label صغيرًا، ما قد يكون كبيرًا جدًا.
- Navbar تصبح Relative وColumn، وقد تأخذ مساحة كبيرة.
- Story navigation تصبح Column في أعلى اليمين وقد تغطي المحتوى.
- توجد Overrides مبنية على البحث داخل Inline styles مثل:
  - `div[style*="top: 25px; left: 50%"]`
  - `div[style*="grid-template-columns: 1fr 1fr"]`

هذه selectors هشة جدًا؛ أي تعديل بسيط في Inline style يكسر Responsive behavior.

## 2.17 الـAccessibility

### نقاط جيدة

- بعض Social links تملك `aria-label`.
- صورة Mariem تملك Alt مناسبًا.
- Theme button له Label.
- Resume link مباشر.

### مشكلات حرجة

- شاشة الاختيار Divs قابلة للنقر وليست Buttons.
- Draggable elements غير قابلة للكيبورد.
- Overlays ليست Dialogs.
- لا Focus trap.
- لا Escape close ظاهر.
- لا Reduced motion.
- Typewriter يخفي النص.
- Hover-dependent tooltips.
- بعض الروابط Placeholder:
  - LinkedIn في Hero يشير إلى `linkedin.com` العام.
  - Email يشير إلى `your.email@example.com`.

هذه ليست تفاصيل صغيرة؛ هي أخطاء Publication gate.

## 2.18 الـSEO

### الموجود

- Title: `Presenting Mariam Eid`.
- Viewport.
- Favicon Inline.
- نصوص الصفحة داخل HTML.

### الناقص

- Meta description.
- Open Graph.
- Twitter card.
- Canonical.
- Structured data.
- Project routes.
- Sitemap.
- Robots configuration.
- Language alternates.

### مشكلة عالمين داخل URL واحد

محرك البحث لا يستطيع مشاركة رابط مباشر إلى:

- Recruiter/Architect path.
- Storyboard path.
- مشروع بعينه.
- Contact overlay.

كل شيء حالة داخل صفحة واحدة.

## 2.19 قابلية الصيانة

### الإيجابي

- توجد Design tokens جزئية.
- Architect CSS مفصول.
- الوظائف JavaScript مفهومة.
- لا توجد Dependencies كثيرة.
- نشر GitHub Pages بسيط.

### السلبي

- `index.html` يتجاوز ألف سطر.
- CSS كبير Inline.
- JavaScript Inline.
- Content وLayout وBehavior في ملف واحد.
- Inline styles كثيرة.
- Inline event handlers.
- Overlays متكررة.
- لا Content schema.
- لا Project data source.
- لا Routing.
- لا tests.

## 2.20 هل يصلح كنموذج Architecture لـNour؟

لا.

يصلح كـConcept prototype لفكرة Audience Worlds، لكنه لا يصلح كقاعدة لبورتفوليو:

- خمس Case Studies.
- لغتين.
- Shared وRecruiter routes.
- SEO.
- Mobile reductions.
- Evidence model.

## 2.21 إعادة التنفيذ الصحيحة

```text
app/
  [lang]/
    page.tsx
    recruiter/
    explore/
    projects/[slug]/

content/
  profile.ts
  projects.ts
  experiences.ts

components/
  audience-prompt/
  professional-world/
  creative-world/
  project-evidence/
  accessible-dialog/

motion/
  professional.ts
  creative.ts
  reduced-motion.ts
```

## 2.22 ما نأخذه من Mariem

### نأخذ

- الاختلاف الحقيقي بين عالمين.
- Preview بصري لنوع التجربة.
- فصل Professional voice عن Creative voice.
- Resume ظاهر.
- حالة التوفر والجامعة واضحة.
- Design tokens.
- Mobile reduction تخفي Drag.
- استعمال IntersectionObserver بدل Scroll listener مستمر.

### نعدل

- لا نحجب الهوية خلف Selector.
- Recruiter Cut يكون Route.
- نفس البيانات تدعم العرضين.
- نقل المحتوى إلى Data files.
- استخدام Buttons وDialogs حقيقية.
- تقليل الحركة لكل عنصر.
- دعم Pointer/Keyboard/Reduced motion.
- إزالة Inline styles والhandlers.

### نرفض

- ملف HTML ضخم.
- نصوص أول شاشة ناقصة.
- Placeholder links.
- Typewriter الذي يخفي المحتوى.
- Drag كجزء أساسي.
- Donate CTA في MVP.
- Overlays بلا Accessibility.
- CSS selectors تعتمد على نص الـInline style.

## 2.23 تقييم Mariem Eid

| المعيار              | التقييم | الملاحظة                            |
| -------------------- | ------: | ----------------------------------- |
| أصالة الفكرة         |    9/10 | عالمين حقيقيين لا مجرد Theme        |
| وضوح الاختيار        |    7/10 | بصريًا قوي، نصيًا به خطأ            |
| وضوح التموضع         |  5.5/10 | Game Dev وBackend وSecurity متنافسة |
| Professional path    |    7/10 | منظم وعملي لكن تقليدي نسبيًا        |
| Creative path        |  8.5/10 | مميز وشخصي لكنه معرض للفوضى         |
| عرض الأدلة           |    5/10 | Voice قوي، Evidence model محدود     |
| Accessibility        |  3.5/10 | مشكلات Semantic وDialog وMotion     |
| Mobile strategy      |    6/10 | توجد Reduction لكن التنفيذ هش       |
| SEO                  |    3/10 | صفحة واحدة بلا Metadata كافية       |
| Code maintainability |  3.5/10 | Monolith وInline code               |
| قيمة المرجع لـNour   |    8/10 | ممتاز لاختبار Audience adaptation   |

---

# 3. ImmersiveWeb

## 3.1 حالة التحقيق

الرابط `https://immersiveweb.app/` لم يكن قابلًا للفحص وقت المراجعة.

يوجد Repository مرشح:

- https://github.com/hazemyasserprg/portfolio

لكن لا توجد داخله إشارة إلى `immersiveweb.app`، بينما Metadata والـStructured data يشيران بوضوح إلى:

- `https://hazem.vip`
- Hazem Yasser Portfolio.

إذًا:

> لا يجوز وصف Repo Hazem بأنه مصدر ImmersiveWeb الحالي.

لكن يمكن تحليله كمرجع تقني مرشح؛ لأنه على الأرجح سبب إدراج المرشح في قائمة المصادر.

## 3.2 ما هو مؤكد في Repo المرشح؟

### الـStack

- Next.js 16.
- React 19.
- TypeScript.
- React Three Fiber.
- Drei.
- Three.js.
- Postprocessing.
- Framer Motion.
- Lenis.
- Tailwind CSS.
- Notion client.
- Vercel Analytics.
- Vercel Speed Insights.
- Playwright.

### بنية الموقع

- Home.
- About.
- Services.
- Projects archive.
- Project detail routes.
- Contact.
- Privacy.
- Terms.
- Sitemap.
- Not-found page.

هذا أوسع وأنضج من One-page portfolio تقليدي.

## 3.3 التموضع

Metadata والـHero يقدمان صاحب المرشح كالتالي:

> Full-Stack Developer & 3D Web Creative.

والجملة الأساسية:

> Building Digital Worlds from Database to Pixels.

### لماذا الجملة قوية؟

- تربط Backend وFrontend و3D في صورة واحدة.
- مختصرة.
- لها Rhythm.
- تبرر وجود مشهد 3D.
- توضح Range دون Skill list.

### المشكلة

الوصف يضيف أيضًا:

- high-performance apps.
- immersive 3D experiences.
- modern Framer sites.

وبذلك يتنافس ثلاثة عروض:

- Full-stack products.
- 3D web.
- Framer services.

يجب تحديد أيها المركز وأيها Range.

## 3.4 الـHero

### البنية

- Availability badge.
- Headline ضخم.
- Intro paragraph.
- View Work.
- Get in Touch.
- Social links.
- 3D glass core في الخلفية.
- Galaxy background.

### نقاط القوة

- الدور والقيمة يظهران فورًا.
- لا توجد Intro منفصلة تحجب المحتوى.
- 3D في الخلف وليس بوابة.
- CTA واضحان.
- Social links لها Labels.
- التصميم يخفي المشهد على الشاشات الصغيرة بدل فرضه.

### الملاحظة المهمة في الكود

الكود يحتوي تعليقًا صريحًا بأن مشهد 3D مخفي تحت `sm` لأن Camera framing لا يناسب الشاشات الضيقة، وأن الكرة تكبر وتغطي النص.

هذا مثال جيد على:

> Graceful reduction أفضل من محاولة إجبار نفس المشهد على كل الأجهزة.

### المشكلة البصرية

المشهد عبارة عن:

- Glass sphere.
- Orbit rings.
- Particles.
- Bloom.
- Vignette.
- Galaxy background.

هذه عناصر منتشرة جدًا في Creative developer portfolios، وقد تبدو Generic أو AI-generated إذا لم ترتبط بمشروع أو معنى خاص.

### ما كان سيجعلها أقوى

بدل Glass sphere عامة:

- System core يمثل تدفقًا حقيقيًا.
- Nodes تمثل المشاريع.
- تغير المشهد عند المرور على مشروع.
- عرض Architecture state بدل Orb زخرفي.

## 3.5 المشهد ثلاثي الأبعاد

### مكونات المشهد

- `Canvas` من React Three Fiber.
- Perspective camera.
- Environment preset city.
- Ambient/spot/point lights.
- Transmission material.
- Torus rings.
- 30 particles.
- Mouse parallax.
- Floating animation.
- Bloom.
- Vignette.
- Contact shadows.

### تحسينات أداء موجودة

- DPR محدود إلى `[1, 1.5]`.
- Multisampling معطل في EffectComposer.
- Contact shadow بدقة 128.
- Shadow frame واحد.
- عدد particles محدود.
- المشهد غير محمل على الموبايل.
- `performance={{ min: 0.5 }}`.

هذه قرارات أفضل من Canvas يعمل بأقصى دقة دون Budget.

### مشكلات تقنية

#### Animation loop دائم

`useFrame` يعمل باستمرار حتى لو المستخدم لا يتفاعل.

#### Transmission material مكلف

- Samples 6.
- Resolution 512.
- Distortion.
- Chromatic aberration.
- Postprocessing.

حتى على Desktop المتوسط، هذه تكلفة ملحوظة لمشهد زخرفي.

#### لا يظهر Reduced motion handling

إخفاء الموبايل لا يساوي دعم `prefers-reduced-motion` على Desktop.

#### `any` في التعامل مع Material

يوجد casting إلى `any` لتغيير اللون؛ ليس خطأ كارثيًا، لكنه يقلل Type safety.

#### Object creation داخل JSX

`background={new THREE.Color(...)}` ينشئ Object أثناء الـrender. الأفضل Memo أو قيمة مستقرة.

#### Cursor none داخل المشهد

المشهد يستخدم `cursor-none`، ومع وجود Custom Cursor عام يجب اختبار حالات فشل المؤشر المخصص.

## 3.6 الحركة

### Framer Motion

- Hero fade-up.
- Social fade.
- Project cards while-in-view.
- Hover scale للصور.
- Magnetic buttons.

### Lenis

Smooth scroll مفعّل عالميًا:

- مدة 1.2 ثانية.
- Smooth wheel.
- Touch multiplier = 2.
- Scroll reset عند تغيير Route.

### نقاط القوة

- Smooth scrolling متاح عبر Context للمكونات.
- الـAnchor CTA يستخدم Lenis offset.
- يتم Destroy عند Unmount.

### نقاط الضعف

- `requestAnimationFrame` loop يتم تشغيله يدويًا ولا يتم إلغاء معرف RAF صراحة، رغم Destroy instance.
- Touch multiplier 2 قد يجعل اللمس أسرع من المتوقع.
- لا يوجد تعطيل عند Reduced motion.
- Native scroll كان قد يكون كافيًا لمعظم الصفحات.
- Reset to top عند كل pathname قد يلغي توقعات Back navigation.

### Magnetic buttons

جذابة في Portfolio Creative، لكنها:

- لا تضيف معنى.
- تحتاج تعطيلًا على Touch.
- يجب ألا تغير Hit target أو تسبب Motion sickness.

## 3.7 Selected Work

الصفحة الرئيسية تعرض أول ثلاثة مشروعات من Data source واحد، مع Route لكل مشروع.

### نقاط القوة

- Data schema واضح.
- الصورة Alt مرتبطة بعنوان المشروع.
- Responsive `sizes` موجود.
- Next Image مستخدم.
- Category قبل الاسم.
- Archive link واضح.
- Project detail routes تمنح Deep path.

### نقطة الضعف الأساسية

بطاقة الصفحة الرئيسية تعرض:

- Category.
- Title.
- Description.

لكنها لا تعرض:

- Context.
- Role.
- Ownership.
- Result.
- Status.
- Validation.

وهذا يجعلها Project gallery أكثر من Evidence portfolio.

## 3.8 Data model للمشروعات

الـInterface يحتوي:

- Slug.
- Title.
- Description.
- Full description.
- Category.
- Tags.
- GitHub.
- Demo.
- Desktop/mobile images.
- Highlights.
- Frontend/backend/other technical details.

### ما تم جيدًا

- محتوى مركزي.
- Desktop/mobile assets.
- Separation للـtechnical layers.
- Route generation ممكن بسهولة.
- إضافة مشروع لا تتطلب تعديل Homepage.

### ما ينقصه مقارنة بمشروع Nour

- Context.
- Personal role.
- Team attribution.
- Constraints.
- Key decision.
- Validation.
- Outcome.
- Evidence status.
- Known limitations.
- Last verified date.
- Localization.

## 3.9 تحليل المشروعات المعروضة في المرشح

### Giftisan

متجر متعدد البائعين مع:

- Client/Artisan/Admin portals.
- Escrow ledger.
- Messaging.
- Coupons.
- Shipping.
- Paymob.

#### القوة

مشروع Product كامل ويمكن أن يصنع Case Study قوية عن Ledger أو Multi-role authorization.

#### المشكلة

الوصف مليء بكلمات مثل Premium وSophisticated، لكن لا يوضح:

- Role.
- Scale.
- Tests.
- Real users.
- Payment status.
- Escrow legality/implementation.

عبارة “Custom payment workflows simulated via local testing scripts” تحتاج وضوحًا حتى لا يظن الزائر أن Payments production-ready وهي محاكاة.

### AdasaFlow

ERP/CRM للمصورين مع:

- Arabic/English.
- RTL.
- Kanban/calendar.
- Invoices.
- Financial reporting.

هذا مشروع مناسب جدًا لإثبات Business software، لكنه معروض كـFeature list بدل Business problem وOutcome.

### Tjesa SaaS

هو أقوى مشروع Conceptually من ناحية Identity:

- Ancient Egyptian theme.
- Notion integrations.
- OAuth.
- QR generation.
- Forms.
- Publishing.

القوة هنا أن Theme مرتبطة بالمنتج، على عكس Glass sphere العامة في Hero.

المخاطر:

- ثلاثة منتجات داخل منتج واحد.
- وصف ضخم.
- لا Attribution واضح.
- يحتاج Diagram للـOAuth وSync وWebhooks.

### Notion Arabs

الوصف يزعم:

> The largest Arabic community platform for Notion users.

هذا Claim يحتاج دليلًا:

- Members.
- Traffic.
- Community size.
- Source/date.

كذلك GitHub link يشير إلى Profile عام لا Repo محدد.

### Interactive Galaxy

يذكر:

- 50,000+ points.
- 60FPS mobile and desktop.
- spatial audio.

هذه ادعاءات قابلة للقياس ويجب أن تملك:

- Test devices.
- Profiling screenshots.
- FPS methodology.
- Mobile fallback.

### Haunted House و3D Text

هذه غالبًا تجارب تعلم شائعة في Three.js. يجب توضيح:

- مصدر التمرين إن كان من Course.
- ما التعديلات الأصلية.
- لماذا تعرض كدليل.

### Mostafa Yasser Brand وMoawya

تضيف Client/service range، لكنها تحتاج:

- Role.
- Client context.
- Outcome.
- Permission to publish.
- Actual performance evidence.

## 3.10 Experience وSkills

وجود Experience ثم Skills بعد Work ترتيب جيد:

- العمل أولًا.
- ثم الرحلة.
- ثم الأدوات.

لكن يجب مراجعة Skills حتى لا تصبح قائمة Logos تكرر Project data.

البديل الأفضل لـNour:

> Capabilities mapped to project evidence.

## 3.11 SEO في Repo المرشح

### نقاط قوية

- Metadata لكل Home.
- Metadata base.
- Canonical.
- Open Graph.
- Twitter card.
- Robots.
- Sitemap file.
- JSON-LD ProfilePage/Person.
- Project routes.
- Not-found route.
- Next font optimization.
- Analytics وSpeed Insights.

### مشكلات

- Metadata تشير إلى `hazem.vip`، وبالتالي لا تطابق `immersiveweb.app`.
- تعليق داخل OG image يقول “Make sure to add this image”، ما يوحي أن Asset ربما كان Placeholder أثناء التطوير.
- Keywords meta أقل قيمة من جودة المحتوى.
- Structured data يحتوي `dateCreated` ثابتًا قد يحتاج تحققًا.
- لغة الصفحة `en` فقط.
- لا hreflang أو Localization.

## 3.12 قابلية الوصول

### نقاط جيدة

- Social links لها `aria-label`.
- Alt للمشروعات وصفي.
- Links حقيقية.
- 3D background لا يستقبل Pointer على الـHome wrapper.
- 3D مخفي على الموبايل.

### مشكلات متوقعة

- Custom cursor عالمي.
- Cursor none في المشهد.
- Smooth scroll عالمي.
- Magnetic interactions.
- لا Reduced motion واضح.
- الـ3D ليس له بديل وصفي خاص، رغم أن النص الأساسي مستقل.
- Glass card contrast يحتاج قياسًا.

## 3.13 الأداء

### نقاط جيدة

- Next Image.
- Responsive sizes.
- 3D مخفي على الهاتف.
- Vercel Speed Insights.
- DPR محدود.
- Shadows/Postprocessing مخففة.
- Static project content.

### المخاطر

- Three.js + R3F + Drei + Postprocessing في Hero.
- Galaxy background إضافية مع 3D core.
- Framer Motion + Lenis + Custom cursor + Magnetic.
- عدة Animation loops قد تعمل معًا.
- Notion client dependency موجودة في المشروع العام حتى لو لم تستخدم في كل Route.
- Page shell كله Client component في Home، ما يزيد JavaScript.

### تحسينات لـNour

- Hero server-rendered نصيًا.
- Dynamic import للمشهد مع `ssr: false`.
- لا تحميل 3D قبل idle أو interaction.
- Static SVG fallback.
- Reduced motion لا يحمل Canvas أصلًا.
- مراقبة JS budget.

## 3.14 هل Repo المرشح Original أم Template؟

لا يوجد README يمكن الاستناد إليه، ولا License ظاهر في المسار القياسي الذي تم فحصه.

لذلك:

- لا يحق نسخ الكود مباشرة.
- يمكن دراسة Architecture والممارسات.
- لا يمكن تأكيد أصل الـArt direction.
- يجب فحص تاريخ Commits وCredits قبل إعادة الاستخدام.

## 3.15 ما نأخذه من المرشح

### نأخذ

- جملة `Database to Pixels` كمثال على ربط Range بمركز واحد.
- Project content schema.
- Routes منفصلة.
- Desktop/mobile images.
- Next Image sizes.
- SEO metadata وJSON-LD.
- Analytics وSpeed Insights.
- إخفاء 3D على Narrow screens.
- Content مستقل عن Canvas.
- Project archive + detail routes.

### نعدل

- استبدال Orb العام بنظام مرتبط بالمشروعات.
- إضافة Role/Context/Decision/Validation للـschema.
- تحميل 3D اختياريًا.
- إزالة Smooth scroll إن لم يثبت حاجة.
- إضافة Reduced motion.
- ربط Skills بالأدلة.
- مراجعة Claims الكبيرة.
- إضافة اللغة العربية وRTL.

### نرفض

- اعتبار Candidate source مطابقًا لـImmersiveWeb.
- نسخ Glass sphere/Galaxy كهوية.
- Custom cursor الإجباري.
- Full client-rendered shell بلا حاجة.
- Project descriptions تسويقية بلا Evidence.
- ادعاءات 60FPS وLargest وCore Web Vitals بلا Artifact.

## 3.16 تقييم ImmersiveWeb/المرشح

| المعيار                    |  التقييم | الملاحظة                            |
| -------------------------- | -------: | ----------------------------------- |
| إمكانية تقييم الموقع الحي  | غير متاح | الرابط لم يُفحص                     |
| ثقة مطابقة المصدر          |     2/10 | Repo يشير إلى دومين وهوية أخرى      |
| قوة Architecture في المرشح |     8/10 | Next routes وData schema وSEO       |
| قوة الـHero                |   7.5/10 | رسالة جيدة، مشهد Generic نسبيًا     |
| 3D implementation          |   7.5/10 | تحسينات أداء موجودة لكن مكلف        |
| عرض الأدلة                 |   5.5/10 | تفاصيل تقنية كثيرة، Ownership ناقصة |
| Mobile reduction           |     8/10 | إخفاء المشهد قرار واعٍ              |
| Accessibility              |   5.5/10 | أساس جيد، Motion/cursor غير محسوم   |
| SEO                        |   8.5/10 | Metadata قوية في المرشح             |
| ملاءمته لـNour             |   7.5/10 | مفيد تقنيًا، لا يُستخدم كهوية جاهزة |

---

# 4. المقارنة بين المراجع الثلاثة

| العنصر          | Omar Emara       | Mariem Eid                     | ImmersiveWeb / Candidate           |
| --------------- | ---------------- | ------------------------------ | ---------------------------------- |
| توفر الموقع     | غير متاح         | متاح بمصدر مؤكد                | غير متاح                           |
| ثقة المصدر      | معدومة           | عالية                          | منخفضة                             |
| الفكرة المركزية | غير معروفة       | عالم مهني + عالم إبداعي        | Full-stack + 3D creative           |
| أقوى ميزة       | لا يمكن الحكم    | Audience adaptation            | Architecture و3D integration       |
| أكبر خطر        | التحليل بالتخمين | Monolithic code وAccessibility | مصدر غير مطابق و3D generic         |
| SEO             | غير معروف        | ضعيف                           | قوي في المرشح                      |
| Mobile          | غير معروف        | Reduction موجودة لكن هشة       | 3D مخفي بوعي                       |
| ما يفيد Nour    | حفظ Captures     | Prototype للعوالم              | Routes/Schema/Performance patterns |

---

# 5. ماذا تغير هذه الدفعة في اتجاه Portfolio Nour؟

## 5.1 Audience selector

Mariem تثبت أن التغيير الحقيقي بين عالمين ممكن، لكنها تثبت أيضًا تكلفة ذلك:

- تضاعف CSS.
- تضاعف Interaction rules.
- تضاعف QA.
- صعوبة الـSEO.
- صعوبة Accessibility.

### القرار المقترح

- لا Full-screen blocking selector في MVP.
- Recruiter Cut اختياري.
- نفس facts.
- Route مستقل.
- اختلاف في hierarchy وmotion، لا إعادة بناء كل شيء من الصفر.

## 5.2 الـ3D

المرشح يثبت أن 3D يمكن دمجه خلف النص مع Mobile reduction، لكن الـGlass sphere لا تشرح خبرة Full-stack.

### القرار المقترح

إن تم استخدام 3D:

- Engineering core له معنى.
- كل Project node يربط بدليل.
- Static fallback.
- لا تحميل على الموبايل.
- لا تحميل عند Reduced motion.
- Budget واضح.

## 5.3 Content model

Repo المرشح أفضل من Mariem في فصل بيانات المشاريع، لكن Schema ما زالت معرض أعمال، وليست Case-study evidence model.

### Schema المقترح

```ts
type Project = {
  id: string;
  slug: string;
  context: "solo" | "team" | "university" | "fork";
  role: string;
  problem: LocalizedText;
  constraints: LocalizedText[];
  decisions: Decision[];
  validation: Evidence[];
  outcome: LocalizedText;
  limitations: LocalizedText[];
  media: Media[];
  repository?: VerifiedLink;
  demo?: VerifiedLink;
};
```

## 5.4 Motion hierarchy

من Mariem والمرشح معًا، الخطر هو جمع:

- Tilt.
- Drag.
- Typewriter.
- Particles.
- Smooth scrolling.
- Magnetic buttons.
- Custom cursor.
- 3D.
- Floating cards.

في تجربة واحدة.

### القرار المقترح

كل صفحة تحصل على:

- Transition رئيسية واحدة.
- Signature interaction واحدة.
- Reveal system واحد.
- لا أكثر من Layer زخرفي مستمر واحد.

## 5.5 Reference preservation

Omar Emara يثبت ضرورة ألا تبقى المراجع روابط فقط.

لكل مرجع نشط يجب حفظ:

```text
reference/
  metadata.md
  desktop-full.png
  mobile-full.png
  motion.mp4
  notes.md
  source-status.md
```

---

# 6. الترتيب بعد هذه الدفعة

## حسب القيمة المفاهيمية

1. Mariem Eid — Audience Worlds.
2. Immersive candidate — 3D + Full-stack integration.
3. Omar Emara — غير قابل للتقييم حاليًا.

## حسب القيمة البرمجية

1. Immersive candidate — Next.js architecture و3D وSEO.
2. Mariem Eid — مفيد كـVanilla prototype وتحذير معماري.
3. Omar Emara — لا Source.

## حسب ما يمكن تطبيقه مباشرة في Nour

1. Content schema وRoutes من المرشح بعد تطويرها.
2. Visual preview لفكرة الجمهور من Mariem دون بوابة إجبارية.
3. Mobile 3D reduction.
4. حفظ Captures لكل المراجع.

---

# 7. قائمة القرارات المستخرجة

## Adopt

- Project routes منفصلة.
- Content data source.
- Mobile media assets.
- SEO metadata.
- CV وContact ظاهرين.
- عالم Recruiter مختصر.
- 3D fallback.

## Adapt

- Audience choice يصبح اختياريًا.
- 3D core يصبح System diagram.
- Creative world يصبح Section أو later path.
- Skills تصبح Capability evidence.
- Overlays تصبح Routes أو Accessible dialogs.

## Reject

- Blocking selector.
- Monolithic HTML.
- Placeholder links.
- Fake source matching.
- Drag الإجباري.
- Typewriter الذي يخفي النص.
- Generic glass orb كهوية نهائية.
- Smooth scroll لمجرد الإحساس.
- Claims غير موثقة.

---

# 8. المطلوب لإغلاق فجوات التحليل

## Omar Emara

- Full-page Desktop screenshot.
- Mobile screenshot.
- Motion recording.
- GitHub/Source link إن وجد.

## ImmersiveWeb

- Screenshot أو Recording من الدومين نفسه.
- رابط GitHub من الموقع الحي.
- HTML source أو Wappalyzer capture.
- إثبات هل Hazem repo مرتبط به أم لا.

## Mariem Eid

- فحص بصري على أجهزة فعلية.
- Keyboard walkthrough.
- Lighthouse.
- Reduced-motion test.
- Mobile touch test.

---

# 9. مصادر الفحص

## Mariem Eid

- Live: https://mariem-eid.github.io/mariameid./
- Repository: https://github.com/mariem-eid/mariameid.
- `index.html`
- `css/variables.css`
- `css/architect.css`

## Immersive candidate

- Candidate repository: https://github.com/hazemyasserprg/portfolio
- `package.json`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/HomeClient.tsx`
- `src/components/HeroScene.tsx`
- `src/components/SmoothScroll.tsx`
- `src/content/projects.ts`

## Omar Emara

- Live reference supplied: https://omar-emara.vercel.app/
- No verified source discovered during this review.
