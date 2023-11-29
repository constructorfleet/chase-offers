import { registerAs } from "@nestjs/config";

export const AppConfig = registerAs("App.Config", () => ({
  username: process.env.CHASE_USERNAME,
  password: process.env.CHASE_PASSWORD,
  userId: process.env.USER_ID,
}));
