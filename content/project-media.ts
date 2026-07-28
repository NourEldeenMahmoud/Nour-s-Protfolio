import type { ProjectMedia, ProjectSlug } from "@/content/portfolio";

type ImageOptions = Pick<
  ProjectMedia,
  | "device"
  | "orientation"
  | "purpose"
  | "treatment"
  | "focalPosition"
  | "poster"
>;

const browserImage: ImageOptions = {
  device: "browser",
  orientation: "landscape",
  purpose: "product",
  treatment: "full",
  focalPosition: "50% 50%",
};

const desktopImage: ImageOptions = {
  ...browserImage,
  device: "desktop",
};

const mobileImage: ImageOptions = {
  ...browserImage,
  device: "mobile",
  orientation: "portrait",
};

function image(
  id: string,
  src: string,
  en: string,
  ar: string,
  options: ImageOptions = browserImage,
): ProjectMedia {
  return {
    id,
    type: "image",
    src,
    alt: { en, ar },
    caption: { en, ar },
    duration: 5,
    transition: "crossfade",
    ...options,
  };
}

function video(
  id: string,
  src: string,
  poster: string,
  en: string,
  ar: string,
  options: ImageOptions = browserImage,
): ProjectMedia {
  return {
    id,
    type: "video",
    src,
    poster,
    alt: { en, ar },
    caption: { en, ar },
    duration: 35,
    ...options,
  };
}

export type ProjectMediaSet = {
  hero?: ProjectMedia;
  preview: ProjectMedia[];
  details: ProjectMedia[];
};

export const projectMediaSets: Record<ProjectSlug, ProjectMediaSet> = {
  buildsense: {
    preview: [
      video(
        "buildsense-preview-video",
        "/projects/buildsense/preview/preview.mp4",
        "/projects/buildsense/preview/poster.webp",
        "BuildSense PC hardware discovery preview video",
        "فيديو معاينة منصة BuildSense لاكتشاف مكونات الحاسوب",
      ),
    ],
    details: [
      image(
        "buildsense-home",
        "/projects/buildsense/details/home.webp",
        "BuildSense hardware discovery home page",
        "الصفحة الرئيسية لمنصة BuildSense لاكتشاف مكونات الحاسوب",
      ),
      image(
        "buildsense-catalog",
        "/projects/buildsense/details/catalog.webp",
        "BuildSense component catalog and filtering",
        "كتالوج مكونات BuildSense وخيارات التصفية",
      ),
      image(
        "buildsense-product-details",
        "/projects/buildsense/details/product-details.webp",
        "BuildSense product details and verified specifications",
        "تفاصيل المنتج والمواصفات المتحقق منها في BuildSense",
      ),
      image(
        "buildsense-comparison",
        "/projects/buildsense/details/comparison.webp",
        "BuildSense side-by-side component comparison",
        "مقارنة مكونات جنباً إلى جنب في BuildSense",
      ),
      image(
        "buildsense-builder",
        "/projects/buildsense/details/pc-builder.webp",
        "BuildSense PC builder workspace",
        "مساحة تجميع الحاسوب في BuildSense",
      ),
      image(
        "buildsense-purchase-plan",
        "/projects/buildsense/details/purchase-plan.webp",
        "BuildSense build review and purchase plan",
        "مراجعة التجميعة وخطة الشراء في BuildSense",
      ),
      image(
        "buildsense-admin-overview",
        "/projects/buildsense/details/admin-overview.webp",
        "BuildSense administration overview",
        "نظرة عامة على إدارة BuildSense",
      ),
      image(
        "buildsense-admin-compatibility",
        "/projects/buildsense/details/admin-compatibility.webp",
        "BuildSense compatibility and data quality review",
        "مراجعة التوافق وجودة البيانات في BuildSense",
      ),
      image(
        "buildsense-mobile-home",
        "/projects/buildsense/details/mobile-home.webp",
        "BuildSense mobile responsive view",
        "عرض الهاتف المتجاوب لمنصة BuildSense",
        mobileImage,
      ),
      image(
        "buildsense-mobile-builder",
        "/projects/buildsense/details/mobile-builder.webp",
        "BuildSense mobile builder interface",
        "واجهة تجميع الحاسوب على الهاتف في BuildSense",
        mobileImage,
      ),
    ],
  },
  bookify: {
    preview: [
      video(
        "bookify-preview-video",
        "/projects/bookify/preview/preview.mp4",
        "/projects/bookify/preview/poster.webp",
        "Bookify hotel reservation system preview video",
        "فيديو معاينة نظام حجز الفنادق Bookify",
      ),
    ],
    details: [
      image(
        "bookify-home",
        "/projects/bookify/details/04-home.webp",
        "Bookify hotel search home page",
        "الصفحة الرئيسية للبحث عن الفنادق في Bookify",
      ),
      image(
        "bookify-rooms",
        "/projects/bookify/details/13-rooms.webp",
        "Bookify available rooms catalog",
        "كتالوج الغرف المتاحة في Bookify",
      ),
      image(
        "bookify-room-details",
        "/projects/bookify/details/12-roomdetails.webp",
        "Bookify room details and gallery",
        "تفاصيل الغرفة ومعرض الصور في Bookify",
      ),
      image(
        "bookify-booking",
        "/projects/bookify/details/01-booking.webp",
        "Bookify reservation checkout",
        "إتمام الحجز في Bookify",
      ),
      image(
        "bookify-email-confirmation",
        "/projects/bookify/details/03-email.webp",
        "Bookify email confirmation state",
        "حالة تأكيد البريد الإلكتروني في Bookify",
      ),
      image(
        "bookify-admin-dashboard",
        "/projects/bookify/details/02-dashboard.webp",
        "Bookify administration dashboard",
        "لوحة إدارة Bookify",
      ),
      image(
        "bookify-manage-rooms",
        "/projects/bookify/details/07-managerooms.webp",
        "Bookify room inventory management",
        "إدارة مخزون الغرف في Bookify",
      ),
    ],
  },
  cinemaverse: {
    preview: [
      image(
        "cinemaverse-home",
        "/projects/cinemaverse/details/home.webp",
        "CinemaVerse customer home page",
        "الصفحة الرئيسية للمستخدم في CinemaVerse",
      ),
      image(
        "cinemaverse-catalog",
        "/projects/cinemaverse/details/movie-catalog.webp",
        "CinemaVerse movie catalog",
        "كتالوج الأفلام في CinemaVerse",
      ),
      image(
        "cinemaverse-details",
        "/projects/cinemaverse/details/movie-details.webp",
        "CinemaVerse movie details and showtimes",
        "تفاصيل الفيلم ومواعيد العرض في CinemaVerse",
      ),
      image(
        "cinemaverse-seats",
        "/projects/cinemaverse/details/seat-selection.webp",
        "CinemaVerse seat selection flow",
        "تدفق اختيار المقاعد في CinemaVerse",
      ),
      image(
        "cinemaverse-admin-dashboard",
        "/projects/cinemaverse/details/admin-dashboard.webp",
        "CinemaVerse administration dashboard",
        "لوحة إدارة CinemaVerse",
      ),
    ],
    details: [
      image(
        "cinemaverse-home",
        "/projects/cinemaverse/details/home.webp",
        "CinemaVerse customer home page",
        "الصفحة الرئيسية للمستخدم في CinemaVerse",
      ),
      image(
        "cinemaverse-catalog",
        "/projects/cinemaverse/details/movie-catalog.webp",
        "CinemaVerse movie catalog",
        "كتالوج الأفلام في CinemaVerse",
      ),
      image(
        "cinemaverse-details",
        "/projects/cinemaverse/details/movie-details.webp",
        "CinemaVerse movie details and showtimes",
        "تفاصيل الفيلم ومواعيد العرض في CinemaVerse",
      ),
      image(
        "cinemaverse-seats",
        "/projects/cinemaverse/details/seat-selection.webp",
        "CinemaVerse seat selection flow",
        "تدفق اختيار المقاعد في CinemaVerse",
      ),
      image(
        "cinemaverse-admin-dashboard",
        "/projects/cinemaverse/details/admin-dashboard.webp",
        "CinemaVerse administration dashboard",
        "لوحة إدارة CinemaVerse",
      ),
    ],
  },
  "frontend-mini-projects": {
    preview: [
      video(
        "fmp-preview-video",
        "/projects/frontend-mini-projects/preview/preview.mp4",
        "/projects/frontend-mini-projects/preview/poster.webp",
        "Frontend Mini Projects collection preview video",
        "فيديو معاينة مجموعة مشاريع الواجهات الأمامية المصغّرة",
      ),
    ],
    details: [
      image(
        "fmp-index",
        "/projects/frontend-mini-projects/details/01-index.webp",
        "Frontend Mini Projects index page",
        "الصفحة الرئيسية لمشاريع الواجهات الأمامية المصغّرة",
      ),
      image(
        "fmp-bookmark",
        "/projects/frontend-mini-projects/details/02-bookmark.webp",
        "Bookmark landing page challenge",
        "تحدي صفحة هبوط Bookmark",
      ),
      image(
        "fmp-shortly",
        "/projects/frontend-mini-projects/details/03-shortly.webp",
        "Shortly URL shortener challenge",
        "تحدي أداة تقصير الروابط Shortly",
      ),
      image(
        "fmp-fylo",
        "/projects/frontend-mini-projects/details/04-fylo.webp",
        "Fylo landing page challenge",
        "تحدي صفحة هبوط Fylo",
      ),
      image(
        "fmp-loopstudios",
        "/projects/frontend-mini-projects/details/05-loopstudios.webp",
        "Loopstudios VR landing page challenge",
        "تحدي صفحة هبوط Loopstudios للواقع الافتراضي",
      ),
      image(
        "fmp-testimonials",
        "/projects/frontend-mini-projects/details/06-testimonials-grid.webp",
        "Testimonials Grid section challenge",
        "تحدي شبكة التوصيات Testimonials Grid",
      ),
      image(
        "fmp-clipboard",
        "/projects/frontend-mini-projects/details/07-clipboard.webp",
        "Clipboard landing page challenge",
        "تحدي صفحة هبوط Clipboard",
      ),
      image(
        "fmp-mobile-index",
        "/projects/frontend-mini-projects/details/08-mobile-index.webp",
        "Frontend Mini Projects mobile index view",
        "عرض الهاتف المحمول لمشاريع الواجهات الأمامية المصغّرة",
        mobileImage,
      ),
    ],
  },
  "how-to-train-your-ai": {
    preview: [
      video(
        "httyai-preview-video",
        "/projects/how-to-train-your-ai/preview/preview.mp4",
        "/projects/how-to-train-your-ai/preview/poster.webp",
        "How To Train Your AI gameplay preview video",
        "فيديو معاينة طريقة لعب How To Train Your AI",
      ),
    ],
    hero: image(
      "httyai-hero",
      "/projects/how-to-train-your-ai/details/hero.webp",
      "How To Train Your AI title artwork with a friendly robot at sunset",
      "صورة عنوان How To Train Your AI مع روبوت ودود وقت الغروب",
    ),
    details: [
      image(
        "httyai-frame-1",
        "/projects/how-to-train-your-ai/details/01-gameplay.webp",
        "How To Train Your AI gameplay — narrative introduction and grandfather messages",
        "طريقة لعب How To Train Your AI — المقدمة السردية ورسائل الجد",
      ),
      image(
        "httyai-frame-2",
        "/projects/how-to-train-your-ai/details/02-gameplay.webp",
        "How To Train Your AI gameplay — player and robot control switching",
        "طريقة لعب How To Train Your AI — التبديل بين التحكم باللاعب والروبوت",
      ),
      image(
        "httyai-frame-3",
        "/projects/how-to-train-your-ai/details/03-gameplay.webp",
        "How To Train Your AI gameplay — Mini-Game 1: control calibration",
        "طريقة لعب How To Train Your AI — اللعبة المصغرة 1: معايرة التحكم",
      ),
      image(
        "httyai-frame-4",
        "/projects/how-to-train-your-ai/details/04-gameplay.webp",
        "How To Train Your AI gameplay — Mini-Game 2: energy and path-efficiency trial",
        "طريقة لعب How To Train Your AI — اللعبة المصغرة 2: اختبار الطاقة وكفاءة المسار",
      ),
      image(
        "httyai-frame-5",
        "/projects/how-to-train-your-ai/details/05-gameplay.webp",
        "How To Train Your AI gameplay — Mini-Game 3: spatial push puzzle",
        "طريقة لعب How To Train Your AI — اللعبة المصغرة 3: لغز الدفع مكاني",
      ),
      image(
        "httyai-frame-6",
        "/projects/how-to-train-your-ai/details/06-gameplay.webp",
        "How To Train Your AI gameplay — persistent robot statistics and fault events",
        "طريقة لعب How To Train Your AI — إحصائيات الروبوت المستمرة وأحداث الأعطال",
      ),
    ],
  },
  "sharp-shooter": {
    preview: [
      video(
        "sharp-shooter-preview-video",
        "/projects/sharp-shooter/preview/preview.mp4",
        "/projects/sharp-shooter/preview/poster.webp",
        "Sharp Shooter gameplay preview video",
        "فيديو معاينة طريقة لعب Sharp Shooter",
      ),
    ],
    hero: image(
      "sharp-shooter-hero",
      "/projects/sharp-shooter/details/hero-gameplay.gif",
      "Sharp Shooter animated gameplay loop in the aim-training arena",
      "مشهد لعب متحرك من Sharp Shooter داخل ساحة تدريب التصويب",
      {
        ...desktopImage,
        poster: "/projects/sharp-shooter/preview/poster.webp",
      },
    ),
    details: [
      image(
        "sharp-shooter-victory",
        "/projects/sharp-shooter/details/05-gameplay.webp",
        "Sharp Shooter victory screen after clearing the arena",
        "شاشة الفوز في Sharp Shooter بعد إنهاء أهداف الساحة",
      ),
      image(
        "sharp-shooter-targeting",
        "/projects/sharp-shooter/details/03-gameplay.webp",
        "Sharp Shooter precision targeting with the scoped weapon",
        "تصويب دقيق في Sharp Shooter باستخدام السلاح ذي المنظار",
      ),
      image(
        "sharp-shooter-hit-feedback",
        "/projects/sharp-shooter/details/02-gameplay.webp",
        "Sharp Shooter target hit with impact particles and updated counters",
        "إصابة هدف في Sharp Shooter مع مؤثرات الاصطدام وتحديث العدادات",
      ),
      image(
        "sharp-shooter-pickup",
        "/projects/sharp-shooter/details/04-gameplay.webp",
        "Sharp Shooter arena navigation beside an ammunition pickup",
        "التنقل داخل ساحة Sharp Shooter بجوار ذخيرة قابلة للجمع",
      ),
      image(
        "sharp-shooter-arena",
        "/projects/sharp-shooter/details/01-gameplay.webp",
        "Sharp Shooter arena overview with active targets and weapon HUD",
        "نظرة عامة على ساحة Sharp Shooter مع الأهداف النشطة وواجهة السلاح",
      ),
    ],
  },
  "royal-run": {
    preview: [
      video(
        "royal-run-preview-video",
        "/projects/royal-run/preview/preview.mp4",
        "/projects/royal-run/preview/poster.webp",
        "Royal Run gameplay preview video",
        "فيديو معاينة طريقة لعب Royal Run",
      ),
    ],
    hero: image(
      "royal-run-hero",
      "/projects/royal-run/details/hero-gameplay.gif",
      "Royal Run animated gameplay loop through the castle course",
      "مشهد لعب متحرك من Royal Run عبر مسار القلعة",
      {
        ...desktopImage,
        poster: "/projects/royal-run/preview/poster.webp",
      },
    ),
    details: [
      image(
        "royal-run-game-over",
        "/projects/royal-run/details/04-gameplay.webp",
        "Royal Run game-over state with the final score",
        "شاشة نهاية الجولة في Royal Run مع النتيجة النهائية",
      ),
      image(
        "royal-run-barrel",
        "/projects/royal-run/details/03-gameplay.webp",
        "Royal Run rolling barrel obstacle between barricades",
        "عقبة البرميل المتدحرج بين الحواجز في Royal Run",
      ),
      image(
        "royal-run-catapult",
        "/projects/royal-run/details/06-gameplay.webp",
        "Royal Run catapult obstacle beside a coin trail",
        "عقبة المنجنيق بجوار مسار العملات في Royal Run",
      ),
      image(
        "royal-run-boulder",
        "/projects/royal-run/details/05-gameplay.webp",
        "Royal Run boulder hazard on the castle path",
        "خطر الصخرة على مسار القلعة في Royal Run",
      ),
      image(
        "royal-run-course",
        "/projects/royal-run/details/01-gameplay.webp",
        "Royal Run castle course with fruit and barricades ahead",
        "مسار قلعة Royal Run مع الفاكهة والحواجز في الأمام",
      ),
    ],
  },
  "galaxy-strike": {
    preview: [
      video(
        "galaxy-strike-preview-video",
        "/projects/galaxy-strike/preview/preview.mp4",
        "/projects/galaxy-strike/preview/poster.webp",
        "Galaxy Strike gameplay preview video",
        "فيديو معاينة طريقة لعب Galaxy Strike",
      ),
    ],
    hero: image(
      "galaxy-strike-hero",
      "/projects/galaxy-strike/details/hero-gameplay.gif",
      "Galaxy Strike animated canyon dogfight",
      "معركة جوية متحركة داخل وادي Galaxy Strike",
      {
        ...desktopImage,
        poster: "/projects/galaxy-strike/preview/poster.webp",
      },
    ),
    details: [
      image(
        "galaxy-strike-flight",
        "/projects/galaxy-strike/details/01-gameplay.webp",
        "Galaxy Strike spacecraft flying through the forest canyon",
        "مركبة Galaxy Strike تحلق عبر الوادي المليء بالأشجار",
      ),
      image(
        "galaxy-strike-briefing",
        "/projects/galaxy-strike/details/02-gameplay.webp",
        "Galaxy Strike mission dialogue during an enemy attack",
        "حوار مهمة في Galaxy Strike أثناء هجوم الأعداء",
      ),
      image(
        "galaxy-strike-impact",
        "/projects/galaxy-strike/details/03-gameplay.webp",
        "Galaxy Strike enemy destroyed by the player's laser fire",
        "تدمير عدو في Galaxy Strike بنيران الليزر",
      ),
      image(
        "galaxy-strike-reinforcements",
        "/projects/galaxy-strike/details/05-gameplay.webp",
        "Galaxy Strike reinforcements entering the canyon battle",
        "وصول تعزيزات إلى معركة الوادي في Galaxy Strike",
      ),
      image(
        "galaxy-strike-dogfight",
        "/projects/galaxy-strike/details/04-gameplay.webp",
        "Galaxy Strike close-range dogfight beneath an enemy carrier",
        "معركة جوية قريبة في Galaxy Strike أسفل سفينة معادية",
      ),
    ],
  },
  "rocket-boost": {
    preview: [
      video(
        "rocket-boost-preview-video",
        "/projects/rocket-boost/preview/preview.mp4",
        "/projects/rocket-boost/preview/poster.webp",
        "Rocket Boost gameplay preview video",
        "فيديو معاينة طريقة لعب Rocket Boost",
      ),
    ],
    hero: image(
      "rocket-boost-hero",
      "/projects/rocket-boost/details/hero-gameplay.gif",
      "Rocket Boost animated flight through the industrial colony",
      "رحلة متحركة في Rocket Boost عبر المستعمرة الصناعية",
      {
        ...desktopImage,
        poster: "/projects/rocket-boost/preview/poster.webp",
      },
    ),
    details: [
      image(
        "rocket-boost-level-overview",
        "/projects/rocket-boost/details/03-gameplay.webp",
        "Rocket Boost complete industrial level layout in the Unity editor",
        "التخطيط الكامل للمستوى الصناعي في Rocket Boost داخل محرر Unity",
      ),
      image(
        "rocket-boost-launch-pad",
        "/projects/rocket-boost/details/01-gameplay.webp",
        "Rocket Boost spacecraft waiting on an elevated launch pad",
        "مركبة Rocket Boost على منصة إطلاق مرتفعة",
      ),
      image(
        "rocket-boost-debris",
        "/projects/rocket-boost/details/05-gameplay.webp",
        "Rocket Boost flying through a dense debris effect",
        "التحليق عبر مؤثر حطام كثيف في Rocket Boost",
      ),
      image(
        "rocket-boost-flight",
        "/projects/rocket-boost/details/02-gameplay.webp",
        "Rocket Boost spacecraft crossing the illuminated colony",
        "مركبة Rocket Boost تعبر المستعمرة المضيئة",
      ),
      image(
        "rocket-boost-landing",
        "/projects/rocket-boost/details/06-gameplay.webp",
        "Rocket Boost spacecraft settling onto the destination pad",
        "مركبة Rocket Boost تهبط على منصة الوصول",
      ),
      image(
        "rocket-boost-rock-field",
        "/projects/rocket-boost/details/04-gameplay.webp",
        "Rocket Boost spacecraft navigating a suspended rock field",
        "مركبة Rocket Boost تتنقل عبر حقل صخري معلق",
      ),
    ],
  },
  "blood-bank-desktop": {
    preview: [
      video(
        "bbms-desktop-preview-video",
        "/projects/blood-bank-desktop/preview/preview.mp4",
        "/projects/blood-bank-desktop/preview/poster.webp",
        "Blood Bank Management System desktop preview video",
        "فيديو معاينة نظام إدارة بنك الدم المكتبي",
      ),
    ],
    details: [
      image(
        "bbms-dashboard",
        "/projects/blood-bank-desktop/details/02-dashboard.webp",
        "Blood Bank desktop operations dashboard",
        "لوحة عمليات نظام بنك الدم المكتبي",
        desktopImage,
      ),
      image(
        "bbms-managedonors",
        "/projects/blood-bank-desktop/details/07-managedonors.webp",
        "Blood Bank donor management",
        "إدارة المتبرعين في بنك الدم",
        desktopImage,
      ),
      image(
        "bbms-bloodunitcard",
        "/projects/blood-bank-desktop/details/01-bloodunitcard.webp",
        "Blood Bank unit card and tracking",
        "بطاقات وحدات الدم وتتبعها",
        desktopImage,
      ),
      image(
        "bbms-findamatch",
        "/projects/blood-bank-desktop/details/05-findamatch.webp",
        "Blood Bank compatibility matching screen",
        "شاشة مطابقة فصائل الدم في بنك الدم",
        desktopImage,
      ),
    ],
  },
  "blood-bank-mobile": {
    preview: [
      video(
        "bbms-mobile-preview-video",
        "/projects/blood-bank-mobile/preview/preview.mp4",
        "/projects/blood-bank-mobile/preview/poster.webp",
        "Blood Bank donor mobile app preview video",
        "فيديو معاينة تطبيق المتبرعين في بنك الدم",
        mobileImage,
      ),
    ],
    details: [
      image(
        "bbms-mobile-home",
        "/projects/blood-bank-mobile/details/01-home.webp",
        "Blood Bank donor mobile home screen",
        "الشاشة الرئيسية لتطبيق المتبرعين في بنك الدم",
        mobileImage,
      ),
      image(
        "bbms-mobile-schedule",
        "/projects/blood-bank-mobile/details/04-schedule.webp",
        "Blood Bank mobile appointment scheduling",
        "جدولة موعد التبرع في تطبيق بنك الدم",
        mobileImage,
      ),
      image(
        "bbms-mobile-notifications",
        "/projects/blood-bank-mobile/details/05-notifications.webp",
        "Blood Bank mobile notification center",
        "مركز الإشعارات في تطبيق بنك الدم",
        mobileImage,
      ),
      image(
        "bbms-mobile-registration",
        "/projects/blood-bank-mobile/details/03-register.webp",
        "Blood Bank mobile registration form",
        "نموذج التسجيل في تطبيق بنك الدم",
        mobileImage,
      ),
      image(
        "bbms-mobile-login",
        "/projects/blood-bank-mobile/details/02-login.webp",
        "Blood Bank mobile sign-in screen",
        "شاشة تسجيل الدخول في تطبيق بنك الدم",
        mobileImage,
      ),
    ],
  },
  dvld: {
    preview: [
      video(
        "dvld-preview-video",
        "/projects/dvld/preview/preview.mp4",
        "/projects/dvld/preview/poster.webp",
        "Driving and Vehicle License Department preview video",
        "فيديو معاينة نظام إدارة رخص القيادة والمركبات",
        desktopImage,
      ),
    ],
    details: [
      image(
        "dvld-main-shell",
        "/projects/dvld/details/main.webp",
        "DVLD main application shell",
        "الواجهة الرئيسية لنظام DVLD",
        desktopImage,
      ),
      image(
        "dvld-people",
        "/projects/dvld/details/people.webp",
        "DVLD people records management",
        "إدارة سجلات الأشخاص في DVLD",
        desktopImage,
      ),
      image(
        "dvld-local-driving-license",
        "/projects/dvld/details/localdrivinglicense.webp",
        "DVLD local driving license applications",
        "طلبات رخص القيادة المحلية في DVLD",
        desktopImage,
      ),
    ],
  },
  "met-summaries": {
    preview: [
      image(
        "met-hero-dark",
        "/projects/met-summaries/details/hero-dark.webp",
        "MET Summaries collection index in dark mode",
        "فهرس مجموعة ملخصات MET بالوضع الداكن",
      ),
      image(
        "met-lesson-example",
        "/projects/met-summaries/details/lesson-example.webp",
        "Computer Graphics lesson summary with an antialiasing example",
        "ملخص درس في الرسومات الحاسوبية مع مثال على تنعيم الحواف",
      ),
      image(
        "met-practice-example",
        "/projects/met-summaries/details/practice-example.webp",
        "Prolog practice page with worked parent and grandparent rules",
        "صفحة تدريب Prolog مع حل قواعد الأب والجد",
      ),
      image(
        "met-knowledge-graph",
        "/projects/met-summaries/details/knowledge-graph.webp",
        "MET Summaries interactive knowledge graph",
        "الرسم المعرفي التفاعلي لملخصات MET",
      ),
      image(
        "met-hero-light",
        "/projects/met-summaries/details/hero-light.webp",
        "MET Summaries collection index in light mode",
        "فهرس مجموعة ملخصات MET بالوضع الفاتح",
      ),
    ],
    details: [
      image(
        "met-hero-dark",
        "/projects/met-summaries/details/hero-dark.webp",
        "MET Summaries collection index in dark mode",
        "فهرس مجموعة ملخصات MET بالوضع الداكن",
      ),
      image(
        "met-lesson-example",
        "/projects/met-summaries/details/lesson-example.webp",
        "Computer Graphics lesson summary with an antialiasing example",
        "ملخص درس في الرسومات الحاسوبية مع مثال على تنعيم الحواف",
      ),
      image(
        "met-practice-example",
        "/projects/met-summaries/details/practice-example.webp",
        "Prolog practice page with worked parent and grandparent rules",
        "صفحة تدريب Prolog مع حل قواعد الأب والجد",
      ),
      image(
        "met-knowledge-graph",
        "/projects/met-summaries/details/knowledge-graph.webp",
        "MET Summaries interactive knowledge graph",
        "الرسم المعرفي التفاعلي لملخصات MET",
      ),
      image(
        "met-hero-light",
        "/projects/met-summaries/details/hero-light.webp",
        "MET Summaries collection index in light mode",
        "فهرس مجموعة ملخصات MET بالوضع الفاتح",
      ),
    ],
  },
};

/** Keep backwards compatibility alias if needed */
export const projectMediaPlaylists = Object.fromEntries(
  Object.entries(projectMediaSets).map(([slug, set]) => [
    slug,
    [...(set.hero ? [set.hero] : []), ...set.preview, ...set.details],
  ]),
) as Record<ProjectSlug, ProjectMedia[]>;
