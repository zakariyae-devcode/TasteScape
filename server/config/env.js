import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_USER", "MONGO_PASSWORD", "MONGO_HOST", "PORT", "JWT_SECRET"];
const { MONGO_USER, MONGO_PASSWORD, PORT, JWT_SECRET, MONGO_HOST } = process.env;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error("Missing required environment variable: " + key);
  }
}




export const env = {
  PORT,
  JWT_SECRET,
  MONGO_URI: `mongodb://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}:27017/tastescape?authSource=admin`,
};