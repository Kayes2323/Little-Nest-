import { promises as fs } from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/lib/uploads";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".mp4": "video/mp4", ".webm": "video/webm",
};

export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!/^[a-z0-9-]+\.[a-z0-9]+$/i.test(name)) return new Response("Not found", { status: 404 });
  const type = MIME[path.extname(name).toLowerCase()];
  if (!type) return new Response("Not found", { status: 404 });
  try {
    const buf = await fs.readFile(path.join(UPLOAD_DIR, name));
    const range = req.headers.get("range");
    const headers: Record<string, string> = { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable", "Accept-Ranges": "bytes" };
    if (range) {
      const m = /bytes=(\d*)-(\d*)/.exec(range);
      if (m) {
        const start = m[1] ? parseInt(m[1]) : 0;
        const end = m[2] ? Math.min(parseInt(m[2]), buf.length - 1) : buf.length - 1;
        return new Response(new Uint8Array(buf.subarray(start, end + 1)), {
          status: 206, headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${buf.length}`, "Content-Length": String(end - start + 1) },
        });
      }
    }
    return new Response(new Uint8Array(buf), { headers: { ...headers, "Content-Length": String(buf.length) } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
