import { execSync } from "child_process";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

const SOURCE_DIR = join(process.cwd(), "media-source", "projects");

console.log("=== Inspecting Media Source Videos ===");
if (!existsSync(SOURCE_DIR)) {
  console.log("No media-source directory found.");
  process.exit(0);
}

const folders = readdirSync(SOURCE_DIR);
for (const folder of folders) {
  const dir = join(SOURCE_DIR, folder);
  const files = readdirSync(dir).filter((f) => f.endsWith(".mp4"));
  for (const file of files) {
    const filePath = join(dir, file);
    try {
      const output = execSync(
        `ffprobe -v quiet -print_format json -show_format -show_streams "${filePath}"`,
        { encoding: "utf-8" }
      );
      const data = JSON.parse(output);
      const format = data.format || {};
      const videoStream = (data.streams || []).find((s) => s.codec_type === "video") || {};
      console.log(`\nProject: ${folder}/${file}`);
      console.log(`  Size: ${(format.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  Duration: ${parseFloat(format.duration).toFixed(1)} s`);
      console.log(`  Resolution: ${videoStream.width}x${videoStream.height}`);
      console.log(`  Codec: ${videoStream.codec_name}`);
    } catch (e) {
      console.log(`  Failed to inspect ${filePath}: ${e.message}`);
    }
  }
}
