import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "media-source", "projects");
const publicDir = path.join(rootDir, "public", "projects");
const force = process.argv.includes("--force");

function checkFFmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

if (!checkFFmpeg()) {
  console.error("Error: FFmpeg is required for media preparation but was not found in PATH.");
  process.exit(1);
}

if (!fs.existsSync(sourceDir)) {
  console.log("No media-source/projects directory found.");
  process.exit(0);
}

const projectFolders = fs.readdirSync(sourceDir);

for (const slug of projectFolders) {
  const projSourceDir = path.join(sourceDir, slug);
  if (!fs.statSync(projSourceDir).isDirectory()) continue;

  const files = fs.readdirSync(projSourceDir);
  const videoFile = files.find((f) => f.endsWith(".mp4") || f.endsWith(".mov"));
  if (!videoFile) continue;

  const srcPath = path.join(projSourceDir, videoFile);
  const previewDir = path.join(publicDir, slug, "preview");
  const outVideo = path.join(previewDir, "preview.mp4");
  const outPoster = path.join(previewDir, "poster.webp");

  if (!fs.existsSync(previewDir)) {
    fs.mkdirSync(previewDir, { recursive: true });
  }

  if (force || !fs.existsSync(outVideo)) {
    console.log(`[prepare-media] Encoding preview video for ${slug}...`);
    const cmd = `ffmpeg -i "${srcPath}" -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart "${outVideo}" -y`;
    execSync(cmd, { stdio: "inherit" });
  }

  if (force || !fs.existsSync(outPoster)) {
    console.log(`[prepare-media] Extracting poster for ${slug}...`);
    const cmd = `ffmpeg -ss 00:00:01 -i "${srcPath}" -vframes 1 -c:v libwebp -quality 90 "${outPoster}" -y`;
    execSync(cmd, { stdio: "inherit" });
  }
}

console.log("[prepare-media] Complete.");
