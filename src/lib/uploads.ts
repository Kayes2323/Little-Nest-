import path from "path";
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "data", "runtime", "uploads");
