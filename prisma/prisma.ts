import { PrismaClient } from "@prisma/client";

// Global nesne için genişletilmiş bir tip tanımı
interface CustomGlobal {
  prisma?: PrismaClient;
}

// 'global' anahtar sözcüğünü 'CustomGlobal' tipi olarak kullan
declare const global: CustomGlobal;

let prisma: PrismaClient;

if (process.env.MODE === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
