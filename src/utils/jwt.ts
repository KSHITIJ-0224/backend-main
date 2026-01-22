import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.ACCESS_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};
