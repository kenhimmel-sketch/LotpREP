
import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

const allowedFiles = [
  "client/src/lib/badgeGenerator.ts",
  "client/src/hooks/useAuth.ts",
  "client/src/hooks/useParkMembers.ts",
  "client/src/components/BubbleWall.tsx",
  "shared/schema.ts",
  "server/routes.ts",
];

export async function getShareCode(req: Request, res: Response) {
  try {
    const { filePath } = req.params;
    const decodedPath = decodeURIComponent(filePath);

    // Security: only allow specific files
    if (!allowedFiles.includes(decodedPath)) {
      return res.status(403).json({ error: "File access not allowed" });
    }

    const fullPath = path.join(process.cwd(), decodedPath);
    const code = await fs.readFile(fullPath, "utf-8");

    res.json({
      code,
      path: decodedPath,
      name: path.basename(decodedPath),
    });
  } catch (error: any) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Failed to read file" });
  }
}
