import crypto from "node:crypto";
import bcript from "bcrypt";

export function hashPassword(password: string) {
  return bcript.hash(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcript.compare(password, hash);
}


export function sha256(input: string) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}
