import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL as string;

const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({ adapter });