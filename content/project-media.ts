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

const diagramImage: ImageOptions = {
  ...browserImage,
  device: "diagram",
  purpose: "architecture",
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

export const projectMediaPlaylists: Record<ProjectSlug, ProjectMedia[]> = {
  buildsense: [
    image(
      "buildsense-home",
      "/projects/buildsense/home.webp",
      "BuildSense hardware discovery home page",
      "الصفحة الرئيسية لمنصة BuildSense لاكتشاف مكونات الحاسوب",
    ),
    image(
      "buildsense-catalog",
      "/projects/buildsense/catalog.webp",
      "BuildSense component catalog and filtering",
      "كتالوج مكونات BuildSense وخيارات التصفية",
    ),
    image(
      "buildsense-product-details",
      "/projects/buildsense/product-details.webp",
      "BuildSense product details and verified specifications",
      "تفاصيل المنتج والمواصفات المتحقق منها في BuildSense",
    ),
    image(
      "buildsense-comparison",
      "/projects/buildsense/comparison.webp",
      "BuildSense side-by-side component comparison",
      "مقارنة مكونات جنباً إلى جنب في BuildSense",
    ),
    image(
      "buildsense-builder",
      "/projects/buildsense/pc-builder.webp",
      "BuildSense PC builder workspace",
      "مساحة تجميع الحاسوب في BuildSense",
    ),
    image(
      "buildsense-purchase-plan",
      "/projects/buildsense/purchase-plan.webp",
      "BuildSense build review and purchase plan",
      "مراجعة التجميعة وخطة الشراء في BuildSense",
    ),
    image(
      "buildsense-admin-overview",
      "/projects/buildsense/admin-overview.webp",
      "BuildSense administration overview",
      "نظرة عامة على إدارة BuildSense",
    ),
    image(
      "buildsense-admin-compatibility",
      "/projects/buildsense/admin-compatibility.webp",
      "BuildSense compatibility and data quality review",
      "مراجعة التوافق وجودة البيانات في BuildSense",
    ),
    image(
      "buildsense-mobile-home",
      "/projects/buildsense/mobile-home.webp",
      "BuildSense mobile home page",
      "الصفحة الرئيسية لـBuildSense على الهاتف",
      mobileImage,
    ),
    image(
      "buildsense-mobile-product",
      "/projects/buildsense/mobile-product-details.webp",
      "BuildSense mobile product details",
      "تفاصيل منتج BuildSense على الهاتف",
      mobileImage,
    ),
    image(
      "buildsense-mobile-selector",
      "/projects/buildsense/mobile-builder-selector.webp",
      "BuildSense mobile component selector",
      "اختيار المكونات في BuildSense على الهاتف",
      mobileImage,
    ),
    image(
      "buildsense-mobile-builder",
      "/projects/buildsense/mobile-builder.webp",
      "BuildSense mobile PC builder",
      "أداة تجميع الحاسوب في BuildSense على الهاتف",
      mobileImage,
    ),
  ],
  bookify: [
    image(
      "bookify-home",
      "/projects/bookify/home.webp",
      "Bookify hotel search home page",
      "الصفحة الرئيسية للبحث عن الفنادق في Bookify",
    ),
    image(
      "bookify-rooms",
      "/projects/bookify/rooms.webp",
      "Bookify available rooms catalog",
      "كتالوج الغرف المتاحة في Bookify",
    ),
    image(
      "bookify-room-details",
      "/projects/bookify/room-details.webp",
      "Bookify room details and gallery",
      "تفاصيل الغرفة ومعرض الصور في Bookify",
    ),
    image(
      "bookify-booking",
      "/projects/bookify/booking.webp",
      "Bookify reservation checkout",
      "إتمام الحجز في Bookify",
    ),
    image(
      "bookify-email-confirmation",
      "/projects/bookify/email-confirmation.webp",
      "Bookify email confirmation state",
      "حالة تأكيد البريد الإلكتروني في Bookify",
    ),
    image(
      "bookify-admin-dashboard",
      "/projects/bookify/admin-dashboard.webp",
      "Bookify administration dashboard",
      "لوحة إدارة Bookify",
    ),
    image(
      "bookify-manage-rooms",
      "/projects/bookify/manage-rooms.webp",
      "Bookify room inventory management",
      "إدارة مخزون الغرف في Bookify",
    ),
    image(
      "bookify-manage-room-types",
      "/projects/bookify/manage-room-types.webp",
      "Bookify room type management",
      "إدارة أنواع الغرف في Bookify",
    ),
    image(
      "bookify-database",
      "/projects/bookify/database-erd.webp",
      "Bookify database relationship diagram",
      "مخطط علاقات قاعدة بيانات Bookify",
      diagramImage,
    ),
  ],
  "blood-bank-desktop": [
    image(
      "bbms-dashboard",
      "/projects/blood-bank-desktop/dashboard-redacted.webp",
      "Blood Bank desktop operations dashboard",
      "لوحة عمليات نظام بنك الدم المكتبي",
      desktopImage,
    ),
  ],
  "blood-bank-mobile": [
    image(
      "bbms-mobile-home",
      "/projects/blood-bank-mobile/home.webp",
      "Blood Bank donor mobile home screen",
      "الشاشة الرئيسية لتطبيق المتبرعين في بنك الدم",
      mobileImage,
    ),
    image(
      "bbms-mobile-schedule",
      "/projects/blood-bank-mobile/appointment-schedule.webp",
      "Blood Bank mobile appointment scheduling",
      "جدولة موعد التبرع في تطبيق بنك الدم",
      mobileImage,
    ),
    image(
      "bbms-mobile-notifications",
      "/projects/blood-bank-mobile/notifications.webp",
      "Blood Bank mobile notification center",
      "مركز الإشعارات في تطبيق بنك الدم",
      mobileImage,
    ),
    image(
      "bbms-mobile-registration",
      "/projects/blood-bank-mobile/registration.webp",
      "Blood Bank mobile registration form",
      "نموذج التسجيل في تطبيق بنك الدم",
      mobileImage,
    ),
    image(
      "bbms-mobile-login",
      "/projects/blood-bank-mobile/login.webp",
      "Blood Bank mobile sign-in screen",
      "شاشة تسجيل الدخول في تطبيق بنك الدم",
      mobileImage,
    ),
  ],
  dvld: [
    image(
      "dvld-main-shell",
      "/projects/dvld/main-shell.webp",
      "DVLD main application shell",
      "الواجهة الرئيسية لنظام DVLD",
      desktopImage,
    ),
  ],
  cinemaverse: [
    image(
      "cinemaverse-home",
      "/projects/cinemaverse/home.webp",
      "CinemaVerse customer home page",
      "الصفحة الرئيسية للمستخدم في CinemaVerse",
    ),
    image(
      "cinemaverse-catalog",
      "/projects/cinemaverse/movie-catalog.webp",
      "CinemaVerse movie catalog",
      "كتالوج الأفلام في CinemaVerse",
    ),
    image(
      "cinemaverse-details",
      "/projects/cinemaverse/movie-details.webp",
      "CinemaVerse movie details and showtimes",
      "تفاصيل الفيلم ومواعيد العرض في CinemaVerse",
    ),
    image(
      "cinemaverse-seats",
      "/projects/cinemaverse/seat-selection.webp",
      "CinemaVerse seat selection flow",
      "تدفق اختيار المقاعد في CinemaVerse",
    ),
    image(
      "cinemaverse-admin-dashboard",
      "/projects/cinemaverse/admin-dashboard.webp",
      "CinemaVerse administration dashboard",
      "لوحة إدارة CinemaVerse",
    ),
    image(
      "cinemaverse-branches",
      "/projects/cinemaverse/branch-management.webp",
      "CinemaVerse branch management",
      "إدارة الفروع في CinemaVerse",
    ),
    image(
      "cinemaverse-hall-editor",
      "/projects/cinemaverse/hall-editor.webp",
      "CinemaVerse hall editor",
      "محرر قاعات CinemaVerse",
    ),
    image(
      "cinemaverse-movie-management",
      "/projects/cinemaverse/movie-management.webp",
      "CinemaVerse movie management",
      "إدارة الأفلام في CinemaVerse",
    ),
    image(
      "cinemaverse-showtimes",
      "/projects/cinemaverse/showtime-management.webp",
      "CinemaVerse showtime management",
      "إدارة مواعيد العرض في CinemaVerse",
    ),
  ],
};
