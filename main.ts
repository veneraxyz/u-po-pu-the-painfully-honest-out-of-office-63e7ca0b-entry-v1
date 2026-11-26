// The Painfully Honest Out-of-Office
// Writes one brutally honest (but manager-safe) auto-reply line to entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const REPLY =
  "I'm out of office and honestly not checking email — your message will wait in a queue I am not excited to face, but I will answer it when I'm back. Thanks for your patience.";

function validateReply(line: string): void {
  if (line.length === 0) {
    throw new Error("reply must not be blank");
  }
  if (line.trim().length === 0) {
    throw new Error("reply must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("reply must be exactly one line");
  }
  if (line.length > 200) {
    throw new Error(`reply is ${line.length} chars, over the 200-char limit`);
  }
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("reply contains a control character");
    }
  }
}

function main(): void {
  validateReply(REPLY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR
    ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
    : resolve("/output");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  const payload = REPLY + "\n";
  writeFileSync(outPath, payload, "utf8");
  // Read-back guard: prove what landed on disk is exactly what we wrote.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== payload) {
    throw new Error(
      `read-back mismatch: wrote ${payload.length} chars, read ${onDisk.length} chars`
    );
  }
  const lines = onDisk.split("\n").filter((l) => l.length > 0);
  if (lines.length !== 1 || lines[0] !== REPLY) {
    throw new Error("read-back mismatch: entry.txt is not the single reply line");
  }
  console.log(`Wrote ${REPLY.length}-char reply to ${outPath} (read-back verified)`);
}

main();
