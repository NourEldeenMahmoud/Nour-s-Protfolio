import { readdirSync, existsSync, statSync } from "fs";
import { join } from "path";

const PUBLIC_PROJECTS = join(process.cwd(), "public", "projects");
let errors = 0;

console.log("=== Validating Runtime Media Assets ===");

if (!existsSync(PUBLIC_PROJECTS)) {
  console.error("ERROR: public/projects directory does not exist!");
  process.exit(1);
}

const projects = readdirSync(PUBLIC_PROJECTS).filter((f) =>
  statSync(join(PUBLIC_PROJECTS, f)).isDirectory()
);

for (const project of projects) {
  const pDir = join(PUBLIC_PROJECTS, project);
  
  // Rule 1: No raw mp4 files in project root
  const rootMp4s = readdirSync(pDir).filter((f) => f.endsWith(".mp4"));
  if (rootMp4s.length > 0) {
    console.error(`❌ [${project}] Found MP4 files in project root instead of preview/: ${rootMp4s.join(", ")}`);
    errors++;
  }

  // Rule 2: preview/ directory exists and contains preview.mp4 (or images)
  const previewDir = join(pDir, "preview");
  if (existsSync(previewDir)) {
    const previewMp4 = join(previewDir, "preview.mp4");
    if (existsSync(previewMp4)) {
      const size = statSync(previewMp4).size;
      const sizeMB = size / (1024 * 1024);
      if (sizeMB > 12) {
        console.error(`❌ [${project}] preview.mp4 exceeds 12 MB limit: ${sizeMB.toFixed(2)} MB`);
        errors++;
      } else {
        console.log(`✅ [${project}] preview.mp4 valid: ${sizeMB.toFixed(2)} MB`);
      }
    }
  }

  // Rule 3: details/ directory exists
  const detailsDir = join(pDir, "details");
  if (!existsSync(detailsDir)) {
    console.warn(`⚠️ [${project}] details/ directory missing.`);
  }
}

if (errors === 0) {
  console.log("\n✨ All media validations passed successfully!");
} else {
  console.error(`\n❌ Media validation failed with ${errors} error(s).`);
  process.exit(1);
}
