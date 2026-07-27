import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "media-source", "projects");
const publicDir = path.join(rootDir, "public", "projects");

const slug = process.argv[2];
if (!slug) {
  console.log("Usage: node scripts/media/poster-media.mjs <project-slug>");
  process.exit(1);
}

const projSourceDir = path.join(sourceDir, slug);
const files = fs.readdirSync(projSourceDir);
const videoFile = files.find((f) => f.endsWith(".mp4") || f.endsWith(".mov"));
if (!videoFile) {
  console.error(`Error: No source video found in ${projSourceDir}`);
  process.exit(1);
}

const srcPath = path.join(projSourceDir, videoFile);
const previewDir = path.join(publicDir, slug, "preview");
if (!fs.existsSync(previewDir)) {
  fs.mkdirSync(previewDir, { recursive: true });
}

const outPoster = path.join(previewDir, "poster.webp");
const cmd = `ffmpeg -ss 00:00:01 -i "${srcPath}" -vframes 1 -c:v libwebp -quality 90 "${outPoster}" -y`;
execSync(cmd, { stdio: "inherit" });
console.log(`[poster-media] Created poster: ${outPoster}`);
