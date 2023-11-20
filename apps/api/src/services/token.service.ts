import { signJWT } from "@/helpers/jwt";
import { UserDocument } from "@/models/user.model";
import { User } from "@/types";

export const generateTokens = async (user: UserDocument) => {
  const userId: string = user._id.toString();

  // Generate access token
  const accessToken = signJWT({ id: userId }, "ACCESS_JWT_SECRET", {
    expiresIn: "15m",
  });

  // Generate refresh token
  const refreshToken = signJWT({ id: userId }, "REFRESH_JWT_SECRET", {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
