import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { env } from "../config/env.config";

export class PrismaService {
    private static instance: PrismaClient;
    private constructor() { }

    public static getInstance(): PrismaClient {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaClient()
        }

        return PrismaService.instance;
    }

    public static migrate() {
        try {
            if (!existsSync(path.join('prisma', env.DATABASE_URL))) {
                execSync('npx prisma migrate deploy', { stdio: 'ignore' })
            }
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    }
}

export const db: PrismaClient = PrismaService.getInstance()
