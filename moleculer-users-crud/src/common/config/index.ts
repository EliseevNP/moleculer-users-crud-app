import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const {
  MS_CFG_POSTGRES_DB,
  MS_CFG_POSTGRES_USER,
  MS_CFG_POSTGRES_PASSWORD,
  MS_CFG_POSTGRES_HOST,
  MS_CFG_POSTGRES_OUT_PORT,
} = process.env;

export const DB_CONFIG = {
  database: MS_CFG_POSTGRES_DB,
  username: MS_CFG_POSTGRES_USER,
  password: MS_CFG_POSTGRES_PASSWORD,
  host: MS_CFG_POSTGRES_HOST,
  port: MS_CFG_POSTGRES_OUT_PORT,
};
