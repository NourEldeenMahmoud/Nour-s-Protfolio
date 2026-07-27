import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");

let errors = [];

function error(msg) {
  console.error(`❌ ERROR: ${msg}`);
  errors.push(msg);
}

// 1. Check all project folders under public/projects/
const projectsDir = path.join(publicDir, "projects");
if (!fs.existsSync(projectsDir)) {
  error("public/projects directory missing!");
} else {
  const slugs = fs.readdirSync(projectsDir);
  for (const slug of slugs) {
    const slugDir = path.join(projectsDir, slug);
    if (!fs.statSync(slugDir).isDirectory()) continue;

    // Check preview video if exists
    const previewDir = path.join(slugDir, "preview");
    if (fs.existsSync(previewDir)) {
      const previewVideo = path.join(previewDir, "preview.mp4");
      if (fs.existsSync(previewVideo)) {
        const stats = fs.statSync(previewVideo);
        const mb = stats.size / (1024 * 1024);
        if (mb > 12) {
          error(`Project ${slug} preview video exceeds 12 MB limit (${mb.toFixed(2)} MB)`);
        }
        const poster = path.join(previewDir, "poster.webp");
        if (!fs.existsSync(poster)) {
          error(`Project ${slug} has preview video but missing poster (${poster})`);
        }

        // Try ffprobe validation if available
        try {
          const ffprobeCmd = `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt -of json "${previewVideo}"`;
          const output = JSON.parse(execSync(ffprobeCmd, { encoding: "utf-8" }));
          const stream = output.streams?.[0];
          if (stream) {
            if (stream.codec_name !== "h264") {
              error(`Project ${slug} preview video codec is ${stream.codec_name}, expected h264`);
            }
            if (stream.pix_fmt !== "yuv420p") {
              error(`Project ${slug} preview video pix_fmt is ${stream.pix_fmt}, expected yuv420p`);
            }
          }
        } catch {
          // ffprobe optional check
        }
      }
    }

    // Check detail images exist
    const detailsDir = path.join(slugDir, "details");
    if (!fs.existsSync(detailsDir)) {
      error(`Project ${slug} missing details directory!`);
    } else {
      const detailsFiles = fs.readdirSync(detailsDir);
      if (detailsFiles.length === 0) {
        error(`Project ${slug} details directory is empty!`);
      }
    }

    // Ensure no original mp4/mov video files exist directly in root of project
    const looseFiles = fs.readdirSync(slugDir);
    for (const f of looseFiles) {
      if (f.endsWith(".mp4") || f.endsWith(".mov")) {
        error(`Original source video found loose in public/projects/${slug}/${f}! Videos must be in preview/`);
      }
    }
  }
}

// 2. Validate paths in content files
const filesToScan = [
  path.join(rootDir, "content", "portfolio.ts"),
  path.join(rootDir, "content", "project-media.ts"),
  path.join(rootDir, "content", "case-studies.ts"),
  path.join(rootDir, "content", "media-manifest.json"),
];

for (const filePath of filesToScan) {
  if (!fs.existsSync(filePath)) {
    error(`Content file missing: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, "utf-8");

  // Check for forbidden references
  if (filePath !== path.join(rootDir, "content", "media-manifest.json") && content.includes("media-source")) {
    error(`Runtime code file ${path.basename(filePath)} references media-source!`);
  }
  if (content.includes("bots.glb") || content.includes("bots.svg") || content.includes("SHOW_Icon_BOTS")) {
    error(`File ${path.basename(filePath)} references legacy Bots icon!`);
  }

  // Regex extract all '/projects/...', '/models/...', '/case-studies/...'
  const pathRegex = /"\/(projects|models|case-studies)\/[^"]+"/g;
  let match;
  while ((match = pathRegex.exec(content)) !== null) {
    const relPath = match[0].replace(/"/g, "");
    const absPath = path.join(publicDir, relPath);
    if (!fs.existsSync(absPath)) {
      error(`Referenced runtime path "${relPath}" in ${path.basename(filePath)} does not exist at ${absPath}`);
    }
  }
}

// 3. Ensure Bots assets are removed from public
if (fs.existsSync(path.join(publicDir, "models", "showcase-icons", "bots.glb"))) {
  error("bots.glb still exists in public/models/showcase-icons!");
}
if (fs.existsSync(path.join(publicDir, "models", "showcase-icons", "fallback", "bots.svg"))) {
  error("bots.svg still exists in public/models/showcase-icons/fallback!");
}

// 4. Summaries 3D model validation
const summariesGlb = path.join(publicDir, "models", "showcase-icons", "summaries.glb");
if (!fs.existsSync(summariesGlb)) {
  error("summaries.glb is missing!");
} else {
  const stats = fs.statSync(summariesGlb);
  if (stats.size === 77120) {
    error("summaries.glb is binary-identical to the old Bots model (77120 bytes)!");
  }
}

if (errors.length > 0) {
  console.error(`\nValidation failed with ${errors.length} error(s).`);
  process.exit(1);
} else {
  console.log("\n✅ All media, runtime paths, video bounds, and 3D icons successfully validated!");
}
