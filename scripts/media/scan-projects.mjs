import { readdirSync, statSync, existsSync } from "fs";
import { join } from "path";

const PROJECTS_DIR = join(process.cwd(), "public", "projects");
const SOURCE_DIR = join(process.cwd(), "media-source", "projects");

console.log("=== Public Projects Directory Scan ===");
if (existsSync(PROJECTS_DIR)) {
  const folders = readdirSync(PROJECTS_DIR).filter((f) =>
    statSync(join(PROJECTS_DIR, f)).isDirectory()
  );
  for (const folder of folders) {
    const pPath = join(PROJECTS_DIR, folder);
    const hasPreview = existsSync(join(pPath, "preview"));
    const hasDetails = existsSync(join(pPath, "details"));
    const mp4sInRoot = readdirSync(pPath).filter((f) => f.endsWith(".mp4"));
    console.log(`- ${folder}: preview=${hasPreview}, details=${hasDetails}, rootMP4s=[${mp4sInRoot.join(", ")}]`);
  }
} else {
  console.log("public/projects does not exist.");
}

console.log("\n=== Media Source Directory Scan ===");
if (existsSync(SOURCE_DIR)) {
  const sourceFolders = readdirSync(SOURCE_DIR).filter((f) =>
    statSync(join(SOURCE_DIR, f)).isDirectory()
  );
  for (const folder of sourceFolders) {
    const files = readdirSync(join(SOURCE_DIR, folder));
    console.log(`- ${folder}: [${files.join(", ")}]`);
  }
} else {
  console.log("media-source/projects does not exist.");
}
