import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "media-source", "projects");
const publicDir = path.join(rootDir, "public", "projects");

const slug = process.argv[2];
if (!slug) {
  console.log("Usage: node scripts/media/frames-media.mjs <project-slug>");
  process.exit(1);
}

const projSourceDir = path.join(sourceDir, slug);
if (!fs.existsSync(projSourceDir)) {
  console.error(`Error: Source folder not found for ${slug}`);
  process.exit(1);
}

const files = fs.readdirSync(projSourceDir);
const videoFile = files.find((f) => f.endsWith(".mp4") || f.endsWith(".mov"));
if (!videoFile) {
  console.error(`Error: No source video found in ${projSourceDir}`);
  process.exit(1);
}

const srcPath = path.join(projSourceDir, videoFile);
const detailsDir = path.join(publicDir, slug, "details");
if (!fs.existsSync(detailsDir)) {
  fs.mkdirSync(detailsDir, { recursive: true });
}

console.log(`[frames-media] Extracting frames for ${slug}...`);
const timestamps = [2.0, 6.0, 10.0, 15.0, 20.0, 25.0, 30.0];
timestamps.forEach((ts, idx) => {
  const num = String(idx + 1).padStart(2, "0");
  const outPath = path.join(detailsDir, `${num}-gameplay.webp`);
  if (!fs.existsSync(outPath) || process.argv.includes("--force")) {
    const cmd = `ffmpeg -ss ${ts} -i "${srcPath}" -vframes 1 -c:v libwebp -quality 90 "${outPath}" -y`;
    execSync(cmd, { stdio: "ignore" });
    console.log(`Extracted: ${outPath}`);
  }
});
