import type { ProjectMedia, ProjectSlug } from "@/content/portfolio";

type ImageOptions = Pick<
  ProjectMedia,
  "device" | "orientation" | "purpose" | "treatment" | "focalPosition"
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

export const projectMediaPlaylists: Record<ProjectSlug, ProjectMedia[]> = {
  buildsense: [
    video(
      "buildsense-preview-video",
      "/projects/buildsense/preview/preview.mp4",
      "/projects/buildsense/preview/poster.webp",
      "BuildSense PC hardware discovery preview video",
      "فيديو معاينة منصة BuildSense لاكتشاف مكونات الحاسوب",
    ),
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
  ],
  bookify: [
    video(
      "bookify-preview-video",
      "/projects/bookify/preview/preview.mp4",
      "/projects/bookify/preview/poster.webp",
      "Bookify hotel reservation system preview video",
      "فيديو معاينة نظام حجز الفنادق Bookify",
    ),
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
  cinemaverse: [
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
  "frontend-mini-projects": [
    video(
      "fmp-preview-video",
      "/projects/frontend-mini-projects/preview/preview.mp4",
      "/projects/frontend-mini-projects/preview/poster.webp",
      "Frontend Mini Projects collection preview video",
      "فيديو معاينة مجموعة مشاريع الواجهات الأمامية المصغّرة",
    ),
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
  ],
  "how-to-train-your-ai": [
    video(
      "httyai-preview-video",
      "/projects/how-to-train-your-ai/preview/preview.mp4",
      "/projects/how-to-train-your-ai/preview/poster.webp",
      "How To Train Your AI gameplay preview video",
      "فيديو معاينة طريقة لعب How To Train Your AI",
    ),
    image(
      "httyai-frame-1",
      "/projects/how-to-train-your-ai/details/01-gameplay.webp",
      "How To Train Your AI gameplay — arena combat",
      "طريقة لعب How To Train Your AI — قتال الساحة",
    ),
    image(
      "httyai-frame-2",
      "/projects/how-to-train-your-ai/details/02-gameplay.webp",
      "How To Train Your AI gameplay — ML bot tracking",
      "طريقة لعب How To Train Your AI — تتبع البوت",
    ),
    image(
      "httyai-frame-3",
      "/projects/how-to-train-your-ai/details/03-gameplay.webp",
      "How To Train Your AI gameplay — obstacle navigation",
      "طريقة لعب How To Train Your AI — التنقل بين العقبات",
    ),
    image(
      "httyai-frame-4",
      "/projects/how-to-train-your-ai/details/04-gameplay.webp",
      "How To Train Your AI gameplay — engagement phase",
      "طريقة لعب How To Train Your AI — مرحلة المواجهة",
    ),
  ],
  "sharp-shooter": [
    video(
      "sharp-shooter-preview-video",
      "/projects/sharp-shooter/preview/preview.mp4",
      "/projects/sharp-shooter/preview/poster.webp",
      "Sharp Shooter gameplay preview video",
      "فيديو معاينة طريقة لعب Sharp Shooter",
    ),
    image(
      "sharp-shooter-frame-1",
      "/projects/sharp-shooter/details/01-gameplay.webp",
      "Sharp Shooter gameplay — shooting gallery wave",
      "طريقة لعب Sharp Shooter — موجة معرض الرماية",
    ),
    image(
      "sharp-shooter-frame-2",
      "/projects/sharp-shooter/details/02-gameplay.webp",
      "Sharp Shooter gameplay — target acquisition",
      "طريقة لعب Sharp Shooter — تحديد الأهداف",
    ),
    image(
      "sharp-shooter-frame-3",
      "/projects/sharp-shooter/details/03-gameplay.webp",
      "Sharp Shooter gameplay — wave completion",
      "طريقة لعب Sharp Shooter — إكمال الموجة",
    ),
  ],
  "royal-run": [
    video(
      "royal-run-preview-video",
      "/projects/royal-run/preview/preview.mp4",
      "/projects/royal-run/preview/poster.webp",
      "Royal Run gameplay preview video",
      "فيديو معاينة طريقة لعب Royal Run",
    ),
    image(
      "royal-run-frame-1",
      "/projects/royal-run/details/01-gameplay.webp",
      "Royal Run gameplay — obstacle evasion",
      "طريقة لعب Royal Run — تفادي العقبات",
    ),
    image(
      "royal-run-frame-2",
      "/projects/royal-run/details/02-gameplay.webp",
      "Royal Run gameplay — coin collection",
      "طريقة لعب Royal Run — جمع العملات",
    ),
    image(
      "royal-run-frame-3",
      "/projects/royal-run/details/03-gameplay.webp",
      "Royal Run gameplay — high speed runner",
      "طريقة لعب Royal Run — الركض بسرعات عالية",
    ),
  ],
  "galaxy-strike": [
    video(
      "galaxy-strike-preview-video",
      "/projects/galaxy-strike/preview/preview.mp4",
      "/projects/galaxy-strike/preview/poster.webp",
      "Galaxy Strike gameplay preview video",
      "فيديو معاينة طريقة لعب Galaxy Strike",
    ),
    image(
      "galaxy-strike-frame-1",
      "/projects/galaxy-strike/details/01-gameplay.webp",
      "Galaxy Strike gameplay — space shooter waves",
      "طريقة لعب Galaxy Strike — موجات الرماية الفضائية",
    ),
    image(
      "galaxy-strike-frame-2",
      "/projects/galaxy-strike/details/02-gameplay.webp",
      "Galaxy Strike gameplay — boss encounter",
      "طريقة لعب Galaxy Strike — مواجهة الرئيس",
    ),
    image(
      "galaxy-strike-frame-3",
      "/projects/galaxy-strike/details/03-gameplay.webp",
      "Galaxy Strike gameplay — bullet patterns",
      "طريقة لعب Galaxy Strike — أنماط الرصاص",
    ),
  ],
  "rocket-boost": [
    video(
      "rocket-boost-preview-video",
      "/projects/rocket-boost/preview/preview.mp4",
      "/projects/rocket-boost/preview/poster.webp",
      "Rocket Boost gameplay preview video",
      "فيديو معاينة طريقة لعب Rocket Boost",
    ),
    image(
      "rocket-boost-frame-1",
      "/projects/rocket-boost/details/01-gameplay.webp",
      "Rocket Boost gameplay — physics obstacle course",
      "طريقة لعب Rocket Boost — مسار العقبات الفيزيائي",
    ),
    image(
      "rocket-boost-frame-2",
      "/projects/rocket-boost/details/02-gameplay.webp",
      "Rocket Boost gameplay — rocket control",
      "طريقة لعب Rocket Boost — التحكم بالصاروخ",
    ),
  ],
  "blood-bank-desktop": [
    video(
      "bbms-desktop-preview-video",
      "/projects/blood-bank-desktop/preview/preview.mp4",
      "/projects/blood-bank-desktop/preview/poster.webp",
      "Blood Bank Management System desktop preview video",
      "فيديو معاينة نظام إدارة بنك الدم المكتبي",
    ),
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
  "blood-bank-mobile": [
    video(
      "bbms-mobile-preview-video",
      "/projects/blood-bank-mobile/preview/preview.mp4",
      "/projects/blood-bank-mobile/preview/poster.webp",
      "Blood Bank donor mobile app preview video",
      "فيديو معاينة تطبيق المتبرعين في بنك الدم",
      mobileImage,
    ),
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
  dvld: [
    video(
      "dvld-preview-video",
      "/projects/dvld/preview/preview.mp4",
      "/projects/dvld/preview/poster.webp",
      "Driving and Vehicle License Department preview video",
      "فيديو معاينة نظام إدارة رخص القيادة والمركبات",
      desktopImage,
    ),
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
  "met-summaries": [
    image(
      "met-index",
      "/projects/met-summaries/details/01-index.webp",
      "MET Summaries main collection index",
      "الفهرس الرئيسي لمجموعة ملخصات MET",
    ),
    image(
      "met-gis",
      "/projects/met-summaries/details/02-gis-index.webp",
      "GIS course lecture summaries index",
      "فهرس ملخصات مادة نظم المعلومات الجغرافية",
    ),
    image(
      "met-graphics",
      "/projects/met-summaries/details/03-computer-graphics-index.webp",
      "Computer Graphics course summaries index",
      "فهرس ملخصات مادة الرسومات الحاسوبية",
    ),
    image(
      "met-networks",
      "/projects/met-summaries/details/04-networks-index.webp",
      "Computer Networks course summaries index",
      "فهرس ملخصات مادة شبكات الحاسوب",
    ),
    image(
      "met-prolog",
      "/projects/met-summaries/details/05-prolog-index.webp",
      "Prolog programming course summaries index",
      "فهرس ملخصات مادة برمجة Prolog",
    ),
    image(
      "met-prolog-lecture",
      "/projects/met-summaries/details/06-prolog-lecture.webp",
      "Prolog individual lecture notes page",
      "صفحة ملخص محاضرة فردية في Prolog",
    ),
  ],
};
