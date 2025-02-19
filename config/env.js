import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV ||  'development'}.local` });

export const { PORT,NODE_ENV, MONGODB_URI,JWT_SECRET,JWT_EXPIRE_TIME, ARC_JET_KEY, ARC_JET_ENV, QSTASH_URL, QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY } = process.env;