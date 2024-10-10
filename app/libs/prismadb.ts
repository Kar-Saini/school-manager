import { PrismaClient } from "@prisma/client";

// Ensure `globalThis.prisma` is typed and initialized properly
const client = globalThis.prisma || new PrismaClient();

// In development, attach the client to globalThis to reuse it across module reloads
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;
