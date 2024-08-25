import { z } from 'zod';
import { version } from '../../package.json';

const envSchema = z.object({
    NODE_ENV: z.string().default('production'),
    DATABASE_URL: z.string().default('evapass.db'),
    APP_NAME: z.string().default('evapass'),
    APP_VERSION: z.string().default(version),
    APP_DESCRIPTION: z.string().default('EvaPass - Password Manager CLI created in Node.js. The goal is to build a basic Command-Line Interface (CLI) application that manages passwords securely.')
})

export const env = envSchema.parse(process.env)
