import { PrismaClient } from "@prisma/client";

// Extending the global object to include `prisma`
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

// This ensures that the file is treated as a module
export {};
